import React from 'react';
import { BookMarked, UserPlus, GraduationCap, MapPin } from 'lucide-react';

const RecommendationCard = ({ name, major, matchScore, commonInterests, avatarUrl, location }) => {
    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-100 dark:border-slate-700 relative overflow-hidden flex flex-col items-center text-center hover:shadow-md transition-shadow">
            {/* Match Score Badge */}
            <div className="absolute top-3 right-3 bg-secondary/10 dark:bg-secondary/20 text-teal-700 dark:text-teal-400 text-xs font-bold px-2.5 py-1 rounded-full border border-secondary/20">
                {matchScore}% Match
            </div>

            {/* Avatar Avatar */}
            <div className="relative mt-2 mb-4">
                <img
                    src={avatarUrl}
                    alt={name}
                    className="w-20 h-20 rounded-full object-cover border-4 border-slate-50 dark:border-slate-700 shadow-sm"
                />
                <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-800"></div>
            </div>

            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                {name}
            </h3>

            <div className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 mb-3 font-medium">
                <GraduationCap className="w-4 h-4" />
                <span>{major}</span>
            </div>

            {/* Shared Interests */}
            <div className="w-full mt-2 space-y-2 text-left">
                <p className="text-xs text-slate-400 uppercase tracking-wide font-semibold pl-1">Shared Interests</p>
                <div className="flex flex-wrap justify-center gap-1.5">
                    {commonInterests.map((interest, idx) => (
                        <span key={idx} className="bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300 text-xs px-2.5 py-1 rounded-lg">
                            {interest}
                        </span>
                    ))}
                </div>
            </div>

            <div className="w-full mt-6 pt-5 border-t border-slate-100 dark:border-slate-700 flex gap-2">
                <button className="flex-1 bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600 py-2.5 rounded-xl font-medium text-sm transition-colors flex items-center justify-center gap-2">
                    <BookMarked className="w-4 h-4" />
                    Save
                </button>
                <button className="flex-1 bg-primary text-white hover:bg-indigo-700 py-2.5 rounded-xl font-medium text-sm shadow-md shadow-indigo-200 dark:shadow-none transition-colors flex items-center justify-center gap-2">
                    <UserPlus className="w-4 h-4" />
                    Connect
                </button>
            </div>
        </div>
    );
};

export default RecommendationCard;
