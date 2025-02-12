import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUp';
import Levels from './components/Levels';
import FlashCards from './components/FlashCards';
import Reviews from './components/Reviews';
import MCQTest from './components/MCQTest';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import React from "react";

const App = () => {
  return (
    <div>
      <Router>
        <nav className="navbar">
          <div className="navbar-container">
            <Link to="/" className="navbar-logo">VocApp</Link>
            <ul className="navbar-links">
              <li><Link to="/" className="navbar-link">Login</Link></li>
              <li><Link to="/signup" className="navbar-link">Sign Up</Link></li>
            </ul>
            <div className="hamburger-menu">
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/home/*" element={<Levels />}>
            <Route path="reviews" element={<Reviews />} />
            <Route path = "tests" element = {<MCQTest/>}/>
            <Route path="flash-card" element={<FlashCards />} />
          </Route>
          
        </Routes>
      </Router>
    </div>
  );
};

export default App;
