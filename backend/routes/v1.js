const express = require("express");
const { preprompt } = require("../controllers/PrePrompt");
const { customDoubt } = require("../controllers/CustomDoubt");
const { continuee } = require("../controllers/continue");

const router = express.Router();

router.post("/custom", customDoubt);

router.post("/preprompt", preprompt);

router.post("/continue", continuee);

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
