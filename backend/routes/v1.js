const express = require("express");
const preprompt = require("../gemini/getPrePromptResponse");

const router = express.Router();

router.get("/test", (req, res) => {
  res.json({
    message: "Hello from the Test server",
  });
});

router.post("/custom", (req, res) => {
  res.json({
    message: "Hello from the Custom server",
  });
});

router.post("/preprompt", preprompt);

router.get("/", (req, res) => {
  res.json({
    message: "Hello from the root server",
  });
});

router.get("*", (req, res) => {
  res.json({
    error: "Unauthorized access",
  });
});

module.exports = router;
