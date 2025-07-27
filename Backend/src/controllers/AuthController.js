import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      role,
      businessName,
      businessType,
      businessAddress,
      city,
      state,
      zipCode,
      businessLicense,
      taxId,
      businessDescription,
      username,
      accountType,
      password,
      marketingEmails,
      termsAccepted
    } = req.body;

    // Basic validation
    if (!fullName || !email || !phone || !role || !username || !password || !accountType || !termsAccepted) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    if (!["vendor", "supplier"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    // Check for existing user by email or username
    const userExists = await User.findOne({ $or: [{ email }, { username }] });
    if (userExists) {
      return res.status(400).json({ message: "User with this email or username already exists" });
    }

    // Create user with all fields
    const user = await User.create({
      fullName,
      email,
      phone,
      role,
      businessName,
      businessType,
      businessAddress,
      city,
      state,
      zipCode,
      businessLicense,
      taxId,
      businessDescription,
      username,
      accountType,
      password,
      marketingEmails,
      termsAccepted
    });

    // Hide password in response
    user.password = undefined;

    res.status(201).json({
      message: "Registration successful",
      user
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { emailOrPhone, password } = req.body;
    if (!emailOrPhone || !password) {
      return res.status(400).json({ message: "Email/Phone and password are required" });
    }

    // Find user by email or phone
    const user = await User.findOne({
      $or: [{ email: emailOrPhone }, { phone: emailOrPhone }]
    });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        role: user.role,
        username: user.username
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

