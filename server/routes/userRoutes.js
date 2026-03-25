const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');

// Get user profile
router.get('/profile', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password').populate('classes');
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Update a user's study streak
router.put('/streak', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;
        const { increaseBy } = req.body;

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        user.studyStreak += (increaseBy || 1);
        await user.save();

        res.json({ message: "Study streak updated successfully!", studyStreak: user.studyStreak });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Increment quizzes done
router.put('/quizzes', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;
        
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        user.quizzesDone += 1;
        await user.save();

        res.json({ message: "Quizzes done updated successfully!", quizzesDone: user.quizzesDone });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

module.exports = router;
