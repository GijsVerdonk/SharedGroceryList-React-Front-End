import { render, screen, fireEvent } from '@testing-library/react';
import AddListItemForm from '/src/components/AddListItemForm.jsx';
/* eslint-disable */

describe('unit tests', () => {

    test('test render input field', () => {
        render(<AddListItemForm />);
        const inputElement = screen.getByPlaceholderText(/Naam/i);
        expect(inputElement).toBeInTheDocument();
    });

    test('test typing into input', () => {
        render(<AddListItemForm />);
        const inputElement = screen.getByPlaceholderText(/Naam/i);
        fireEvent.change(inputElement, { target: { value: "Henk Janssen" } })

        expect(inputElement.value).toBe("Henk Janssen");
    });

});