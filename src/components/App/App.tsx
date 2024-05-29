import "./App.css";
import React from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import PetForm from "../views/petForm/PetForm";
import Landing from "../views/landing/Landing";
import CreateAccount from "../views/createAccount/CreateAccount";
import Education from "../views/education/Education";
import Calendar from "../views/calendar/Calendar";
import SignIn from "../views/signIn/SignIn";
import SavedArticles from "../views/savedArticles/SavedArticles";
import EducationCategory from "../views/educationCategory/EducationCategory";
import MainDashboard from "../views/mainDashboard/MainDashboard";
import Article from "../article/Article";
import Drawer from "../drawer/MuiDrawer";
import CoolCat from "../../assets/RR-4.svg";

import { User } from "../../utils/interfaces";
import { Button } from "@mui/material";
import { destroyToken } from "../../apiCalls/userApiCalls";
import ManageAccount from "../views/manageAccount/ManageAccount";
import { fetchPets } from "../../apiCalls/petApiCalls";
import PetDashboard from "../views/petDashboard/PetDashboard";
// localStorage.clear()
function App() {
  const activeUser = JSON.parse(
    sessionStorage.getItem("currentUser") || "false"
  );
  const savedArts: string[] = JSON.parse(
    localStorage.getItem("SAVED_ARTS") || "[]"
  );

  const [user, setUser] = useState<any>(activeUser); //Holds the current user
  const [savedArticles, setSavedArticles] = useState<string[]>(savedArts);
  const [pets, setPets] = useState<any[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const savedArts: string[] = JSON.parse(
      localStorage.getItem("SAVED_ARTS") || "[]"
    );
    setSavedArticles(savedArts);
    user ? navigate(`/user/${user.data.id}/dashboard`) : navigate("/");
  }, []);

  useEffect(() => {
    localStorage.setItem("SAVED_ARTS", JSON.stringify(savedArticles));
  }, [savedArticles]);

  const handleSaves = (id: string) => {
    setSavedArticles((prevSavedArticles) => {
      if (prevSavedArticles.includes(id)) {
        return prevSavedArticles.filter((articleId) => id !== articleId);
      } else {
        return [...prevSavedArticles, id];
      }
    });
  };

  const setLoggedInUser = (user: any) => {
    sessionStorage.setItem("currentUser", JSON.stringify(user));
    setUser(JSON.parse(sessionStorage.getItem("currentUser") || "false"));
    // console.log(user);
    getUserPets();
    navigate(`/user/${user.data.id}/dashboard`);
  };

  const handleSignOut = () => {
    sessionStorage.removeItem("currentUser");
    destroyToken();
    setUser(false);
    navigate("/");
  };

  const getUserPets = () => {
    fetchPets(user.data.id).then((data) => {
      //Will need to update with user token
      if (data) {
        setPets(data);
        console.log(data);
      }
    });
  };

  // handleSignOut()

  return (
    <div className="App">
      <header className="App_header">
        <div className="App_nav_links">
          <Link className="App_link_cat" to="/">
            <img
              id="cool-cat"
              src={CoolCat}
              alt="Cool cat outline wearing sunglasses"
              height="60px"
              width="60px"
            />
          </Link>
        </div>
        <nav className="App_nav">
          <div className="App_nav_links">
            <Link
              className="App_link"
              to={user ? `/user/${user.data.id}/calendar` : "/account/signin"}
            >
              Calendar
            </Link>
          </div>
          <div className="App_nav_links">
            <Link
              className="App_link"
              to={user ? `/user/${user.data.id}/dashboard` : "/account/signin"}
            >
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
          <Button variant="outlined" onClick={handleSignOut}>
            Sign Out
          </Button>
        </div>
        <div className="App_nav_links">
          <Drawer user={user} />
        </div>
      </header>
      <Routes>
        <Route path="/" element={<Landing />} />
        {user && <Route path="/user/:user_id/addpet" element={<PetForm user={user}/>} />}
        <Route
          path="account/new"
          element={
            <CreateAccount />
          }
        />
        <Route
          path="account/signin"
          element={
            <SignIn
              setUser={setUser}
              setLoggedInUser={setLoggedInUser}
            />
          }
        />
        <Route path="/education" element={<Education />} />
        <Route
          path="/savedarticles"
          element={
            <SavedArticles
              handleSaves={handleSaves}
              savedArticles={savedArticles}
            />
          }
        />
        <Route
          path="/education/:category"
          element={
            <EducationCategory
              handleSaves={handleSaves}
              savedArticles={savedArticles}
            />
          }
        />
        <Route path="/education/:category/:article" element={<Article />} />
        <Route path="/user/:user_id/dashboard" element={<MainDashboard handleSaves={handleSaves} savedArticles={savedArticles} user={user}/>} />
        <Route
          path="/user/:user_id/calendar"
          element={<Calendar user={user} />}
        />
        <Route path="/user/:user_id/:pet_name" element={<PetDashboard />}/>
        <Route
          path="/user/:user_id/manageaccount"
          element={<ManageAccount pets={pets} setPets={setPets} user={user}/>}
        ></Route>
        <Route path="*" element={<Landing />} />
      </Routes>
      <div id="footer_wrapper">
        <div id="footer_container">
          <footer className="App_footer">
            <p>Licensing info Syncfusion</p>
            <p>Contact us</p>
            <p>About</p>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default App;
