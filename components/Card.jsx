"use client";

import React from "react";

const Card = ({ children, className = "" }) => {
  return (
    <div className={`star-card-wrapper ${className}`}>
      <div className="container">
        <div className="star-card-content">{children}</div>
      </div>
    </div>
  );
};

export default Card;
