import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from '../Login'; // Adjust the import path as necessary
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

// Mock the dependencies
jest.mock('@react-oauth/google', () => ({
  googleLogout: jest.fn(),
  useGoogleLogin: jest.fn(() => ({
    onSuccess: jest.fn(),
    onError: jest.fn(),
  })),
}));

jest.mock('axios');

describe('Login Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('login and logout flow', async () => {
    // Mock the response from Google Login
    const mockUser = { access_token: 'fake-token' };
    useGoogleLogin.mockImplementation(({ onSuccess }) => ({
      onSuccess: () => onSuccess(mockUser),
    }));

    // Mock the response from Google userinfo endpoint
    const mockProfile = { name: 'Test User', email: 'testuser@example.com' };
    axios.get.mockResolvedValue({ data: mockProfile });

    render(<Login />);

    // Click the Sign in with Google button
    fireEvent.click(screen.getByText(/Sign in with Google/i));

    // Wait for the user profile to be loaded and displayed
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith('https://www.googleapis.com/oauth2/v1/userinfo?access_token=fake-token', expect.any(Object));
      expect(screen.getByText(/Profile/i)).toBeInTheDocument();
    });

    // Open the profile menu
    fireEvent.click(screen.getByLabelText(/account of current user/i));
    
    // Click the Logout button
    fireEvent.click(screen.getByText(/Logout/i));

    // Wait for the logout process to complete
    await waitFor(() => {
      expect(googleLogout).toHaveBeenCalled();
      expect(screen.queryByText(/Profile/i)).not.toBeInTheDocument();
    });
  });
});
