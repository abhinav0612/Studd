import React from 'react';
import { Mic, MicOff, Video as VideoIcon, VideoOff, MonitorUp, PhoneOff, Maximize, Settings } from 'lucide-react';

const VideoPanel = () => {
    return (
        <div className="h-full flex flex-col bg-slate-900 rounded-3xl overflow-hidden relative group">
            {/* Main Video Stream Container */}
            <div className="flex-1 relative grid grid-cols-2 gap-2 p-2 bg-slate-950">
                {/* Local Stream */}
                <div className="relative rounded-2xl overflow-hidden bg-slate-800 border border-slate-700">
                    <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&q=80" alt="Student 1" className="w-full h-full object-cover" />
                    <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full text-white text-xs font-medium border border-white/10">
                        Sarah M. (You)
                    </div>
                    <div className="absolute top-3 right-3 bg-red-500/80 p-1.5 rounded-full text-white backdrop-blur-sm">
                        <MicOff className="w-4 h-4" />
                    </div>
                </div>

                {/* Remote Streams */}
                <div className="relative rounded-2xl overflow-hidden bg-slate-800 border border-slate-700">
                    <img src="https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&q=80" alt="Student 2" className="w-full h-full object-cover" />
                    <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full text-white text-xs font-medium border border-white/10">
                        David K.
                    </div>
                </div>

                <div className="relative rounded-2xl overflow-hidden bg-slate-800 border-2 border-primary">
                    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80" alt="Student 3" className="w-full h-full object-cover" />
                    <div className="absolute bottom-3 left-3 bg-primary px-3 py-1 rounded-full text-white text-xs font-medium shadow-lg">
                        Emma W. (Speaking)
                    </div>
                </div>

                <div className="relative rounded-2xl overflow-hidden bg-slate-800 border border-slate-700 flex items-center justify-center flex-col">
                    <div className="w-16 h-16 rounded-full bg-slate-700 flex items-center justify-center text-xl font-bold text-slate-300 mb-2">
                        MJ
                    </div>
                    <p className="text-slate-400 text-sm font-medium">Mike J.</p>
                    <div className="absolute top-3 right-3 bg-black/50 p-1.5 rounded-full text-slate-300">
                        <VideoOff className="w-4 h-4" />
                    </div>
                </div>
            </div>

            {/* Embedded Controls overlay on hover (desktop) or fixed (mobile) */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 p-2.5 rounded-2xl flex items-center gap-3 shadow-2xl opacity-100 transition-opacity">
                <button className="p-3 bg-red-500/20 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-colors" title="Toggle Microphone">
                    <MicOff className="w-5 h-5" />
                </button>
                <button className="p-3 bg-slate-700 text-white hover:bg-slate-600 rounded-xl transition-colors" title="Toggle Camera">
                    <VideoIcon className="w-5 h-5" />
                </button>
                <div className="w-px h-8 bg-slate-700 mx-1"></div>
                <button className="p-3 bg-slate-700 text-white hover:bg-slate-600 rounded-xl transition-colors" title="Share Screen">
                    <MonitorUp className="w-5 h-5" />
                </button>
                <button className="p-3 bg-slate-700 text-white hover:bg-slate-600 rounded-xl transition-colors hidden sm:block" title="Settings">
                    <Settings className="w-5 h-5" />
                </button>
                <div className="w-px h-8 bg-slate-700 mx-1"></div>
                <button className="p-3 px-6 bg-red-500 text-white hover:bg-red-600 rounded-xl transition-colors font-medium flex gap-2 items-center" title="Leave Room">
                    <PhoneOff className="w-5 h-5" />
                    <span className="hidden sm:inline">Leave</span>
                </button>
            </div>

            <button className="absolute top-4 right-4 p-2 bg-black/40 hover:bg-black/60 text-white rounded-lg backdrop-blur-sm transition-colors">
                <Maximize className="w-5 h-5" />
            </button>
        </div>
    );
};

export default VideoPanel;
