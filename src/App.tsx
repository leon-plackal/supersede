import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Profile from './pages/profile';
import Notifications from './pages/notifications';
import AboutUs from './pages/aboutus';
import Login from './pages/login';
import Saved from './pages/saved';
import Home from './pages/home';
import Success from './pages/loginsuccess';
import React from 'react';
import { AuthProvider } from './supabase/Auth';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>
                    } />
                    <Route path="/profile" element=
                        {<ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>} />
                    <Route path="/notifications" element=
                        {<ProtectedRoute>
                            <Notifications />
                        </ProtectedRoute>} />
                    <Route path="/aboutus" element={<AboutUs />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/saved" element=
                        {<ProtectedRoute>
                            <Saved />
                        </ProtectedRoute>} />
                    <Route path="/success" element={<Success />} />
                </Routes>
            </AuthProvider>
        </Router>
    );
}

export default App;
