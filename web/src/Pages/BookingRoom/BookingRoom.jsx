import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2'; 
import "./BookingRoom.css";
import Navbar from "../../components/Navbar/Navbar";

function BookingRoom() {
  const { roomid } = useParams();  
  const [room, setRoom] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);

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
      const differenceInTime = end.getTime() - start.getTime();
      const days = differenceInTime / (1000 * 3600 * 24);
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

      await axios.post("http://localhost:5000/api/rooms/book", {
        roomId: roomid,
        startDate,
        endDate,
        totalPrice,
      });


      await axios.put(`http://localhost:5000/api/rooms/${roomid}/update`, { status: "unavailable" });

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

  return (
    <section>
      <Navbar/>
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
              <h3>Total Price: ${totalPrice}</h3>
            </div>
          )}

          <button onClick={handleBooking}>Book Now</button> 
        </div>
      ) : (
        <h2>Loading room details...</h2>
      )}
    </div>
    </section>
  );
}

export default BookingRoom;
