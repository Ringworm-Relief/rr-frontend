import "./App.css";
import Landing from "../views/landing/Landing";
import CreateAccount from "../views/createAccount/CreateAccount";
import Education from "../views/education/Education";
import Calendar from "../views/calendar/Calendar";
import Article from "../article/Article";
import MainDashboard from "../views/mainDashboard/MainDashboard";
import { Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import { Box } from "@mui/material";
import Drawer from "../drawer/MuiDrawer";
import SignIn from "../signIn/SignIn";

function App() {
  const [user, setUser] = useState({}); //Holds the user object to be passed to the dashboard && used for conditional rendering
  const [targetArticle, setTargetArticle] = useState({}); //Holds the target article to be passed to the article component

  // const handleArticleClick = () => {
  //   navigate(`/education/${article.title}/${article.tagline}`)
  // }

  return (
    <div className="App">
      <header className="App_header">
        <nav className="App_nav">
          <div className="App_nav_links">
            <Link className="App_link" to="/user/1/calendar">
              Calendar
            </Link>
          </div>
          <div className="App_nav_links">
            <Link className="App_link" to="/user/1/dashboard">
              Dashboard
            </Link>
          </div>
          <div className="App_nav_links">
            <Link className="App_link" to="/education">
              Education
            </Link>
          </div>
          <div className="App_nav_links">
            <Drawer />
          </div>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="account/new" element={<CreateAccount />} />
        <Route path="account/signin" element={<SignIn />} />
        <Route path="/education" element={<Education />} />
        <Route path="/education/:category/:article" element={<Article />} />
        <Route path="/user/1/calendar" element={<Calendar />} />
        {/* user/1/calendar -> user/:num/calendar */}
        <Route path="/user/1/dashboard" element={<MainDashboard />} />
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
