const router = require("express").Router();
const Booking = require("../models/Booking");

// Get trip list
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

module.exports = router;