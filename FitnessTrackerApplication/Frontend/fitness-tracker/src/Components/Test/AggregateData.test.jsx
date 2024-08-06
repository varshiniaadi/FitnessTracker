import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AggregateData from '../AggregateData';
import axios from 'axios';



jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => jest.fn(),
  }));

jest.mock('axios');

const mockData = {
  data: {
    bucket: [
      {
        startTimeMillis: '1675248000000',
        dataset: [
          {
            dataSourceId: 'derived:com.google.step_count.delta:com.google.android.gms:aggregated',
            point: [{ value: [{ intVal: 1000 }] }],
          },
          {
            dataSourceId: 'derived:com.google.blood_glucose.summary:com.google.android.gms:aggregated',
            point: [{ value: [{ fpVal: 120 }] }],
          },
        ],
      },
    ],
  },
};

describe('AggregateData Component', () => {
  beforeEach(() => {
    axios.post.mockResolvedValue(mockData);
  });

  test('renders the DatePicker and data section', async () => {
    render(<AggregateData />);

    // Check if DatePicker is rendered
    expect(screen.getByRole('textbox')).toBeInTheDocument();

    // Wait for data to be fetched and displayed
    await waitFor(() => {
      expect(screen.getByText(/Step Count/i)).toBeInTheDocument();
      expect(screen.getByText(/Glucose Level/i)).toBeInTheDocument();
    });
  });

  test('handles date change and data display', async () => {
    render(<AggregateData />);

    // Change the date in DatePicker
    const datePicker = screen.getByRole('textbox');
    fireEvent.change(datePicker, { target: { value: '2024-01-01' } });

    // Wait for data to be refetched and displayed
    await waitFor(() => {
      expect(screen.getByText(/No data available for the selected date/i)).toBeInTheDocument();
    });
  });

  test('displays message when no data is available', async () => {
    axios.post.mockResolvedValue({ data: { bucket: [] } });
    
    render(<AggregateData />);

    // Wait for data to be fetched and check message
    await waitFor(() => {
      expect(screen.getByText(/No data available for the selected date/i)).toBeInTheDocument();
    });
  });

  test('displays data for the selected date', async () => {
    render(<AggregateData />);

    // Check if the component fetches and displays data
    await waitFor(() => {
      expect(screen.getByText(/Step Count/i)).toHaveTextContent('1000');
      expect(screen.getByText(/Glucose Level/i)).toHaveTextContent('120');
    });
  });
});
