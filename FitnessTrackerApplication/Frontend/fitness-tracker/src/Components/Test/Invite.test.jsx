import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Invite from '../Invite';

import { fetch } from 'cross-fetch';

// Mock global fetch function
global.fetch = jest.fn();

const mockTrainees = [
  { id: 9, username: 'Trainee1', groupStatus: 'not-invited', groupType: '' },
  { id: 10, username: 'Trainee2', groupStatus: 'INVITED', groupType: 'morning' },
  { id: 11, username: 'Trainee3', groupStatus: 'ACCEPTED', groupType: 'evening' },
];


const mockFetchTraineesResponse = Promise.resolve({
  json: () => Promise.resolve(mockTrainees),
});

const mockFetchUserStatusResponse = (userId) => Promise.resolve({
  json: () => Promise.resolve({
    groupStatus: mockTrainees.find(trainee => trainee.id === userId).groupStatus,
    groupType: mockTrainees.find(trainee => trainee.id === userId).groupType,
  }),
});

const mockFetchInviteResponse = Promise.resolve({
  ok: true,
});

describe('Invite Component', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('renders Invite component correctly', async () => {
    fetch.mockImplementation(url => {
      if (url === 'http://localhost:8080/trainee/users') {
        return mockFetchTraineesResponse;
      }
      return mockFetchUserStatusResponse(Number(url.split('/').pop()));
    });

    render(<Invite trainerId="1" />);

    // Verify the component renders and displays trainees
    expect(await screen.findByText('Invite Trainees to Group')).toBeInTheDocument();
    expect(await screen.findByText('Trainee1')).toBeInTheDocument();
    expect(await screen.findByText('Trainee2')).toBeInTheDocument();
    expect(await screen.findByText('Trainee3')).toBeInTheDocument();
  });

  test('handles trainee selection and group selection', async () => {
    fetch.mockImplementation(url => {
      if (url === 'http://localhost:8080/trainee/users') {
        return mockFetchTraineesResponse;
      }
      return mockFetchUserStatusResponse(Number(url.split('/').pop()));
    });

    render(<Invite trainerId="1" />);

    // Wait for the trainees to be loaded
    await screen.findByText('Trainee1');

    // Select trainees and a group
    fireEvent.click(screen.getByLabelText('Trainee1'));
    fireEvent.click(screen.getByLabelText('Morning Group'));

    // Check if selection is reflected
    expect(screen.getByLabelText('Trainee1').closest('input')).toBeChecked();
    expect(screen.getByLabelText('Morning Group').closest('input')).toBeChecked();
  });

  test('opens and closes confirmation dialog', async () => {
    fetch.mockImplementation(url => {
      if (url === 'http://localhost:8080/trainee/users') {
        return mockFetchTraineesResponse;
      }
      return mockFetchUserStatusResponse(Number(url.split('/').pop()));
    });

    render(<Invite trainerId="1" />);

    // Select trainee and group
    fireEvent.click(screen.getByLabelText('Trainee1'));
    fireEvent.click(screen.getByLabelText('Morning Group'));

    // Open confirmation dialog
    fireEvent.click(screen.getByText('Send Invitation'));
    expect(screen.getByText('Confirm Invitation')).toBeInTheDocument();

    // Close confirmation dialog
    fireEvent.click(screen.getByText('No'));
    expect(screen.queryByText('Confirm Invitation')).not.toBeInTheDocument();
  });

  test('sends invitation and handles response', async () => {
    fetch.mockImplementation(url => {
      if (url === 'http://localhost:8080/trainee/users') {
        return mockFetchTraineesResponse;
      }
      if (url.startsWith('http://localhost:8080/trainer/invite')) {
        return mockFetchInviteResponse;
      }
      return mockFetchUserStatusResponse(Number(url.split('/').pop()));
    });

    render(<Invite trainerId="1" />);

    // Select trainee and group
    fireEvent.click(screen.getByLabelText('Trainee1'));
    fireEvent.click(screen.getByLabelText('Morning Group'));

    // Open confirmation dialog and confirm invitation
    fireEvent.click(screen.getByText('Send Invitation'));
    fireEvent.click(screen.getByText('Yes'));

    await waitFor(() => {
      expect(screen.getByText('Invitation sent successfully')).toBeInTheDocument();
    });
  });
});
