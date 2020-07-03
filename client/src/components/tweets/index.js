import React, { useContext, useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
// import jwtDecode from "jwt-decode";
// import axios from "axios";
import AddTweet from "./add";
import { UserContext } from "../../context/user-context";

import TweetListing from "./listing";
import UserCard from "../user/card";
import Categories from "../categories";
//import UserSignin from "../auth/login";

export default function TweetsPage() {
//const [state, dispatch] = useContext(UserContext);
  
  //const [isAuthenticted, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");
  const {user, setuser} = useContext(UserContext);

  useEffect(() => {
   console.log('TweetsPage user:', user);
  //  const setAuthUser = async (token) => {
  //     const response = await axios.post("/users/id", { id: token.id });
  //     dispatch({
  //         type: "SET_USER",
  //         payload: response.data,
  //     });
  //   };
  //   if (localStorage.jwtToken){
  //       console.log('User is authenticted')
  //       setAuthUser(jwtDecode(localStorage.getItem("jwtToken")));
  //   }   
      },[]);
      

  if (error) return <Redirect to="/auth/signin" />;
  // if (state.user) console.log(state.user[0]);
  return (
   <div className="page-wrapper">
    <div className="row">
      <div className="col-lg-3 col-md-2  col-sm-3 col-xs-3 Lsidebar">
        <UserCard />
      </div>
      <div className="col-lg-6 col-md-7 col-sm-8 col-xs-9 content">
        <h4>
          <strong>Home</strong>
        </h4>
        <div className="add-tweet-panel">
          {/* {state.user && state.user[0] ? (
            <AddTweet
              type="desktop"
              user={state.user[0].user}
            />
          ) : null} */}
           {user ? (
            <AddTweet
              type="desktop"
              user={user}
            />
          ) : null}
        </div>
        <TweetListing />
      </div>
      <div className="col-lg-3 col-md-3 col-sm-2 col-xs-4 Rsidebar">
        <div className="desktop-categories">
          <Categories />
        </div>
      </div>
    </div>
    </div>
  );
}
