import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { UploadCloud, File, Wand2, ArrowRight, Loader2, CheckCircle, X } from 'lucide-react';
import QuizCard from '../components/QuizCard';
import { generateQuizFromText, scoreQuiz } from '../utils/quizGenerator';

const QuizGeneratorPage = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const [textContent, setTextContent] = useState('');
    const [difficulty, setDifficulty] = useState('Medium');
    const [questionCount, setQuestionCount] = useState(10);
    const [generatedQuiz, setGeneratedQuiz] = useState(null);
    const [error, setError] = useState('');
    const [isTakingQuiz, setIsTakingQuiz] = useState(false);
    const [responses, setResponses] = useState({});
    const [quizScore, setQuizScore] = useState(null);

    const handleGenerate = async () => {
        setError('');
        
        if (!textContent.trim()) {
            setError('Please paste some text or upload a file');
            return;
        }

        setIsGenerating(true);
        try {
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            const questions = generateQuizFromText(textContent, parseInt(questionCount));
            
            if (questions.length === 0) {
                setError('Could not generate questions. Please provide more content.');
            } else {
                setGeneratedQuiz({
                    id: Date.now(),
                    title: `Quiz - ${new Date().toLocaleDateString()}`,
                    questions: questions,
                    difficulty: difficulty,
                    createdAt: new Date().toISOString()
                });
                setResponses({});
                setQuizScore(null);
            }
        } catch (err) {
            setError(err.message || 'Failed to generate quiz');
        } finally {
            setIsGenerating(false);
        }
    };

    const handleStartQuiz = () => {
        setIsTakingQuiz(true);
        setResponses({});
        setQuizScore(null);
    };

    const handleResponseChange = (questionId, response) => {
        setResponses(prev => ({
            ...prev,
            [questionId]: response
        }));
    };

    const handleSubmitQuiz = () => {
        const responseArray = generatedQuiz.questions.map(q => responses[q.id] || '');
        const score = scoreQuiz(responseArray, generatedQuiz.questions);
        setQuizScore(score);
        setIsTakingQuiz(false);
    };

    const handleFileUpload = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setTextContent(event.target?.result || '');
            };
            reader.readAsText(file);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col h-screen overflow-hidden">
            <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
            <Sidebar isOpen={sidebarOpen} />

            <main className="flex-1 p-4 sm:ml-64 pt-24 transition-all overflow-y-auto">
                <div className="max-w-4xl mx-auto space-y-8">

                    <div className="text-center space-y-2">
                        <h1 className="text-3xl font-poppins font-bold text-slate-900 dark:text-white">AI Quiz Generator</h1>
                        <p className="text-slate-500 dark:text-slate-400 md:text-lg">Upload your notes and let our AI create a custom quiz for you instantly.</p>
                    </div>

                    {/* Quiz Results View */}
                    {quizScore && !isTakingQuiz && (
                        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
                            <div className="text-center mb-8">
                                <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/30">
                                    <CheckCircle className="w-10 h-10 text-indigo-600" />
                                </div>
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Quiz Complete!</h2>
                                <p className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">
                                    {quizScore.score}/{quizScore.total}
                                </p>
                                <p className="text-lg text-slate-600 dark:text-slate-400 mt-2">
                                    Score: {quizScore.percentage}%
                                </p>
                            </div>

                            <div className="space-y-4 mb-8">
                                {quizScore.results.map((result, idx) => (
                                    <div
                                        key={idx}
                                        className={`p-4 rounded-xl border ${
                                            result.correct
                                                ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                                                : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
                                        }`}
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                                                result.correct
                                                    ? 'bg-green-500 text-white'
                                                    : 'bg-red-500 text-white'
                                            }`}>
                                                {result.correct ? '✓' : '✗'}
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-medium text-slate-900 dark:text-white">
                                                    Question {result.questionId}
                                                </p>
                                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                                    {result.explanation}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => {
                                        setGeneratedQuiz(null);
                                        setQuizScore(null);
                                        setTextContent('');
                                    }}
                                    className="flex-1 px-4 py-3 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-medium rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                                >
                                    Create New Quiz
                                </button>
                                <button
                                    onClick={handleStartQuiz}
                                    className="flex-1 px-4 py-3 bg-primary text-white font-medium rounded-xl hover:bg-indigo-700 transition-colors"
                                >
                                    Retake Quiz
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Quiz Taking View */}
                    {isTakingQuiz && generatedQuiz && (
                        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                                {generatedQuiz.title}
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400 mb-6">
                                Questions: {generatedQuiz.questions.length}
                            </p>

                            <div className="space-y-6">
                                {generatedQuiz.questions.map((question, idx) => (
                                    <div key={question.id} className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700">
                                        <h3 className="font-semibold text-slate-900 dark:text-white mb-4">
                                            {idx + 1}. {question.question}
                                        </h3>

                                        {question.type === 'multiple-choice' && (
                                            <div className="space-y-2">
                                                {question.options.map((option, optIdx) => (
                                                    <label
                                                        key={optIdx}
                                                        className="flex items-center p-3 border border-slate-200 dark:border-slate-600 rounded-lg cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                                                    >
                                                        <input
                                                            type="radio"
                                                            name={`question-${question.id}`}
                                                            value={optIdx}
                                                            checked={responses[question.id] == optIdx}
                                                            onChange={(e) => handleResponseChange(question.id, parseInt(e.target.value))}
                                                            className="mr-3"
                                                        />
                                                        <span className="text-slate-900 dark:text-white">{option}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        )}

                                        {question.type === 'true-false' && (
                                            <div className="flex gap-4">
                                                {[true, false].map(value => (
                                                    <label
                                                        key={value.toString()}
                                                        className="flex items-center p-3 border-2 border-slate-200 dark:border-slate-600 rounded-lg cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors flex-1"
                                                    >
                                                        <input
                                                            type="radio"
                                                            name={`question-${question.id}`}
                                                            value={value}
                                                            checked={responses[question.id] === value}
                                                            onChange={(e) => handleResponseChange(question.id, e.target.value === 'true')}
                                                        />
                                                        <span className="ml-3 font-medium text-slate-900 dark:text-white">
                                                            {value ? 'True' : 'False'}
                                                        </span>
                                                    </label>
                                                ))}
                                            </div>
                                        )}

                                        {question.type === 'short-answer' && (
                                            <textarea
                                                value={responses[question.id] || ''}
                                                onChange={(e) => handleResponseChange(question.id, e.target.value)}
                                                className="w-full p-3 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                                                placeholder="Type your answer here..."
                                                rows="3"
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={handleSubmitQuiz}
                                className="w-full mt-8 px-6 py-3 bg-primary text-white font-medium rounded-xl hover:bg-indigo-700 transition-colors"
                            >
                                Submit Quiz
                            </button>
                        </div>
                    )}

                    {/* Quiz Generator Form */}
                    {!generatedQuiz && (
                        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm">

                            {/* Error Message */}
                            {error && (
                                <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-700 dark:text-red-400 flex items-center gap-2">
                                    <X className="w-5 h-5" />
                                    {error}
                                </div>
                            )}

                            {/* Upload Area */}
                            <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-10 flex flex-col items-center justify-center text-center hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group mb-8">
                                <div className="w-16 h-16 bg-indigo-50 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <UploadCloud className="w-8 h-8 text-primary dark:text-indigo-400" />
                                </div>
                                <h3 className="font-semibold text-slate-900 dark:text-white text-lg mb-1">Upload Study Material</h3>
                                <p className="text-slate-500 text-sm mb-6">Drag and drop TXT or DOCX files</p>

                                <label className="px-6 py-2.5 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-medium rounded-xl hover:bg-slate-800 dark:hover:bg-white transition-colors cursor-pointer">
                                    Browse Files
                                    <input
                                        type="file"
                                        accept=".txt,.docx"
                                        onChange={handleFileUpload}
                                        className="hidden"
                                    />
                                </label>
                            </div>

                            {/* Paste Text Area */}
                            <div className="mb-8">
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Or paste your notes directly:</label>
                                <textarea
                                    value={textContent}
                                    onChange={(e) => setTextContent(e.target.value)}
                                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all min-h-[200px] resize-none"
                                    placeholder="e.g. Mitochondria is the powerhouse of the cell. It contains its own DNA and produces energy through cellular respiration..."
                                />
                            </div>

                            {/* Settings & Generate Button */}
                            <div className="flex flex-col sm:flex-row items-end justify-between gap-4">
                                <div className="w-full sm:w-1/2 flex gap-4">
                                    <div className="flex-1">
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Difficulty</label>
                                        <select
                                            value={difficulty}
                                            onChange={(e) => setDifficulty(e.target.value)}
                                            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-2.5 text-slate-900 dark:text-white"
                                        >
                                            <option>Easy</option>
                                            <option>Medium</option>
                                            <option>Hard</option>
                                        </select>
                                    </div>
                                    <div className="flex-1">
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Questions</label>
                                        <select
                                            value={questionCount}
                                            onChange={(e) => setQuestionCount(e.target.value)}
                                            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-2.5 text-slate-900 dark:text-white"
                                        >
                                            <option value="5">5 Questions</option>
                                            <option value="10">10 Questions</option>
                                            <option value="15">15 Questions</option>
                                            <option value="20">20 Questions</option>
                                        </select>
                                    </div>
                                </div>

                                <button
                                    onClick={handleGenerate}
                                    disabled={isGenerating}
                                    className="w-full sm:w-auto px-8 py-3 bg-primary text-white font-medium rounded-xl shadow-lg shadow-indigo-500/30 hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {isGenerating ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            Generating...
                                        </>
                                    ) : (
                                        <>
                                            <Wand2 className="w-5 h-5" />
                                            Generate Quiz
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Generated Quiz Preview */}
                    {generatedQuiz && !isTakingQuiz && !quizScore && (
                        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                                    {generatedQuiz.title}
                                </h2>
                                <div className="flex gap-4 text-sm text-slate-600 dark:text-slate-400">
                                    <span>📝 {generatedQuiz.questions.length} questions</span>
                                    <span>📊 Difficulty: {generatedQuiz.difficulty}</span>
                                </div>
                            </div>

                            <div className="space-y-2 mb-8">
                                {generatedQuiz.questions.slice(0, 3).map((q, idx) => (
                                    <div key={q.id} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                                        <p className="text-sm font-medium text-slate-900 dark:text-white">
                                            {idx + 1}. {q.question.substring(0, 80)}...
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => {
                                        setGeneratedQuiz(null);
                                        setTextContent('');
                                    }}
                                    className="flex-1 px-4 py-3 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-medium rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                                >
                                    Generate New
                                </button>
                                <button
                                    onClick={handleStartQuiz}
                                    className="flex-1 px-4 py-3 bg-primary text-white font-medium rounded-xl hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
                                >
                                    <ArrowRight className="w-4 h-4" />
                                    Take Quiz
                                </button>
                            </div>
                        </div>
                    )}

                </div>
            </main>
        </div>
    );
};

export default QuizGeneratorPage;
