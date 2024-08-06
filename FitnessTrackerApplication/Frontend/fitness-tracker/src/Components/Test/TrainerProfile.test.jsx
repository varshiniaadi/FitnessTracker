import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import TrainerProfile from '../TrainerProfile';

jest.mock('axios');
const mockedAxios = axios;

describe('TrainerProfile', () => {
  const mockTrainer = {
    username: 'JohnDoe',
    email: 'john.doe@example.com',
    city: 'New York',
    state: 'NY',
    country: 'USA',
  };

  beforeEach(() => {
    mockedAxios.get.mockImplementation((url) => {
      if (url === `http://localhost:8080/trainer/1`) {
        return Promise.resolve({ data: mockTrainer });
      }
      return Promise.reject(new Error('Not Found'));
    });
  });

  test('renders the TrainerProfile component and displays loading text', async () => {
    render(<TrainerProfile trainerId={1} />);

    // Check if loading text is visible
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();

    // Wait for trainer data to be fetched and displayed
    await waitFor(() => {
      expect(screen.queryByText(/Loading.../i)).not.toBeInTheDocument();
    });

    // Check if trainer details are displayed
    expect(screen.getByText(/username:/i)).toHaveTextContent('JohnDoe');
    expect(screen.getByText(/email:/i)).toHaveTextContent('john.doe@example.com');
    expect(screen.getByText(/city:/i)).toHaveTextContent('New York');
    expect(screen.getByText(/state:/i)).toHaveTextContent('NY');
    expect(screen.getByText(/country:/i)).toHaveTextContent('USA');
  });

  test('handles error when fetching trainer data', async () => {
    // Set up the mock to return an error
    mockedAxios.get.mockImplementation(() => Promise.reject(new Error('Failed to fetch')));

    render(<TrainerProfile trainerId={1} />);

    // Check if loading text is visible
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();

    // Wait for the error to be handled
    await waitFor(() => {
      expect(screen.queryByText(/Loading.../i)).not.toBeInTheDocument();
    });
  });
});
