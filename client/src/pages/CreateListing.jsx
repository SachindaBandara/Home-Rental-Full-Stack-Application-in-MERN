import React, { useState } from "react";
import "../styles/CreateListing.scss";
import Navbar from "../components/Navbar";
import { categories, types, facilities } from "../data";
import { RemoveCircleOutline, AddCircleOutline } from "@mui/icons-material";
import variables from "../styles/variables.scss";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { IoIosImages } from "react-icons/io";

const CreateListing = () => {
  const [guestCount, setGuestCount] = useState(1);
  const [bedroomCount, setBedroomCount] = useState(1);
  const [bedCount, setBedCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);

  const [photos, setPhotos] = useState([]);

  const handleUploadPhotos = (e) => {
    const newPhotos = e.target.files;
    setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
  };

  const handleDragPhoto = (result) => {
    if (!result.destination) return;

    const items = Array.from(photos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setPhotos(items);
  };

  const handleRemovePhotos = (indexToRemove) => {
    setPhotos((prevPhotos) =>
      prevPhotos.filter((_, index) => index !== indexToRemove)
    );
  };

  return (
    <>
      <Navbar />

      <div className="create-listing">
        <h1>Publish Your Place</h1>
        <form>
          <div className="create-listing-step1">
            <h2>Step 1: Tell us about your place</h2>
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
                <div className="type" key={index}>
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
                <p>Apartment, Suite, etc. (if applicable)</p>
                <input
                  type="text"
                  placeholder="Apartment, Suite, etc."
                  name="aptSuite"
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
              {/* Guests */}
              <div className="basic">
                <p>Guests</p>
                <div className="basic_count">
                  <RemoveCircleOutline
                    onClick={() =>
                      setGuestCount(guestCount > 1 ? guestCount - 1 : 1)
                    }
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: variables.pinkred },
                    }}
                  />
                  <p>{guestCount}</p>
                  <AddCircleOutline
                    onClick={() => setGuestCount(guestCount + 1)}
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: variables.pinkred },
                    }}
                  />
                </div>
              </div>

              {/* Bedrooms */}
              <div className="basic">
                <p>Bedrooms</p>
                <div className="basic_count">
                  <RemoveCircleOutline
                    onClick={() =>
                      setBedroomCount(bedroomCount > 1 ? bedroomCount - 1 : 1)
                    }
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: variables.pinkred },
                    }}
                  />
                  <p>{bedroomCount}</p>
                  <AddCircleOutline
                    onClick={() => setBedroomCount(bedroomCount + 1)}
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: variables.pinkred },
                    }}
                  />
                </div>
              </div>

              {/* Beds */}
              <div className="basic">
                <p>Beds</p>
                <div className="basic_count">
                  <RemoveCircleOutline
                    onClick={() => setBedCount(bedCount > 1 ? bedCount - 1 : 1)}
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: variables.pinkred },
                    }}
                  />
                  <p>{bedCount}</p>
                  <AddCircleOutline
                    onClick={() => setBedCount(bedCount + 1)}
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: variables.pinkred },
                    }}
                  />
                </div>
              </div>

              {/* Bathrooms */}
              <div className="basic">
                <p>Bathrooms</p>
                <div className="basic_count">
                  <RemoveCircleOutline
                    onClick={() =>
                      setBathroomCount(
                        bathroomCount > 1 ? bathroomCount - 1 : 1
                      )
                    }
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: variables.pinkred },
                    }}
                  />
                  <p>{bathroomCount}</p>
                  <AddCircleOutline
                    onClick={() => setBathroomCount(bathroomCount + 1)}
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

          <div className="create-listing_step2">
            <h2>Step 2: Make your place stand out</h2>
            <hr />

            <h3>Tell guests what your place has to offer</h3>
            <div className="amenities">
              {facilities?.map((item, index) => (
                <div className="facility" key={index}>
                  <div className="faciliti_icon">{item.icon}</div>
                  <p>{item.name}</p>
                </div>
              ))}
            </div>

            <h3>Add some photos of your place</h3>
            <DragDropContext onDragEnd={handleDragPhoto}>
              <Droppable droppableId="photos" direction="horizontal">
                {(provided) => (
                  <div
                    className="photos"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {photos.length < 1 && (
                      <>
                        <input
                          id="image"
                          type="file"
                          style={{ display: "none" }}
                          accept="image/*"
                          onChange={handleUploadPhotos}
                          multiple
                        />
                        <label htmlFor="image" className="alone">
                          <div className="icon">
                            <IoIosImages />
                          </div>
                          <p>Upload form your device</p>
                        </label>
                      </>
                    )}

                    {photos.map((photos, index) => {
                      return (
                        <Draggable
                          key={index}
                          draggableId={index.toString()}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              className="photos"
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                                <img src={URL.createObjectURL(photo)} alt="place" />
                            </div>
                          )}

                        </Draggable>
                      );
                    })}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateListing;
