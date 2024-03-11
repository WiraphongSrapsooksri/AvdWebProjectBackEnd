// mainGet.js
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { connectDB } = require("../db");
const sql = require("mssql");
const router = express.Router();

const querydelete_update = require("../Queries/delete_update");

router.put("/updateimage", async (req, res) => {
  try {
    const pool = await connectDB();
    const query = querydelete_update.updateimage(
      req.body.image_id,
      req.body.image_url,
      req.body.user_id
    );
    const result = await pool.request().query(query);

    if (result) {
      res.json(result.recordset);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (err) {
    console.error("Error retrieving user data:", err);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    // sql.close();
  }
});

router.delete("/deleteimageByuser", async (req, res) => {
  try {
    const pool = await connectDB();
    const query = querydelete_update.deleteimageByuser(
      req.body.image_id,
      req.body.user_id
    );
    const result = await pool.request().query(query);

    if (result) {
      res.json(result.recordset);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (err) {
    console.error("Error retrieving user data:", err);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    // sql.close();
  }
});



module.exports = router;
