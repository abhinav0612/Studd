const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // Fields requested for StudyBuddy dashboard
    studyStreak: { type: Number, default: 0 },
    quizzesDone: { type: Number, default: 0 },
    classes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Class' }]
});

module.exports = mongoose.model('User', userSchema);
