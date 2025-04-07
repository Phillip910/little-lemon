import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import BookingForm from './BookingForm';
import userEvent from '@testing-library/user-event';
import { timeAndDateReducer } from './reducers'; // Assuming the reducer is exported from a file named reducers.js

test('Renders the BookingForm heading', () => {
    render(<BookingForm />);
    const headingElement = screen.getByText("Book a Table");
    expect(headingElement).toBeInTheDocument();
})



test('BookingForm input fields accept text and form submission works', async () => {
    render(<BookingForm />);
    const nameInput = screen.getByLabelText(/name/i); // Assuming there's a label for the name input
    const dateInput = screen.getByLabelText(/date/i); // Assuming there's a label for the date input
    const submitButton = screen.getByRole('button', { name: /submit/i }); // Assuming there's a submit button

    userEvent.type(nameInput, 'John Doe');
    userEvent.type(dateInput, '2023-10-10');
    userEvent.click(submitButton);

    expect(nameInput.value).toBe('John Doe');
    expect(dateInput.value).toBe('2023-10-10');
    // Add further assertions if the form submission triggers specific behavior
});



describe("BookingForm Component - Date and Time Tests", () => {
  test("updates available times when a valid date is selected", () => {
    render(<BookingForm />);
    
    // Select the date input field
    const dateInput = screen.getByLabelText(/date/i);
    fireEvent.change(dateInput, { target: { value: "2025-04-10" } }); // Select a specific date

    // Expect available times to update accordingly
    const timeOptions = screen.getAllByRole("option");
    expect(timeOptions).toHaveLength(4); // "Select a time" + 3 available times
    expect(timeOptions[1]).toHaveTextContent("18:00");
    expect(timeOptions[2]).toHaveTextContent("19:00");
    expect(timeOptions[3]).toHaveTextContent("20:00");
  });

  test("shows default available times for unspecified dates", () => {
    render(<BookingForm />);
    
    // Select the date input field
    const dateInput = screen.getByLabelText(/date/i);
    fireEvent.change(dateInput, { target: { value: "2025-04-11" } }); // Select a different date
    
    // Check that default times appear
    const timeOptions = screen.getAllByRole("option");
    expect(timeOptions).toHaveLength(7); // "Select a time" + 6 default times
    expect(timeOptions[1]).toHaveTextContent("17:00");
    expect(timeOptions[6]).toHaveTextContent("22:00");
  });

  test("prevents form submission without selecting a time", () => {
      const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  
      render(<BookingForm />);
      
      // Fill out other required fields
      fireEvent.change(screen.getByLabelText(/name/i), { target: { value: "John Doe" } });
      fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "john@example.com" } });
      fireEvent.change(screen.getByLabelText(/date/i), { target: { value: "2025-04-10" } });
      
      // Attempt to submit without selecting time
      fireEvent.click(screen.getByRole("button", { name: /book now/i }));
      
      // Assert no form submission
      expect(consoleLogSpy).not.toHaveBeenCalled();
  
      consoleLogSpy.mockRestore();
  });
});