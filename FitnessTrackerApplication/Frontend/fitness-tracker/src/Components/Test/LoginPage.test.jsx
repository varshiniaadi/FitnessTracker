import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';

jest.mock('axios');

const renderLoginPage = (userType) => {
  return render(
    <Router>
      <LoginPage userType={userType} />
    </Router>
  );
};

describe('LoginPage', () => {
  it('renders login form correctly', () => {
    renderLoginPage('trainee');

    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
    expect(screen.getByText(/Don't have an account\? Register here/i)).toBeInTheDocument();
  });

  it('handles email and password input changes', () => {
    renderLoginPage('trainee');

    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('password123');
  });

  it('submits login form and navigates to trainee home page', async () => {
    axios.post.mockResolvedValueOnce({ data: { id: 1 } });

    renderLoginPage('trainee');

    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const loginButton = screen.getByRole('button', { name: /Login/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(loginButton);

    await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(screen.getByText(/Login successful/i)).toBeInTheDocument());

    expect(axios.post).toHaveBeenCalledWith('http://localhost:8080/trainee/loginuser', {
      email: 'test@example.com',
      password: 'password123',
    });
  });

  it('submits login form and navigates to trainer home page', async () => {
    axios.post.mockResolvedValueOnce({ data: { id: 1 } });

    renderLoginPage('trainer');

    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const loginButton = screen.getByRole('button', { name: /Login/i });

    fireEvent.change(emailInput, { target: { value: 'trainer@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(loginButton);

    await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(screen.getByText(/Login successful/i)).toBeInTheDocument());

    expect(axios.post).toHaveBeenCalledWith('http://localhost:8080/trainer/logintrainer', {
      email: 'trainer@example.com',
      password: 'password123',
    });
  });

  it('shows error message on login failure', async () => {
    axios.post.mockRejectedValueOnce(new Error('Login failed'));

    renderLoginPage('trainee');

    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const loginButton = screen.getByRole('button', { name: /Login/i });

    fireEvent.change(emailInput, { target: { value: 'invalid@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
    fireEvent.click(loginButton);

    await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(screen.getByText(/Invalid email or password. Please try again./i)).toBeInTheDocument());
  });
});
