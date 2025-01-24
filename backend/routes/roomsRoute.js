const express = require('express');
const router = express.Router();
const Room = require('../models/room');

router.get('/getallrooms', async (req, res) => {
  try {
    const rooms = await Room.find({});
    res.json({ rooms });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) return res.status(404).json({ message: 'Room not found' });
    res.json({ room });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const newRoom = new Room(req.body);
    await newRoom.save();
    res.status(201).json({ message: 'Room added successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id/update', async (req, res) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({ message: 'Room updated successfully', updatedRoom });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Room.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Room deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/book', async (req, res) => {
  try {
    const { roomId, startDate, endDate, totalPrice } = req.body;

    const room = await Room.findById(roomId);
    if (!room) return res.status(404).json({ message: 'Room not found' });

    // Check for overlapping bookings
    const isBooked = room.currentbookings.some(
      (booking) =>
        (new Date(startDate) >= new Date(booking.startDate) && new Date(startDate) <= new Date(booking.endDate)) ||
        (new Date(endDate) >= new Date(booking.startDate) && new Date(endDate) <= new Date(booking.endDate))
    );

    if (isBooked) {
      return res.status(400).json({ message: 'Room is already booked for the selected dates' });
    }

    // Add new booking
    room.currentbookings.push({
      startDate,
      endDate,
      totalPrice,
    });

    await room.save();
    res.status(200).json({ message: 'Room booked successfully', room });
  } catch (error) {
    console.error('Error booking room:', error);
    res.status(500).json({ message: error.message });
  }
});

router.get('/mybookings', async (req, res) => {
  try {
    const userId = req.user.id;  // Assuming you have user authentication middleware
    const bookings = await Booking.find({ userId });
    res.json({ bookings });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Cancel a booking
router.delete('/cancel/:id', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    // Optionally, update room status to 'available' if you want
    const room = await Room.findById(booking.roomId);
    room.status = 'available';
    await room.save();
    
    booking.status = 'Cancelled';
    await booking.save();

    res.status(200).json({ message: 'Booking cancelled successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



module.exports = router;
