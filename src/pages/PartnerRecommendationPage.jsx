import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import RecommendationCard from '../components/RecommendationCard';
import { useAuth } from '../context/AuthContext';
import { SlidersHorizontal, Search, MessageCircle, UserPlus, Star } from 'lucide-react';
import { recommendPeers, generateMockPeers, createConnectionRequest } from '../utils/peerConnection';

const PartnerRecommendationPage = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredPeers, setFilteredPeers] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState('All');
    const [connectionRequests, setConnectionRequests] = useState({});
    const { user } = useAuth();

    useEffect(() => {
        // Generate mock peers and recommend based on current user
        const allPeers = generateMockPeers();
        const recommended = recommendPeers(
            user?.interests || ['Machine Learning', 'Web Development'],
            allPeers
        );
        setFilteredPeers(recommended);
    }, [user]);

    const handleFilter = (filter) => {
        setSelectedFilter(filter);
        let peers = generateMockPeers();
        const recommended = recommendPeers(
            user?.interests || ['Machine Learning', 'Web Development'],
            peers
        );

        if (filter !== 'All') {
            if (filter === 'High Match (>90%)') {
                peers = recommended.filter(p => p.compatibilityScore > 90);
            } else if (filter === 'Currently Online') {
                peers = recommended.filter(p => p.availability === 'Available Now');
            }
        } else {
            peers = recommended;
        }

        setFilteredPeers(peers);
    };

    const handleSearch = (term) => {
        setSearchTerm(term);
        const allPeers = generateMockPeers();
        const recommended = recommendPeers(
            user?.interests || ['Machine Learning', 'Web Development'],
            allPeers
        );

        if (term.trim()) {
            setFilteredPeers(
                recommended.filter(p =>
                    p.name.toLowerCase().includes(term.toLowerCase()) ||
                    p.major.toLowerCase().includes(term.toLowerCase()) ||
                    p.interests.some(i => i.toLowerCase().includes(term.toLowerCase()))
                )
            );
        } else {
            setFilteredPeers(recommended);
        }
    };

    const handleConnect = (peer) => {
        const request = createConnectionRequest(user, peer);
        setConnectionRequests(prev => ({
            ...prev,
            [peer.id]: true
        }));
        // In a real app, this would send to backend
        console.log('Connection request sent:', request);
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col h-screen overflow-hidden">
            <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
            <Sidebar isOpen={sidebarOpen} />

            <main className="flex-1 p-4 sm:ml-64 pt-24 transition-all overflow-y-auto w-full">
                <div className="max-w-6xl mx-auto space-y-6">

                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                            <h1 className="text-3xl font-poppins font-bold text-slate-900 dark:text-white">Study Partners</h1>
                            <p className="text-slate-500 dark:text-slate-400 mt-1">Discover peers with similar goals and study habits using intelligent matching.</p>
                        </div>

                        <div className="flex gap-2 w-full sm:w-auto">
                            <div className="relative flex-1 sm:w-64">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Search by name, major..."
                                    value={searchTerm}
                                    onChange={(e) => handleSearch(e.target.value)}
                                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary focus:border-primary transition-colors text-slate-900 dark:text-white"
                                />
                            </div>
                            <button className="p-2 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                <SlidersHorizontal className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4">
                        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                            <p className="text-sm text-slate-500 dark:text-slate-400">Available Peers</p>
                            <p className="text-2xl font-bold text-slate-900 dark:text-white">{filteredPeers.length}</p>
                        </div>
                        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                            <p className="text-sm text-slate-500 dark:text-slate-400">Avg. Match Score</p>
                            <p className="text-2xl font-bold text-indigo-600">
                                {filteredPeers.length > 0 
                                    ? Math.round(filteredPeers.reduce((sum, p) => sum + p.compatibilityScore, 0) / filteredPeers.length)
                                    : 0}%
                            </p>
                        </div>
                        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                            <p className="text-sm text-slate-500 dark:text-slate-400">Your Interests</p>
                            <p className="text-2xl font-bold text-teal-600">{user?.interests?.length || 3}</p>
                        </div>
                    </div>

                    {/* Featured Matches */}
                    <section className="pt-4">
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                            Top Matches for You ({filteredPeers.length})
                        </h2>
                        {filteredPeers.length > 0 ? (
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {filteredPeers.map((peer) => (
                                    <div
                                        key={peer.id}
                                        className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-lg transition-shadow"
                                    >
                                        {/* Card Header */}
                                        <div className="relative h-24 bg-gradient-to-r from-indigo-400 to-teal-400">
                                            <div className="absolute -bottom-8 left-4">
                                                <img
                                                    src={peer.avatar}
                                                    alt={peer.name}
                                                    className="w-20 h-20 rounded-full border-4 border-white dark:border-slate-900 object-cover"
                                                />
                                            </div>
                                        </div>

                                        {/* Card Body */}
                                        <div className="pt-12 pb-4 px-4">
                                            <h3 className="font-bold text-slate-900 dark:text-white text-lg">
                                                {peer.name}
                                            </h3>
                                            <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                                                {peer.major}
                                            </p>

                                            {/* Match Score */}
                                            <div className="flex items-center gap-2 mb-4 p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg">
                                                <Star className="w-4 h-4 text-indigo-600" />
                                                <span className="font-semibold text-indigo-600">
                                                    {peer.compatibilityScore}% Match
                                                </span>
                                            </div>

                                            {/* Common Interests */}
                                            <div className="mb-4">
                                                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mb-2">
                                                    Common Interests
                                                </p>
                                                <div className="flex flex-wrap gap-1">
                                                    {peer.commonInterests?.slice(0, 2).map((interest, i) => (
                                                        <span
                                                            key={i}
                                                            className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full"
                                                        >
                                                            {interest}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Availability */}
                                            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                                                <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                                                {peer.availability}
                                            </p>

                                            {/* Action Buttons */}
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleConnect(peer)}
                                                    disabled={connectionRequests[peer.id]}
                                                    className={`flex-1 py-2 px-3 rounded-lg font-medium flex items-center justify-center gap-1 transition-all ${
                                                        connectionRequests[peer.id]
                                                            ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 cursor-default'
                                                            : 'bg-indigo-600 text-white hover:bg-indigo-700'
                                                    }`}
                                                >
                                                    <UserPlus className="w-4 h-4" />
                                                    {connectionRequests[peer.id] ? 'Requested' : 'Connect'}
                                                </button>
                                                <button className="py-2 px-3 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                                                    <MessageCircle className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
                                <p className="text-slate-500 dark:text-slate-400">No peers found matching your criteria</p>
                            </div>
                        )}
                    </section>

                    {/* Filter Chips */}
                    <div className="flex flex-wrap gap-2 pb-8">
                        {['All', 'High Match (>90%)', 'Currently Online'].map((filter) => (
                            <button
                                key={filter}
                                onClick={() => handleFilter(filter)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                                    selectedFilter === filter
                                        ? 'bg-primary text-white'
                                        : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-primary/50'
                                }`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>

                </div>
            </main>
        </div>
    );
};

export default PartnerRecommendationPage;
