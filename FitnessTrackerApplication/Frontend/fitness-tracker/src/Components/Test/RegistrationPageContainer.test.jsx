
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RegistrationPageContainer from '../AccountManagement/RegistrationPageContainer';
import { MemoryRouter } from 'react-router-dom';

jest.mock('../AccountManagement/RegistrationPage', () => ({ userType }) => <div>{`Registration Page for ${userType}`}</div>);

describe('RegistrationPageContainer', () => {
  test('renders RegistrationPageContainer and displays Trainer registration by default', () => {
    render(
      <MemoryRouter>
        <RegistrationPageContainer />
      </MemoryRouter>
    );

    // Check if the Trainer tab is selected by default
    expect(screen.getByText('Trainers')).toHaveStyle('borderBottom: 3px solid #007BFF');
    expect(screen.getByText('Trainers')).toHaveStyle('fontWeight: bold');
    expect(screen.getByText('Registration Page for trainer')).toBeInTheDocument();
  });

  test('switches to Trainee registration on clicking Trainees tab', () => {
    render(
      <MemoryRouter>
        <RegistrationPageContainer />
      </MemoryRouter>
    );

    // Click on Trainees tab
    fireEvent.click(screen.getByText('Trainees'));

    // Check if the Trainee tab is selected and Trainer tab is not
    expect(screen.getByText('Trainees')).toHaveStyle('borderBottom: 3px solid #007BFF');
    expect(screen.getByText('Trainees')).toHaveStyle('fontWeight: bold');
    expect(screen.getByText('Trainers')).toHaveStyle('borderBottom: 3px solid transparent');
    expect(screen.getByText('Trainers')).toHaveStyle('fontWeight: normal');
    expect(screen.getByText('Registration Page for trainee')).toBeInTheDocument();
  });
});
