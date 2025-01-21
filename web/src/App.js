import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './Pages/HomePage/HomePage';
import Room from './Pages/RoomPage/Room';
import BookingRoom from './Pages/BookingRoom/BookingRoom';
import AdminRegister from './Pages/AdminPage/AdminRegister';
import UserRegister from './Pages/UserPage/UserRegister';
import AdminLogin from './Pages/AdminPage/AdminLogin';
import UserLogin from './Pages/UserPage/UserLogin';
import AdminDetails from './Pages/AdminPage/AdminDetails';
import AdminRoomDetails from './Pages/AdminPage/AdminRoomDetails';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/Room" element={<Room/>} />
        <Route path="/book/:roomid" element={<BookingRoom/>}/>
        <Route path="/AdminRegister" element={<AdminRegister/>}/>
        <Route path="/UserRegister" element={<UserRegister/>}/>
        <Route path="/AdminLogin" element={<AdminLogin/>}/>
        <Route path="/UserLogin" element={<UserLogin/>}/>
        <Route path="/AdminDetails" element={<AdminDetails/>}/>
        <Route path="/AdminRoomDetails" element={<AdminRoomDetails/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
