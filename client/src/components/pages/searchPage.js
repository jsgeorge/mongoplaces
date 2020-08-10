import React from "react";
import SearchTweets from "../tweets/search";
import Categories from "../categories";
import UserCard from "../user/card";

const SearchPage = () => {
  return (
    <div className="page-wrapper" id="search">
      <div className="row">
        <div className="col-lg-2 col-md-2  col-sm-3 col-xs-3 Lsidebar">
          <UserCard />
        </div>
        <div className="col-lg-7 col-md-7 col-sm-8 col-xs-9 content">
          <h3>Explore Places</h3>
          <div className="tablet" id="srchpage">
            <SearchTweets />
            <Categories />
          </div>
          <div className="explore">
            <h4>By Country</h4>
            <h4>By State</h4>
            <h4>By City</h4>
          </div>
        </div>
        <div className="col-lg-3 col-md-2 col-sm-2 col-xs-4 Rsidebar">
          <div className="desktop-categories">
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
