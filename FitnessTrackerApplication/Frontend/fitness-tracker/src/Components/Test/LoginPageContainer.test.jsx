import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RegistrationPageContainer from '../AccountManagement/RegistrationPageContainer';
import LoginPage from '../AccountManagement/LoginPage';

// Mock the LoginPage component
jest.mock('../AccountManagement/LoginPage', () => jest.fn(() => <div>Login Page</div>));

describe('RegistrationPageContainer', () => {
  test('renders the component with default userType as trainer', () => {
    render(<RegistrationPageContainer />);

    // Check if the 'Trainers' tab is bold and has the underline
    const trainerTab = screen.getByText('Trainers');
    expect(trainerTab).toHaveStyle('fontWeight: bold');
    expect(trainerTab).toHaveStyle('borderBottom: 3px solid #007BFF');

    // Check if the 'Trainees' tab is not bold and does not have the underline
    const traineeTab = screen.getByText('Trainees');
    expect(traineeTab).toHaveStyle('fontWeight: normal');
    expect(traineeTab).toHaveStyle('borderBottom: 3px solid transparent');

    // Check if the LoginPage component is rendered with userType="trainer"
    expect(LoginPage).toHaveBeenCalledWith({ userType: 'trainer' }, {});
  });

  test('switches to trainee tab when clicked', () => {
    render(<RegistrationPageContainer />);

    // Click on the 'Trainees' tab
    fireEvent.click(screen.getByText('Trainees'));

    // Check if the 'Trainees' tab is now bold and has the underline
    const traineeTab = screen.getByText('Trainees');
    expect(traineeTab).toHaveStyle('fontWeight: bold');
    expect(traineeTab).toHaveStyle('borderBottom: 3px solid #007BFF');

    // Check if the 'Trainers' tab is not bold and does not have the underline
    const trainerTab = screen.getByText('Trainers');
    expect(trainerTab).toHaveStyle('fontWeight: normal');
    expect(trainerTab).toHaveStyle('borderBottom: 3px solid transparent');

    // Check if the LoginPage component is rendered with userType="trainee"
    expect(LoginPage).toHaveBeenCalledWith({ userType: 'trainee' }, {});
  });

  test('switches back to trainer tab when clicked', () => {
    render(<RegistrationPageContainer />);

    // Click on the 'Trainees' tab
    fireEvent.click(screen.getByText('Trainees'));

    // Click on the 'Trainers' tab
    fireEvent.click(screen.getByText('Trainers'));

    // Check if the 'Trainers' tab is now bold and has the underline
    const trainerTab = screen.getByText('Trainers');
    expect(trainerTab).toHaveStyle('fontWeight: bold');
    expect(trainerTab).toHaveStyle('borderBottom: 3px solid #007BFF');

    // Check if the 'Trainees' tab is not bold and does not have the underline
    const traineeTab = screen.getByText('Trainees');
    expect(traineeTab).toHaveStyle('fontWeight: normal');
    expect(traineeTab).toHaveStyle('borderBottom: 3px solid transparent');

    // Check if the LoginPage component is rendered with userType="trainer"
    expect(LoginPage).toHaveBeenCalledWith({ userType: 'trainer' }, {});
  });
});
