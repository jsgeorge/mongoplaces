import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/user-context";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Avatar from "./../user/avatar";
import SearchTweets from "../tweets/search";
import SideDrawer from "./sideDrawer";
import Backdrop from "./backdrop";
import UserPage from "../user";

const Header = () => {
  //const [redirect, setRedirect] = useState(false);
  //const [state, dispatch] = useContext(UserContext);
  const [setError] = useState("");
  const { user, isloggedin } = useContext(UserContext);
  const [draweropen, setdraweropen] = useState(false);

  useEffect(() => {});

  const handleOpenUserMenu = () => {
    setdraweropen(true);
    console.log(draweropen);
  };

  const handleCloseUserMenu = () => {
    setdraweropen(false);
    console.log(draweropen);
  };

  return (
    <React.Fragment>
      {draweropen && <Backdrop onClick={() => handleCloseUserMenu()} />}
      {draweropen && (
        <SideDrawer show={draweropen} onClick={() => handleCloseUserMenu()}>
          <UserPage />
        </SideDrawer>
      )}
      <div className="header">
        <nav
          className="navbar navbar-expand-lg navbar-dark bg-danger fixed-top primary"
          style={{
            margin: "0",
            padding: "15px",
          }}
        >
          <div className="container">
            <div className="navbar-header">
              {/* {!state.user && !state.user[0] ? ( */}

              <Link to="/tweets">
                {" "}
                <span className="desk">MongoPlaces</span>
                <span className="mobile">MP</span>
              </Link>
            </div>
            {isloggedin ? (
              <div className="navbar-left desktop-search">
                <SearchTweets />{" "}
              </div>
            ) : null}
            <div className="navbar-right">
              <Link to="/tweets">
                <FontAwesomeIcon icon={faHome} size="lg" className="btn-clr" />{" "}
              </Link>

              <Link to="/tweets/search" className="btnMobileSrch">
                <FontAwesomeIcon
                  icon={faSearch}
                  size="lg"
                  className="btn-clrr"
                />
              </Link>
              {/* {state.user && state.user[0] ? ( */}
              {isloggedin ? (
                <Link
                  to="/tweets/add"
                  className="btnAddTweet"
                  style={{ background: "transparent", border: "none" }}
                >
                  <FontAwesomeIcon
                    icon={faPlusCircle}
                    size="lg"
                    className="btn-clr"
                  />
                </Link>
              ) : null}

              {/* { state.user && state.user[0] && state.user[0].user && state.user[0].user.images ? ( */}
              {isloggedin && user ? (
                <span>
                  <Link to="/user/profile" className="desk">
                    {/* <Avatar images={state.user[0].user.images} size="avt-sm" />  */}
                    <Avatar images={user.images} size="avt-head" />
                  </Link>
                  {/* <Link to="/user" className="mobile">
                    <Avatar images={user.images} size="avt-head" />
                  </Link> */}
                  <button
                    onClick={() => handleOpenUserMenu()}
                    className="btnLinkAvatar mobile"
                  >
                    <Avatar images={user.images} size="avt-head" />
                  </button>
                </span>
              ) : (
                <Link to="/auth/signin">
                  <span>Signin</span>
                </Link>
              )}
            </div>
          </div>
        </nav>
      </div>
    </React.Fragment>
  );
};

export default Header;
