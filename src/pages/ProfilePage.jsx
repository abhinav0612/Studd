import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { Settings, Shield, Edit3, Image, Award, Clock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const ProfilePage = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
                <div className="text-slate-900 dark:text-white font-medium">Loading profile...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
            <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
            <Sidebar isOpen={sidebarOpen} />

            <main className="p-4 sm:ml-64 pt-24 min-h-screen transition-all">
                <div className="max-w-5xl mx-auto space-y-6">

                    {/* Profile Header Block */}
                    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                        <div className="h-48 bg-gradient-to-r from-indigo-500 to-teal-400 relative">
                            <button className="absolute bottom-4 right-4 bg-black/40 hover:bg-black/60 backdrop-blur-sm pt-2 pb-2 px-4 rounded-xl text-white text-sm font-medium flex gap-2 items-center transition-colors">
                                <Image className="w-4 h-4" /> Edit Cover
                            </button>
                        </div>

                        <div className="px-8 pb-8">
                            <div className="relative flex justify-between items-end -mt-16 mb-4">
                                <div className="relative">
                                    <img
                                        src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&q=80"
                                        alt="Profile"
                                        className="w-32 h-32 rounded-full border-4 border-white dark:border-slate-900 object-cover bg-slate-200"
                                    />
                                    <button className="absolute bottom-1 right-1 p-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full border-2 border-white dark:border-slate-900 transition-colors">
                                        <Edit3 className="w-4 h-4" />
                                    </button>
                                </div>
                                <button className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 font-medium rounded-xl flex gap-2 items-center transition-colors">
                                    <Settings className="w-4 h-4" /> Edit Profile
                                </button>
                            </div>

                            <div>
                                <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                    {user?.name || 'Student'}
                                    <Shield className="w-5 h-5 text-teal-500" title="Verified Student" />
                                </h1>
                                <p className="text-lg text-slate-500 dark:text-slate-400">{user?.email || 'No email provided'}</p>

                                <div className="mt-6 flex flex-wrap gap-2 text-sm">
                                    <span className="px-3 py-1.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 font-medium rounded-lg">
                                        Active Learner
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="md:col-span-2 space-y-6">
                            {/* Stats & Achievements */}
                            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Learning Stats</h3>
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
                                        <Clock className="w-6 h-6 text-primary mb-2" />
                                        <div className="text-2xl font-bold text-slate-900 dark:text-white">{user?.studyStreak || 0}</div>
                                        <div className="text-xs text-slate-500 font-medium">Day Streak</div>
                                    </div>
                                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
                                        <Award className="w-6 h-6 text-secondary mb-2" />
                                        <div className="text-2xl font-bold text-slate-900 dark:text-white">{user?.quizzesDone || 0}</div>
                                        <div className="text-xs text-slate-500 font-medium">Quizzes Aced</div>
                                    </div>
                                </div>
                            </div>

                            {/* Bio/About */}
                            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">About Me</h3>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                    Hi! I'm {user?.name ? user.name.split(' ')[0] : 'a student'}. I'm using StudyBuddy to organize my learning, join study groups, and ace my quizzes!
                                    Looking forward to connecting with new study partners.
                                </p>
                            </div>
                        </div>

                        {/* Privacy Preferences */}
                        <div className="space-y-6">
                            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Privacy & Access</h3>
                                <ul className="space-y-4">
                                    <li className="flex items-center justify-between">
                                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Profile Visibility</span>
                                        <select className="bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-lg focus:ring-primary focus:border-primary block p-2 dark:bg-slate-800 dark:border-slate-700 dark:text-white">
                                            <option>Public</option>
                                            <option>Friends Only</option>
                                            <option>Private</option>
                                        </select>
                                    </li>
                                    <li className="flex items-center justify-between">
                                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Show Online Status</span>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" className="sr-only peer" defaultChecked />
                                            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-primary"></div>
                                        </label>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
};

export default ProfilePage;
