import React, { useState, useEffect } from "react";
import { fetchAPI, submitAPI } from "./API"; // Assuming fetchAPI is defined in API.js
import ConfirmBooking from "./ConfirmBooking"; // Import the ConfirmBooking component


function BookingForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState(1);
  const [occasion, setOccasion] = useState("Birthday");
  const [availableTimes, setAvailableTimes] = useState([]);
  const [isConfirmed, setIsConfirmed] = useState(false); // Tracks if booking is confirmed
  const [submittedData, setSubmittedData] = useState(null); // Stores submitted form data
  const today = new Date(); // Create a Date object for today

  const fetchAvailableTimes = (selectedDate) => {
    try {
      const times = fetchAPI(new Date(selectedDate)); // Call the imported fetchAPI function
      setAvailableTimes(times);
    } catch (error) {
      console.error("Error fetching available times:", error);
      setAvailableTimes([]); // Reset to empty if fetch fails
    }
  };

  function handleDateChange(e) {
    const selectedDate = e.target.value;
    setDate(selectedDate);
    fetchAvailableTimes(selectedDate);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = { name, email, date, time, guests, occasion };
    const isSuccess = submitAPI(formData); // Call submitAPI with form data
  
    if (isSuccess) {
      console.log("Form submitted successfully:", formData);
      setSubmittedData(formData); // Save the submitted form data
      setIsConfirmed(true); // Set confirmation state to true
    } else {
      console.error("Form submission failed.");
      // Handle submission failure
    }
  };
  const resetBooking = () => {
    setIsConfirmed(false); // Reset the confirmation state
    setSubmittedData(null); // Clear the submitted data
  };

  return (
    <div className="booking-form">
      {isConfirmed ? (
        <ConfirmBooking formData={submittedData} resetBooking={resetBooking} /> // Pass submittedData as formData
      ) : (
        <>
          <h2>Book a Table</h2>
          <form onSubmit={handleSubmit}>
            {/* Form fields */}
            <label>
              Name:
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                aria-label="name"
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-label="email"
              />
            </label>
            <label>
              Date:
              <input
                type="date"
                value={date}
                onChange={handleDateChange}
                required
                aria-label="date"
              />
            </label>
            <label>
              Time:
              <select
                id="setTime"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
                aria-label="time"
              >
                <option value="">Select a time</option>
                {availableTimes.map((availableTime, index) => (
                  <option key={index} value={availableTime}>
                    {availableTime}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Number of Guests:
              <input
                type="number"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                min="1"
                max="10"
                required
                aria-label="guests"
              />
            </label>
            <label>
              Occasion:
              <select
                value={occasion}
                onChange={(e) => setOccasion(e.target.value)}
                required
                aria-label="occasion"
              >
                <option value="Birthday">Birthday</option>
                <option value="Anniversary">Anniversary</option>
                <option value="Other">Other</option>
              </select>
            </label>
            <button type="submit">Book Now</button>
          </form>
        </>
      )}
    </div>
  );
}
export default BookingForm;