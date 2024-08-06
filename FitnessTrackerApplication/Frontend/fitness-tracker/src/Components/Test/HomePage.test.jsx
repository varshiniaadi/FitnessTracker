import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HomePage from '../HomePage';
import { BrowserRouter as Router } from 'react-router-dom';

describe('HomePage', () => {
  test('renders HomePage with background image and buttons', () => {
    render(
      <Router>
        <HomePage />
      </Router>
    );

    // Check if the background image is set
    const container = screen.getByTestId('background-container');
    expect(container).toHaveStyle("background-image: url('https://as1.ftcdn.net/v2/jpg/03/50/81/90/1000_F_350819076_VYSOrEOhrEFYiRLTEX4QPzYWyFKHOKgj.jpg')");

    // Check if the Create Account button is rendered
    const createAccountButton = screen.getByTestId('create-account-button');
    expect(createAccountButton).toBeInTheDocument();
    expect(createAccountButton).toHaveClass('btn-warning');

    // Check if the Log In button is rendered
    const logInButton = screen.getByTestId('login-button');
    expect(logInButton).toBeInTheDocument();
    expect(logInButton).toHaveClass('btn-light');
  });

  test('Create Account button navigates to /register', () => {
    render(
      <Router>
        <HomePage />
      </Router>
    );

    // Check if Create Account button has correct link
    const createAccountButton = screen.getByTestId('create-account-button');
    expect(createAccountButton.closest('a')).toHaveAttribute('href', '/register');
  });

  test('Log In button navigates to /login', () => {
    render(
      <Router>
        <HomePage />
      </Router>
    );

    // Check if Log In button has correct link
    const logInButton = screen.getByTestId('login-button');
    expect(logInButton.closest('a')).toHaveAttribute('href', '/login');
  });
});
