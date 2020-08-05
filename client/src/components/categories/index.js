import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import { CategoryContext } from "../../context/category-context";
import LoadingSpinner from "../utils/LoadingSpinner";

const Categories = () => {
  const [state, dispatch] = useContext(CategoryContext);
  const [error, setError] = useState("");
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    setisLoading(true);

    const fetchData = async () => {
      try {
        const response = await axios.get("/categories");
        dispatch({
          type: "FETCH_CATEGORIES",
          payload: response.data,
        });
        setError("");
        //console.log(response.data);
        setisLoading(false);
      } catch (err) {
        console.log(err);
        setError("Cannot retrieve the categories. Network error");
        setisLoading(false);
      }
    };
    fetchData();
  }, [dispatch]);
  const qrytype = "tag";

  return (
    <div className="categories-wrapper">
      <h4>
        {" "}
        <strong>Explore Categories</strong>{" "}
      </h4>
      <div className="category-card">
        <div>
          {isLoading && (
            <div className="center">
              <LoadingSpinner asOverlay />
            </div>
          )}
          {error && <div className="has-error">{error}</div>}
          {state.categories.length > 0 ? (
            <ul className="category-nav">
              {state.categories.map((ctgry) => (
                <li key={ctgry._id}>
                  <Link
                    to={`tweets/query/${qrytype}/${ctgry.name}/${ctgry._id}`}
                  >
                    {ctgry.name}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div>
              <p>{!error && "No Current categories"}</p>
            </div>
          )}{" "}
        </div>
      </div>
    </div>
  );
};

export default Categories;
