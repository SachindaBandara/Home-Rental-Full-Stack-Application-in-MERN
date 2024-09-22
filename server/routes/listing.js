const router = require("express").Router();
const multer = require("multer"); // Sse for file uploading

const Listing = require("../models/Listing");
const User = require("../models/User");

// Configuration Multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads"); // Store uploaded files in the uploads folder
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // use the original file name
  },
});

const upload = multer({ storage });

// Create Listing
router.post("/create", upload.array("listingPhotos"), async (req, res) => {
  try {
    // Take the information from the form
    const {
      creator,
      category,
      type,
      streetAddress,
      aptSuite,
      city,
      province,
      country,
      guestCount,
      bedroomCount,
      bedCount,
      bathroomCount,
      amenities,
      title,
      description,
      highlight,
      highlightDesc,
      price,
    } = req.body;

    const listingPhotos = req.files;

    if (!listingPhotos) {
      return res, status(400).send("No file uploaded.");
    }

    const listingPhotoPath = listingPhotos.map((file) => file.path);

    const newListing = new Listing({
      creator,
      category,
      type,
      streetAddress,
      aptSuite,
      city,
      province,
      country,
      guestCount,
      bedroomCount,
      bedCount,
      bathroomCount,
      amenities,
      listingPhotoPath,
      title,
      description,
      highlight,
      highlightDesc,
      price,
    });
    await newListing.save();

    res.status(200).json(newListing)
  } catch (err) {
    res.status(409).json({ message: "Fail to create listing", error: err.message})
    console.log(err)
  }
});
