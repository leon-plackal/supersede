import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Profile from './pages/profile';
import Notifications from './pages/notifications';
import AboutUs from './pages/aboutus';
import Login from './pages/login';
import Saved from './pages/saved';
import Home from './pages/home';
import Success from './pages/loginsuccess';
import React, { useEffect, useState } from 'react';
import { AuthProvider } from './supabase/Auth';
import ProtectedRoute from './components/ProtectedRoute';
import { Toaster } from 'react-hot-toast';
import SplashScreen from './components/splashscreen';
import Privacy from './pages/privacy';


function App() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate loading time with setTimeout
        setTimeout(() => {
          setIsLoading(false);
        }, 4500);
      }, []);

    return (
        <Router>
            <Toaster toastOptions={{
                success: {
                    style: {
                        background: '#cffce5',
                    },
                },
                error: {
                    style: {
                        background: '#fcc0d0',
                    },
                },
                
            }}
               />
               {isLoading ? (
        <SplashScreen />
      ) : (
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
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/saved" element=
                        {<ProtectedRoute>
                            <Saved />
                        </ProtectedRoute>} />
                    <Route path="/success" element={<Success />} />
                </Routes>
            </AuthProvider>
      )}
        </Router>
    );
}

export default App;
