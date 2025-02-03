import React from 'react';
import { render, screen } from '@testing-library/react';
import AddNewRest from './addNewRest';

test('renders add new restaurant component', () => {
    render(<AddNewRest />);
    const linkElement = screen.getByText(/add new restaurant/i);
    expect(linkElement).toBeInTheDocument();
});