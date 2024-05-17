
import React from 'react';
import PetForm from '../views/petForm/PetForm';
import "./App.css";
import Landing from "../views/landing/Landing";
import CreateAccount from "../views/createAccount/CreateAccount";
import Education from "../views/education/Education";
import Calendar from "../views/calendar/Calendar";
import Article from "../article/Article";
import MainDashboard from "../views/mainDashboard/MainDashboard";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Drawer from "../drawer/MuiDrawer";
import SignIn from "../views/signIn/SignIn";
import SavedArticles from "../views/savedArticles/SavedArticles"
import EducationCategory from "../views/educationCategory/EducationCategory";
import CoolCat from "../../assets/RR-4.svg";
import { User } from '../../utils/interfaces';
import { useNavigate } from 'react-router-dom';
// import { fetchUser } from "../../apiCalls/userApiCalls";
//hi

function App() {
  const activeUser =  JSON.parse(sessionStorage.getItem('currentUser') || '{}')
  const [user, setUser] = useState<any>(activeUser); //Holds the user object to be passed to the dashboard && used for conditional rendering
  const [targetArticle, setTargetArticle] = useState({}); //Holds the target article to be passed to the article component
  const savedArts: string[] = JSON.parse(localStorage.getItem("SAVED_ARTS") || '[]')
  const [savedArticles, setSavedArticles] = useState<string[]>(savedArts)
  const [allUsers, setAllUsers] = useState<User[]>([])
  const navigate = useNavigate();

  useEffect(() => {
    const savedArts: string[] = JSON.parse(localStorage.getItem("SAVED_ARTS") || '[]');
    setSavedArticles(savedArts);
    user ? navigate(`/user/${user.data.id}/dashboard`) : navigate('/')
    // console.log(user)
    // 
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

  // const handleArticleClick = () => {
  //   navigate(`/education/${article.title}/${article.tagline}`)
  // }

  //Change useEffect when login page is created -> instead of fetching user, fetch user by email and password
  //Must createAccount to access user right now since no data exists in the mock server
  // useEffect(() => {
  //  sessionStorage.getItem('currentUser') && setUser(JSON.parse(localStorage.getItem('currentUser') || '{}'))
  // }, [user])

  const setLoggedInUser = () => {
    setUser(JSON.parse(sessionStorage.getItem('currentUser') || '{}'))
    console.log(user)
    navigate(`/user/${user.data.id}/dashboard`)
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
            <Link className="App_link" to={user.data.id ? `/user/${user.data.id}/calendar` : '/account/signin'}>
              Calendar
            </Link>
          </div>
          <div className="App_nav_links">
            <Link className="App_link" to={user.data.id ? `/user/${user.data.id}/dashboard` : '/account/signin'}>
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
        {/* user/1/calendar -> user/:num/calendar */}
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
