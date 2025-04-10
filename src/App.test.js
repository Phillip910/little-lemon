import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import BookingForm from './BookingForm';
import userEvent from '@testing-library/user-event';
import { timeAndDateReducer } from './reducers'; // Assuming the reducer is exported from a file named reducers.js
import { fetchAPI, submitAPI } from './API'; // Assuming these functions are defined in API.js
jest.mock('./API'); // Mock the API module

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
      render(<BookingForm />);
      
      // Fill out other required fields
      fireEvent.change(screen.getByLabelText(/name/i), { target: { value: "John Doe" } });
      fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "john@example.com" } });
      fireEvent.change(screen.getByLabelText(/date/i), { target: { value: "2025-04-10" } });
      
      // Attempt to submit without selecting time
      fireEvent.click(screen.getByRole("button", { name: /book now/i }));
      
      // Assert validation message is displayed
      expect(screen.getByText(/please select a time/i)).toBeInTheDocument();
  });
});

describe('fetchAPI Integration', () => {
    test('fetchAPI is called with the correct date and updates available times', async function () {
            const mockTimes = ['18:00', '19:00', '20:00'];
            fetchAPI.mockReturnValue(mockTimes); // Mock the return value of fetchAPI

            render(<BookingForm />);

            const dateInput = screen.getByLabelText(/date/i);
            fireEvent.change(dateInput, { target: { value: '2025-04-10' } });

            expect(fetchAPI).toHaveBeenCalledWith(new Date('2025-04-10'));

            const timeOptions = await screen.findAllByRole('option'); // Use findAllByRole to wait for async updates
            expect(timeOptions).toHaveLength(4); // "Select a time" + 3 available times
            expect(timeOptions[1]).toHaveTextContent('18:00');
            expect(timeOptions[2]).toHaveTextContent('19:00');
            expect(timeOptions[3]).toHaveTextContent('20:00');
        });
});

describe('BookingForm - Updating Times', () => {
    test('updates available times when a date is selected', async () => {
        const mockTimes = ['12:00', '13:00', '14:00'];
        fetchAPI.mockReturnValueOnce(mockTimes); // Ensure the mock is used only once for this test

        render(<BookingForm />);

        const dateInput = screen.getByLabelText(/date/i);
        fireEvent.change(dateInput, { target: { value: '2025-04-10' } });

        expect(fetchAPI).toHaveBeenCalledWith(new Date('2025-04-10'));

        const timeOptions = await screen.findAllByRole('option'); // Await DOM updates
        expect(timeOptions).toHaveLength(4); // "Select a time" + 3 available times
        expect(timeOptions[1]).toHaveTextContent('12:00');
        expect(timeOptions[2]).toHaveTextContent('13:00');
        expect(timeOptions[3]).toHaveTextContent('14:00');
    });
});

describe('BookingForm Component', () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Clear mocks before each test
    });

    test('updates available times when a date is selected', () => {
        const mockTimes = ['12:00', '13:00', '14:00'];
        fetchAPI.mockReturnValue(mockTimes); // Mock the return value of fetchAPI

        render(<BookingForm />);

        const dateInput = screen.getByLabelText(/date/i);
        fireEvent.change(dateInput, { target: { value: '2025-04-10' } });

        expect(fetchAPI).toHaveBeenCalledWith(new Date('2025-04-10'));

        const timeOptions = screen.getAllByRole('option');
        expect(timeOptions).toHaveLength(4); // "Select a time" + 3 available times
        expect(timeOptions[1]).toHaveTextContent('12:00');
        expect(timeOptions[2]).toHaveTextContent('13:00');
        expect(timeOptions[3]).toHaveTextContent('14:00');
    });

    test('submits the form successfully', () => {
        submitAPI.mockReturnValue(true); // Mock successful form submission

        render(<BookingForm />);

        fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'John Doe' } });
        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'john@example.com' } });
        fireEvent.change(screen.getByLabelText(/date/i), { target: { value: '2025-04-10' } });
        fireEvent.change(screen.getByLabelText(/time/i), { target: { value: '12:00' } });
        fireEvent.change(screen.getByLabelText(/guests/i), { target: { value: '2' } });
        fireEvent.change(screen.getByLabelText(/occasion/i), { target: { value: 'Birthday' } });

        fireEvent.click(screen.getByRole('button', { name: /book now/i }));

        expect(submitAPI).toHaveBeenCalledWith({
            name: 'John Doe',
            email: 'john@example.com',
            date: '2025-04-10',
            time: '12:00',
            guests: '2',
            occasion: 'Birthday',
        });

        expect(screen.getByText(/booking confirmed/i)).toBeInTheDocument();
    });

    test('handles form submission failure', () => {
        submitAPI.mockReturnValue(false); // Mock failed form submission

        render(<BookingForm />);

        fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'John Doe' } });
        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'john@example.com' } });
        fireEvent.change(screen.getByLabelText(/date/i), { target: { value: '2025-04-10' } });
        fireEvent.change(screen.getByLabelText(/time/i), { target: { value: '12:00' } });
        fireEvent.change(screen.getByLabelText(/guests/i), { target: { value: '2' } });
        fireEvent.change(screen.getByLabelText(/occasion/i), { target: { value: 'Birthday' } });

        fireEvent.click(screen.getByRole('button', { name: /book now/i }));

        expect(submitAPI).toHaveBeenCalled();
        expect(screen.queryByText(/booking confirmed/i)).not.toBeInTheDocument();
    });
});