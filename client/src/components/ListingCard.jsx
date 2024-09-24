import React, { useState } from "react";
import "../styles/ListingCard.scss";
import {
  ArrowBackIosNew,
  ArrowForwardIos,
  Favorite,
} from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { setWishList } from "../redux/state";
import { useNavigate } from "react-router-dom"; // Importing useNavigate for navigation

const ListingCard = ({
  listingId, // ID of the listing
  creator, // Creator of the listing
  listingPhotoPaths, // Array of image paths for the listing
  city, // City where the listing is located
  province, // Province of the listing
  country, // Country of the listing
  category, // Category of the listing (e.g., Apartment, House)
  type, // Type of the listing (e.g., Entire home, Private room)
  price, // Price of the listing per night
  startDate, // Start date of a booking (if applicable)
  endDate, // End date of a booking (if applicable)
  totalPrice, // Total price of a booking (if applicable)
  booking, // Boolean indicating whether this is a booking or not
}) => {
  // State to keep track of the current index for the image slider
  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to go to the previous slide in the image slider
  const gotoPrevSlide = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + listingPhotoPaths.length) % listingPhotoPaths.length
    );
  };

  // Function to go to the next slide in the image slider
  const gotoNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % listingPhotoPaths.length);
  };

  const navigate = useNavigate(); // Hook for navigation
  const dispatch = useDispatch(); // Hook for dispatching Redux actions

  // Fetching the current user from the Redux store
  const user = useSelector((state) => state.user);

  // Fetching the user's wish list (favorites), if available
  const wishList = user?.wishList || [];

  // Checking if the current listing is already liked (present in the wish list)
  const isLiked = wishList.find((item) => item?._id === listingId);

  // Function to update the wish list by patching the user with the new favorite listing
  const patchWishList = async () => {
    // Ensure that the user is not adding their own listing to the wish list
    if (user?._id !== creator._id) {
      const response = await fetch(
        `http://localhost:3001/users/${user?._id}/${listingId}`,
        {
          method: "PATCH", // Patch request to update the user's wish list
          headers: {
            "Content-Type": "application/json", // Correct headers for JSON
          },
        }
      );

      // Update the user's wish list in the Redux store with the new data
      const data = await response.json();
      dispatch(setWishList(data.wishList));
    } else {
      // If the user is the creator, do nothing
      return;
    }
  };

  return (
    <div className="listing-card">
      {/* Image Slider Container */}
      <div className="slider-container">
        <div
          className="slider"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }} // Dynamically moving the slider
        >
          {/* Map through all images for the listing */}
          {listingPhotoPaths?.map((photo, index) => (
            <div key={index} className="slide">
              <img
                src={`http://localhost:3001/${photo?.replace("public", "")}`} // Display image
                alt={`photo ${index + 1}`} // Alt text for the image
              />
            </div>
          ))}
        </div>

        {/* Button to go to the previous slide */}
        <div
          className="prev-button"
          onClick={(e) => {
            e.stopPropagation(); // Stop event propagation
            gotoPrevSlide(e); // Go to previous image
          }}
        >
          <ArrowBackIosNew sx={{ fontSize: "15px" }} />{" "}
          {/* Icon for previous */}
        </div>

        {/* Button to go to the next slide */}
        <div
          className="next-button"
          onClick={(e) => {
            e.stopPropagation(); // Stop event propagation
            gotoNextSlide(e); // Go to next image
          }}
        >
          <ArrowForwardIos sx={{ fontSize: "15px" }} /> {/* Icon for next */}
        </div>
      </div>

      {/* Listing Details */}
      <h3>
        {city}, {province}, {country} {/* Location of the listing */}
      </h3>
      <p>
        {category} {/* Category of the listing */}
      </p>

      {/* Conditional rendering: if not a booking, display type and price per night */}
      {!booking ? (
        <>
          <p>
            {type} {/* Type of the listing */}
          </p>
          <p>
            <span>$ {price}</span> per night {/* Price per night */}
          </p>
        </>
      ) : (
        /* If it's a booking, display start/end dates and total price */
        <>
          <p>
            {startDate} - {endDate} {/* Booking date range */}
          </p>
          <p>
            <span>$ {totalPrice}</span> total{" "}
            {/* Total price for the booking */}
          </p>
        </>
      )}

      {/* Favorite Button */}
      <button
        className="favorite"
        onClick={(e) => {
          e.stopPropagation(); // Prevent click from affecting parent components
          patchWishList(); // Add or remove from wish list
        }}
        disabled={!user} // Disable if the user is not logged in
      >
        {/* Conditionally render the favorite icon: red if liked, white if not */}
        {isLiked ? (
          <Favorite sx={{ color: "red" }} />
        ) : (
          <Favorite sx={{ color: "white" }} />
        )}
      </button>
    </div>
  );
};

export default ListingCard;
