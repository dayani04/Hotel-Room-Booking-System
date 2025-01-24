import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Navbar from "../../components/Navbar/Navbar";


function BookingCancel() {
  const [bookings, setBookings] = useState([]);
  const userToken = localStorage.getItem("userToken");

  useEffect(() => {
    if (!userToken) {
      Swal.fire({
        title: 'Unauthorized',
        text: 'Please log in to view your bookings.',
        icon: 'warning',
        confirmButtonText: 'OK',
      });
      return;
    }

    const fetchBookings = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/bookings/mybookings", {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });
        setBookings(response.data.bookings);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        Swal.fire({
          title: 'Error!',
          text: 'Could not fetch bookings.',
          icon: 'error',
          confirmButtonText: 'Try Again',
        });
      }
    };

    fetchBookings();
  }, [userToken]);

  const cancelBooking = async (bookingId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/bookings/cancel/${bookingId}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      if (response.status === 200) {
        Swal.fire({
          title: 'Success!',
          text: 'Booking cancelled successfully.',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          setBookings(bookings.filter((booking) => booking._id !== bookingId));  // Remove cancelled booking
        });
      }
    } catch (error) {
      console.error("Error cancelling booking:", error);
      Swal.fire({
        title: 'Error!',
        text: 'Could not cancel booking.',
        icon: 'error',
        confirmButtonText: 'Try Again',
      });
    }
  };

  return (
    <section>
      <Navbar />
      <div className="booking-cancel-container">
        {bookings.length === 0 ? (
          <h2>No bookings available to cancel</h2>
        ) : (
          bookings.map((booking) => (
            <div className="booking-card" key={booking._id}>
              <h3>{booking.roomName}</h3>
              <p><strong>Start Date:</strong> {new Date(booking.startDate).toLocaleDateString()}</p>
              <p><strong>End Date:</strong> {new Date(booking.endDate).toLocaleDateString()}</p>
              <p><strong>Total Price:</strong> ₹{booking.totalPrice}</p>
              <p><strong>Status:</strong> {booking.status}</p>
              <button onClick={() => cancelBooking(booking._id)} className="cancel-button">Cancel Booking</button>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default BookingCancel;
