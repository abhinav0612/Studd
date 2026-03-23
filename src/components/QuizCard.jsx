import React from 'react';
import { Brain, Star, Clock, PlayCircle } from 'lucide-react';

const QuizCard = ({ title, topic, questionsCount, timeEst, difficulty = "Medium", score = null }) => {
    return (
        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 group hover:-translate-y-1 transition-transform duration-300">
            <div className="flex justify-between items-start mb-4">
                <div className="bg-accent/20 dark:bg-accent/10 p-2.5 rounded-xl">
                    <Brain className="w-6 h-6 text-yellow-600 dark:text-accent" />
                </div>

                {score !== null ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                        Score: {score}%
                    </span>
                ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600">
                        {difficulty}
                    </span>
                )}
            </div>

            <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-1 group-hover:text-primary transition-colors">
                {title}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">{topic}</p>

            <div className="flex flex-wrap gap-3 text-xs font-medium text-slate-600 dark:text-slate-400">
                <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-900/50 px-2 py-1.5 rounded-md">
                    <Star className="w-3.5 h-3.5 text-slate-400" />
                    {questionsCount} Questions
                </div>
                <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-900/50 px-2 py-1.5 rounded-md">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {timeEst}
                </div>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-700 flex justify-end">
                <button className="flex items-center gap-2 text-sm font-semibold text-primary dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors">
                    {score !== null ? 'Retake Quiz' : 'Start Quiz'}
                    <PlayCircle className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};

export default QuizCard;
