const express = require('express');
const router = express.Router();
const Room = require('../models/Room');
const authMiddleware = require('../middleware/authMiddleware');

// Fetch 'Active Rooms' filtered by subject
router.get('/active', async (req, res) => {
    try {
        const { subject } = req.query;
        let query = { isActive: true };
        
        if (subject) {
            query.subject = { $regex: new RegExp(subject, 'i') };
        }

        const activeRooms = await Room.find(query);
        res.json(activeRooms);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Create a new study room
router.post('/', authMiddleware, async (req, res) => {
    try {
        const { subject, maxSlots } = req.body;
        const newRoom = new Room({
            subject,
            maxSlots,
            participants: [req.user.id] // creator joins automatically
        });
        await newRoom.save();
        res.status(201).json({ message: "Room created", room: newRoom });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Join a room
router.post('/:roomId/join', authMiddleware, async (req, res) => {
    try {
        const { roomId } = req.params;
        const userId = req.user.id;

        const room = await Room.findById(roomId);
        if (!room) return res.status(404).json({ message: "Room not found" });
        if (!room.isActive) return res.status(400).json({ message: "This room is no longer active." });
        if (room.participants.length >= room.maxSlots) return res.status(400).json({ message: "Cannot join. The room is full." });
        if (room.participants.includes(userId)) return res.status(400).json({ message: "User is already in the room." });

        room.participants.push(userId);
        await room.save();
        res.json({ message: "Successfully joined the room!", room });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Leave a room
router.post('/:roomId/leave', authMiddleware, async (req, res) => {
    try {
        const { roomId } = req.params;
        const userId = req.user.id;

        const room = await Room.findById(roomId);
        if (!room) return res.status(404).json({ message: "Room not found" });

        room.participants = room.participants.filter(p => p.toString() !== userId);
        await room.save();
        res.json({ message: "Left the room successfully", room });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// End room (mark inactive)
router.put('/:roomId/end', authMiddleware, async (req, res) => {
    try {
        const room = await Room.findById(req.params.roomId);
        if (!room) return res.status(404).json({ message: "Room not found" });

        room.isActive = false;
        await room.save();
        res.json({ message: "Room ended", room });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

module.exports = router;
