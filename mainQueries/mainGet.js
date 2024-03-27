// mainGet.js
const express = require("express");
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
    // sql.close();
  }
});

router.get("/rangimage_GETDATE_dif1", async (req, res) => {
  try {
    const pool = await connectDB();
    const querymemid = queriesget.getrank_daily_stats_GETDATE_dif1();
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
    // sql.close();
  }
});

router.get("/rangimageandchangeRank", async (req, res) => {
  try {
    const pool = await connectDB();
    const querymemid = queriesget.getrankimageandchangeRank();
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
    // sql.close();
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

router.get("/getListimagebyid/:id", async (req, res) => {
  try {
    const pool = await connectDB();
    const query = queriesget.getListimagebyid(req.params.id);
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
    sql.close();
  }
});

router.get("/getdaily_statsByIdImage/:id", async (req, res) => {
  try {
    const pool = await connectDB();
    const query = queriesget.getdaily_statsByIdImage(req.params.id);
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

router.get("/getListDaily_statsByIduser/:id", async (req, res) => {
  try {
    const pool = await connectDB();
    const query = queriesget.getListDaily_statsByIduser(req.params.id);
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

router.get("/getRandomImage", async (req, res) => {
  try {
    const pool = await connectDB();
    const query = queriesget.getRandomImage();
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

// router.get("/getusernamebyid/:id", async (req, res) => {
//   try {
//     const pool = await connectDB();
//     const query = queriesget.getusernamebyid(req.params.id);
//     const result = await pool.request().query(query);

//     if (result) {
//       res.json(result.recordset);
//     } else {
//       res.status(404).json({ error: "User not found" });
//     }
//   } catch (err) {
//     console.error("Error retrieving user data:", err);
//     res.status(500).json({ error: "Internal Server Error" });
//   } finally {
//     sql.close();
//   }
// });

router.get("/getListDailyByday_statsByIduser/:id", async (req, res) => {
  try {
    const pool = await connectDB();
    const query = queriesget.getListDailyByday_statsByIduser(req.params.id);
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

router.get("/getuserById/:id", async (req, res) => {
  try {
    const pool = await connectDB();
    const query = queriesget.getuserById(req.params.id);
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
