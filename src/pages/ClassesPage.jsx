import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { Folder, FileText, File, Plus, Search, Download, Share2, Trash2 } from 'lucide-react';

// Mock data for classes and files
const classesData = [
    {
        id: 1,
        name: 'Advanced Data Structures',
        professor: 'Dr. Robert Johnson',
        semester: 'Spring 2025',
        students: 45,
        files: [
            { id: 101, name: 'Lecture_1_Arrays_LinkedLists.pdf', size: '2.4 MB', date: '2025-02-15' },
            { id: 102, name: 'Lecture_2_Stacks_Queues.pdf', size: '1.8 MB', date: '2025-02-18' },
            { id: 103, name: 'Assignment_1.docx', size: '512 KB', date: '2025-02-12' },
            { id: 104, name: 'Trees_Graph_Theory.pdf', size: '3.1 MB', date: '2025-02-20' }
        ]
    },
    {
        id: 2,
        name: 'Web Development with React',
        professor: 'Prof. Emily Chen',
        semester: 'Spring 2025',
        students: 52,
        files: [
            { id: 201, name: 'React_Basics.pdf', size: '1.5 MB', date: '2025-02-10' },
            { id: 202, name: 'Hooks_and_State_Management.pdf', size: '2.2 MB', date: '2025-02-17' },
            { id: 203, name: 'Project_Requirements.docx', size: '780 KB', date: '2025-02-14' }
        ]
    },
    {
        id: 3,
        name: 'Linear Algebra Fundamentals',
        professor: 'Dr. Michael Brown',
        semester: 'Spring 2025',
        students: 38,
        files: [
            { id: 301, name: 'Matrices_and_Vectors.pdf', size: '2.8 MB', date: '2025-02-16' },
            { id: 302, name: 'Eigenvalues_Eigenvectors.pdf', size: '2.0 MB', date: '2025-02-19' },
            { id: 303, name: 'Problem_Set_1.pdf', size: '1.2 MB', date: '2025-02-13' }
        ]
    },
    {
        id: 4,
        name: 'Database Design & SQL',
        professor: 'Prof. Sarah Williams',
        semester: 'Spring 2025',
        students: 41,
        files: [
            { id: 401, name: 'Database_Normalization.pdf', size: '2.1 MB', date: '2025-02-18' },
            { id: 402, name: 'SQL_Queries_Guide.pdf', size: '1.9 MB', date: '2025-02-17' },
            { id: 403, name: 'Schema_Design_Examples.docx', size: '950 KB', date: '2025-02-15' }
        ]
    }
];

const ClassesPage = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [selectedClass, setSelectedClass] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [showCreateClass, setShowCreateClass] = useState(false);

    const filteredClasses = classesData.filter(cls =>
        cls.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(parseInt(bytes.split(' ')[0]) * k) / Math.log(k));
        return bytes;
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
            <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
            <Sidebar isOpen={sidebarOpen} />

            <main className="p-4 sm:ml-64 pt-24 transition-all">
                <div className="max-w-7xl mx-auto space-y-6">

                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-poppins font-bold text-slate-900 dark:text-white mb-2">
                                My Classes
                            </h1>
                            <p className="text-slate-500 dark:text-slate-400">
                                Browse classes, access files, and join study groups
                            </p>
                        </div>
                        <button
                            onClick={() => setShowCreateClass(true)}
                            className="px-6 py-3 bg-primary text-white font-medium rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/20 flex items-center gap-2 w-fit"
                        >
                            <Plus className="w-5 h-5" />
                            Enroll Class
                        </button>
                    </div>

                    {/* Search Bar */}
                    <div className="relative">
                        <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search classes..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                    </div>

                    {/* Classes Grid */}
                    <div className="grid lg:grid-cols-3 gap-6">
                        
                        {/* Classes List */}
                        <div className="lg:col-span-1 space-y-3">
                            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                                Classes ({filteredClasses.length})
                            </h2>
                            {filteredClasses.map((cls) => (
                                <button
                                    key={cls.id}
                                    onClick={() => setSelectedClass(cls)}
                                    className={`w-full text-left p-4 rounded-xl border transition-all ${
                                        selectedClass?.id === cls.id
                                            ? 'bg-indigo-50 dark:bg-indigo-900/30 border-indigo-300 dark:border-indigo-700 shadow-md'
                                            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700'
                                    }`}
                                >
                                    <h3 className="font-semibold text-slate-900 dark:text-white line-clamp-1">
                                        {cls.name}
                                    </h3>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                                        {cls.professor}
                                    </p>
                                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">
                                        {cls.students} students • {cls.files.length} files
                                    </p>
                                </button>
                            ))}
                        </div>

                        {/* Files Panel */}
                        <div className="lg:col-span-2">
                            {selectedClass ? (
                                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                                    
                                    {/* Class Header */}
                                    <div className="mb-6 pb-6 border-b border-slate-200 dark:border-slate-800">
                                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                                            {selectedClass.name}
                                        </h2>
                                        <div className="grid grid-cols-3 gap-4 mt-4">
                                            <div className="text-sm">
                                                <p className="text-slate-500 dark:text-slate-400">Professor</p>
                                                <p className="font-semibold text-slate-900 dark:text-white">
                                                    {selectedClass.professor}
                                                </p>
                                            </div>
                                            <div className="text-sm">
                                                <p className="text-slate-500 dark:text-slate-400">Semester</p>
                                                <p className="font-semibold text-slate-900 dark:text-white">
                                                    {selectedClass.semester}
                                                </p>
                                            </div>
                                            <div className="text-sm">
                                                <p className="text-slate-500 dark:text-slate-400">Students</p>
                                                <p className="font-semibold text-slate-900 dark:text-white">
                                                    {selectedClass.students}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Files List */}
                                    <div>
                                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                                            Study Materials ({selectedClass.files.length})
                                        </h3>
                                        <div className="space-y-3">
                                            {selectedClass.files.map((file) => (
                                                <div
                                                    key={file.id}
                                                    className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-slate-200 dark:border-slate-700"
                                                >
                                                    <div className="flex items-center gap-3 flex-1 min-w-0">
                                                        <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                                                            {file.name.endsWith('.pdf') ? (
                                                                <FileText className="w-5 h-5 text-red-500" />
                                                            ) : (
                                                                <File className="w-5 h-5 text-blue-500" />
                                                            )}
                                                        </div>
                                                        <div className="min-w-0 flex-1">
                                                            <p className="font-medium text-slate-900 dark:text-white truncate">
                                                                {file.name}
                                                            </p>
                                                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                                                {file.size} • {new Date(file.date).toLocaleDateString()}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2 ml-4">
                                                        <button className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">
                                                            <Download className="w-4 h-4" />
                                                        </button>
                                                        <button className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">
                                                            <Share2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-12 text-center">
                                    <Folder className="w-16 h-16 text-slate-300 dark:text-slate-700 mx-auto mb-4" />
                                    <p className="text-slate-500 dark:text-slate-400 text-lg">
                                        Select a class to view files
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            {/* Create Class Modal */}
            {showCreateClass && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 max-w-md w-full border border-slate-200 dark:border-slate-800">
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                            Enroll in Class
                        </h3>
                        <input
                            type="text"
                            placeholder="Class code"
                            className="w-full px-4 py-2.5 mb-4 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowCreateClass(false)}
                                className="flex-1 px-4 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-medium rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => setShowCreateClass(false)}
                                className="flex-1 px-4 py-2.5 bg-primary text-white font-medium rounded-xl hover:bg-indigo-700 transition-colors"
                            >
                                Enroll
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ClassesPage;
