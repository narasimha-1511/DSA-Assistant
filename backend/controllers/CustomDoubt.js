const getResponse = require("../gemini/getCustomResponse");

async function customDoubt(req, res) {
  const { doubt, url, history } = req.body;

  if (!doubt) {
    return res.status(400).json({
      error: "douvbt is required",
    });
  }

  if (!url) {
    return res.status(400).json({
      error: "url is required",
    });
  }

  const response = await getResponse(url, doubt, history);

  res.json({
    message: response,
  });
}

module.exports = { customDoubt };
