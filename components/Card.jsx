"use client";

import React from "react";

const Card = ({ children, className = "" }) => {
  return (
    <div className={`star-card-wrapper ${className}`}>
      <div className="container">
        <div id="stars" />
        <div id="stars2" />
        <div id="stars3" />
        <div className="star-card-content">{children}</div>
      </div>
    </div>
  );
};

export default Card;
