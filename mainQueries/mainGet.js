// mainGet.js
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { connectDB } = require("../db");
const sql = require("mssql");
const router = express.Router();
const queriesget = require("../Queries/get");

router.get("/rangimage", async (req, res) => {
  try {
    const pool = await connectDB();
    const querymemid = queriesget.getrankimage();
    const result = await pool.request().query(querymemid);

    if (result) {
      res.json(result.recordset);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (err) {
    console.error("Error retrieving user data:", err);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    sql.close();
  }
});

router.get("/getListuser", async (req, res) => {
  try {
    const pool = await connectDB();
    const querymemid = queriesget.getListuser();
    const result = await pool.request().query(querymemid);

    if (result) {
      res.json(result.recordset);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (err) {
    console.error("Error retrieving user data:", err);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    sql.close();
  }
});

module.exports = router;
