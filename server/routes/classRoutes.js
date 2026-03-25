const express = require('express');
const router = express.Router();
const Class = require('../models/Class');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');

// Create a class
router.post('/', authMiddleware, async (req, res) => {
    try {
        const { name, description } = req.body;
        const newClass = new Class({
            name,
            description,
            teacher: req.user.id
        });
        await newClass.save();
        res.status(201).json({ message: "Class created", class: newClass });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// List classes
router.get('/', async (req, res) => {
    try {
        const classes = await Class.find().populate('teacher', 'name email');
        res.json(classes);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Join a class
router.post('/:classId/join', authMiddleware, async (req, res) => {
    try {
        const { classId } = req.params;
        const userId = req.user.id;

        const classObj = await Class.findById(classId);
        if (!classObj) return res.status(404).json({ message: "Class not found" });
        if (classObj.students.includes(userId)) return res.status(400).json({ message: "Already enrolled in this class" });

        classObj.students.push(userId);
        await classObj.save();

        const user = await User.findById(userId);
        user.classes.push(classId);
        await user.save();

        res.json({ message: "Joined class successfully", class: classObj });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

module.exports = router;
