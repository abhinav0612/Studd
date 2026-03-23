import React from 'react';
import { ArrowRight, BookOpen, Users, Brain, Video, Sparkles, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const features = [
    { icon: Users, title: 'Smart Study Groups', desc: 'Find or create groups based on your interests and courses.' },
    { icon: Brain, title: 'AI Quiz Generator', desc: 'Transform your notes into interactive quizzes instantly.' },
    { icon: Video, title: 'Real-time Collaboration', desc: 'Seamlessly study together with WebRTC video and chat.' },
    { icon: ShieldCheck, title: 'Secure & Private', desc: 'Your data is encrypted, with granular privacy controls.' }
];

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 overflow-hidden">
            {/* Navbar overlay for Landing */}
            <nav className="absolute top-0 w-full p-6 z-50">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="bg-primary/10 p-2.5 rounded-xl">
                            <BookOpen className="h-7 w-7 text-primary" />
                        </div>
                        <span className="text-2xl font-poppins font-bold text-slate-900 dark:text-white">StudyBuddy</span>
                    </div>
                    <div className="flex gap-4">
                        <Link to="/login" className="hidden sm:block px-5 py-2.5 text-slate-600 dark:text-slate-300 font-medium hover:text-slate-900 dark:hover:text-white">
                            Log In
                        </Link>
                        <Link to="/login" className="px-5 py-2.5 bg-primary text-white font-medium rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/30">
                            Get Started
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-4">
                {/* Background Gradients */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-indigo-50 to-transparent dark:from-indigo-950/20 -z-10 blur-3xl"></div>
                <div className="absolute top-20 left-1/4 w-72 h-72 bg-teal-400/20 rounded-full blur-[100px] -z-10"></div>
                <div className="absolute top-40 right-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-[120px] -z-10"></div>

                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-primary dark:text-indigo-300 font-medium text-sm mb-6 border border-indigo-200 dark:border-indigo-800/50">
                        <Sparkles className="w-4 h-4" />
                        <span>The Future of Collaborative Learning</span>
                    </div>

                    <h1 className="text-5xl lg:text-7xl font-poppins font-bold text-slate-900 dark:text-white mb-6 leading-tight tracking-tight">
                        Study better, <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">together.</span>
                    </h1>

                    <p className="text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                        Connect with peers, generate AI quizzes from notes, and master your subjects in our immersive virtual study rooms.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link to="/login" className="w-full sm:w-auto px-8 py-4 bg-primary text-white text-lg font-medium rounded-2xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-500/30 flex items-center justify-center gap-2 group">
                            Start Learning Now
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <a href="#features" className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-lg font-medium rounded-2xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center justify-center">
                            Explore Features
                        </a>
                    </div>
                </div>
            </section>

            {/* Features Showcase */}
            <section id="features" className="py-20 bg-white/50 dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Everything you need to excel</h2>
                        <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
                            Our platform combines the best of social learning with powerful AI tools to supercharge your academic journey.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, idx) => (
                            <div key={idx} className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                                <div className="w-14 h-14 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                                    <feature.icon className="w-7 h-7 text-primary group-hover:text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{feature.title}</h3>
                                <p className="text-slate-500 dark:text-slate-400 leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer CTA */}
            <footer className="py-20 text-center px-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-primary/5 dark:bg-primary/10 -z-10"></div>
                <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-6">Ready to transform your study habits?</h2>
                <Link to="/login" className="inline-block px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-lg font-bold rounded-2xl hover:scale-105 transition-transform shadow-xl">
                    Join StudyBuddy Today
                </Link>
            </footer>
        </div>
    );
};

export default LandingPage;
