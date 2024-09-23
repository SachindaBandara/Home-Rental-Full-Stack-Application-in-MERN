import React from "react";
import { category } from "../data";
import "../styles/Listings.scss"

const Listings = () => {
  return (
    <div className="category-list">
      {category?.map((category, index) => (
        <div className={`category`} key={index}>
          <div className="category-icon">{category.icon}</div>
          <p>{category.label}</p>
        </div>
      ))}
    </div>
  );
};

export default Listings;
