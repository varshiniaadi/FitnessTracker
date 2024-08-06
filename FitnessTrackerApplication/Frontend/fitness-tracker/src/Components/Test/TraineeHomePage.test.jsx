import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import TraineeHomePage from '../TraineeHomePage';


const mockUseParams = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => mockUseParams(),
}));

const renderWithRouter = (ui, { route = '/traineehome/10' } = {}) => {
  window.history.pushState({}, 'Test page', route);
  return render(ui, { wrapper: MemoryRouter });
};

describe('TraineeHomePage', () => {
  beforeEach(() => {
    mockUseParams.mockReturnValue({ traineeId: '10' });
  });

  it('renders without crashing', () => {
    renderWithRouter(<TraineeHomePage />);
    expect(screen.getByText(/FITNESS TRACKER/i)).toBeInTheDocument();
  });

  it('displays the correct initial image', () => {
    renderWithRouter(<TraineeHomePage />);
    expect(screen.getByAltText('trainerhomepage')).toBeInTheDocument();
  });

  it('opens and closes the profile modal', async () => {
    renderWithRouter(<TraineeHomePage />);
    const profileButton = screen.getByRole('button', { name: /AccountCircle/i });
    fireEvent.click(profileButton);

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    const closeButton = screen.getByLabelText(/Close/i);
    fireEvent.click(closeButton);

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  it('navigates to Display Workouts', () => {
    renderWithRouter(<TraineeHomePage />);
    const displayWorkoutsButton = screen.getByText(/Display Workouts/i);
    fireEvent.click(displayWorkoutsButton);

    expect(screen.getByText(/Display Workouts Component/i)).toBeInTheDocument();
  });

  it('navigates to Assigned Workouts', () => {
    renderWithRouter(<TraineeHomePage />);
    const assignedWorkoutsButton = screen.getByText(/Assigned Workouts/i);
    fireEvent.click(assignedWorkoutsButton);

    expect(screen.getByText(/User Workouts Component/i)).toBeInTheDocument();
  });

  it('navigates to Contact Us', () => {
    renderWithRouter(<TraineeHomePage />);
    const contactUsButton = screen.getByText(/Contact Us/i);
    fireEvent.click(contactUsButton);

    expect(screen.getByText(/Contact Us Component/i)).toBeInTheDocument();
  });

  it('navigates to Group Invitation', () => {
    renderWithRouter(<TraineeHomePage />);
    const invitationButton = screen.getByText(/Invitation/i);
    fireEvent.click(invitationButton);

    expect(screen.getByText(/Group Invitation Component/i)).toBeInTheDocument();
  });

  it('logs out and redirects to home', () => {
    renderWithRouter(<TraineeHomePage />);
    const logoutButton = screen.getByText(/Logout/i);
    fireEvent.click(logoutButton);

    expect(window.location.pathname).toBe('/');
  });
});
