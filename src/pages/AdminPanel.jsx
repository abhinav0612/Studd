import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { UserCog, Users as UsersIcon, Activity, AlertCircle, Ban, CheckCircle } from 'lucide-react';

const usersData = [
    { id: '1', name: 'Sarah Mitchell', email: 'sarah@edu.com', role: 'Student', status: 'Active', rooms: 5 },
    { id: '2', name: 'Dr. Alan Turing', email: 'alan@edu.com', role: 'Moderator', status: 'Active', rooms: 12 },
    { id: '3', name: 'Alex Johnson', email: 'alex@edu.com', role: 'Student', status: 'Banned', rooms: 0 },
    { id: '4', name: 'Emma Wilson', email: 'emma@edu.com', role: 'Student', status: 'Active', rooms: 3 },
];

const AdminPanel = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col h-screen overflow-hidden">
            <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
            <Sidebar isOpen={sidebarOpen} />

            <main className="flex-1 p-4 sm:ml-64 pt-24 transition-all overflow-y-auto w-full">
                <div className="max-w-7xl mx-auto space-y-6">

                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h1 className="text-3xl font-poppins font-bold text-slate-900 dark:text-white">Admin Dashboard</h1>
                            <p className="text-slate-500 dark:text-slate-400 mt-1">Manage users, study groups, and system analytics.</p>
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        {[
                            { label: 'Total Users', value: '4,209', icon: UsersIcon, color: 'emerald' },
                            { label: 'Active Rooms', value: '142', icon: Activity, color: 'indigo' },
                            { label: 'Moderators', value: '24', icon: UserCog, color: 'teal' },
                            { label: 'Reports', value: '7', icon: AlertCircle, color: 'red' },
                        ].map((stat, i) => (
                            <div key={i} className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
                                <div className={`p-3 rounded-xl bg-${stat.color}-50 dark:bg-${stat.color}-900/30 text-${stat.color}-600 dark:text-${stat.color}-400`}>
                                    <stat.icon className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{stat.label}</p>
                                    <p className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Users Table */}
                    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                        <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">User Management</h3>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="Search users..."
                                    className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1.5 text-sm"
                                />
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-slate-500 dark:text-slate-400">
                                <thead className="text-xs text-slate-700 uppercase bg-slate-50 dark:bg-slate-800/50 dark:text-slate-300">
                                    <tr>
                                        <th className="px-6 py-4 rounded-tl-xl font-semibold">User</th>
                                        <th className="px-6 py-4 font-semibold">Role</th>
                                        <th className="px-6 py-4 font-semibold">Status</th>
                                        <th className="px-6 py-4 font-semibold">Rooms</th>
                                        <th className="px-6 py-4 rounded-tr-xl font-semiboldtext-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {usersData.map((user, idx) => (
                                        <tr key={user.id} className="border-b border-slate-100 dark:border-slate-800 last:border-0 hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                                            <td className="px-6 py-4 font-medium text-slate-900 dark:text-white whitespace-nowrap flex flex-col">
                                                <span>{user.name}</span>
                                                <span className="text-xs text-slate-400 font-normal">{user.email}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2.5 py-1 text-xs font-medium rounded-lg ${user.role === 'Moderator' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400' : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                                                    }`}>
                                                    {user.role}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-1.5">
                                                    {user.status === 'Active' ? (
                                                        <><CheckCircle className="w-4 h-4 text-emerald-500" /> <span className="text-emerald-600 dark:text-emerald-400">{user.status}</span></>
                                                    ) : (
                                                        <><Ban className="w-4 h-4 text-red-500" /> <span className="text-red-600 dark:text-red-400">{user.status}</span></>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">{user.rooms}</td>
                                            <td className="px-6 py-4">
                                                <div className="flex gap-2">
                                                    <button className="text-slate-400 hover:text-indigo-600 font-medium transition-colors">Edit</button>
                                                    <button className="text-slate-400 hover:text-red-600 font-medium transition-colors">Suspend</button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-sm text-slate-500">
                            <span>Showing 1 to 4 of 4,209 entries</span>
                            <div className="flex gap-1">
                                <button className="px-3 py-1 border border-slate-200 dark:border-slate-700 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-50" disabled>Prev</button>
                                <button className="px-3 py-1 border border-slate-200 dark:border-slate-700 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white">1</button>
                                <button className="px-3 py-1 border border-slate-200 dark:border-slate-700 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800">2</button>
                                <button className="px-3 py-1 border border-slate-200 dark:border-slate-700 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800">Next</button>
                            </div>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
};

export default AdminPanel;
