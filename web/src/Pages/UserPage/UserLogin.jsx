// UserLogin.js
import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Navbar from '../../components/Navbar/Navbar';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './UserLogin.css';

function UserLogin() {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/users/login', loginData);
  
      if (response.data.success) {
        localStorage.setItem('userToken', response.data.token);  // Store token
        Swal.fire({
            title: 'Success!',
            text: 'Login successful!',
            icon: 'success',
            confirmButtonText: 'Okay',
        });
        window.location.href = '/Room';
    }
    
      else {
        Swal.fire({
          title: 'Error!',
          text: 'Invalid credentials!',
          icon: 'error',
          confirmButtonText: 'Try Again',
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'Error logging in!',
        icon: 'error',
        confirmButtonText: 'Try Again',
      });
      console.error('Error logging in:', error);
    }
  };
  

  return (
    <section>
      <Navbar />
      <div className="UL-login-container">
        <h2>User Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={loginData.email}
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
              value={loginData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit" className="submit-btn">Login</button>
        </form>
        <div className="register-link">
          <p>Not registered? <Link to="/UserRegister">Register here</Link></p>
        </div>
      </div>
    </section>
  );
}

export default UserLogin;
