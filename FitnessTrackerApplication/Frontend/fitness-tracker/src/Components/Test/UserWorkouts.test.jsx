import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import UserWorkouts from '../UserWorkouts';
import '@testing-library/jest-dom';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => jest.fn(),
  }));

jest.mock('axios');

describe('UserWorkouts Component', () => {

  it('renders UserWorkouts and fetches data', async () => {

    const mockResponse = {
      data: [
        {
          id: 1,
          workout: {
            id: 101,
            name: 'Push-ups',
            exercises: [
              { id: 201, name: 'Push-ups', sets: 3, reps: 15, duration: 10 }
            ]
          },
          assignedDate: '2024-07-10',
          completedDate: null
        }
      ]
    };
    axios.get.mockResolvedValueOnce(mockResponse);

    render(
      <Router>
        <UserWorkouts userId={10} userType="trainee" />
      </Router>
    );

    // Check if the component renders correctly
    expect(screen.getByText('Trainee Workouts')).toBeInTheDocument();
    
    // Wait for API data to load and check if data is displayed
    await waitFor(() => {
      expect(screen.getByText('Push-ups')).toBeInTheDocument();
    });
  });

  // Test date selection
  it('filters workouts based on selected date', async () => {
    const mockResponse = {
      data: [
        {
          id: 1,
          workout: {
            id: 101,
            name: 'Push-ups',
            exercises: [
              { id: 201, name: 'Push-ups', sets: 3, reps: 15, duration: 10 }
            ]
          },
          assignedDate: '2024-07-10',
          completedDate: null
        }
      ]
    };
    axios.get.mockResolvedValueOnce(mockResponse);

    render(
      <Router>
        <UserWorkouts userId={10} userType="trainee" />
      </Router>
    );

    // Simulate date selection
    fireEvent.change(screen.getByLabelText('Select Date'), { target: { value: '2024-07-10' } });

    // Wait for the component to re-render
    await waitFor(() => {
      expect(screen.getByText('Push-ups')).toBeInTheDocument();
    });
  });

  // Test completion of a workout
  it('handles workout completion', async () => {
    const mockResponse = {
      data: [
        {
          id: 1,
          workout: {
            id: 101,
            name: 'Push-ups',
            exercises: [
              { id: 201, name: 'Push-ups', sets: 3, reps: 15, duration: 10 }
            ]
          },
          assignedDate: '2024-07-10',
          completedDate: null
        }
      ]
    };

    axios.get.mockResolvedValueOnce(mockResponse);
    axios.post.mockResolvedValueOnce({});

    render(
      <Router>
        <UserWorkouts userId={1} userType="trainee" />
      </Router>
    );

    // Wait for the data to load
    await waitFor(() => {
      expect(screen.getByText('Push-ups')).toBeInTheDocument();
    });

    // Click the "Complete Workout" button
    fireEvent.click(screen.getByText('Complete Workout'));

    // Wait for snackbar message
    await waitFor(() => {
      expect(screen.getByText('Workout completed successfully')).toBeInTheDocument();
    });
  });

  // Test back button
  it('calls onBack function when Back to List button is clicked', () => {
    const onBack = jest.fn();
    render(
      <Router>
        <UserWorkouts userId={1} userType="trainer" onBack={onBack} />
      </Router>
    );

    fireEvent.click(screen.getByText('Back to List'));
    expect(onBack).toHaveBeenCalled();
  });
});
