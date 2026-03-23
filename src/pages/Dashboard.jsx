import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import StudyCard from '../components/StudyCard';
import QuizCard from '../components/QuizCard';
import { useAuth } from '../context/AuthContext';
import { PlusCircle, Search, BookOpen, Users, Zap, Calendar, Clock, X } from 'lucide-react';

const Dashboard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [showCreateRoom, setShowCreateRoom] = useState(false);
    const [roomData, setRoomData] = useState({
        title: '',
        subject: '',
        maxMembers: 4,
        startTime: ''
    });
    const { user } = useAuth();

    const handleCreateRoom = () => {
        if (roomData.title && roomData.subject) {
            console.log('Room created:', roomData);
            setShowCreateRoom(false);
            setRoomData({ title: '', subject: '', maxMembers: 4, startTime: '' });
            // In a real app, this would send to backend
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
            <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

            <Sidebar isOpen={sidebarOpen} />

            <main className="p-4 sm:ml-64 pt-24 min-h-screen transition-all">
                <div className="max-w-7xl mx-auto space-y-8">

                    {/* Welcome Section */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 relative overflow-hidden shadow-sm">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-400/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/3"></div>

                        <div className="relative z-10">
                            <h1 className="text-3xl font-poppins font-bold text-slate-900 dark:text-white mb-2">
                                Welcome back, {user?.name}! 👋
                            </h1>
                            <p className="text-slate-500 dark:text-slate-400">
                                You have 2 study sessions scheduled today. Keep up the great work!
                            </p>
                        </div>

                        <button
                            onClick={() => setShowCreateRoom(true)}
                            className="relative z-10 px-6 py-3 bg-primary text-white font-medium rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2"
                        >
                            <PlusCircle className="w-5 h-5" />
                            Create Study Room
                        </button>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center">
                                    <Users className="w-5 h-5 text-indigo-600" />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">Study Groups</p>
                                    <p className="text-lg font-bold text-slate-900 dark:text-white">12</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-teal-100 dark:bg-teal-900/30 rounded-lg flex items-center justify-center">
                                    <BookOpen className="w-5 h-5 text-teal-600" />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">My Classes</p>
                                    <p className="text-lg font-bold text-slate-900 dark:text-white">4</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                                    <Zap className="w-5 h-5 text-purple-600" />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">Quizzes Done</p>
                                    <p className="text-lg font-bold text-slate-900 dark:text-white">8</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                                    <Calendar className="w-5 h-5 text-orange-600" />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">Study Streak</p>
                                    <p className="text-lg font-bold text-slate-900 dark:text-white">7 days</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Active & Upcoming Rooms */}
                    <section>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Active & Upcoming Rooms</h2>
                            <Link to="/groups" className="text-sm font-medium text-primary hover:text-indigo-700 dark:text-indigo-400">
                                View all
                            </Link>
                        </div>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            <StudyCard
                                title="Advanced Data Structures"
                                subject="Computer Science"
                                members={4}
                                maxMembers={6}
                                time="Started 10 mins ago"
                                isActive={true}
                            />
                            <StudyCard
                                title="Calculus III Prep"
                                subject="Mathematics"
                                members={2}
                                maxMembers={4}
                                time="Today, 3:00 PM"
                                isActive={false}
                            />
                            <StudyCard
                                title="Physics Midterm Review"
                                subject="Physics"
                                members={8}
                                maxMembers={10}
                                time="Tomorrow, 1:00 PM"
                                isActive={false}
                            />
                        </div>
                    </section>

                    {/* Quick Access to Classes */}
                    <section>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white">My Classes</h2>
                            <Link to="/classes" className="text-sm font-medium text-primary hover:text-indigo-700 dark:text-indigo-400">
                                Browse all
                            </Link>
                        </div>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {['Advanced Data Structures', 'Web Development with React', 'Linear Algebra', 'Database Design'].map((cls, idx) => (
                                <Link
                                    key={idx}
                                    to="/classes"
                                    className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:shadow-lg transition-all hover:-translate-y-1 group"
                                >
                                    <div className="flex items-center gap-3 mb-2">
                                        <BookOpen className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                                        <span className="text-sm font-semibold text-slate-900 dark:text-white line-clamp-1">
                                            {cls}
                                        </span>
                                    </div>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">
                                        📚 {Math.floor(Math.random() * 10) + 5} files
                                    </p>
                                </Link>
                            ))}
                        </div>
                    </section>

                    {/* Pending AI Quizzes */}
                    <section>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Generated Quizzes</h2>
                            <Link to="/quizzes" className="text-sm font-medium text-primary hover:text-indigo-700 dark:text-indigo-400">
                                View all
                            </Link>
                        </div>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                            <QuizCard
                                title="Chapter 4: Neural Networks"
                                topic="Machine Learning"
                                questionsCount={15}
                                timeEst="20 mins"
                                difficulty="Hard"
                            />
                            <QuizCard
                                title="React Hooks Review"
                                topic="Web Development"
                                questionsCount={10}
                                timeEst="10 mins"
                                difficulty="Medium"
                                score={85}
                            />
                            <QuizCard
                                title="Cell Biology Terms"
                                topic="Biology 101"
                                questionsCount={25}
                                timeEst="15 mins"
                                difficulty="Easy"
                            />
                        </div>
                    </section>

                    {/* Quick Action: Find Study Partners */}
                    <section className="bg-gradient-to-r from-indigo-500 to-teal-500 p-8 rounded-2xl text-white shadow-lg">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div>
                                <h3 className="text-2xl font-bold mb-2">Find Your Perfect Study Partner</h3>
                                <p className="opacity-90">Connect with peers based on your interests and study style</p>
                            </div>
                            <Link
                                to="/partners"
                                className="px-6 py-3 bg-white text-indigo-600 font-semibold rounded-xl hover:bg-slate-100 transition-colors w-fit"
                            >
                                Discover Partners
                            </Link>
                        </div>
                    </section>

                </div>
            </main>

            {/* Create Study Room Modal */}
            {showCreateRoom && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 max-w-md w-full border border-slate-200 dark:border-slate-800 shadow-2xl">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                                Create Study Room
                            </h3>
                            <button
                                onClick={() => setShowCreateRoom(false)}
                                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Room Title
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g., Data Structures Study Group"
                                    value={roomData.title}
                                    onChange={(e) => setRoomData({ ...roomData, title: e.target.value })}
                                    className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Subject
                                </label>
                                <select
                                    value={roomData.subject}
                                    onChange={(e) => setRoomData({ ...roomData, subject: e.target.value })}
                                    className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                                >
                                    <option value="">Select subject...</option>
                                    <option value="Computer Science">Computer Science</option>
                                    <option value="Mathematics">Mathematics</option>
                                    <option value="Physics">Physics</option>
                                    <option value="Chemistry">Chemistry</option>
                                    <option value="Biology">Biology</option>
                                    <option value="Engineering">Engineering</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Max Members
                                </label>
                                <input
                                    type="number"
                                    min="2"
                                    max="20"
                                    value={roomData.maxMembers}
                                    onChange={(e) => setRoomData({ ...roomData, maxMembers: parseInt(e.target.value) })}
                                    className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Start Time
                                </label>
                                <input
                                    type="datetime-local"
                                    value={roomData.startTime}
                                    onChange={(e) => setRoomData({ ...roomData, startTime: e.target.value })}
                                    className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                                />
                            </div>
                        </div>

                        <div className="flex gap-3 mt-8">
                            <button
                                onClick={() => setShowCreateRoom(false)}
                                className="flex-1 px-4 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-medium rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleCreateRoom}
                                disabled={!roomData.title || !roomData.subject}
                                className="flex-1 px-4 py-2.5 bg-primary text-white font-medium rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Create Room
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
