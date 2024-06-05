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
import { Button } from "@mui/material";
import { destroyToken } from "../../apiCalls/userApiCalls";
import ManageAccount from "../views/manageAccount/ManageAccount";
import PetDashboard from "../views/petDashboard/PetDashboard";
import AllPetsManagement from "../views/managePets/AllPetsManagement";
import { fetchPets } from "../../apiCalls/petApiCalls";

function App() {
  const activeUser = JSON.parse(
    sessionStorage.getItem("currentUser") || "false"
  );
  const savedArts: string[] = JSON.parse(
    localStorage.getItem("SAVED_ARTS") || "[]"
  );
  const PetsStorage = JSON.parse(localStorage.getItem("PETS") || "[]");

  const [user, setUser] = useState<any>(activeUser); //Holds the current user
  const [savedArticles, setSavedArticles] = useState<string[]>(savedArts);
  const [pets, setPets] = useState<any[]>(PetsStorage); //Holds the current user's pets
  const [targetPet, setTargetPet] = useState<any>(null); //Holds the pet that is currently being viewed
  const [pageRender, setPageRender] = useState<number>(0);

  const navigate = useNavigate();

  useEffect(() => {
    const savedArts: string[] = JSON.parse(
      localStorage.getItem("SAVED_ARTS") || "[]"
    );
    setSavedArticles(savedArts);
    !pageRender ?? navigate(`/user/${user.data.id}/dashboard`);
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
    setPageRender(pageRender + 1);
    sessionStorage.setItem("currentUser", JSON.stringify(user));
    setUser(JSON.parse(sessionStorage.getItem("currentUser") || "false"));
    // console.log(user);
    getUserPets();
    navigate(`/user/${user.data.id}/dashboard`);
    setTimeout(() => { //Sign out after 1 hour
      handleSignOut();
    }, 3600000);
  };

  const handleSignOut = () => {
    sessionStorage.removeItem("currentUser");
    destroyToken();
    setUser(false);
    navigate("/");
  };

  const getUserPets = () => {
    if(user.data.id) {
      fetchPets(user.data.id)
      .then((data: any) => {
        if (data && data.data && data.data.pets) {
          // setPets(data.data.pets);
          localStorage.removeItem("PETS");
          localStorage.setItem("PETS", JSON.stringify(data.data.pets)); 
          const PetsStorage = JSON.parse(localStorage.getItem("PETS") || "[]");
          setPets(PetsStorage); 
        } else {
          setPets([]);
        }
      })
    }
  };

  const setTargetPetFunc = (pet: any): void => {
    setTargetPet(pet);
    navigate(`/user/${user.data.id}/${pet.name}`);
  };

  return (
    <div className="App">
      <header className="App_header">
        <div className="App_nav_block_left">
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
              id="sign-in-link"
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
        </div>
        <div className="App_nav_block_right">
        {user ? ( //If user is logged in, show sign out button
          <div className="App_nav_links">
            <Button variant="contained" onClick={handleSignOut}>
              Sign Out
            </Button>
          </div>
        ) : (
          <div className="App_nav_links">
            <Link className="App_link" to="/account/signin">
            <Button variant="outlined">
              Sign In
            </Button>
            </Link>
          </div>
        )}
        <div className="App_nav_links" id="drawer">
          <Drawer user={user} />
        </div>
        </div>
      </header>
      <Routes>
        <Route path="/" element={<Landing />} />
        {user && (
          <Route
            path="/user/:user_id/addpet"
            element={<PetForm user={user} />}
          />
        )}
        <Route path="account/new" element={<CreateAccount />} />
        <Route
          path="account/signin"
          element={
            <SignIn setUser={setUser} setLoggedInUser={setLoggedInUser} />
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
        <Route
          path="/user/:user_id/dashboard"
          element={
            <MainDashboard
              handleSaves={handleSaves}
              savedArticles={savedArticles}
              user={user}
              pets={pets}
              setTargetPetFunc={setTargetPetFunc}
              pet={targetPet}
            />
          }
        />
        <Route
          path="/user/:user_id/calendar"
          element={<Calendar user={user} pet={targetPet} pets={pets} />}
        />
        <Route
          path="/user/:user_id/:pet_name"
          element={<PetDashboard pet={targetPet} user={user} pets={pets} />}
        />
        <Route
          path="/user/:user_id/management/account"
          element={<ManageAccount user={user} setUser={setUser}/>}
        ></Route>
         <Route
          path="/user/:user_id/management/pets"
          element={<AllPetsManagement setPets={setPets} user={user} />}
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
