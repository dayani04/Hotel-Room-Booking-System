const Users = require("../models/userModel");
const jwt = require("jsonwebtoken");



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

const addUser = async (req, res, next) => {
    const { name, email, age, address, password } = req.body;

    if (!password) {
        return res.status(400).json({ message: "Password is required" });
    }

    let user;
    try {
        user = new Users({ name, email, age, address, password }); 
        await user.save();
    } catch (err) {
        console.error("Error saving user:", err);
        return res.status(500).json({ message: "Failed to add user", error: err.message });
    }

    return res.status(201).json({ message: "User added successfully", user });
};


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


const updateUser = async (req, res, next) => {
    const id = req.params.id;
    const { name, email, age, address, password } = req.body;

    let user;
    try {
        user = await Users.findByIdAndUpdate(
            id,
            { name, email, age, address, password }, 
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


const userLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await Users.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

       
        if (password !== user.password) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign(
            { id: user._id, email: user.email, name: user.name }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1h' }
        );

        return res.status(200).json({
            success: true,
            message: 'Login successful',
            token, 
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: 'Authorization token missing' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }

        req.user = user;
        next();
    });
};
const getUserProfile = async (req, res) => {
    const userId = req.user.userId; 

    try {
        const user = await Users.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error retrieving user profile" });
    }
};

module.exports = {
    getAllUsers,
    addUser,
    getUserById,
    updateUser,
    deleteUser,
    userLogin,
    authenticateToken,
    getUserProfile,
};
