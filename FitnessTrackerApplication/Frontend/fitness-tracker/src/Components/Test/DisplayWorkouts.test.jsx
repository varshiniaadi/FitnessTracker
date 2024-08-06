import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import DisplayWorkouts from '../DisplayWorkouts';


jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => jest.fn(),
  }));
  

// Create a mock adapter for axios
const mock = new MockAdapter(axios);

// Mock data
const mockWorkouts = [
  {
    id: 1,
    name: 'Workout 1',
    exercises: [
      { id: 1, name: 'Exercise 1', sets: 3, reps: 10, duration: 30 },
      { id: 2, name: 'Exercise 2', sets: 3, reps: 15, duration: 20 },
    ],
  },
  {
    id: 2,
    name: 'Workout 2',
    exercises: [
      { id: 3, name: 'Exercise 3', sets: 4, reps: 12, duration: 25 },
    ],
  },
];

beforeEach(() => {
  mock.onGet('http://localhost:8080/workouts/all').reply(200, mockWorkouts);
});

afterEach(() => {
  mock.reset();
});

test('renders workout names', async () => {
  render(<DisplayWorkouts userType="trainer"/>);
  
  // Wait for the workouts to be fetched and displayed
  await waitFor(() => {
    mockWorkouts.forEach(workout => {
      expect(screen.getByText(workout.name)).toBeInTheDocument();
    });
  });
});

test('enters edit mode and displays workout details', async () => {
  render(<DisplayWorkouts userType="trainer"/>);
  
  // Wait for the workouts to be fetched and displayed
  await waitFor(() => {
    mockWorkouts.forEach(workout => {
      expect(screen.getByText(workout.name)).toBeInTheDocument();
    });
  });

  // Enter edit mode for the first workout
  const editButton = screen.getAllByText('Edit')[0];
  fireEvent.click(editButton);
  
  // Check that the workout details are displayed in edit mode
  await waitFor(() => {
    expect(screen.getAllByText('Name:')).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockWorkouts[0].name)).toBeInTheDocument();
    mockWorkouts[0].exercises.forEach(exercise => {
      expect(screen.getByDisplayValue(exercise.name)).toBeInTheDocument();
      expect(screen.getByDisplayValue(String(exercise.sets))).toBeInTheDocument();
      expect(screen.getByDisplayValue(String(exercise.reps))).toBeInTheDocument();
      expect(screen.getByDisplayValue(String(exercise.duration))).toBeInTheDocument();
    });
  });
});

test('saves edited workout details', async () => {
    render(<DisplayWorkouts userType="trainer"/>);  
    // Enter edit mode for the first workout
    const editButton = screen.getByText('Edit')[0];
    fireEvent.click(editButton);
    // Change the name of the workout
    const nameInput = screen.getByText('textbox', { name: 'name' });
    fireEvent.change(nameInput, { target: { value: 'Updated Workout 1' } });
    // Save the changes
    const saveButton = screen.getByText('Save');
    fireEvent.click(saveButton);
    // Check that the changes are saved and displayed
    await waitFor(() => {
      expect(screen.getByText('Updated Workout 1')).toBeInTheDocument();
    });
  });