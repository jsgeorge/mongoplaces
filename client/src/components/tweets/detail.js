import React, { useContext, useEffect, useState } from "react";
import Moment from "moment";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { Link } from "react-router-dom";
import { faLongArrowAltLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import { PlaceContext } from "../../context/tweet-context";
import { UserContext } from "../../context/user-context";
import AuthorDetail from "./author";
import UserCommands from "./userSection";
import UserEditCommands from "./userEditCmds";
import UserCard from "../user/card";
import Categories from "../categories";
import Avatar from "../user/avatar";
import { googleAPIKey } from "../utils/configure";
import Iframe from "react-iframe";

export default function TweetDetail({ place }) {
  //const [state, dispatch] = useContext(TweetContext);
  // const [isAuthenticted, setIsAuthenticated] = useState(false);
  const [setError] = useState("");
  const [like, setLike] = useState(false);
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {}, []);

  const renderCardImage = (images) => {
    return images[0].url;
  };
  const displayDate = (d) => {
    return Moment(d).format("MMM D h:mm A");
  };
  //if (error) return <Redirect to="/auth/signin" />;

  if (!place || !place.author)
    return (
      <div className="card_item_wrapper">
        <p>Cannot display the current place</p>
      </div>
    );

  const {
    _id,
    author,
    avatar,
    name,
    tag,
    category,
    city,
    state,
    country,
    description,
    createdAt,
    images,
    comments,
    likes,
  } = place;

  return (
    <div className="place-detail-wrapper">
      <div id="detail">
        <div className="chat-text">
          <div className="author-line">
            <AuthorDetail author={author} />

            <span className="chat-date">{displayDate(createdAt)}</span>
            <Link to={`/places/query/tag/${tag}`} className="tag-link">
              <strong>
                {"#"}
                {tag ? tag : null}
              </strong>
            </Link>
          </div>
        </div>
        <div className="card-detail-image">
          {images && images.length > 0 && images[0].url ? (
            <div
              className="image"
              style={{
                background: `url(${renderCardImage(images)}) no-repeat`,
              }}
            />
          ) : null}{" "}
        </div>
        <div className="chat-text">
          <span className="place-name-det">{name} </span>
          <br />
          {city} {state} {country}
          <br />
          {description ? (
            <div id="place-desc">
              <p>{description}</p>
            </div>
          ) : null}
        </div>
        <div>
          <div className="card-detail-map">
            <Iframe
              width="100%"
              height="300"
              frameborder="0"
              style="border:none"
              src={`https://www.google.com/maps/embed/v1/place?key=${googleAPIKey}&q=${name},${city} allowfullscreen`}
            ></Iframe>
          </div>
        </div>
        "
        <div className="tweet-detail">
          <div className="actions">
            Comments {comments ? comments.length : "0"} Likes:{" "}
            {likes ? likes : "0"}
          </div>
          <UserEditCommands id={_id} author={author} />

          <UserCommands id={_id} author={author} />
          <div className="comments">
            {comments && comments.length > 0 ? (
              <span>
                {comments.map((c) => (
                  <span key={c.uid}>
                    <strong>
                      <AuthorDetail author={c.uid} type="comment" />
                    </strong>{" "}
                    <span className="comment-text-det">{c.name}</span>
                    <br />
                    {c.text}
                  </span>
                ))}
              </span>
            ) : (
              <p> No comments yet</p>
            )}
            <div clasName="row" />
          </div>
        </div>
      </div>
    </div>
  );
}
