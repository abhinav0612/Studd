import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BookOpen, ArrowRight, Mail, Lock, User, Zap } from 'lucide-react';

const LoginPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [major, setMajor] = useState('Computer Science');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    const { login, register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (isLogin) {
                await login(email, password);
            } else {
                await register(email, password, name, major);
            }
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || err.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    const handleDemoLogin = async () => {
        try {
            await login('demo@student.edu', 'demo123');
            navigate('/dashboard');
        } catch (err) {
            setError('Demo login failed');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
            
            {/* Animated background elements */}
            <div className="absolute top-0 left-1/4 w-72 h-72 bg-indigo-500/20 rounded-full blur-[120px] animate-pulse"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-500/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>

            <div className="w-full max-w-md relative z-10">
                
                {/* Logo Section */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-4">
                        <div className="bg-indigo-500 p-2 rounded-lg">
                            <BookOpen className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-xl font-bold text-white">StudyBuddy</span>
                    </div>
                    <h1 className="text-4xl font-bold text-white mb-2">
                        {isLogin ? 'Welcome Back' : 'Join StudyBuddy'}
                    </h1>
                    <p className="text-slate-400">
                        {isLogin ? 'Sign in to your account' : 'Create your learning account'}
                    </p>
                </div>

                {/* Main Card */}
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-2xl">
                    
                    {/* Error Message */}
                    {error && (
                        <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-200 text-sm">
                            {error}
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        
                        {/* Register Fields */}
                        {!isLogin && (
                            <>
                                <div>
                                    <label className="block text-sm font-medium text-white/80 mb-2">Full Name</label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
                                        <input
                                            type="text"
                                            placeholder="John Doe"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="w-full pl-10 pr-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                                            required={!isLogin}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-white/80 mb-2">Major/Stream</label>
                                    <select
                                        value={major}
                                        onChange={(e) => setMajor(e.target.value)}
                                        className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                                    >
                                        <option value="Computer Science" className="bg-slate-900">Computer Science</option>
                                        <option value="Engineering" className="bg-slate-900">Engineering</option>
                                        <option value="Business" className="bg-slate-900">Business</option>
                                        <option value="Medical" className="bg-slate-900">Medical</option>
                                        <option value="Arts" className="bg-slate-900">Arts</option>
                                        <option value="Science" className="bg-slate-900">Science</option>
                                    </select>
                                </div>
                            </>
                        )}

                        {/* Email Field */}
                        <div>
                            <label className="block text-sm font-medium text-white/80 mb-2">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
                                <input
                                    type="email"
                                    placeholder="your@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div>
                            <label className="block text-sm font-medium text-white/80 mb-2">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                                    required
                                />
                            </div>
                        </div>

                        {/* Remember Me / Forgot Password */}
                        {isLogin && (
                            <div className="flex items-center justify-between text-sm">
                                <label className="flex items-center gap-2 text-white/70 hover:text-white cursor-pointer transition-colors">
                                    <input type="checkbox" className="rounded" />
                                    Remember me
                                </label>
                                <a href="#" className="text-indigo-400 hover:text-indigo-300 transition-colors">
                                    Forgot password?
                                </a>
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full mt-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-500/30"
                        >
                            {loading ? 'Please wait...' : isLogin ? 'Sign In' : 'Create Account'}
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="my-6 flex items-center gap-3">
                        <div className="flex-1 h-px bg-white/20"></div>
                        <span className="text-sm text-white/50">or</span>
                        <div className="flex-1 h-px bg-white/20"></div>
                    </div>

                    {/* Demo Login */}
                    <button
                        type="button"
                        onClick={handleDemoLogin}
                        className="w-full py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium rounded-xl transition-all flex items-center justify-center gap-2"
                    >
                        <Zap className="w-4 h-4" />
                        Demo Login
                    </button>

                    {/* Toggle Form */}
                    <div className="mt-6 text-center text-white/70">
                        {isLogin ? (
                            <>
                                New to StudyBuddy?{' '}
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsLogin(false);
                                        setError('');
                                    }}
                                    className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors"
                                >
                                    Create an account
                                </button>
                            </>
                        ) : (
                            <>
                                Already have an account?{' '}
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsLogin(true);
                                        setError('');
                                    }}
                                    className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors"
                                >
                                    Sign in
                                </button>
                            </>
                        )}
                    </div>
                </div>

                {/* Terms & Privacy */}
                <p className="text-center text-xs text-white/50 mt-6">
                    By continuing, you agree to our Terms of Service and Privacy Policy
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
