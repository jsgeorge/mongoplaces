import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { faLongArrowAltLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import TweetItem from "../tweets/item";
import { PlaceContext } from "../../context/tweet-context";
import Categories from "../categories";
import UserCard from "../user/card";

export default function TweetQuery({ match }) {
  const [state, dispatch] = useContext(PlaceContext);
  const [error, setError] = useState("");
  const [header, setHeader] = useState("");
  //const [filters, setFilters] = useState([]);
  let sortBy = { sortby: "createdAt", order: "desc" };

  useEffect(() => {
    let filters = [];

    try {
      const { qrytype, name, id } = match.params;
      console.log(match.params.qrytype);
      if (qrytype == "category") {
        setHeader(name);
        filters = { filters: [{ category: id }] };
      }
      if (qrytype == "tag") {
        setHeader(name);
        filters = { filters: [{ tag: name }] };
      }
      if (qrytype == "srchstr") {
        setHeader(name);
        filters = { filters: [{ name: id }] };
      }
      //filters = [{ qrytype: id}];

      // if (!tag && !category) console.log("No filters");
    } catch (err) {
      console.log("no filters or error");
    }
    const fetchData = async () => {
      // if (listype == "main") {

      try {
        const response = await axios.post("/places/view", filters);
        dispatch({
          type: "FETCH_PLACES",
          payload: response.data,
        });
      } catch (err) {
        console.log(err);
        setError("Cannot retrieve the selected places");
      }
    };
    fetchData();
  }, [dispatch]);

  return (
    <div className="page-wraper">
      <div className="row">
        <div className="col-lg-2 col-md-2 col-sm-3 col-xs-3 Lsidebar">
          <UserCard />
        </div>
        <div className="col-lg-7 col-md-7 col-sm-8 col-xs-9 content">
          <div className="content-wrapper">
            {/* <Link to="/tweets">
              <FontAwesomeIcon
                icon={faLongArrowAltLeft}
                size="lg"
                style={{ color: "red" }}
              />
            </Link> */}
          </div>
          <div className="tweets-wrapper">
            <h3>
              {" "}
              {match.params.qrytype != "srchstr"
                ? match.params.name
                : "search: " + match.params.id}
            </h3>
            {state.places &&
            state.places.articles &&
            state.places.articles.length > 0 ? (
              state.places.articles.map((tweet) => (
                <TweetItem key={tweet._id} tweet={tweet} />
              ))
            ) : (
              <p>Sorry, No current tweets for the selected criteria</p>
            )}
          </div>
        </div>

        <div className="col-lg-3 col-md-3 col-sm-2 col-xs-4 Rsidebar">
          <Categories page="query" />
        </div>
      </div>
    </div>
  );
}

//export default TweetListing;
