import React, { useContext, useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import AddTweet from "../tweets/add";
import { UserContext } from "../../context/user-context";
import TweetListing from "../tweets";
import UserCard from "../user/card";
import Categories from "../categories";

export default function TweetsPage({ match }) {
  const [error, setError] = useState("");
  const { user, isloggedin } = useContext(UserContext);

  useEffect(() => {}, []);

  if (error) return <Redirect to="/auth/signin" />;

  return (
    <div className="page-wrapper" id="places">
      <div className="row">
        <div className="col-lg-2 col-md-3  col-sm-3 col-xs-4 Lsidebar">
          {user ? <UserCard user={user} /> : null}
        </div>

        <div className="col-lg-7 col-md-7 col-sm-8 col-xs-8 content">
          <h3>{match.params.name ? match.params.name : " Latest Places"}</h3>
          <TweetListing
            qrytype={match.params.qrytype}
            name={match.params.name}
            id={match.params.id}
          />
        </div>

        <div className="col-lg-3 col-md-2 col-sm-2 col-xs-1 Rsidebar">
          <Categories />
        </div>
      </div>
    </div>
  );
}
