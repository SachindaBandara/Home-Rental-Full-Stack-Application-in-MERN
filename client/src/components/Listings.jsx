import React, { useEffect, useState } from "react";
import { category } from "../data";
import "../styles/Listings.scss";
import ListingCard from "./ListingCard";
import Loader from "./Loader";
import { useDispatch, useSelector } from "react-redux";
import state, { setListings } from "../redux/state";

const Listings = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const listings = useSelector((state) => state.listings);

  const getFeedLisitngs = async () => {
    try {
      const response = await fetch(
        selectedCategory !== "All"
          ? `http://localhost3001/properties?category=${selectedCategory}`
          : "http://localhost3001/properties",
        {
          method: "GET",
        }
      );
      const data = await response.json();
      dispatch(setListings({ listings: data }));
      setLoading(false);
    } catch (err) {
      console.log("Fetch Listing Failed", err.message);
    }
  };

  useEffect(() => {
    getFeedLisitngs();
  }, [selectedCategory]);

  return (
    <div className="category-list">
      {category?.map((category, index) => (
        <div
          className={`category`}
          key={index}
          onClick={() => setSelectedCategory(category.label)}
        >
          <div className="category-icon">{category.icon}</div>
          <p>{category.label}</p>
        </div>
      ))}
    </div>
  );
};

export default Listings;
