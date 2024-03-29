const express = require("express");
const jwt = require("jsonwebtoken");
const argon2 = require('argon2');
const { connectDB } = require("./db");
const sql = require("mssql");
const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const pool = await connectDB();
    const result = await pool
      .request()
      .input("username", sql.NVarChar, username)
      .query(`SELECT * FROM users_avdweb WHERE username = @username`);

    const user = result.recordset[0];

    if (!user) {
      console.log("User not found");
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Check if the provided password matches the hashed password in the database
    const isPasswordValid = await argon2.verify(user.password, password);
    if (!isPasswordValid) {
      console.log("Invalid password");
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign(
      { userId: user.id, username: user.username },
      "your_secret_key" // Replace "5555" with a more secure secret key
    );
    
    console.log("Generated Token:", token);
    res.json({ "token":token,"user":user });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Signup API
router.post("/signup", async (req, res) => {
  try {
    const { username, password, email, aka, image_profile } = req.body;
    const hashedPassword = await argon2.hash(password); // Removed the second parameter which was incorrectly applied

    const pool = await connectDB();
    await pool
      .request()
      .input("username", sql.NVarChar, username)
      .input("password", sql.NVarChar, hashedPassword)
      .input("email", sql.NVarChar, email)
      .input("aka", sql.NVarChar, aka)
      .input("image_profile", sql.NVarChar, image_profile)
      .query(
        `INSERT INTO users_avdweb (username, password, email, aka, image_profile) VALUES (@username, @password, @email, @aka, @image_profile)`
      );

    res.json({ message: "User created successfully" }); // Changed to a more informative message
  } catch (error) {
    console.log(error);
    if (error.code === "EREQUEST" && error.number === 2627) {
      // Duplicate key violation error handling
      console.error("Duplicate email detected. User with this email already exists.");
      return res.status(400).json({
        success: false,
        message: "User with this email already exists.",
      });
    } else {
      // Handle other errors
      console.error("Error during signup:", error);
      return res.status(500).json({ success: false, message: "An error occurred during signup." });
    }
  }
});

module.exports = router;
