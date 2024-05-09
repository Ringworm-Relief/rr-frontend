import React from 'react';
import './App.css';
import Landing from '../views/landing/Landing';
import { Routes, Route, Link } from 'react-router-dom';

function App() {

  return (
    <div className="App">
      <header className="App_header">
        <nav className='App_nav_bar'>
          <Link to='/education'>Education</Link>
          <Link to='/dashboard'>Dashboard</Link>
          <Link to='/something'>Something</Link>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Landing />} />
      </Routes>
    </div>
  );
}

export default App;
