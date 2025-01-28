const mongoose = require('mongoose');

const roomSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    count: { type: Number, required: true },
    rentperday: { type: Number, required: true },
    imageurls: { type: [String], required: true }, // Array of strings
    type: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, default: 'available' },
    currentbookings: [
      {
        
        startDate: Date,
        endDate: Date,
        totalPrice: Number,
      },
    ],
  },
  { timestamps: true }
);

const Room = mongoose.model('Room', roomSchema);
module.exports = Room;
