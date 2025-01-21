import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Room.css";
import Navbar from "../../components/Navbar/Navbar";

function Room() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
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

  return (
    <section>
      <Navbar/>
    <div className="room-container">
      {rooms.length === 0 ? (
        <h2>No rooms available</h2>
      ) : (
        rooms.map((room) => (
          <div className="room-card" key={room._id}>
            <img
              src={room.imageurls[0] || "https://via.placeholder.com/300"}
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
            </div>
          </div>
        ))
      )}
    </div>
    </section>
  );
}

export default Room;
