import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import Workouts from '../Workouts';


jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => jest.fn(),
  }));
jest.mock('axios');

describe('Workouts Component', () => {
  let onCloseMock;

  beforeEach(() => {
    onCloseMock = jest.fn();
  });

  test('renders the Workouts component correctly', () => {
    render(<Workouts open={true} onClose={onCloseMock} />);

    expect(screen.getByText('Create Workout')).toBeInTheDocument();
    expect(screen.getByLabelText('Workout Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Exercise Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Sets')).toBeInTheDocument();
    expect(screen.getByLabelText('Reps')).toBeInTheDocument();
    expect(screen.getByLabelText('Duration (minutes)')).toBeInTheDocument();
  });

  test('shows error message when mandatory fields are missing', () => {
    render(<Workouts open={true} onClose={onCloseMock} />);

    fireEvent.click(screen.getByText('Add Exercise'));

    expect(screen.getByText('Please enter all mandatory fields')).toBeInTheDocument();
  });

  test('adds an exercise and displays it in the list', () => {
    render(<Workouts open={true} onClose={onCloseMock} />);

    fireEvent.change(screen.getByLabelText('Exercise Name'), { target: { value: 'Push-ups' } });
    fireEvent.change(screen.getByLabelText('Sets'), { target: { value: '3' } });
    fireEvent.change(screen.getByLabelText('Reps'), { target: { value: '10' } });
    fireEvent.change(screen.getByLabelText('Duration (minutes)'), { target: { value: '15' } });

    fireEvent.click(screen.getByText('Add Exercise'));

    expect(screen.getByText('Push-ups - Sets: 3, Reps: 10')).toBeInTheDocument();
  });

  test('submits the form and shows success message', async () => {
    axios.post.mockResolvedValue({ data: { success: true } });

    render(<Workouts open={true} onClose={onCloseMock} />);

    fireEvent.change(screen.getByLabelText('Workout Name'), { target: { value: 'Morning Routine' } });
    fireEvent.change(screen.getByLabelText('Exercise Name'), { target: { value: 'Squats' } });
    fireEvent.change(screen.getByLabelText('Sets'), { target: { value: '4' } });
    fireEvent.change(screen.getByLabelText('Reps'), { target: { value: '15' } });
    fireEvent.change(screen.getByLabelText('Duration (minutes)'), { target: { value: '20' } });

    fireEvent.click(screen.getByText('Add Exercise'));
    fireEvent.click(screen.getByText('Save'));

    await waitFor(() => expect(screen.getByText('Workout saved successfully')).toBeInTheDocument());
    expect(onCloseMock).toHaveBeenCalled();
  });

  test('handles submission errors', async () => {
    axios.post.mockRejectedValue(new Error('Failed to create workout'));

    render(<Workouts open={true} onClose={onCloseMock} />);

    fireEvent.change(screen.getByLabelText('Workout Name'), { target: { value: 'Evening Routine' } });
    fireEvent.change(screen.getByLabelText('Exercise Name'), { target: { value: 'Burpees' } });
    fireEvent.change(screen.getByLabelText('Sets'), { target: { value: '5' } });
    fireEvent.change(screen.getByLabelText('Reps'), { target: { value: '20' } });
    fireEvent.change(screen.getByLabelText('Duration (minutes)'), { target: { value: '25' } });

    fireEvent.click(screen.getByText('Add Exercise'));
    fireEvent.click(screen.getByText('Save'));

    await waitFor(() => expect(screen.getByText('Failed to create workout. Please try again.')).toBeInTheDocument());
  });
});
