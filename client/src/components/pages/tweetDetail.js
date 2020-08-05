import React, { useContext, useEffect, useState } from "react";
import Moment from "moment";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { Link } from "react-router-dom";
import { faLongArrowAltLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PlaceContext } from "../../context/tweet-context";
import { UserContext } from "../../context/user-context";
import TweetDetail from "../tweets/detail";
import UserCard from "../user/card";
import Categories from "../categories";
import Avatar from "../user/avatar";
import LoadingSpinner from "../utils/LoadingSpinner";

export default function TweetDetailPage({ match }) {
  const [state, dispatch] = useContext(PlaceContext);
  // const [isAuthenticted, setIsAuthenticated] = useState(false);
  const [setError] = useState("");
  const [like, setLike] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [isLoading, setisLoading] = useState(true);
  const { user, isloggedin } = useContext(UserContext);

  useEffect(() => {
    const { id } = match.params;
    setisLoading(true);

    if (id) {
      const fetchData = async () => {
        try {
          const response = await axios.get(`/places/article?id=${id}`);
          dispatch({
            type: "FETCH_PLACE",
            payload: response.data[0],
          });
          setisLoading(false);
          // console.log("detail respnse.data", response.data);
        } catch (err) {
          console.log(err);
          setisLoading(false);
          //setError("Cannot retrieve the selected tweet. Network error");
        }
      };
      fetchData();
    } else {
      setError("Cannot retrive selecte tweet");
    }
  }, []);

  if (!state.place)
    return (
      <div className="card_item_wrapper">
        <p>Cannot display the current place</p>
      </div>
    );

  return (
    <div className="page-wrapper">
      <div className="row">
        <div className="col-lg-2 col-md-2  col-sm-3 col-xs-3 Lsidebar">
          {user ? <UserCard user={user} /> : null}
        </div>
        <div className="col-lg-8 col-md-8 col-sm-8 col-xs-9 content">
          <h3>
            <Link to="/tweets">
              {" "}
              <FontAwesomeIcon
                icon={faLongArrowAltLeft}
                size="sm"
                className="primary-clr"
              />{" "}
            </Link>
            Place Detail
          </h3>

          {isLoading && (
            <div className="center">
              <LoadingSpinner asOverlay />
            </div>
          )}
          <TweetDetail place={state.place} />
        </div>

        <div className="col-lg-2 col-md-2 col-sm-2 col-xs-4 Rsidebar">
          <div className="desktop-categories">
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
}
