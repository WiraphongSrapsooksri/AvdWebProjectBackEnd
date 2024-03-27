// mainGet.js
const express = require("express");
const { connectDB } = require("../db");
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

router.put("/updateimageprofile", async (req, res) => {
  try {
    const pool = await connectDB();
    const query = querydelete_update.updateimageprofile(
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


router.put("/updatedataprofile", async (req, res) => {
  try {
    const pool = await connectDB();
    const query = querydelete_update.updatedataprofile(
      req.body.user_id,
      req.body.username,
      req.body.aka,
      req.body.email
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
