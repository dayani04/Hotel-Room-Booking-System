import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import AdminNavbar from '../../components/AdminNavbar/AdminNavbar';

const RoomManagement = () => {
  const [rooms, setRooms] = useState([]);
  const [room, setRoom] = useState({
    name: '',
    count: 1,
    rentperday: '',
    imageurls: '',
    type: '',
    description: ''
  });
  const [isAddMode, setIsAddMode] = useState(false);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [editingRoomId, setEditingRoomId] = useState(null);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = () => {
    axios.get('/api/rooms/getallrooms')
      .then((response) => {
        setRooms(response.data.rooms);
      })
      .catch((error) => console.error(error));
  };

  const handleAddRoom = (e) => {
    e.preventDefault();
    const roomData = {
      ...room,
      imageurls: room.imageurls.split(',') 
    };

    axios.post('/api/rooms', roomData)
      .then(() => {
        setIsAddMode(false);
        resetForm();
        fetchRooms();
        Swal.fire({
          icon: 'success',
          title: 'Room Added',
          text: 'The room has been successfully added.',
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong while adding the room.',
        });
        console.error(error);
      });
  };

  const handleEditRoom = (roomId) => {
    const roomToEdit = rooms.find((r) => r._id === roomId);
    if (roomToEdit) {
      setRoom({
        ...roomToEdit,
        imageurls: roomToEdit.imageurls.join(',') 
      });
      setEditingRoomId(roomId);
      setIsUpdateMode(true);
    }
  };

  const handleUpdateRoom = (e) => {
    e.preventDefault();
    const updatedRoomData = {
      ...room,
      imageurls: room.imageurls.split(',') 
    };

    axios.put(`/api/rooms/${editingRoomId}/update`, updatedRoomData)
      .then(() => {
        setIsUpdateMode(false);
        resetForm();
        fetchRooms();
        Swal.fire({
          icon: 'success',
          title: 'Room Updated',
          text: 'The room has been successfully updated.',
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong while updating the room.',
        });
        console.error(error);
      });
  };

  const handleDeleteRoom = (roomId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This will permanently delete the room!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#6453e0',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`/api/rooms/${roomId}`)
          .then(() => {
            setRooms(rooms.filter((room) => room._id !== roomId));
            Swal.fire({
              icon: 'success',
              title: 'Room Deleted',
              text: 'The room has been successfully deleted.',
            });
          })
          .catch((error) => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong while deleting the room.',
            });
            console.error(error);
          });
      }
    });
  };

  const resetForm = () => {
    setRoom({
      name: '',
      count: 1,
      rentperday: '',
      imageurls: '',
      type: '',
      description: ''
    });
    setEditingRoomId(null);
  };

  const containerStyle = {
    padding: '50px',
    maxWidth: '1000px',
    margin: '0 auto',
  };

  const buttonStyle = {
    padding: '10px 20px',
    backgroundColor: '#e511ae',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '4px',
    margin: '5px',
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    marginBottom: '20px',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    maxWidth: '600px',
    margin: '20px auto',
  };

  const inputStyle = {
    padding: '12px',
    fontSize: '16px',
    border: '1px solid #ddd',
    borderRadius: '4px',
  };

  const textAreaStyle = {
    padding: '12px',
    fontSize: '16px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    minHeight: '100px',
  };

  const cardStyle = {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '20px',
    marginBottom: '20px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  };

  const roomNameStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#e511ae',
    marginBottom: '10px',
  };

  return (
    <section>
      <AdminNavbar/>
    <div style={containerStyle}>
      <h1>Room Management</h1>

      {!isAddMode && !isUpdateMode && (
        <>
          <div>
            <button style={buttonStyle} onClick={() => setIsAddMode(true)}>Add New Room</button>
          </div>

          <div>
            {rooms.map((room) => (
              <div key={room._id} style={cardStyle}>
                <h3 style={roomNameStyle}>{room.name}</h3>
                <p>{room.description}</p>
                <p>Rent per day: ${room.rentperday}</p>
                <button style={buttonStyle} onClick={() => handleEditRoom(room._id)}>Edit</button>
                <button style={buttonStyle} onClick={() => handleDeleteRoom(room._id)}>Delete</button>
              </div>
            ))}
          </div>
        </>
      )}

      {(isAddMode || isUpdateMode) && (
        <div>
          <h2>{isUpdateMode ? 'Update Room' : 'Add Room'}</h2>
          <form onSubmit={isUpdateMode ? handleUpdateRoom : handleAddRoom} style={formStyle}>
            <input
              style={inputStyle}
              type="text"
              placeholder="Room Name"
              value={room.name}
              onChange={(e) => setRoom({ ...room, name: e.target.value })}
            />
            <input
              style={inputStyle}
              type="number"
              placeholder="Room Count"
              value={room.count}
              onChange={(e) => setRoom({ ...room, count: e.target.value })}
            />
            <input
              style={inputStyle}
              type="number"
              placeholder="Rent per Day"
              value={room.rentperday}
              onChange={(e) => setRoom({ ...room, rentperday: e.target.value })}
            />
            <input
              style={inputStyle}
              type="text"
              placeholder="Image URLs (comma-separated)"
              value={room.imageurls}
              onChange={(e) => setRoom({ ...room, imageurls: e.target.value })}
            />
            <input
              style={inputStyle}
              type="text"
              placeholder="Room Type"
              value={room.type}
              onChange={(e) => setRoom({ ...room, type: e.target.value })}
            />
            <textarea
              style={textAreaStyle}
              placeholder="Description"
              value={room.description}
              onChange={(e) => setRoom({ ...room, description: e.target.value })}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button style={buttonStyle} type="submit">{isUpdateMode ? 'Update Room' : 'Add Room'}</button>
              <button
                style={buttonStyle}
                type="button"
                onClick={() => {
                  resetForm();
                  setIsAddMode(false);
                  setIsUpdateMode(false);
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
        
      )}
    </div>
    </section>
  );
};

export default RoomManagement;