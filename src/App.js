// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Game1 from './components/Game1'; // Import Game1 component
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Navbar from './components/Navbar';
import UserProvider from './contexts/UserContext';

function App() {
  return (
    <div className="App">
      <UserProvider>
        <Router>
          <Navbar />
          <header className="App-header">
            <Routes>
              <Route path="/" exact element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/game1" element={<Game1 />} /> {/* Add Game1 route */}
            </Routes>
          </header>
        </Router>
      </UserProvider>
    </div>
  );
}

export default App;
