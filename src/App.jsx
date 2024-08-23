import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import UpdateShopData from './pages/UpdateShopData';
import ProtectedRoute from './auth/ProtectedRoute';
import Login from './pages/Login';
import './App.css';
import ShowData from './pages/ShowData';
import HomePage from './pages/HomePage';
import Contact from './pages/Contact';
import About from './pages/About';

function App() {
    return (
        <Router>
            <div>
                <Navbar />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/showData" element={<ShowData />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/updateShopData"
                        element={
                            <ProtectedRoute>
                                <UpdateShopData />
                            </ProtectedRoute>
                        } />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
