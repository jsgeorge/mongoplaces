import React, { useContext, useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import AddTweet from "../tweets/add";
import { UserContext } from "../../context/user-context";
import TweetListing from "../tweets";
import UserCard from "../user/card";
import Categories from "../categories";

export default function TweetsPage() {
  const [error, setError] = useState("");
  const { user, isloggedin } = useContext(UserContext);

  useEffect(() => {}, []);

  if (error) return <Redirect to="/auth/signin" />;
  return (
    <div className="page-wrapper" id="places">
      <div className="col-lg-2 col-md-2  col-sm-3 col-xs-3 Lsidebar">
        {user ? <UserCard user={user} /> : null}
      </div>

      <div className="col-lg-8 col-md-8 col-sm-7 col-xs-7 content">
        <h3>Latest Places</h3>

        <TweetListing />
      </div>
      <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 Rsidebar">
        <Categories />
      </div>
    </div>
  );
}
