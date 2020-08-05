import React, { useContext, useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../context/user-context";
import FileUpload from "../utils/fileupload";
import Avatar from "./avatar";
import UserCard from "./card";
import Categories from "../categories";
//import jwtDecode from "jwt-decode";
import TweetListing from "../tweets";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faLongArrowAltLeft } from "@fortawesome/free-solid-svg-icons";
import FollowingListing from "./following";
import LikeListing from "./likes";
import LoadingSpinner from "../utils/LoadingSpinner";

// import jwtDecode from "jwt-decode";
// import axios from "axios";

const ProfilePage = ({ match }) => {
  const [redirect, setRedirect] = useState(false);
  // const [state, dispatch] = useContext(UserContext);
  const { user, setuser, isloggedin, setisloggedin } = useContext(UserContext);
  const [formSuccess, setFormSucess] = useState(false);
  const [otheruser, setotheruser] = useState({});
  const [error, setError] = useState("");
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    // console.log("in profile user._id", user._id);

    if (match.params.id) {
      setisLoading(true);

      // console.log("another user id", match.params.id);
      const getUser = async () => {
        try {
          const response = await axios.get(`/users/id?id=${match.params.id}`);
          setotheruser(response.data.userdata);
          setisLoading(false);
        } catch (error) {
          console.log("ERROR", error);
          setError("unknown user");
          setisLoading(false);
        }
      };
      getUser();
    }
  }, [match.params.id]);

  const onLogout = () => {
    localStorage.clear();
    // dispatch({
    //   type: "LOGOUT_USER",
    // });
    setuser({});
    setisloggedin(false);
    setRedirect(true);
  };

  const renderCardImage = (images) => {
    return images[0].url;
  };

  const displayUserProfile = () => {
    let usr = {};
    if (!match.params.id) {
      usr = user;
    } else {
      usr = otheruser;
    }
    const { name, lastname, username, images } = usr;
    return (
      <span>
        <h5>
          {images && images.length > 0 ? (
            <Avatar images={images} size="avt-lg" />
          ) : null}
          <strong> {usr ? name + " " + lastname : null} </strong>
          <br />
          <span className="username">
            {"@"}
            {usr && !username ? name + " " + lastname : username}
          </span>
        </h5>
        {match.params.id ? (
          <div className="user-item-text">
            <TweetListing uid={match.params.id} type={"number"} />
          </div>
        ) : null}
        <h5>{!match.params.id ? user.email : null}</h5>
      </span>
    );
  };
  if (!isloggedin) return <Redirect to="/" />;
  if (redirect) return <Redirect to="/" />;

  // const { name, lastname, username, images, email } = otheruser;
  return (
    <div className="page-wrapper">
      <div className="row">
        <div className="col-lg-2 col-md-2  col-sm-3 col-xs-3 Lsidebar">
          {user ? <UserCard user={user} /> : null}
        </div>

        <div className="col-lg-7 col-md-7 col-sm-8 col-xs-9 content">
          <div className="user-page">
            {isLoading && (
              <div className="center">
                <LoadingSpinner asOverlay />
              </div>
            )}

            <h3>User Profile</h3>
            <div className="content-wrapper">
              <div className="section-wrapper" id="profile">
                <div>{displayUserProfile()}</div>
                {!match.params.id ? (
                  <span>
                    <button
                      className="btn btn-default btnDefault btn-sm"
                      style={{ color: "#111" }}
                      onClick={() => onLogout()}
                    >
                      Logout
                    </button>{" "}
                    <Link to="/user/edit" className="btn btn-danger btn-sm">
                      Edit
                    </Link>
                  </span>
                ) : null}
                <br />
                {!match.params.id ? (
                  <div>
                    <TweetListing uid={user._id} type={"number"} />
                    <strong>Likes</strong> {user.likes ? user.likes.length : 0}{" "}
                    <strong>Following</strong>
                    {user.following ? user.following.length : 0}
                  </div>
                ) : null}
              </div>
              <div className="usertweets">
                <h3>
                  <strong>
                    {!match.params.id ? "Your Places" : "Latest Places"}
                  </strong>
                </h3>
                <div>
                  {!match.params.id ? (
                    <TweetListing uid={user._id} />
                  ) : (
                    <TweetListing uid={match.params.id} />
                  )}
                </div>
              </div>

              {!match.params.id ? (
                <div className="userfollowing">
                  <h5>
                    {" "}
                    <strong>Following</strong>{" "}
                  </h5>
                  {user.following ? (
                    <FollowingListing following={user.following} />
                  ) : (
                    "Nobody following yet"
                  )}
                </div>
              ) : null}

              {/*  {!match.params.id ? (
              <div className="userfollowing">
                <h5>
                  {" "}
                  <strong>Likes</strong>{" "}
                </h5>
                {user.likes ? (
                  <LikeListing likes={user.likes} />
                ) : (
                  "No likes yet"
                )}
              </div>
            ) : null} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
