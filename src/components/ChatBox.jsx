import React, { useState } from 'react';
import { Send, Paperclip, Smile, MoreVertical } from 'lucide-react';

const ChatBox = ({ roomName = "Study Room" }) => {
    const [messages, setMessages] = useState([
        { id: 1, sender: "Alice", text: "Hey! Did everyone read chapter 4?", time: "10:30 AM", isMe: false },
        { id: 2, sender: "You", text: "Yes, I have some notes we can review.", time: "10:32 AM", isMe: true },
    ]);

    return (
        <div className="flex flex-col h-full bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90">
                <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white">{roomName} Discussion</h3>
                    <p className="text-xs text-slate-500 flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        3 members online
                    </p>
                </div>
                <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full dark:hover:bg-slate-800">
                    <MoreVertical className="w-5 h-5" />
                </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-900">
                {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[75%] ${msg.isMe ? 'order-2' : ''}`}>
                            {!msg.isMe && <p className="text-xs text-slate-500 mb-1 ml-1">{msg.sender}</p>}
                            <div
                                className={`p-3 rounded-2xl ${msg.isMe
                                        ? 'bg-primary text-white rounded-br-none'
                                        : 'bg-white text-slate-800 dark:bg-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-bl-none'
                                    }`}
                            >
                                <p className="text-sm">{msg.text}</p>
                            </div>
                            <p className={`text-xs text-slate-400 mt-1 ${msg.isMe ? 'text-right mr-1' : 'ml-1'}`}>
                                {msg.time}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2">
                    <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                        <Paperclip className="w-5 h-5" />
                    </button>
                    <div className="flex-1 relative">
                        <input
                            type="text"
                            placeholder="Type your message..."
                            className="w-full bg-slate-100 dark:bg-slate-800 border-transparent focus:border-primary focus:ring-0 rounded-full py-2.5 px-4 text-sm text-slate-900 dark:text-white"
                        />
                        <button className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                            <Smile className="w-5 h-5" />
                        </button>
                    </div>
                    <button className="p-3 rounded-full bg-primary text-white hover:bg-indigo-700 transition-colors">
                        <Send className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatBox;
