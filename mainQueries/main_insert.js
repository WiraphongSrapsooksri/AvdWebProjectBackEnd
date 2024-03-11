// mainGet.js
const express = require("express");
const { connectDB } = require("../db");
const router = express.Router();
const queriesinsert = require("../Queries/insert");

router.post("/insertimage", async (req, res) => {
  try {
    const pool = await connectDB();
    const query = queriesinsert.insertimageByuser(
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


router.post("/updatevoteImage", async (req, res) => {
  try {
    const pool = await connectDB();
    const query = queriesinsert.updatevoteImage(
      req.body.user_id,
      req.body.image_id,
      req.body.vote_value
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
})

module.exports = router;
