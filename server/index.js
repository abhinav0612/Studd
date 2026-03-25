const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
    .then(() => console.log("✅ SUCCESS: MongoDB Connected!"))
    .catch(err => console.log("❌ ERROR: Could not connect to MongoDB:", err));

// --- API ROUTES ---

// import Auth routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const roomRoutes = require('./routes/roomRoutes');
const classRoutes = require('./routes/classRoutes');

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/classes', classRoutes);

// 1. Test Route (Open http://localhost:5000 in your browser)
app.get('/', (req, res) => {
    res.json({ message: "Virtual Study Buddy API is officially LIVE!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});