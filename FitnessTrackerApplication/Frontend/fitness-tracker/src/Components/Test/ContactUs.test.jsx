import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ContactUs from '../ContactUs';

describe('ContactUs', () => {
  test('renders contact information', () => {
    render(<ContactUs />);

    expect(screen.getByText('Contact Us')).toBeInTheDocument();

    expect(screen.getByText('Curefit HQ Office')).toBeInTheDocument();
    expect(screen.getByText('#17/17C BDA 3rd Sector,')).toBeInTheDocument();
    expect(screen.getByText('HSR Layout,')).toBeInTheDocument();
    expect(screen.getByText('Bengaluru,')).toBeInTheDocument();
    expect(screen.getByText('Karnataka,')).toBeInTheDocument();
    expect(screen.getByText('560102')).toBeInTheDocument();

    const generalEmailLink = screen.getByText('hello@cult.fit');
    expect(generalEmailLink).toBeInTheDocument();
    expect(generalEmailLink.closest('a')).toHaveAttribute('href', 'mailto:hello@cult.fit');

    const partnerEmailLink = screen.getByText('partner.support@cult.fit');
    expect(partnerEmailLink).toBeInTheDocument();
    expect(partnerEmailLink.closest('a')).toHaveAttribute('href', 'mailto:partner.support@cult.fit');
  });
});
