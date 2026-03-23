import React from 'react';
import { Users, Clock } from 'lucide-react';

const StudyCard = ({ title, subject, members, maxMembers, time, isActive, isLocked }) => {
    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition-shadow relative overflow-hidden group">
            {isActive && (
                <div className="absolute top-0 right-0 w-2 h-full bg-secondary"></div>
            )}
            <div className="flex justify-between items-start mb-4">
                <div>
                    <span className="text-xs font-semibold text-primary dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-2.5 py-1 rounded-full uppercase tracking-wider">
                        {subject}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-2 group-hover:text-primary transition-colors">
                        {title}
                    </h3>
                </div>
            </div>

            <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mt-4">
                <div className="flex items-center gap-1.5">
                    <Users className="w-4 h-4" />
                    <span>{members}/{maxMembers} joined</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    <span>{time}</span>
                </div>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-700 flex justify-between items-center">
                <div className="flex -space-x-2">
                    {[...Array(Math.min(members, 4))].map((_, i) => (
                        <div key={i} className={`w-8 h-8 rounded-full border-2 border-white dark:border-slate-800 bg-slate-200 dark:bg-slate-600 flex items-center justify-center text-xs font-bold text-slate-600 dark:text-slate-300`}>
                            {String.fromCharCode(65 + i)}
                        </div>
                    ))}
                </div>
                <button className={`px-4 py-2 rounded-xl font-medium text-sm transition-colors ${isActive
                        ? 'bg-primary text-white hover:bg-indigo-700'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600'
                    }`}>
                    {isActive ? 'Join Room' : 'View Group'}
                </button>
            </div>
        </div>
    );
};

export default StudyCard;
