require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Database connection error:', err));

// Import Routes
const roomsRoute = require('./routes/roomsRoute');
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");


// Register Routes
app.use('/api/rooms', roomsRoute);
app.use("/users", userRoutes);
app.use("/admins", adminRoutes);
app.use('/api', adminRoutes);


// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
