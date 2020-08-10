import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";

import { UserContext } from "../../context/user-context";
import { PlaceContext } from "../../context/tweet-context";
import EditPlaceForm from "../tweets/editForm.js";
import UserCard from "../user/card";
import { faLongArrowAltLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Categories from "../categories";

const EditplacePage = ({ match }) => {
  const { user, setuser, isloggedin } = useContext(UserContext);
  const [state, dispatch] = useContext(PlaceContext);
  const [category, setCategory] = useState("");
  const [place, setplace] = useState("");
  const [images, setImages] = useState({});
  const [formSuccess, setFormSucess] = useState(false);
  const [formError, setFormError] = useState(false);

  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const { id } = match.params;

    if (id) {
      const fetchData = async () => {
        try {
          const response = await axios.get(`/places/article?id=${id}`);
          dispatch({
            type: "FETCH_PLACE",
            payload: response.data[0],
          });
          // console.log("detail respnse.data", response.data);
        } catch (err) {
          console.log(err);
          //setError("Cannot retrieve the selected place. Network error");
        }
      };
      fetchData();
    } else {
      setError("Cannot retrive selecte place");
    }
  }, [match.params, dispatch]);
  if (!isloggedin) return <Redirect to="/" />;

  return (
    <div className="page-wrapper" id="edit">
      <div className="row">
        <div className="col-lg-2 col-md-2  col-sm-3 col-xs-3 Lsidebar">
          <UserCard />
        </div>
        <div className="col-lg-7 col-md-7 col-sm-8   col-xs-9 content">
          <div className="card-text">
            <Link to={`/places/${match.params.id}/view`}>
              <FontAwesomeIcon
                icon={faLongArrowAltLeft}
                size="lg"
                style={{ color: "blue" }}
              />
            </Link>
            <h3>Edit place</h3>
            {!state.place ? (
              <div className="card_item_wrapper">
                <p>Cannot display the current place</p>
              </div>
            ) : (
              <EditPlaceForm item={state.place} />
            )}
          </div>
        </div>
        <div className="col-lg-3 col-md-2 col-sm-2 col-xs-4 Rsidebar">
          <div className="desktop-categories">
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditplacePage;
