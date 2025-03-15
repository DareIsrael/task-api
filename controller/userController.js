const userModel = require("../model/userModel");
const jwt = require("jsonwebtoken");

// Create JWT token
const createToken = ( id ) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// Register a new user
const register = async (req, res) => {
  const { name, email, password, phone, country, company } = req.body;

  try {
    // Check if user already exists
    let user = await userModel.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    user = new userModel({
      name,
      email,
      password,
      phone,
      country,
      company,
    });

    await user.save();

    // Return success message (no token)
    res.status(201).json({ message: "User registered successfully. Please log in." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Login user
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "User does not exist" });
    }

    // Check if the provided password matches the stored password
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    // Generate a token
    const token = createToken(user._id);

    res.json({ success: true, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error occurred while logging in" });
  }
};

// Get all users
const getUsers = async (req, res) => {
  try {
    const users = await userModel.find().select("-password");
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { register, login, getUsers };