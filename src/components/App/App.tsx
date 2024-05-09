import React from 'react';
import './App.css';
import Landing from '../views/landing/Landing';
import CreateAccount from '../views/createAccount/CreateAccount';
import Education from '../views/education/Education';
import { Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';

function App() {
  const [user, setUser] = useState({});

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
        <Route path='account/new' element={<CreateAccount/>}/>
        <Route path='education' element={<Education />}/>
      </Routes>
    </div>
  );
}

export default App;
