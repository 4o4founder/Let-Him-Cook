import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

// REGISTER ROUTE
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // 1. Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        // 2. Hash the password (security step)
        const hashedPassword = await bcrypt.hash(password, 12);

        // 3. Create and save user
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
});

export default router;

// LOGIN ROUTE
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Find user by email
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User doesn't exist" });

        // 2. Compare the plain password with the hashed one in the DB
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

        // 3. Generate a Token
        const token = jwt.sign(
            { email: user.email, id: user._id }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1h' }
        );

        res.status(200).json({ result: user, token });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
});