
import "./App.css";
import React from 'react';
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import PetForm from '../views/petForm/PetForm';
import Landing from "../views/landing/Landing";
import CreateAccount from "../views/createAccount/CreateAccount";
import Education from "../views/education/Education";
import Calendar from "../views/calendar/Calendar";
import SignIn from "../views/signIn/SignIn";
import SavedArticles from "../views/savedArticles/SavedArticles"
import EducationCategory from "../views/educationCategory/EducationCategory";
import MainDashboard from "../views/mainDashboard/MainDashboard";
import Article from "../article/Article";
import Drawer from "../drawer/MuiDrawer";
import CoolCat from "../../assets/RR-4.svg";
import { User } from '../../utils/interfaces';
import { Button } from "@mui/material";
// import { fetchUser } from "../../apiCalls/userApiCalls";

function App() {
  const activeUser =  JSON.parse(sessionStorage.getItem('currentUser') || 'false')
  const savedArts: string[] = JSON.parse(localStorage.getItem("SAVED_ARTS") || '[]')
  const [user, setUser] = useState<any>(activeUser); //Holds the user object to be passed to the dashboard && used for conditional rendering
  const [savedArticles, setSavedArticles] = useState<string[]>(savedArts)
  const [allUsers, setAllUsers] = useState<User[]>([])
  const navigate = useNavigate();

  useEffect(() => {
    const savedArts: string[] = JSON.parse(localStorage.getItem("SAVED_ARTS") || '[]');
    setSavedArticles(savedArts);
    user ? navigate(`/user/${user.data.id}/dashboard`) : navigate('/')
  }, []); 

  useEffect(() => {
    localStorage.setItem("SAVED_ARTS", JSON.stringify(savedArticles));
  }, [savedArticles]); 


  const handleSaves = (id: string) => {
    setSavedArticles(prevSavedArticles => {
      if (prevSavedArticles.includes(id)) {
        return prevSavedArticles.filter(articleId => id !== articleId);
      } else {
        return [...prevSavedArticles, id];
      }
    });
  };

  const setLoggedInUser = (user: any) => {
    sessionStorage.setItem('currentUser', JSON.stringify(user));
    setUser(JSON.parse(sessionStorage.getItem('currentUser') || 'false'))
    console.log(user)
    navigate(`/user/${user.data.id}/dashboard`)
  }

  const handleSignOut = () => {
    sessionStorage.removeItem('currentUser');
    setUser(false);
    navigate('/')
  }

  return (
    <div className="App">
      <header className="App_header">
          <div className='App_nav_links'>
            <Link className="App_link_cat" to="/">
              <img id='cool-cat' src={CoolCat} alt='Cool cat outline wearing sunglasses' height='60px' width='60px' />
            </Link>
          </div>
        <nav className="App_nav">
          <div className="App_nav_links">
            <Link className="App_link" to={user ? `/user/${user.data.id}/calendar` : '/account/signin'}>
              Calendar
            </Link>
          </div>
          <div className="App_nav_links">
            <Link className="App_link" to={user ? `/user/${user.data.id}/dashboard` : '/account/signin'}>
              Dashboard
            </Link>
          </div>
          <div className="App_nav_links">
            <Link className="App_link" to="/education">
              Education
            </Link>
          </div>
        </nav>
          <div className="App_nav_links">
            <Button variant="outlined" onClick={handleSignOut}>Sign Out</Button>
          </div>
          <div className="App_nav_links">
            <Drawer user={user}/>
          </div>
      </header>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/user/:user_id/addpet" element={<PetForm />} />
        <Route path="account/new" element={<CreateAccount setAllUsers={setAllUsers} allUsers={allUsers}/>} />
        <Route path="account/signin" element={<SignIn setUser={setUser} setLoggedInUser={setLoggedInUser}/>} />
        <Route path="/education" element={<Education />} />
        <Route path="/savedarticles" element={<SavedArticles handleSaves={handleSaves} savedArticles={savedArticles}/>} />
        <Route path="/education/:category" element={<EducationCategory handleSaves={handleSaves} savedArticles={savedArticles}/>} />
        <Route path="/education/:category/:article" element={<Article />} />
        <Route path="/user/:user_id/calendar" element={<Calendar user={user}/>} />
        <Route path="/user/:user_id/dashboard" element={<MainDashboard user={user}/>} />
        <Route path='*' element={<Landing />}/>
      </Routes>
      <footer className="App_footer">
        <p>Licensing info Syncfusion</p>
        <p>Contact us</p>
        <p>About</p>
      </footer>
    </div>
  );
}

export default App;
