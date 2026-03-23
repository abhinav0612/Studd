import React from 'react';
import { BookOpen, Search, Bell, Menu, User } from 'lucide-react';

const Navbar = ({ onMenuClick }) => {
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
                    <div className="flex items-center gap-4">
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
                        <button className="relative p-2 text-slate-500 rounded-full hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800 transition-colors">
                            <Bell className="w-5 h-5" />
                            <span className="top-1 right-2 absolute w-2 h-2 bg-accent border-2 border-white dark:border-slate-800 rounded-full"></span>
                        </button>
                        <div className="flex items-center ms-3">
                            <div>
                                <button
                                    type="button"
                                    className="flex text-sm bg-slate-800 rounded-full focus:ring-4 focus:ring-slate-300 dark:focus:ring-slate-600 h-8 w-8 items-center justify-center overflow-hidden"
                                >
                                    <User className="h-5 w-5 text-slate-300" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
