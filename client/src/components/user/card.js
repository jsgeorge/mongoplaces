import React, { useContext, useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import Avatar from "./avatar";
import { UserContext } from "../../context/user-context";

const UserCard = () => {
  const [redirect, setRedirect] = useState(false);
  // const [state, dispatch] = useContext(UserContext);
  //const [user, setUser] = useState({});
  const { user, setuser, isloggedin, setisloggedin } = useContext(UserContext);

  // console.log("in usercard user is", user);
  const renderCardImage = (images) => {
    return images[0].url;
  };
  useEffect(() => {
    //   if (state.user && state.user[0]) setUser(state.user[0].user);
  });
  const onLogout = () => {
    localStorage.clear();
    setuser({});
    setisloggedin(false);
    setRedirect(true);
  };

  return (
    <div className="user-card">
      {/* {state.user && state.user[0] ? ( */}
      {isloggedin && user ? (
        <span>
          <ul className="userlinks">
            <li>
              <Link to="/tweets/search">Explore</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
            <li>
              <Link to="/tweets/Lists/">Lists</Link>
            </li>
            <li>
              <Link to="/tweets/Messges/">Messages</Link>
            </li>
            <li>
              <Link to="/tweets/Messges/">Notifications</Link>
            </li>
            <li>
              <Link to="/tweets/Fvorites/">Favorites</Link>
            </li>
            <li>
              <Link to="/tweets/Messges/">Bookmarks</Link>
            </li>
          </ul>

          <div className="card-user">
            <Avatar images={user.images} size="avt-sm" />
            {!user.username && user.name
              ? user.name + " " + user.lastname
              : null}
            <span className="username">
              {user.username ? user.username : null}
            </span>
            <div>
              <button
                className="btn btn-default btnFlat btn-sm"
                onClick={() => onLogout()}
              >
                Logout
              </button>{" "}
            </div>
          </div>
        </span>
      ) : (
        <span>
          <Link className="btn btn-danger btnMed primary" to="/auth/signin">
            Signin
          </Link>{" "}
          <br />
          <Link className="btn btn-default btnDefault btnMed" to="/auth/signup">
            Signup
          </Link>
        </span>
      )}
    </div>
  );
};

export default UserCard;
