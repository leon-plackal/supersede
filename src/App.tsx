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

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/aboutus" element={<AboutUs />} />
                <Route path="/login" element={<Login />} />
                <Route path="/saved" element={<Saved />} />
                <Route path="/success" element={<Success />} />
            </Routes>
        </Router>
    );
}

export default App;
