const router = require("express").Router;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");

const User = require("../models/User");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/"); // Store uploaded files in the uploads folder
  },
  filename: function (req, file, cd) {
    cb(null, file.originalname); // use the original file name
  },
});

const upload = multer({ storage });

// USER REGISTER

router.post("/register", upload.single("profileImage"), async (req, res) => {
  try {
    // Take all information from the form
    const { firstName, lastName, email, password } = req.body;

    // The uploaded file is available as req.file
    const profileImage = req.file;

    if (!profileImage) {
      return res.status(400).send("No file uploaded");
    }

    // Path to the uploaded profile photo
    const profileImagePath = profileImage.path;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User Already Exists!" });
    }

    // Password hashing
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      profileImage,
    });

    // Save new user
    await newUser.save();

    // Send successfull message
    res
      .status(200)
      .json({ message: "User registered successfully!", user: newUser });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Registration failed!", error: error.message });
  }
})

model.export = router;
