const express = require("express");
const cors = require("cors");
const v1 = require("./routes/v1");
// const scrapeLeetCodeProblem = require("./pupertterawslambda");

const app = express();
require("dotenv").config();

const corsOptions = {
  origin: function (origin, callback) {
    if (process.env.ALLOWED_ORIGINS.split(",").indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(express.json(cors));
app.use(cors(corsOptions));

app.use("/api", v1);

app.get("*", (req, res) => {
  res.status(401).json({
    error: "Unauthorized access",
  });
});

app.listen(process.env.PORT, () => {
  console.log("Server is running on port 3000");
});

// app.get("/scrape", (req, res) => {
//   try {
//     console.log("Scraping data... dfsdfds");
//     scrapeLeetCodeProblem(
//       "https://leetcode.com/problems/two-sum/description/"
//     ).then((data) => {
//       console.log("Data:", data);
//       res.json(data);
//     });
//   } catch (error) {
//     console.error("Error fetching data:", error.Error);
//     res.json({ error: error.Error });
//   }
// });
