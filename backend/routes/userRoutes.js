const express = require("express");
const router = express.Router();

const userController = require("../Controllers/userController");
const verifyToken = require('../middlewares/authMiddleware')
// Define the routes for the user API
router.get("/", userController.getAllUsers);            // Get all users
router.post("/", userController.addUser);              // Add a new user
router.get("/:id", userController.getUserById);        // Get a user by ID
router.put("/:id", userController.updateUser);         // Update user details
router.delete("/:id", userController.deleteUser);     // Delete user
router.post('/login', userController.userLogin);       // Login


module.exports = router;
