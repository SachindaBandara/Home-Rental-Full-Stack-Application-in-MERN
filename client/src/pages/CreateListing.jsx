import React from "react";
import "../styles/CreateListing.scss";
import Navbar from "../components/Navbar";
import { categories, types } from "../data";
import { RemoveCircleOutline, AddCircleOutline, AddCircleRounded } from "@mui/icons-material";
import variables from "../styles/variables.scss";

const CreateListing = () => {
  return (
    <>
      <Navbar />

      <div className="create-listing">
        <h1>Publish Your place</h1>
        <form>
          <div className="create-listing-step1">
            <h2>Step:1 Tell us about your place</h2>
            <hr />
            <h3>Which of these categories best describes your place?</h3>
            <div className="category-list">
              {categories?.map((item, index) => (
                <div className="category" key={index}>
                  <div className="category_icon">{item.icon}</div>
                  <p>{item.label}</p>
                </div>
              ))}
            </div>

            <h3>What type of place will guests have?</h3>
            <div className="type-list">
              {types?.map((item, index) => (
                <div className="type">
                  <div className="type_text">
                    <h4>{item.name}</h4>
                    <p>{item.description}</p>
                  </div>
                  <div className="type_icon">{item.icon}</div>
                </div>
              ))}
            </div>

            <h3>Where's your place located?</h3>
            <div className="full">
              <div className="location">
                <p>Street Address</p>
                <input
                  type="text"
                  placeholder="Street Address"
                  name="streetAddress"
                  required
                />
              </div>
            </div>

            <div className="half">
              <div className="location">
                <p>Apartment, Suite, ect.(if applicable)</p>
                <input
                  type="text"
                  placeholder="Apartment, Suite, ect.(if applicable)"
                  name="aptSuite"
                  required
                />
              </div>

              <div className="location">
                <p>City</p>
                <input type="text" placeholder="City" name="city" required />
              </div>
            </div>

            <div className="half">
              <div className="location">
                <p>Province</p>
                <input
                  type="text"
                  placeholder="Province"
                  name="province"
                  required
                />
              </div>

              <div className="location">
                <p>Country</p>
                <input
                  type="text"
                  placeholder="Country"
                  name="country"
                  required
                />
              </div>
            </div>

            <h3>Share some basics about your place</h3>
            <div className="basics">
              <div className="basic">
                <p>Guest</p>
                <div className="basic_count">
                  <RemoveCircleOutline
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: variables.pinkred },
                    }}
                  />
                  <p>1</p>
                  <AddCircleOutline
                  sx={{
                    fontSize: "25px",
                    cursor: "pointer",
                    "&:hover": { color: variables.pinkred },
                  }}
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateListing;
