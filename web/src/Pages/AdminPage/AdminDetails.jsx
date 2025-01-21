import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'; 
import './AdminDetails.css';
import AdminNavbar from '../../components/AdminNavbar/AdminNavbar';

function AdminDetails() {
  const [admins, setAdmins] = useState([]);
  const [editAdmin, setEditAdmin] = useState(null);
  const [updateData, setUpdateData] = useState({
    name: '',
    email: '',
    age: '',
    address: ''
  });

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await axios.get('http://localhost:5000/admins');
        setAdmins(response.data.admins);
      } catch (error) {
        console.error('Error fetching admins:', error);
      }
    };
    fetchAdmins();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/admins/${id}`);
      setAdmins(admins.filter(admin => admin._id !== id));

      Swal.fire({
        title: 'Deleted!',
        text: 'Admin has been deleted.',
        icon: 'success',
        confirmButtonText: 'Okay'
      });
    } catch (error) {
      console.error('Error deleting admin:', error);

      Swal.fire({
        title: 'Error!',
        text: 'Failed to delete admin!',
        icon: 'error',
        confirmButtonText: 'Try Again'
      });
    }
  };

  const handleEdit = (admin) => {
    setEditAdmin(admin);
    setUpdateData({
      name: admin.name,
      email: admin.email,
      age: admin.age,
      address: admin.address
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5000/admins/${editAdmin._id}`,
        updateData
      );

      setAdmins(admins.map(admin => (admin._id === editAdmin._id ? response.data.admin : admin)));
      setEditAdmin(null);

      Swal.fire({
        title: 'Updated!',
        text: 'Admin details have been updated.',
        icon: 'success',
        confirmButtonText: 'Okay'
      });
    } catch (error) {
      console.error('Error updating admin:', error);

      Swal.fire({
        title: 'Error!',
        text: 'Failed to update admin!',
        icon: 'error',
        confirmButtonText: 'Try Again'
      });
    }
  };

  return (
    <section>
      <AdminNavbar/>
    <div className="admin-details-container">
     
      <h2>Admin Details</h2>

      {editAdmin ? (
        <form onSubmit={handleUpdate} className="edit-form">
          <h3>Edit Admin</h3>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={updateData.name}
              onChange={(e) => setUpdateData({ ...updateData, name: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={updateData.email}
              onChange={(e) => setUpdateData({ ...updateData, email: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="age">Age</label>
            <input
              type="number"
              id="age"
              value={updateData.age}
              onChange={(e) => setUpdateData({ ...updateData, age: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              value={updateData.address}
              onChange={(e) => setUpdateData({ ...updateData, address: e.target.value })}
              required
            />
          </div>
          <button type="submit" className="submit-btn">Update Admin</button>
        </form>
      ) : (
        <div className="admin-list">
          {admins.length > 0 ? (
            <ul>
              {admins.map((admin) => (
                <li key={admin._id} className="admin-item">
                  <div className="admin-info">
                    <p>Name: {admin.name}</p>
                    <p>Email: {admin.email}</p>
                    <p>Age: {admin.age}</p>
                    <p>Address: {admin.address}</p>
                  </div>
                  <button onClick={() => handleEdit(admin)} className="edit-btn">Edit</button>
                  <button onClick={() => handleDelete(admin._id)} className="delete-btn">Delete</button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No admins available.</p>
          )}
        </div>
      )}
    </div>
    </section>
  );
}

export default AdminDetails;
