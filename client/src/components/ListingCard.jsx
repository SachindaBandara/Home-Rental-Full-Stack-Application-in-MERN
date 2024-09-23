import React, { useState } from "react";
import "../styles/ListingCard.scss";
import {
  ArrowbackIosNew,
  ArrowForwardIos,
  Transform,
} from "@mui/icons-material";

const ListingCard = (
  listingId,
  creator,
  listingPhotoPaths,
  city,
  province,
  country,
  category,
  type,
  price
) => {
  // slider for images
  const [currentIndex, setCurrentIndex] = useState(0);

  const gotoPrevSlide = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + listingPhotoPaths.length) % listingPhotoPaths.length
    );

    const gotoNextSlide = () => {
      setCurrentIndex(
        (prevIndex) => (prevIndex + 1) % listingPhotoPaths.length
      );
    };
  };
  return (
    <div className="listing-card">
      <div className="slider-container">
        <div
          className="silder"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {listingPhotoPaths?.map((photos, index) => {
            <div key={index} className="slide">
              <img
                src={`http://localhost:3001/${photo?.replace("public", "")}`}
                alt={`photo ${index + 1}`}
              />

              <div
                className="prev-button"
                onClick={(e) => {
                  gotoPrevSlide(e);
                }}
              >
                <ArrowbackIosNew sx={{ fontSize: "15px" }} />
              </div>

              <div
                className="next-button"
                onClick={(e) => {
                  gotoNextSlide(e);
                }}
              >
                <ArrowForwardIos sx={{ fontSize: "15px" }} />
              </div>
            </div>;
          })}
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
