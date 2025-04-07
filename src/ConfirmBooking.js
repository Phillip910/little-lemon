import React from "react";

function ConfirmBooking({ formData }) {
  return (
    <><div className="confirm-booking">
          <h2>Booking Confirmed!</h2>
          <p>Thank you, {formData.name}, for your reservation.</p>
          <p>Email: {formData.email}</p>
          <p>Date: {formData.date}</p>
          <p>Time: {formData.time}</p>
          <p>Guests: {formData.guests}</p>
          <p>Occasion: {formData.occasion}</p>
      </div><button onClick={() => window.location.reload()}>Reset</button></>
  );
}

export default ConfirmBooking;