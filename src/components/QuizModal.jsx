import React, { useState } from 'react';
import { X } from 'lucide-react';

const dummyQuestions = [
    {
        id: 1,
        question: "What is the primary role of a database index?",
        options: ["To slow down insert operations", "To speed up data retrieval", "To encrypt data", "To format tables"],
        correct: 1
    },
    {
        id: 2,
        question: "Which of the following is a React Hook?",
        options: ["useState", "useComponent", "useTemplate", "useRender"],
        correct: 0
    },
    {
        id: 3,
        question: "What does CSS stand for?",
        options: ["Central Style Sheets", "Cascading Style Sheets", "Computer Style Sheets", "Code Style Source"],
        correct: 1
    }
];

const QuizModal = ({ isOpen, onClose, title }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [answers, setAnswers] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [score, setScore] = useState(0);

    const q = dummyQuestions[currentQuestion];

    if (!isOpen) return null;

    const handleNext = () => {
        if (selectedOption !== null) {
            setAnswers({ ...answers, [currentQuestion]: selectedOption });
        }
        setSelectedOption(null);
        setCurrentQuestion(prev => prev + 1);
    };

    const handlePrev = () => {
        setCurrentQuestion(prev => prev - 1);
        setSelectedOption(answers[currentQuestion - 1] ?? null);
    };

    const handleSubmit = () => {
        if (selectedOption !== null) {
            answers[currentQuestion] = selectedOption;
        }
        let calcScore = 0;
        dummyQuestions.forEach((question, idx) => {
            if (answers[idx] === question.correct) {
                calcScore++;
            }
        });
        setScore(calcScore);
        setIsSubmitted(true);
    };

    const handleClose = () => {
        // Reset states
        setCurrentQuestion(0);
        setSelectedOption(null);
        setAnswers({});
        setIsSubmitted(false);
        setScore(0);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 max-w-2xl w-full border border-slate-200 dark:border-slate-800 shadow-2xl relative">
                <button onClick={handleClose} className="absolute top-4 right-4 p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
                    <X className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                </button>
                
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 pr-8">
                    {title || "Generated Quiz"}
                </h3>

                {isSubmitted ? (
                    <div className="text-center py-8">
                        <div className="w-24 h-24 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                            <span className="text-4xl font-bold text-emerald-600 dark:text-emerald-400">
                                {Math.round((score / dummyQuestions.length) * 100)}%
                            </span>
                        </div>
                        <h4 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">Quiz Completed!</h4>
                        <p className="text-slate-500 dark:text-slate-400 mb-8">You answered {score} out of {dummyQuestions.length} questions correctly.</p>
                        <button onClick={handleClose} className="px-6 py-2.5 bg-primary text-white font-medium rounded-xl hover:bg-indigo-700 transition-colors">
                            Close Quiz
                        </button>
                    </div>
                ) : (
                    <div>
                        <div className="flex justify-between text-sm font-medium text-slate-500 dark:text-slate-400 mb-4">
                            <span>Question {currentQuestion + 1} of {dummyQuestions.length}</span>
                        </div>
                        <h4 className="text-lg font-medium text-slate-800 dark:text-slate-200 mb-6">
                            {q.question}
                        </h4>
                        <div className="space-y-3 mb-8">
                            {q.options.map((opt, idx) => (
                                <button 
                                    key={idx}
                                    onClick={() => setSelectedOption(idx)}
                                    className={`w-full text-left px-5 py-4 rounded-xl border transition-all ${selectedOption === idx ? 'border-primary bg-primary/5 dark:bg-primary/10 text-primary dark:text-indigo-400' : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-700 dark:text-slate-300'}`}
                                >
                                    {opt}
                                </button>
                            ))}
                        </div>
                        <div className="flex justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                            <button 
                                onClick={handlePrev} 
                                disabled={currentQuestion === 0}
                                className="px-5 py-2.5 text-slate-600 dark:text-slate-400 font-medium hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Previous
                            </button>
                            {currentQuestion === dummyQuestions.length - 1 ? (
                                <button 
                                    onClick={handleSubmit}
                                    className="px-5 py-2.5 bg-primary text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
                                >
                                    Submit Quiz
                                </button>
                            ) : (
                                <button 
                                    onClick={handleNext}
                                    className="px-5 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-medium rounded-lg hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors"
                                >
                                    Next
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default QuizModal;
