
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import DisplayTrainees from '../DisplayTrainees';
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => jest.fn(),
  }));

jest.mock('axios');
const mockedAxios = axios;

describe('DisplayTrainees', () => {
  const mockUsers = [
    { id: 1, username: 'John Doe', city: 'New York', state: 'NY', country: 'USA', groupType: 'morning' },
    { id: 2, username: 'Jane Smith', city: 'Los Angeles', state: 'CA', country: 'USA', groupType: 'evening' }
  ];

  const mockCities = ['New York', 'Los Angeles'];
  const mockStates = ['NY', 'CA'];
  const mockCountries = ['USA'];

  beforeEach(() => {

    mockedAxios.get.mockImplementation((url) => {
      if (url === 'http://localhost:8080/trainee/users') {
        return Promise.resolve({ data: mockUsers });
      }
      if (url === 'http://localhost:8080/userworkouts/allCities') {
        return Promise.resolve({ data: mockCities });
      }
      if (url === 'http://localhost:8080/userworkouts/allStates') {
        return Promise.resolve({ data: mockStates });
      }
      if (url === 'http://localhost:8080/userworkouts/allCountries') {
        return Promise.resolve({ data: mockCountries });
      }
      return Promise.reject(new Error('Not Found'));
    });
  });

  test('renders the DisplayTrainees component', async () => {
    render(
      <Router>
        <DisplayTrainees />
      </Router>
    );

    // Check if loading state is visible
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();

    // Wait for users data to be fetched and displayed
    await waitFor(() => {
      expect(screen.queryByText(/Loading.../i)).not.toBeInTheDocument();
    });

    // Check if users are displayed in the table
    expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
    expect(screen.getByText(/Jane Smith/i)).toBeInTheDocument();
  });

  test('filters users by city', async () => {
    render(
      <Router>
        <DisplayTrainees />
      </Router>
    );

    await waitFor(() => screen.getByText(/John Doe/i));

    // Select filter by city
    fireEvent.change(screen.getByLabelText(/Filter by City/i), { target: { value: 'Los Angeles' } });

    // Check if the user table is updated based on the selected city
    await waitFor(() => {
      expect(screen.queryByText(/John Doe/i)).not.toBeInTheDocument();
      expect(screen.getByText(/Jane Smith/i)).toBeInTheDocument();
    });
  });

  test('filters users by group type', async () => {
    render(
      <Router>
        <DisplayTrainees/>
      </Router>
    );

    await waitFor(() => screen.getByText(/John Doe/i));

    // Select filter by group type
    fireEvent.change(screen.getByLabelText(/Filter by Group Type/i), { target: { value: 'morning' } });

    // Check if the user table is updated based on the selected group type
    await waitFor(() => {
      expect(screen.queryByText(/Jane Smith/i)).not.toBeInTheDocument();
      expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
    });
  });

  test('shows user details when TRACK PROGRESS button is clicked', async () => {
    render(
      <Router>
        <DisplayTrainees />
      </Router>
    );

    await waitFor(() => screen.getByText(/John Doe/i));

    // Click on TRACK PROGRESS button
    fireEvent.click(screen.getByText(/TRACK PROGRESS/i));
  });
});
