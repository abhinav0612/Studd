import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import ChatBox from '../components/ChatBox';
import VideoPanel from '../components/VideoPanel';
import { Users, FileText, CheckSquare, Hash } from 'lucide-react';

const StudyRoomPage = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('chat'); // chat, members, notes

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col h-screen overflow-hidden">
            <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
            <Sidebar isOpen={sidebarOpen} />

            <main className="flex-1 p-2 sm:p-4 sm:ml-64 pt-20 transition-all flex flex-col lg:flex-row gap-4 h-full">

                {/* Main Video Area */}
                <div className="flex-1 flex flex-col bg-black rounded-3xl overflow-hidden shadow-sm lg:h-[calc(100vh-6rem)] relative border border-slate-800">
                    <div className="absolute top-4 left-4 z-10 bg-black/50 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 text-white">
                        <h2 className="font-bold flex items-center gap-2">
                            <Hash className="w-4 h-4 text-emerald-400" /> Advanced Data Structures
                        </h2>
                        <div className="flex items-center gap-2 text-xs text-slate-300 mt-1">
                            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                            Recording
                        </div>
                    </div>

                    <VideoPanel />
                </div>

                {/* Side Panel (Chat & Tools) */}
                <div className="w-full lg:w-[400px] flex flex-col bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm lg:h-[calc(100vh-6rem)] overflow-hidden">

                    {/* Tabs */}
                    <div className="flex p-2 gap-2 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
                        <button
                            onClick={() => setActiveTab('chat')}
                            className={`flex-1 py-2 text-sm font-semibold rounded-xl transition-colors ${activeTab === 'chat'
                                    ? 'bg-white shadow-sm text-primary dark:bg-slate-800 dark:text-indigo-400'
                                    : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
                                }`}
                        >
                            Chat
                        </button>
                        <button
                            onClick={() => setActiveTab('members')}
                            className={`flex-1 py-2 text-sm font-semibold rounded-xl transition-colors ${activeTab === 'members'
                                    ? 'bg-white shadow-sm text-primary dark:bg-slate-800 dark:text-indigo-400'
                                    : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
                                }`}
                        >
                            Members (4)
                        </button>
                        <button
                            onClick={() => setActiveTab('notes')}
                            className={`flex-1 py-2 text-sm font-semibold rounded-xl transition-colors ${activeTab === 'notes'
                                    ? 'bg-white shadow-sm text-primary dark:bg-slate-800 dark:text-indigo-400'
                                    : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
                                }`}
                        >
                            Notes
                        </button>
                    </div>

                    {/* Panel Content */}
                    <div className="flex-1 overflow-hidden relative">
                        {activeTab === 'chat' && (
                            <ChatBox roomName="General" />
                        )}

                        {activeTab === 'members' && (
                            <div className="p-4 space-y-4 overflow-y-auto h-full bg-slate-50 dark:bg-slate-950">
                                {['Sarah M. (You)', 'David K.', 'Emma W.', 'Mike J.'].map((name, i) => (
                                    <div key={i} className="flex items-center gap-3 p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
                                        <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-primary dark:text-indigo-400 font-bold">
                                            {name.charAt(0)}
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-semibold text-slate-900 dark:text-white text-sm">{name}</p>
                                            <p className="text-xs text-slate-500">Student</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === 'notes' && (
                            <div className="p-4 h-full bg-slate-50 dark:bg-slate-950 flex flex-col">
                                <textarea
                                    className="w-full flex-1 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl resize-none text-sm text-slate-700 dark:text-slate-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow outline-none"
                                    placeholder="Type shared notes here. Everyone in the room can see these."
                                    defaultValue="- Graph representations (Adjacency list vs Matrix)&#10;- DFS and BFS implementations&#10;"
                                ></textarea>
                            </div>
                        )}
                    </div>

                </div>

            </main>
        </div>
    );
};

export default StudyRoomPage;
