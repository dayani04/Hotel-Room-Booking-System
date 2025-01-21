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

module.exports = router;
