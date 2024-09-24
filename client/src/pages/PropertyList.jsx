import React, { useEffect, useState } from "react";
import "../styles/List.scss";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import ListingCard from "../components/ListingCard";
import { setPropertyList } from "../redux/state";
import Loader from "../components/Loader";
import Footer from "../components/Footer";

const PropertyList = () => {
  // State to track the loading status
  const [loading, setLoading] = useState(true);

  // Get user and their property list from Redux store
  const user = useSelector((state) => state.user);
  const propertyList = user?.propertyList;

  const dispatch = useDispatch();

  // Function to fetch the property list of the current user
  const getPropertyList = async () => {
    try {
      // API call to get the list of properties for the current user
      const response = await fetch(
        `http://localhost:3001/users/${user._id}/properties`,
        {
          method: "GET",
        }
      );

      // Parse the response data
      const data = await response.json();

      // Dispatch the list of properties to the Redux store
      dispatch(setPropertyList(data));

      // Set loading state to false after data is fetched
      setLoading(false);
    } catch (err) {
      // Log any error during the fetching process
      console.log("Fetch all properties failed", err.message);
    }
  };

  // useEffect to trigger fetching the property list when the component mounts
  useEffect(() => {
    getPropertyList();
  }, []);

  return loading ? (
    // If still loading, show the loader component
    <Loader />
  ) : (
    <>
      <Navbar /> {/* Navbar component at the top of the page */}
      <h1 className="title-list">Your Property List</h1>{" "}
      {/* Title for the property list page */}
      <div className="list">
        {/* Map through the property list and render each property using the ListingCard component */}
        {propertyList?.map(
          ({
            _id,
            creator,
            listingPhotoPaths,
            city,
            province,
            country,
            category,
            type,
            price,
            booking = false, // Default value of booking is false
          }) => (
            <ListingCard
              key={_id} // Unique key for each property
              listingId={_id}
              creator={creator}
              listingPhotoPaths={listingPhotoPaths}
              city={city}
              province={province}
              country={country}
              category={category}
              type={type}
              price={price}
              booking={booking} // Booking status passed as a prop
            />
          )
        )}
      </div>
      <Footer /> {/* Footer component at the bottom of the page */}
    </>
  );
};

export default PropertyList;
