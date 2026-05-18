const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// --- 1. SIGNUP ROUTE ---
router.post('/register', async (req, res) => {
    try {
        const { email, password, role } = req.body;

        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ error: "Email already registered!" });
        }

        // Hash (encrypt) the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Save new user with the encrypted password
        const newUser = new User({
            email,
            password: hashedPassword,
            role: role || 'student'
        });

        await newUser.save();
        res.status(201).json({ message: "User registered successfully!" });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- 2. LOGIN ROUTE ---
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Invalid Email or Password!" });
        }

        // Check if password matches
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid Email or Password!" });
        }

        // Generate JWT Secret Keycard Token
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET || 'fallback_secret_key',
            { expiresIn: '1d' } // Token expires in 1 day
        );

        // Send token and user info back to frontend
        res.status(200).json({
            token,
            user: { id: user._id, email: user.email, role: user.role }
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;