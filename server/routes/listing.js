const router = require("express").Router();
const multer = require("multer"); // Sse for file uploading

const Listing = require("../models/Listing");
const User = require("../models/User");
const { categories } = require("../../client/src/data");

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

    res.status(200).json(newListing);
  } catch (err) {
    res
      .status(409)
      .json({ message: "Fail to create listing", error: err.message });
    console.log(err);
  }
});

// Get Listing by category
router.get("/", async (req, res) => {
  const qCategory = req.query.category;

  try {
    let listings;
    if (qCategory) {
      listings = await Listing.find({ category: qCategory }).populate(
        "creator"
      );
    } else {
      listings = await Listing.find().populate("creator");
    }

    res.status(200).json(listings);
  } catch (err) {
    res
      .status(404)
      .json({ message: "Fail to fetch listing", error: err.message });
    console.log(err);
  }
});

// Get listing by serach API
router.get("search/:search", async (req, res) => {
  const { search } = req.params;

  try {
    let listing = [];

    if (search == "all") {
      listings = await Listing.find().populate("creator");
    } else {
      listings = await Listing.find({
        $or: [
          { category: { $regex: search, $option: "i" } },
          { title: { $regex: search, $option: "i" } },
        ],
      }).populate("creator");
    }
    res.status(200).json(listings);
  } catch (err) {
    res
      .status(404)
      .json({ message: "Fail to fetch listing", error: err.message });
    console.log(err);
  }
});

// Listing Details API
router.get("/:listingId", async (req, res) => {
  try {
    const { listingId } = req.params;
    const listing = await Listing.findById(listingId);
    res.status(202).json(listing);
  } catch (err) {
    res
      .status(404)
      .json({ message: "Listing can not find", error: err.message });
  }
});

module.export = router;
