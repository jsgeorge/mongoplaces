import React, { useContext, useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { UserContext } from "../../context/user-context";
import UserCard from "../user/card";

const LeftSideBar = () => {
  const [error, setError] = useState("");
  const { user, isloggedin } = useContext(UserContext);

  useEffect(() => {}, []);

  return (
    <div className="col-lg-2 col-md-3  col-sm-3 col-xs-4 Lsidebar">
      {user ? <UserCard user={user} /> : null}
    </div>
  );
};

export default LeftSideBar;
