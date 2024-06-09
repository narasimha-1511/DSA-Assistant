const express = require("express");
const path = require("path");
// const cors = require("cors");
const v1 = require("./routes/v1");
const scrapeLeetCodeProblem = require("./pupertter");
const { sourceMapsEnabled } = require("process");
// const { default: axios } = require

const app = express();
require("dotenv").config();

//configuring cors to allow requests from frontend
const corsOptions = {
  origin: function (origin, callback) {
    if (process.env.ALLOWED_ORIGINS.split(",").indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(express.json());
// app.use(cors());

app.get("/scrape", (req, res) => {
  try {
    console.log("Scraping data... dfsdfds");
    scrapeLeetCodeProblem(
      "https://leetcode.com/problems/two-sum/description/"
    ).then((data) => {
      console.log("Data:", data);
      res.json(data);
    });
  } catch (error) {
    console.error("Error fetching data:", error.Error);
    res.json({ error: error.Error });
  }
});

app.use("/api", v1);

app.get("*", (req, res) => {
  res.json({
    error: "Unauthorized access",
  });
});

app.listen(process.env.PORT, () => {
  console.log("Server is running on port 3000");
});
