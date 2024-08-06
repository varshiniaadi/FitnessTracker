import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/';
import axios from 'axios';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Profile from '../Profile';

// Mock axios
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => jest.fn(),
  }));
  
jest.mock('axios');

describe('Profile', () => {
  test('renders user information', async () => {
    // Mock user data
    const user = {
      username: 'testuser',
      email: 'testuser@example.com',
      city: 'Test City',
      state: 'Test State',
      country: 'Test Country',
      groupStatus: 'ACCEPTED',
      groupType: 'Test Group'
    };

    // Mock axios GET request
    axios.get.mockResolvedValue({ data: user });

    // Render the Profile component with a mocked traineeId
    render(
      <MemoryRouter initialEntries={['/profile/10']}>
        <Routes>
          <Route path="/profile/:traineeId" element={<Profile />} />
        </Routes>
      </MemoryRouter>
    );

    // Check for loading text initially
    expect(screen.getByText('Loading...')).toBeInTheDocument();

    // Wait for the user data to be rendered
    await waitFor(() => {
      // Check for user information
      expect(screen.getByText('Username: testuser')).toBeInTheDocument();
      expect(screen.getByText('Email: testuser@example.com')).toBeInTheDocument();
      expect(screen.getByText('City: Test City')).toBeInTheDocument();
      expect(screen.getByText('State: Test State')).toBeInTheDocument();
      expect(screen.getByText('Country: Test Country')).toBeInTheDocument();
      expect(screen.getByText('Group: Test Group')).toBeInTheDocument();
    });
  });

  test('handles error during fetch', async () => {
    // Mock axios GET request to simulate an error
    axios.get.mockRejectedValue(new Error('Failed to fetch user information'));

    // Render the Profile component with a mocked traineeId
    render(
      <MemoryRouter initialEntries={['/profile/10']}>
        <Routes>
          <Route path="/profile/:traineeId" element={<Profile />} />
        </Routes>
      </MemoryRouter>
    );

    // Check for loading text initially
    expect(screen.getByText('Loading...')).toBeInTheDocument();

    // Wait for error handling (assuming error handling will be done)
    await waitFor(() => {
      expect(screen.getByText('Error fetching user information')).toBeInTheDocument();
    });
  });
});
