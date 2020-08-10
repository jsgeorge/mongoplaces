import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Moment from "moment";
import AuthorDetail from "./author";
import Avatar from "../user/avatar";
import classnames from "classnames";

const TweetItem = ({ tweet, uid }) => {
  const [error, setError] = useState("");
  useEffect(() => {
    console.log("uid", uid);
  }, []);

  const renderCardImage = (images) => {
    if (images.length > 0) return images[0].url; //images[0].url;
  };

  const displayDate = (d) => {
    return Moment(d).format("MMM D h:mm A");
  };

  const {
    _id,
    author,
    name,
    city,
    state,
    country,
    tag,
    images,
    createdAt,
    comments,
    likes,
  } = tweet;

  console.log(uid != null);
  let cname = "col-lg-12 col-md-12 col-sm-12  col-xs-12 placeItem ";
  if (uid != null) cname = "col-lg-12 col-md-12 col-sm-12  col-xs-12 placeItem";
  let cimage = "image";
  if (uid != null) cimage = "img-lg";
  return (
    // <div
    //   className={classnames(
    //     "col-lg-4 col-md-4 col-sm-12  col-xs-12 placeItem ",
    //     {
    //       "col-lg-12 col-md-12 col-sm-12  col-xs-12 placeItem": uid != null,
    //     }
    //   )}
    // >
    <div className={cname}>
      <div className="place-card">
        {uid ? (
          <div className="chat-text">
            <div className="author-line">
              <AuthorDetail author={author} type="tweet" />
              <span className="chat-date">{displayDate(createdAt)}</span>
              <br className="mobile" />
              <Link to={`/tweets/query/tag/${tag}`} className=" tag-link">
                <strong>
                  {"#"}
                  {tag ? tag : null}
                </strong>
              </Link>
            </div>

            <div className="row" />
          </div>
        ) : null}

        {images && images.length > 0 && images[0].url ? (
          <Link to={`/tweets/${_id}/view`}>
            <div
              className={cimage}
              style={{
                background: `url(${renderCardImage(images)}) no-repeat`,
              }}
            />
          </Link>
        ) : null}
        <div className="chat-text">
          {name ? <Link to={`/tweets/${_id}/view`}>{name}</Link> : null} <br />
          <span className="cityfont">
            {" "}
            {city}, {state} {country}
          </span>
        </div>
        {uid ? (
          <div className="actions">
            {comments ? (
              <span>
                comments {comments.length} likes: {likes}
              </span>
            ) : (
              <p>NO comments yet</p>
            )}{" "}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default TweetItem;
