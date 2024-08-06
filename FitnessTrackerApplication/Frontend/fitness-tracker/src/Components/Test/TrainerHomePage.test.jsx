import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import TrainerHomePage from '../TrainerHomePage';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

// Mock components and modules
jest.mock('../Workouts', () => () => <div>Workouts Component</div>);
jest.mock('../DisplayWorkouts', () => () => <div>Display Workouts Component</div>);
jest.mock('../DisplayTrainees', () => () => <div>Display Trainees Component</div>);
jest.mock('../TrainerProfile', () => () => <div>Trainer Profile Component</div>);
jest.mock('../Invite', () => () => <div>Invite Component</div>);
jest.mock('../ContactUs', () => () => <div>Contact Us Component</div>);

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#333',
    },
  },
});

describe('TrainerHomePage', () => {
  test('renders TrainerHomePage and displays the home image initially', () => {
    render(
      <MemoryRouter>
        <ThemeProvider theme={darkTheme}>
          <TrainerHomePage />
        </ThemeProvider>
      </MemoryRouter>
    );

    // Check if the home image is rendered
    const homeImage = screen.getByAltText('trainerhomepage');
    expect(homeImage).toBeInTheDocument();
  });

  test('opens Workouts modal on clicking Create Workout', async () => {
    render(
      <MemoryRouter>
        <ThemeProvider theme={darkTheme}>
          <TrainerHomePage />
        </ThemeProvider>
      </MemoryRouter>
    );

    // Click on Create Workout button
    fireEvent.click(screen.getByText('Create Workout'));

    // Check if Workouts component is displayed
    await waitFor(() => {
      expect(screen.getByText('Workouts Component')).toBeInTheDocument();
    });
  });

  test('opens Display Workouts component on clicking Display Workouts', async () => {
    render(
      <MemoryRouter>
        <ThemeProvider theme={darkTheme}>
          <TrainerHomePage />
        </ThemeProvider>
      </MemoryRouter>
    );

    // Click on Display Workouts button
    fireEvent.click(screen.getByText('Display Workouts'));

    // Check if Display Workouts component is displayed
    await waitFor(() => {
      expect(screen.getByText('Display Workouts Component')).toBeInTheDocument();
    });
  });

  test('opens Display Trainees component on clicking Display Trainees', async () => {
    render(
      <MemoryRouter>
        <ThemeProvider theme={darkTheme}>
          <TrainerHomePage />
        </ThemeProvider>
      </MemoryRouter>
    );

    // Click on Display Trainees button
    fireEvent.click(screen.getByText('Display Trainees'));

    // Check if Display Trainees component is displayed
    await waitFor(() => {
      expect(screen.getByText('Display Trainees Component')).toBeInTheDocument();
    });
  });

  test('opens Invite component on clicking Send an Invite', async () => {
    render(
      <MemoryRouter>
        <ThemeProvider theme={darkTheme}>
          <TrainerHomePage />
        </ThemeProvider>
      </MemoryRouter>
    );

    // Click on Send an Invite button
    fireEvent.click(screen.getByText('Send an Invite'));

    // Check if Invite component is displayed
    await waitFor(() => {
      expect(screen.getByText('Invite Component')).toBeInTheDocument();
    });
  });

  test('opens Contact Us component on clicking Contact Us', async () => {
    render(
      <MemoryRouter>
        <ThemeProvider theme={darkTheme}>
          <TrainerHomePage />
        </ThemeProvider>
      </MemoryRouter>
    );

    // Click on Contact Us button
    fireEvent.click(screen.getByText('Contact Us'));

    // Check if Contact Us component is displayed
    await waitFor(() => {
      expect(screen.getByText('Contact Us Component')).toBeInTheDocument();
    });
  });

  test('opens Profile modal on clicking Profile from user menu', async () => {
    render(
      <MemoryRouter>
        <ThemeProvider theme={darkTheme}>
          <TrainerHomePage />
        </ThemeProvider>
      </MemoryRouter>
    );

    // Open user menu
    fireEvent.click(screen.getByLabelText('account of current user'));

    // Click on Profile menu item
    fireEvent.click(screen.getByText('Profile'));

    // Check if Profile modal is displayed
    await waitFor(() => {
      expect(screen.getByText('Trainer Profile Component')).toBeInTheDocument();
    });
  });

  test('logs out on clicking Logout from user menu', () => {
    render(
      <MemoryRouter>
        <ThemeProvider theme={darkTheme}>
          <TrainerHomePage />
        </ThemeProvider>
      </MemoryRouter>
    );

    // Open user menu
    fireEvent.click(screen.getByLabelText('account of current user'));

    // Click on Logout menu item
    fireEvent.click(screen.getByText('Logout'));

    // Check if navigated to home page
    expect(screen.queryByText('Trainer Home Page')).not.toBeInTheDocument();
  });
});
