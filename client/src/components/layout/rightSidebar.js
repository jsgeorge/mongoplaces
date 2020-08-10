import React, { useContext, useEffect, useState } from "react";

import Categories from "../categories";

const RightSidebar = () => {
  return (
    <div className="col-lg-3 col-md-2 col-sm-2 col-xs-1 Rsidebar">
      <Categories />
    </div>
  );
};

export default RightSidebar;
