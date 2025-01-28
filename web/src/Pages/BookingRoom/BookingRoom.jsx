import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2'; 
import jsPDF from "jspdf";
import Navbar from "../../components/Navbar/Navbar";
import "./BookingRoom.css"; // Ensure to include the CSS file

function BookingRoom() {
  const { roomid } = useParams();  
  const [room, setRoom] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [bookingDetails, setBookingDetails] = useState(null); // State to store booking details

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/rooms/${roomid}`);
        setRoom(response.data.room);
      } catch (error) {
        console.error("Error fetching room details:", error);
      }
    };

    fetchRoom();
  }, [roomid]);

  const handleDateChange = () => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      // Ensure the end date is after the start date
      if (end < start) {
        Swal.fire({
          title: 'Error!',
          text: 'End date must be after the start date.',
          icon: 'error',
          confirmButtonText: 'Try Again',
        });
        return;
      }

      const differenceInTime = end.getTime() - start.getTime();
      const days = differenceInTime / (1000 * 3600 * 24) + 1;  // Add 1 to include the start day in the booking duration
      setTotalPrice(room.rentperday * days);
    }
  };

  const handleBooking = async () => {
    if (!startDate || !endDate) {
      Swal.fire({
        title: 'Error!',
        text: 'Please select both start and end dates',
        icon: 'error',
        confirmButtonText: 'Try Again',
      });
      return;
    }

    try {
      // Post the booking details to the server
      await axios.post("http://localhost:5000/api/rooms/book", {
        roomId: roomid,
        startDate,
        endDate,
        totalPrice,
      });

      // Update room status to 'unavailable'
      await axios.put(`http://localhost:5000/api/rooms/${roomid}/update`, { status: "unavailable" });

      // Set the booking details in the state
      setBookingDetails({
        roomName: room.name,
        roomType: room.type,
        startDate,
        endDate,
        totalPrice,
      });

      Swal.fire({
        title: 'Success!',
        text: 'Room booked successfully!',
        icon: 'success',
        confirmButtonText: 'Great!',
      });
    } catch (error) {
      console.error("Error booking room:", error);
      Swal.fire({
        title: 'Error!',
        text: 'Error booking room',
        icon: 'error',
        confirmButtonText: 'Try Again',
      });
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.text("Booking Details", 20, 20);
    doc.text(`Room Name: ${bookingDetails.roomName}`, 20, 30);
    doc.text(`Room Type: ${bookingDetails.roomType}`, 20, 40);
    doc.text(`Start Date: ${bookingDetails.startDate}`, 20, 50);
    doc.text(`End Date: ${bookingDetails.endDate}`, 20, 60);
    doc.text(`Total Price: ₹${bookingDetails.totalPrice}`, 20, 70); // Correct currency symbol

    doc.save("booking_details.pdf");
  };

  return (
    <section>
      <Navbar />
      <div className="booking-room-container">
        {room ? (
          <div className="room-details">
            <h1>{room.name}</h1>
            <p><strong>Type:</strong> {room.type}</p>
            <p><strong>Description:</strong> {room.description}</p>
            <p><strong>Rent per day:</strong> ₹{room.rentperday}</p>

            <div className="date-picker-container">
              <label>Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => { setStartDate(e.target.value); handleDateChange(); }}
              />
              <label>End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => { setEndDate(e.target.value); handleDateChange(); }}
              />
            </div>

            {startDate && endDate && (
              <div className="total-price">
                <h3>Total Price: ₹{totalPrice}</h3>
              </div>
            )}

            <button onClick={handleBooking}>Book Now</button> 
          </div>
        ) : (
          <div className="loading-box">
            <h2>Loading room details...</h2>
            <div className="spinner"></div>
          </div>
        )}

        {bookingDetails && (
          <div className="booking-details-box">
            <h2>Booking Confirmed</h2>
            <p><strong>Room Name:</strong> {bookingDetails.roomName}</p>
            <p><strong>Room Type:</strong> {bookingDetails.roomType}</p>
            <p><strong>Start Date:</strong> {bookingDetails.startDate}</p>
            <p><strong>End Date:</strong> {bookingDetails.endDate}</p>
            <p><strong>Total Price:</strong> ₹{bookingDetails.totalPrice}</p>

            <button onClick={generatePDF}>Download Booking Details (PDF)</button>
          </div>
        )}
      </div>
    </section>
  );
}

export default BookingRoom;
