const Users = require("../models/userModel");

// Get all users
const getAllUsers = async (req, res, next) => {
    let users;
    try {
        users = await Users.find();
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Unable to retrieve users" });
    }

    if (!users || users.length === 0) {
        return res.status(404).json({ message: "No users found" });
    }

    return res.status(200).json({ users });
};

// Add a new user
const addUser = async (req, res, next) => {
    const { name, email, age, address, password } = req.body;

    if (!password) {
        return res.status(400).json({ message: "Password is required" });
    }

    let user;
    try {
        user = new Users({ name, email, age, address, password }); // Use the plaintext password
        await user.save();
    } catch (err) {
        console.error("Error saving user:", err);
        return res.status(500).json({ message: "Failed to add user", error: err.message });
    }

    return res.status(201).json({ message: "User added successfully", user });
};

// Get user by ID
const getUserById = async (req, res, next) => {
    const id = req.params.id;

    let user;
    try {
        user = await Users.findById(id);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error retrieving user" });
    }

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user });
};

// Update user details
const updateUser = async (req, res, next) => {
    const id = req.params.id;
    const { name, email, age, address, password } = req.body;

    let user;
    try {
        user = await Users.findByIdAndUpdate(
            id,
            { name, email, age, address, password }, // Use the plaintext password
            { new: true }
        );
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error updating user details" });
    }

    if (!user) {
        return res.status(404).json({ message: "Unable to update user details" });
    }

    return res.status(200).json({ message: "User updated successfully", user });
};

// Delete user
const deleteUser = async (req, res, next) => {
    const id = req.params.id;

    let user;
    try {
        user = await Users.findByIdAndDelete(id);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error deleting user" });
    }

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "User deleted successfully", user });
};

// User login
const userLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await Users.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Check if the entered password matches the stored password (plaintext comparison)
        if (password !== user.password) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // You could send a token or session here (JWT, for example)
        return res.status(200).json({ success: true, message: 'Login successful' });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    getAllUsers,
    addUser,
    getUserById,
    updateUser,
    deleteUser,
    userLogin,
};
