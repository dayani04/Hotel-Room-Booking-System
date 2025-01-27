import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import "./Room.css";

function Room() {
  const [rooms, setRooms] = useState([]);
  const [userId, setUserId] = useState(null);  // Store authenticated user ID

  useEffect(() => {
    // Fetch authenticated user ID (you can replace this logic as per your authentication setup)
    const fetchUserId = async () => {
      try {
        const userResponse = await axios.get("http://localhost:5000/api/auth/user"); // Assuming you have a route that gets logged-in user data
        setUserId(userResponse.data.userId);
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    };
    fetchUserId();

    const fetchRooms = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/rooms/getallrooms");
        setRooms(response.data.rooms);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };
    fetchRooms();
  }, []);

  const cancelBooking = async (roomId) => {
    if (!userId) {
      alert("Please log in to cancel your booking.");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:5000/api/rooms/${roomId}/cancel-booking`,
        { userId }
      );
      alert(response.data.message);
      // Update room status after successful cancellation
      setRooms((prevRooms) =>
        prevRooms.map((room) =>
          room._id === roomId ? { ...room, status: "available" } : room
        )
      );
    } catch (error) {
      console.error("Error canceling booking:", error);
      alert("Failed to cancel booking.");
    }
  };

  return (
    <section>
      <Navbar />
      <div className="room-container">
        {rooms.length === 0 ? (
          <h2>No rooms available</h2>
        ) : (
          rooms.map((room) => (
            <div className="room-card" key={room._id}>
<img
  src={room.imageurls && room.imageurls.length > 0 ? room.imageurls[0] : "https://via.placeholder.com/300"}
  alt={room.name}
  className="room-image"
/>


              <div className="room-details">
                <h3 className="room-title">{room.name}</h3>
                <p className="room-description">{room.description}</p>
                <p className="room-type">Type: {room.type}</p>
                <p className="room-price">Rent per day: ₹{room.rentperday}</p>
                <p className={`room-status ${room.status === "available" ? "available" : "unavailable"}`}>
                  Status: {room.status}
                </p>
                <Link to={`/book/${room._id}`}>
                  <button className="book-now-button" disabled={room.status !== "available"}>
                    Book Now
                  </button>
                </Link>

                {/* Only show cancel button if room is booked by this user */}
                {room.status === "booked" && room.currentbookings.some(booking => booking.userId === userId) && (
                  <>
                    <button
                      className="cancel-booking-button"
                      onClick={() => cancelBooking(room._id)}
                    >
                      Cancel Booking
                    </button>
                    <Link to={`/booking-cancel/${room._id}`}>
                      <button className="view-booking-button">
                        View Booking
                      </button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default Room;

