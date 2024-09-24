const router = require("express").Router();
const Booking = require("../models/Booking");

// Get trip list API
router.get("/:userId/trips", async (req, res) => {
  try {
    const { userId } = req.params;
    const trips = await Booking.find({ customerId: userId }).populate(
      "customerId hostId listingId"
    );
    res.status(202).json(trip);
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: "Can not find trips", error: err.message });
  }
});

// Add wish List API
router.patch("/:userId/:listingId", async (req, res) => {
  try {
    const { userId, listingId } = req.params;
    const user = await User.findById(userId);
    const listing = await Listing.findById(listingId).populate("creator");

    const favoriteListing = user.wishList.find(
      (item) => item._id.toString() === listingId
    );
    if (favoriteListing) {
      user.wishList = user.wishList.filter(
        (item) => item._id.toString() !== listingId
      );
      await user.save();
      res.status(200).json({
        message: "Listing is removed form wish list",
        wishlist: user.wishList,
      });
    } else {
      user.wishList.push(listing);
      await user.save();
      res.status(200).json({
        message: "Listing is added to form wish list",
        wishlist: user.wishList,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({ error: err.message });
  }
});

// Get property list API
router.get("/:userId/properties", async (req, res) => {
  try {
    const { userId } = req.params;
    const properties = await Listing.find({ creator: userId }).populate(
      "creator"
    );
    res.status(202).json(trip);
  } catch (err) {
    console.log(err);
    res
      .status(404)
      .json({ message: "Can not find properties", error: err.message });
  }
});

// Get reservaion list API
router.get("/:userId/reservaions", async (req, res) => {
  try {
    const { userId } = req.params;
    const reservaions = await Booking.find({ hostId: userId }).populate(
      "customerId hostId listingId"
    );
    res.status(202).json(reservaions);
  } catch (err) {
    console.log(err);
    res
      .status(404)
      .json({ message: "Can not find reservaions", error: err.message });
  }
});

module.exports = router;
