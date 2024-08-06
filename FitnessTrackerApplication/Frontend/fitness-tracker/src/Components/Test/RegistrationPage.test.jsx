import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RegistrationPage from '../AccountManagement/RegistrationPage';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);

describe('RegistrationPage', () => {
  test('renders RegistrationPage and displays registration form', () => {
    render(
      <MemoryRouter>
        <RegistrationPage userType="trainer" />
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/city/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/state/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/country/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
  });

  test('displays error if fields are missing', () => {
    render(
      <MemoryRouter>
        <RegistrationPage userType="trainer" />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    expect(screen.getByText(/all fields are mandatory/i)).toBeInTheDocument();
  });

  test('displays error if passwords do not match', () => {
    render(
      <MemoryRouter>
        <RegistrationPage userType="trainer" />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'Password1!' } });
    fireEvent.change(screen.getByLabelText(/confirm password/i), { target: { value: 'Password2!' } });

    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument();
  });

  test('displays error if password does not meet criteria', () => {
    render(
      <MemoryRouter>
        <RegistrationPage userType="trainer" />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'pass' } });
    fireEvent.change(screen.getByLabelText(/confirm password/i), { target: { value: 'pass' } });

    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    expect(screen.getByText(/Password must be at least 8 characters long and contain at least one special character, one digit, one lowercase letter, and one uppercase letter./i)).toBeInTheDocument();
  });

  test('displays error if email does not meet criteria', () => {
    render(
      <MemoryRouter>
        <RegistrationPage userType="trainer" />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });

    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    expect(screen.getByText(/email must contain "@gmail.com"/i)).toBeInTheDocument();
  });

  test('displays error if username contains spaces or special characters', () => {
    render(
      <MemoryRouter>
        <RegistrationPage userType="trainer" />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'invalid username' } });

    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    expect(screen.getByText(/username must not contain spaces and special characters/i)).toBeInTheDocument();
  });

  test('submits form successfully for valid data', async () => {
    mock.onPost('http://localhost:8080/trainer/createtrainer').reply(200, { message: 'User created successfully' });

    render(
      <MemoryRouter>
        <RegistrationPage userType="trainer" />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'validUsername' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@gmail.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'Password1!' } });
    fireEvent.change(screen.getByLabelText(/confirm password/i), { target: { value: 'Password1!' } });
    fireEvent.change(screen.getByLabelText(/city/i), { target: { value: 'Test City' } });
    fireEvent.change(screen.getByLabelText(/state/i), { target: { value: 'Test State' } });
    fireEvent.change(screen.getByLabelText(/country/i), { target: { value: 'Test Country' } });

    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    expect(await screen.findByText(/login here/i)).toBeInTheDocument();
  });

  test('displays error on failed submission', async () => {
    mock.onPost('http://localhost:8080/trainer/createtrainer').reply(500);

    render(
      <MemoryRouter>
        <RegistrationPage userType="trainer" />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'validUsername' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@hitachi.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'Password1!' } });
    fireEvent.change(screen.getByLabelText(/confirm password/i), { target: { value: 'Password2!' } });
    fireEvent.change(screen.getByLabelText(/city/i), { target: { value: 'Test City' } });
    fireEvent.change(screen.getByLabelText(/state/i), { target: { value: 'Test State' } });
    fireEvent.change(screen.getByLabelText(/country/i), { target: { value: 'Test Country' } });

    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    expect(await screen.findByText(/failed to create user. please try again./i)).toBeInTheDocument();
  });
});
