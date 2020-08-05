import React, { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import FileUpload from "../utils/fileupload";
import classnames from "classnames";
import axios from "axios";
//import { PlaceContext } from "../../context/place-context";
import { UserContext } from "../../context/user-context";
//import { flashErrorMessage } from "../layout/flash-message";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Avatar from "../user/avatar";

const Addname = ({ user, type }) => {
  const [mode] = useState(type);
  const [errors, setErrors] = useState({});
  const [category, setCategory] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [formSuccess, setFormSucess] = useState(false);
  const [formError, setFormError] = useState("");
  const [images, setImages] = useState({});
  const [redirect, setRedirect] = useState(false);
  const [redirectDesk, setRedirectDesk] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);

  useEffect(() => {}, []);

  const validData = () => {
    let errs = {};
    setErrors({});
    if (!name) {
      errs.name = "Inalid/Missing name";
    }
    if (!category) {
      errs.category = "inalid/missing category";
    }
    if (!description) {
      errs.description = "Inalid/Missing description";
    }
    if (!city) {
      errs.city = "Inalid/Missing city";
    }
    if (!country) {
      errs.country = "inalid/missing country";
    }
    if (!images) {
      errs.images = "inalid/missing images";
    }
    //console.log(errs);
    if (!name || !category || !city || !country || !images || !description) {
      setErrors(errs);
      return false;
    }
    return true;
  };

  const addname = async () => {
    if (validData()) {
      let newname = {
        name: name,
        category: category,
        images: images,
        city: city,
        state,
        state,
        country: country,
        description: description,
      };

      const response = await axios
        .post("/places/article", newname)
        .then((res) => {
          setname("");
          setCategory("");
          setFormError(false);
          if (mode === "mobile") setRedirect(true);
          else setRedirectDesk(true);
        })
        .catch((err) => {
          setFormError(true);
          console.log(err);
        });
    }
  };
  const renderCardImage = (images) => {
    return images[0].url;
  };
  const onSubmit = async () => {
    await addname();
  };
  if (!user) return <Redirect to="/" />;
  if (redirect) {
    return <Redirect to="/tweets" />;
  }
  if (redirectDesk) {
    return <Redirect to="/" />;
  }

  return (
    <div className="add-place">
      <div className="form">
        {errors.form && <div className="has-error">{errors.form}</div>}

        <div
          className={classnames("form-group", {
            "has-error": errors.name,
          })}
        >
          {errors.name ? (
            <span className="help-block">{errors.name}</span>
          ) : (
            <label>Place Name</label>
          )}

          <textarea
            className="form-control"
            value={name}
            placeholder="Enter place name"
            onChange={(e) => setname(e.target.value)}
          />
        </div>

        <div
          className={classnames("form-group", {
            "has-error": errors.tags,
          })}
        >
          {errors.tags ? (
            <span className="help-block">{errors.tags}</span>
          ) : (
            <label>Tag/Category</label>
          )}
          <input
            type="text"
            className="form-control"
            placeholder="category tags"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>

        <div
          className={classnames("form-group", {
            "has-error": errors.city,
          })}
        >
          {errors.city ? (
            <span className="help-block">{errors.city}</span>
          ) : (
            <label>City</label>
          )}
          <input
            type="text"
            className="form-control"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>

        <div
          className={classnames("form-group", {
            "has-error": errors.state,
          })}
        >
          {errors.state ? (
            <span className="help-block">{errors.state}</span>
          ) : (
            <label>State</label>
          )}
          <input
            type="text"
            className="form-control"
            placeholder="State/Region"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
        </div>

        <div
          className={classnames("form-group", {
            "has-error": errors.country,
          })}
        >
          {errors.country ? (
            <span className="help-block">{errors.country}</span>
          ) : (
            <label>Country</label>
          )}
          <input
            type="text"
            className="form-control"
            placeholder="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>

        <div
          className={classnames("form-group", {
            "has-error": errors.description,
          })}
        >
          {errors.name ? (
            <span className="help-block">{errors.description}</span>
          ) : (
            <label>Place description</label>
          )}

          <textarea
            className="form-control"
            value={description}
            placeholder="Enter place description"
            onChange={(e) => setdescription(e.target.value)}
            rows={10}
          />
        </div>
        <div
          className={classnames("ile_upload_wrapper", {
            "has-error": errors.images,
          })}
        >
          {errors.images ? (
            <span className="help-block">{errors.images}</span>
          ) : (
            <label>Upload an image</label>
          )}
          <FileUpload
            images={images}
            setImages={setImages}
            reset={formSuccess}
          />
        </div>

        <div className="name-btn-wrapper">
          <button
            type="button"
            className="btn btn-danger btn-sm "
            onClick={() => onSubmit()}
          >
            Add Place
          </button>
        </div>
      </div>

      <div className="row"></div>
    </div>
  );
};

export default Addname;
