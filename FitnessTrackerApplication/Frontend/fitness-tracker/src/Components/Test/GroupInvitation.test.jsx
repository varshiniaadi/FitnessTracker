import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import GroupInvitation from '../GroupInvitation';
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock('axios');
const mockedAxios = axios;

describe('GroupInvitation', () => {
  const traineeId = '12345';

  test('fetches and displays user data with invited status', async () => {
    const mockUserData = {
      groupType: 'Morning',
      groupStatus: 'INVITED'
    };

    mockedAxios.get.mockResolvedValueOnce({ data: mockUserData });

    render(
      <Router>
        <GroupInvitation traineeId={traineeId} />
      </Router>
    );

    // Check for loading state
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();

    // Wait for the component to finish fetching user data
    await waitFor(() => {
      expect(screen.queryByText(/Loading.../i)).not.toBeInTheDocument();
      expect(screen.getByText(/Do you want to join the Morning group\?/i)).toBeInTheDocument();
    });

    // Check if buttons are present
    expect(screen.getByText(/Yes/i)).toBeInTheDocument();
    expect(screen.getByText(/No/i)).toBeInTheDocument();
  });

  test('handles accept action', async () => {
    const mockUserData = {
      groupType: 'Morning',
      groupStatus: 'INVITED'
    };

    mockedAxios.get.mockResolvedValueOnce({ data: mockUserData });
    mockedAxios.post.mockResolvedValueOnce({});

    render(
      <Router>
        <GroupInvitation traineeId={traineeId} />
      </Router>
    );

    // Wait for the component to finish fetching user data
    await waitFor(() => screen.getByText(/Do you want to join the Morning group\?/i));

    // Click on 'Yes' button
    fireEvent.click(screen.getByText(/Yes/i));

    // Verify API call
    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalledWith(`http://localhost:8080/trainer/invite/accept/${traineeId}/Morning`);
    });

    // Check if groupStatus was updated
    expect(mockedAxios.post).toHaveBeenCalledTimes(1);
  });

  test('handles reject action', async () => {
    const mockUserData = {
      groupType: 'Morning',
      groupStatus: 'INVITED'
    };

    mockedAxios.get.mockResolvedValueOnce({ data: mockUserData });
    mockedAxios.post.mockResolvedValueOnce({});

    render(
      <Router>
        <GroupInvitation traineeId={traineeId} />
      </Router>
    );

    // Wait for the component to finish fetching user data
    await waitFor(() => screen.getByText(/Do you want to join the Morning group\?/i));

    // Click on 'No' button
    fireEvent.click(screen.getByText(/No/i));

    // Verify API call
    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalledWith(`http://localhost:8080/trainer/invite/reject/${traineeId}`);
    });

    // Check if groupStatus was updated
    expect(mockedAxios.post).toHaveBeenCalledTimes(1);
  });
});
