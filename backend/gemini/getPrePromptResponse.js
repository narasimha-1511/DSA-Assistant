const preprompt = (req, res) => {
  res.json({
    message: "Hello from the Prompt server",
  });
};

module.exports = preprompt;
