import { render, screen } from '@testing-library/react';
import App from '/src/App.jsx';
/* eslint-disable */


describe('start screen tests', () => {
test('test that by default a user is logged out', () => {
    render(<App title="React" />);
    const alert = screen.getByText(/Log in om toegang te krijgen tot alle functionaliteit./i);
    expect(alert).toBeInTheDocument();
});
});