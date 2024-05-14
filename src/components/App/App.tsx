
import React from 'react';
import PetForm from '../views/petForm/PetForm';
import "./App.css";
import Landing from "../views/landing/Landing";
import CreateAccount from "../views/createAccount/CreateAccount";
import Education from "../views/education/Education";
import Calendar from "../views/calendar/Calendar";
import Article from "../article/Article";
import MainDashboard from "../views/mainDashboard/MainDashboard";
import { Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Drawer from "../drawer/MuiDrawer";
import SignIn from "../views/signIn/SignIn";
import CoolCat from "../../assets/RR-4.svg";
import EducationCategory from '../views/educationCategory/EducationCategory';
import { fetchUser } from "../../apiCalls/userApiCalls";


function App() {
  const [user, setUser] = useState<any>({}); //Holds the user object to be passed to the dashboard && used for conditional rendering
  const [targetArticle, setTargetArticle] = useState({}); //Holds the target article to be passed to the article component
  const [events, setEvents] = useState<any[]>([]);
  // const handleArticleClick = () => {
  //   navigate(`/education/${article.title}/${article.tagline}`)
  // }

  //Change useEffect when login page is created -> instead of fetching user, fetch user by email and password
  //Must createAccount to access user right now since no data exists in the mock server
  useEffect(() => {
    const user = {
      id: 1,
      first_name: "John",
      last_name: "Doe",
    }
   setUser(user)

  }, [])

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
            <Link className="App_link" to={user.id ? `/user/${user.id}/calendar` : '/account/signin'}>
              Calendar
            </Link>
          </div>
          <div className="App_nav_links">
            <Link className="App_link" to={user.id ? `/user/${user.id}/dashboard` : '/account/signin'}>
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
        <Route path="account/new" element={<CreateAccount />} />
        <Route path="account/signin" element={<SignIn setUser={setUser}/>} />
        <Route path="/education" element={<Education />} />
        <Route path="/education/:category" element={<EducationCategory />} />
        <Route path="/education/:category/:article" element={<Article />} />
        <Route path="/user/:user_id/calendar" element={<Calendar user={user} events={events} setEvents={setEvents}/>} />
        <Route path="/user/:user_id/dashboard" element={<MainDashboard user={user}/>} />

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
