const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    subject: { type: String, required: true },
    startTime: { type: Date, default: Date.now },
    maxSlots: { type: Number, required: true },
    isActive: { type: Boolean, default: true },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('Room', roomSchema);
