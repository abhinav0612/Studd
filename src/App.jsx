import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import ProfilePage from './pages/ProfilePage';
import StudyRoomPage from './pages/StudyRoomPage';
import QuizGeneratorPage from './pages/QuizGeneratorPage';
import PartnerRecommendationPage from './pages/PartnerRecommendationPage';
import AdminPanel from './pages/AdminPanel';
import ClassesPage from './pages/ClassesPage';

// Protected Route Component
const ProtectedRoute = ({ element }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
        <div className="text-slate-900 dark:text-white">Loading...</div>
      </div>
    );
  }

  return isAuthenticated ? element : <Navigate to="/login" replace />;
};

function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <LandingPage />} />
        <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage />} />

        {/* Protected Routes */}
        <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
        <Route path="/profile" element={<ProtectedRoute element={<ProfilePage />} />} />
        <Route path="/room/:id" element={<ProtectedRoute element={<StudyRoomPage />} />} />
        <Route path="/quizzes" element={<ProtectedRoute element={<QuizGeneratorPage />} />} />
        <Route path="/partners" element={<ProtectedRoute element={<PartnerRecommendationPage />} />} />
        <Route path="/classes" element={<ProtectedRoute element={<ClassesPage />} />} />
        <Route path="/admin" element={<ProtectedRoute element={<AdminPanel />} />} />

        {/* Fallbacks */}
        <Route path="/groups" element={<ProtectedRoute element={<Dashboard />} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
