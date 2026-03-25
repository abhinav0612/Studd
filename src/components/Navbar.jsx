import React, { useState } from 'react';
import { BookOpen, Search, Bell, Menu, User, CheckCircle, UserCircle, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ onMenuClick }) => {
    const { logout } = useAuth();
    
    // States for dropdowns
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    // Dummy Notifications
    const [notifications, setNotifications] = useState([
        { id: 1, text: "New quiz available: React Basics", isRead: false },
        { id: 2, text: "Deadline tomorrow: Math Assignment", isRead: false },
        { id: 3, text: "Sarah joined your study group", isRead: true },
    ]);

    const unreadCount = notifications.filter(n => !n.isRead).length;

    const markAsRead = (id) => {
        setNotifications(notifications.map(n => 
            n.id === id ? { ...n, isRead: true } : n
        ));
    };

    return (
        <nav className="fixed top-0 z-50 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
            <div className="px-4 py-3 lg:px-6 lg:pl-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center justify-start">
                        <button
                            onClick={onMenuClick}
                            className="p-2 text-slate-600 rounded cursor-pointer lg:hidden hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white focus:bg-slate-100 dark:focus:bg-slate-800"
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                        <a href="/" className="flex ms-2 md:me-24 items-center gap-2">
                            <div className="bg-primary/10 p-2 rounded-xl">
                                <BookOpen className="h-6 w-6 text-primary" />
                            </div>
                            <span className="self-center text-xl font-poppins font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                                StudyBuddy
                            </span>
                        </a>
                    </div>
                    <div className="flex items-center gap-4 relative">
                        <div className="hidden md:flex relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <Search className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                            </div>
                            <input
                                type="text"
                                className="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-full focus:ring-primary focus:border-primary block w-full ps-10 p-2 dark:bg-slate-800 dark:border-slate-700 dark:placeholder-slate-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary transition-colors"
                                placeholder="Search resources..."
                            />
                        </div>
                        
                        {/* Notification Button */}
                        <div className="relative">
                            <button 
                                onClick={() => { setIsNotificationOpen(!isNotificationOpen); setIsProfileOpen(false); }}
                                className="relative p-2 text-slate-500 rounded-full hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800 transition-colors"
                            >
                                <Bell className="w-5 h-5" />
                                {unreadCount > 0 && (
                                    <span className="top-1 right-2 absolute w-2 h-2 rounded-full bg-red-500 border-2 border-white dark:border-slate-800"></span>
                                )}
                            </button>
                            
                            {/* Notification Dropdown */}
                            {isNotificationOpen && (
                                <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-100 dark:border-slate-700 overflow-hidden z-50">
                                    <div className="p-4 border-b border-slate-100 dark:border-slate-700 font-bold text-slate-800 dark:text-white flex justify-between items-center">
                                        Notifications
                                        {unreadCount > 0 && <span className="text-xs bg-primary text-white px-2 py-0.5 rounded-full">{unreadCount} new</span>}
                                    </div>
                                    <div className="max-h-64 overflow-y-auto">
                                        {notifications.map(notif => (
                                            <div key={notif.id} className={`p-4 border-b border-slate-50 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors flex justify-between items-start gap-3 ${!notif.isRead ? 'bg-indigo-50/50 dark:bg-indigo-900/10' : ''}`}>
                                                <p className={`text-sm ${notif.isRead ? 'text-slate-500 dark:text-slate-400' : 'text-slate-800 dark:text-slate-200 font-medium'}`}>{notif.text}</p>
                                                {!notif.isRead && (
                                                    <button onClick={() => markAsRead(notif.id)} className="text-primary hover:text-indigo-700 dark:text-indigo-400 shrink-0">
                                                        <CheckCircle className="w-4 h-4" />
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Profile Button */}
                        <div className="flex items-center ms-3 relative">
                            <button
                                onClick={() => { setIsProfileOpen(!isProfileOpen); setIsNotificationOpen(false); }}
                                type="button"
                                className="flex text-sm bg-slate-800 rounded-full focus:ring-4 focus:ring-slate-300 dark:focus:ring-slate-600 h-8 w-8 items-center justify-center overflow-hidden"
                            >
                                <User className="h-5 w-5 text-slate-300" />
                            </button>

                            {/* Profile Dropdown */}
                            {isProfileOpen && (
                                <div className="absolute right-0 top-10 mt-2 w-56 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-100 dark:border-slate-700 overflow-hidden z-50">
                                    <div className="p-4 border-b border-slate-100 dark:border-slate-700">
                                        <p className="font-bold text-slate-800 dark:text-white">Abhinav Singh</p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate">dummy@example.com</p>
                                    </div>
                                    <ul className="py-2 text-sm text-slate-700 dark:text-slate-300">
                                        <li>
                                            <a href="#" onClick={(e) => { e.preventDefault(); alert("Viewing Profile (UI only)"); }} className="flex items-center gap-2 px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-700">
                                                <UserCircle className="w-4 h-4" /> View Profile
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" onClick={(e) => { e.preventDefault(); alert("Editing Profile (UI only)"); }} className="flex items-center gap-2 px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-700">
                                                <Settings className="w-4 h-4" /> Edit Profile
                                            </a>
                                        </li>
                                    </ul>
                                    <div className="py-2 border-t border-slate-100 dark:border-slate-700">
                                        <a href="#" onClick={(e) => { e.preventDefault(); if(logout) logout(); else alert("Logged out!"); }} className="flex items-center gap-2 px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20">
                                            <LogOut className="w-4 h-4" /> Logout
                                        </a>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
