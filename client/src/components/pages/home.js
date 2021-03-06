import React, { useEffect, useContext, useState } from "react";
//import { MyButton } from "../utils/button";
import { Link, Redirect } from "react-router-dom";
import { UserContext } from "../../context/user-context";
// import jwtDecode from "jwt-decode";
// import axios from "axios";

export default function HomePage() {
  //const [state, dispatch] = useContext(UserContext);
  const { user, setuser, isloggedin } = useContext(UserContext);
  useEffect(() => {}, []);

  // if (localStorage.jwtToken || user) return <Redirect to="/tweets" />;
  if (isloggedin) return <Redirect to="/tweets" />;
  return (
    <div className="home-wrapper">
      <h1 className="welcome-text primary-clr">Welcome to MongoPlaces</h1>
      <div
        className="button_wrapper"
        style={{
          width: "100%",
          paddingTop: "15%",
          paddingBottom: "10%",
        }}
      >
        <div
          className="home-buttons"
          style={{ width: "190px", margin: "0px auto" }}
        >
          {/* <MyButton type="home" title="Login" linkTo="/login" />
          <MyButton type="home" title="Register" linkTo="/Register" /> */}
          <Link
            to="/auth/signin"
            className="btn btn-default btnDefault btnHome  "
          >
            {" "}
            Login
          </Link>
          <Link to="/auth/signup" className="btn btn-danger btnHome ">
            Signup
          </Link>{" "}
        </div>{" "}
      </div>
    </div>
  );
}
