import React, { useEffect, useState, useContext } from "react";
import "./App.css";
import Routes from "./routes";
import { BrowserRouter } from "react-router-dom";
import jwtDecode from "jwt-decode";
import axios from "axios";

import Header from "./components/layout/header";
//import { UserContextProvider } from "./context/user-context";
import { UserContext } from "./context/user-context";
import { UsersContext } from "./context/users-context";
import { PlaceContextProvider } from "./context/tweet-context";
import { CategoryContextProvider } from "./context/category-context";
import setAuthorizationToken from "./utils/setAuthToken";

function App() {
  const [isloggedin, setisloggedin] = useState(false);
  const [user, setuser] = useState({});
  const [users, setusers] = useState({});

  useEffect(() => {
    const setAuthUser = async (token) => {
      try {
        const response = await axios.post("/users/id", { id: token.id });
        setuser(response.data.user);
      } catch (err) {
        console.log(err);
      }
    };

    if (localStorage.jwtToken) {
      console.log("User is authenticted");
      setisloggedin(true);
      setAuthUser(jwtDecode(localStorage.jwtToken));
      setAuthorizationToken(localStorage.jwtToken);
    }
  }, []);

  return (
    <UserContext.Provider value={{ isloggedin, setisloggedin, user, setuser }}>
      <UsersContext.Provider value={{ users, setusers }}>
        <CategoryContextProvider>
          <PlaceContextProvider>
            <BrowserRouter>
              <Header />
              <div className="container ">
                <Routes />
              </div>
            </BrowserRouter>
          </PlaceContextProvider>
        </CategoryContextProvider>
      </UsersContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
