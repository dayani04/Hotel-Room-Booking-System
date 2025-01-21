import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'; 
import './UserRegister.css';
import Navbar from '../../components/Navbar/Navbar';

function AddUser() {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    age: '',
    address: '',
    password: '',  
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/users', userData); 

      Swal.fire({
        title: 'Success!',
        text: 'User added successfully!',
        icon: 'success',
        confirmButtonText: 'Okay'
      });

      console.log('User added:', response.data);
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'Error adding user!',
        icon: 'error',
        confirmButtonText: 'Try Again'
      });

      console.error('Error adding user:', error);
    }
  };

  return (
    <section>
      <Navbar/>
    <div className="add-user-container">
      <h2>Add New User</h2>
      <form onSubmit={handleSubmit} className="add-user-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={userData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            name="age"
            value={userData.age}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={userData.address}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={userData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="submit-btn">Add User</button>
      </form>
    </div>
    </section>
  );
}

export default AddUser;
