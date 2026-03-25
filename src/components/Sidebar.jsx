import React from 'react';
import { Home, Users, MessageSquare, Video, FileText, Settings, UserPlus, Shield, BookOpen, LogOut } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const navItems = [
    { icon: Home, label: 'Dashboard', path: '/dashboard' },
    { icon: BookOpen, label: 'My Classes', path: '/classes' },
    { icon: Users, label: 'Study Groups', path: '/groups' },
    { icon: FileText, label: 'AI Quizzes', path: '/quizzes' },
    { icon: UserPlus, label: 'Find Partners', path: '/partners' },
];

const Sidebar = ({ isOpen }) => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <aside
            className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-full'
                } bg-white border-r border-slate-200 sm:translate-x-0 dark:bg-slate-900 dark:border-slate-800`}
            aria-label="Sidebar"
        >
            <div className="h-full px-3 pb-4 overflow-y-auto flex flex-col justify-between">
                <ul className="space-y-2 font-medium">
                    {navItems.map((item, index) => (
                        <li key={index}>
                            <NavLink
                                to={item.path}
                                className={({ isActive }) =>
                                    `flex items-center p-3 rounded-xl transition-colors group ${isActive
                                        ? 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-light'
                                        : 'text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                                    }`
                                }
                            >
                                <item.icon
                                    className={`flex-shrink-0 w-5 h-5 transition duration-75 group-hover:text-primary dark:group-hover:text-primary-light`}
                                />
                                <span className="ms-3">{item.label}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>

                <ul className="space-y-2 font-medium border-t border-slate-200 dark:border-slate-800 pt-4 mt-4">
                    <li>
                        <NavLink
                            to="/profile"
                            className={({ isActive }) =>
                                `flex items-center p-3 rounded-xl transition-colors group ${isActive
                                    ? 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-light'
                                    : 'text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                                }`
                            }
                        >
                            <Settings className="flex-shrink-0 w-5 h-5 transition duration-75 group-hover:text-primary dark:group-hover:text-primary-light" />
                            <span className="ms-3">Settings</span>
                        </NavLink>
                    </li>

                    <li>
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center p-3 rounded-xl transition-colors group text-slate-900 hover:bg-red-100 dark:text-slate-300 dark:hover:bg-red-900/20"
                        >
                            <LogOut className="flex-shrink-0 w-5 h-5 transition duration-75 group-hover:text-red-600 dark:group-hover:text-red-400" />
                            <span className="ms-3">Logout</span>
                        </button>
                    </li>
                </ul>
            </div>
        </aside>
    );
};

export default Sidebar;
