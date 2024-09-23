import React, { useEffect, useState } from "react";
import "../styles/ListingDetails.scss";
import { useParams } from "react-router-dom";

const ListingDetails = () => {
  const [loading, setLoading] = useState(true);
  const { listingId } = useParams();
  const [listing, setListing] = useState(null);

  const getListingDetails = async () => {
    try {
      const response = await fetch(
        `http:localhost:3001.properties/${listingId}`,
        {
          method: "GET",
        }
      );

      const data = await response.json();
      setListing(data);
    } catch (err) {
      console.log("Fetch Listing Details Failed", err.message);
    }
  };

  useEffect(() => {
    getListingDetails();
  }, []);

  return (
    <div className="listing-details">
      <div className="title">
        <h1>{listing.title}</h1>
        <div></div>
      </div>
      <div className="photos">
        {listing.listingPhotoPaths?.map((item) => {
          <img
            src={`http:localhost:3001/${item.replace("public", "")}`}
            alt="listingPhotos"
          />;
        })}
      </div>

      <h2>
        {listing.type} in {listing.city}, {listing.province}, {listing.country}
      </h2>
      <p>
        {listing.guestCount} guests - {listing.bedroomCount} bedroom(s) -{" "}
        {listing.bedCount} bed(s) - {listing.bathroomCount} bathroom(s)
      </p>
      <hr />

      <div className="profile">
        <img
          src={`http:localhost:3001/${listing.creator.profileImagePath.replace(
            "public",
            ""
          )}`}
          alt="profile"
        />
        <h3>
          Hosted by {listing.creator.firstName} {listing.creator.lastName}
        </h3>
      </div>
    </div>
  );
};

export default ListingDetails;
