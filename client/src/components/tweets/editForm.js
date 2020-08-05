import React, { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import FileUpload from "../utils/fileupload";
import classnames from "classnames";
import { Link } from "react-router-dom";
import axios from "axios";
import { PlaceContext } from "../../context/tweet-context";
import { UserContext } from "../../context/user-context";
import Avatar from "./../user/avatar";
import AuthorDetail from "./author";
import Moment from "moment";

const EditPlaceForm = ({ item }) => {
  const user = useContext(UserContext);
  const [dispatch] = useContext(PlaceContext);
  const [errors, setErrors] = useState({});
  const [tweet, setTweet] = useState("");
  const [category, setCategory] = useState("");
  const [edited, setEdited] = useState({
    name: item.name,
    tag: item.tag,
    city: item.city,
    state: item.state,
    country: item.country,
    description: item.description,
    images: item.images,
  });
  const [formSuccess, setFormSucess] = useState(false);
  const [formError, setFormError] = useState("");
  const [images, setImages] = useState({});
  const [redirect, setRedirect] = useState(false);
  //const [uploadedImages, setUploadedImages] = userState([]);
  useEffect(() => {
    //setEdited({ text: item.text, tag: item.tag });
    // setTweet(item.text);
    // setCategory(item.tag);
  });
  const displayDate = (d) => {
    return Moment(d).format("MMM D h:mm A");
  };
  const validData = () => {
    let errs = {};
    setErrors({});
    if (!edited.name) {
      errs.name = "Inalid/Missing name";
    }
    if (!edited.tag) {
      errs.tag = "inalid/missing category";
    }
    setErrors({});
    if (!edited.city) {
      errs.city = "Inalid/Missing city";
    }
    if (!edited.state) {
      errs.state = "inalid/missing state";
    }
    setErrors({});
    if (!edited.country) {
      errs.country = "Inalid/Missing country";
    }
    if (!edited.description) {
      errs.description = "inalid/missing description";
    }
    //console.log(errs);
    if (
      !edited.name ||
      !edited.tag ||
      !edited.name ||
      !edited.city ||
      !edited.state ||
      !edited.description
    ) {
      setErrors(errs);
      return false;
    }
    //console.log(errors);
    //if (errors) return false;

    return true;
  };

  const handleChange = (e) => {
    setEdited({ ...edited, [e.target.name]: e.target.value });
  };
  const updateTweet = async () => {
    if (validData()) {
      let updTweet = {
        ...item,
        name: edited.name,
        tag: edited.tag,
      };
      console.log(updTweet);
      try {
        const response = await axios
          .post(`/chats/update?id=${item._id}`, updTweet)
          .then((res) => {
            setRedirect(true);
          })
          .catch((err) => {
            setFormError(err);
          });
      } catch (error) {
        setFormError(error);
      }
    }
  };

  const onSubmit = async () => {
    await updateTweet();
  };
  const renderCardImage = (images) => {
    return images[0].url;
  };
  if (redirect) {
    return <Redirect to={`/tweets/${item._id}/view`} />;
  }
  if (!user) return <Redirect to="/" />;

  return (
    <div className="edit-tweet">
      {user && edited ? (
        <div className="form">
          <div className="author-line">
            <AuthorDetail author={item.author} />
            <span className="chat-date">{displayDate(item.createdAt)}</span>
          </div>
          <div className="form-group">
            <label>Place Name</label>
            <textarea
              name="name"
              className="form-control"
              value={edited.name}
              onChange={handleChange}
              rows="2"
            />
          </div>
          <div className="form-group">
            <label>Tag</label>
            <input
              name="tag"
              className="form-control"
              type="text"
              placeholder="category tags"
              value={edited.tag}
              onChange={handleChange}
              style={{ borderBottom: "1px solid #ccc" }}
            />
          </div>
          <div className="form-group">
            <label>City</label>
            <input
              name="city"
              type="text"
              className="form-control"
              value={edited.city}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>State</label>
            <input
              name="state"
              type="text"
              className="form-control"
              value={edited.state}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Country</label>
            <input
              name="country"
              type="text"
              className="form-control"
              value={edited.country}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              className="form-control"
              value={edited.description}
              onChange={handleChange}
              rows="10"
            />
          </div>
          {edited.images && edited.images.length > 0 ? (
            <div
              className="image"
              style={{
                background: `url(${renderCardImage(edited.images)}) no-repeat`,
              }}
            />
          ) : null}
          <div className="form-group" style={{ marginTop: "15px" }}>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => onSubmit()}
              style={{ float: "right" }}
            >
              reTweet
            </button>
          </div>
          {errors.tweet ? (
            <div className="has-error">Error {errors.tweet}</div>
          ) : null}
          {errors.category ? (
            <div className="has-error">Error {errors.category}</div>
          ) : null}
          {formError ? (
            <div className="has-error">Error - Could not add tweet</div>
          ) : null}
        </div>
      ) : (
        <p>NO tweet found</p>
      )}
    </div>
  );
};

export default EditPlaceForm;
