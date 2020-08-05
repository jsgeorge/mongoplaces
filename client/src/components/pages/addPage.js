import React, { useContext, useEffect, useState } from "react";
import AddTweet from "../tweets/add";
import { UserContext } from "../../context/user-context";
import { Redirect } from "react-router-dom";
import UserCard from "../user/card";
import Categories from "../categories";

const AddTweetPage = () => {
  //const [state, dispatch] = useContext(UserContext);
  const { user, setuser, isloggedin } = useContext(UserContext);
  //if (state.user) console.log(state.user[0]);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {}, []);

  if (!isloggedin) return <Redirect to="/" />;

  return (
    <div className="page-wrapper" id="add">
      <div className="row">
        <div className="col-lg-2 col-md-2  col-sm-3 col-xs-3 Lsidebar">
          {user ? <UserCard user={user} /> : null}
        </div>
        <div className="col-lg-7 col-md-7 col-sm-8 col-xs-9 content">
          <h3>Add a Place</h3>
          <AddTweet user={user} type="mobile" />
        </div>
        <div className="col-lg-3 col-md-3 col-sm-1 col-xs-3 Rsidebar">
          <Categories />
        </div>
      </div>
    </div>
  );
};

export default AddTweetPage;
