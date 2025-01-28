import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";


function RoomDetails() {
  const [room, setRoom] = useState(null);
  const [userId, setUserId] = useState(null);
  const { roomId } = useParams();  // Get roomId from the URL params

  useEffect(() => {
    // Fetch authenticated user ID (replace with your authentication logic)
    const fetchUserId = async () => {
      try {
        const userResponse = await axios.get("http://localhost:5000/api/auth/user");
        setUserId(userResponse.data.userId);
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    };
    fetchUserId();

    // Fetch room details by roomId
    const fetchRoomDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/rooms/${roomId}`);
        setRoom(response.data.room);
      } catch (error) {
        console.error("Error fetching room details:", error);
      }
    };
    fetchRoomDetails();
  }, [roomId]);

  if (!room) {
    return <p>Loading room details...</p>;
  }

  const handleBooking = () => {
    if (!userId) {
      alert("Please log in to book the room.");
    } else {
      // Handle the booking process (you can add booking functionality here)
      alert("Room booking functionality is not implemented yet.");
    }
  };

  return (
    <section>
      <Navbar />
      <div className="room-details-container">
        <h2 className="room-title">{room.name}</h2>
        <div className="room-details-content">
          <div className="room-image">
            <img
              src={room.imageurls && room.imageurls.length > 0 ? room.imageurls[0] : "https://via.placeholder.com/500"}
              alt={room.name}
            />
          </div>
          <div className="room-info">
            <p className="room-description">{room.description}</p>
            <p className="room-type">Type: {room.type}</p>
            <p className="room-price">Rent per day: ₹{room.rentperday}</p>
            <p className={`room-status ${room.status === "available" ? "available" : "unavailable"}`}>
              Status: {room.status}
            </p>
            {room.status === "available" && (
              <button className="book-now-button" onClick={handleBooking}>
                Book Now
              </button>
            )}
            {room.status === "booked" && (
              <p className="booking-info">This room is currently booked.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default RoomDetails;
