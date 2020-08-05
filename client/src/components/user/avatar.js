import React, { useContext, useEffect, useState } from "react";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const renderCardImage = (images) => {
  return images[0].url;
};

const Avatar = ({ images, size }) => {
  useEffect(() => {}, []);
  return (
    <span>
      {images && images.length > 0 ? (
        <span
          className="avatar"
          id={size}
          style={{
            background: `url(${renderCardImage(images)}) no-repeat`,
          }}
        />
      ) : (
        <FontAwesomeIcon
          icon={faUser}
          id={size}
          className="primary"
          style={{
            borderRadius: "100px",
            padding: "6px",
            width: "35px",
            height: "35px",
            color: "#fff",
          }}
        />
      )}
    </span>
  );
};

export default Avatar;
