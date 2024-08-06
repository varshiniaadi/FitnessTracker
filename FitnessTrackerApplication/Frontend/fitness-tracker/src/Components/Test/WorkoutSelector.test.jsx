import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import WorkoutSelector from '../WorkoutSelector';


const mockWorkouts = [
  { id: 1, name: 'Workout 1' },
  { id: 2, name: 'Workout 2' },
  { id: 3, name: 'Workout 3' },
];

const mockFetch = jest.fn();


global.fetch = mockFetch;

describe('WorkoutSelector', () => {
  const userId = 10;
  const onWorkoutsAssigned = jest.fn();

  beforeEach(() => {
    mockFetch.mockImplementation((url) => {
      if (url === 'http://localhost:8080/workouts/all') {
        return Promise.resolve({
          json: () => Promise.resolve(mockWorkouts),
        });
      }
      if (url.startsWith('http://localhost:8080/userworkouts/assignworkout')) {
        return Promise.resolve({
          ok: true,
        });
      }
      return Promise.reject('Not Found');
    });
  });

  it('renders and fetches workouts', async () => {
    render(<WorkoutSelector userId={userId} onWorkoutsAssigned={onWorkoutsAssigned} />);
    
    // Ensure the dropdown is open
    fireEvent.mouseDown(screen.getByRole('button'));
    
    // Wait for workouts to be displayed in the dropdown
    await waitFor(() => {
      expect(screen.getByText('Workout 1')).toBeInTheDocument();
      expect(screen.getByText('Workout 2')).toBeInTheDocument();
      expect(screen.getByText('Workout 3')).toBeInTheDocument();
    });
  });

  it('selects and assigns workouts', async () => {
    render(<WorkoutSelector userId={userId} onWorkoutsAssigned={onWorkoutsAssigned} />);
    
    // Open the dropdown
    fireEvent.mouseDown(screen.getByRole('button'));
    
    // Select a workout
    fireEvent.click(screen.getByText('Workout 1'));
    fireEvent.click(screen.getByText('Workout 2'));

    // Click the Done button
    fireEvent.click(screen.getByText('Done'));

    // Wait for the Snackbar message
    await waitFor(() => {
      expect(screen.getByText('Workout assigned successfully!')).toBeInTheDocument();
    });
    
    // Check if the fetch API was called with the correct URL
    expect(mockFetch).toHaveBeenCalledWith('http://localhost:8080/userworkouts/assignworkout/1/123', { method: 'POST' });
    expect(mockFetch).toHaveBeenCalledWith('http://localhost:8080/userworkouts/assignworkout/2/123', { method: 'POST' });
    
    // Check if onWorkoutsAssigned callback was called
    expect(onWorkoutsAssigned).toHaveBeenCalled();
  });

  it('cancels workout selection', async () => {
    render(<WorkoutSelector userId={userId} onWorkoutsAssigned={onWorkoutsAssigned} />);
    
    // Open the dropdown
    fireEvent.mouseDown(screen.getByRole('button'));
    
    // Select a workout
    fireEvent.click(screen.getByText('Workout 1'));
    
    // Click the Cancel button
    fireEvent.click(screen.getByText('Cancel'));

    // Ensure no workouts are selected
    await waitFor(() => {
      expect(screen.queryByText('Workout 1')).not.toBeInTheDocument();
    });
  });

  it('handles API errors gracefully', async () => {
    mockFetch.mockImplementationOnce(() => Promise.reject('Network error'));

    render(<WorkoutSelector userId={userId} onWorkoutsAssigned={onWorkoutsAssigned} />);
    
    // Open the dropdown
    fireEvent.mouseDown(screen.getByRole('button'));
    
    // Select a workout
    fireEvent.click(screen.getByText('Workout 1'));
    
    // Click the Done button
    fireEvent.click(screen.getByText('Done'));

    // Ensure an error message is shown
    await waitFor(() => {
      expect(screen.queryByText('Failed to assign workout')).toBeInTheDocument();
    });
  });
});
