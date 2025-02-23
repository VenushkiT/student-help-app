const askAI = async (req, res) => {
  const { query, file } = req.body;

  if (!query || !file) {
    return res.status(400).json({ error: "Query and file are required" });
  }

  // to be implemented: call AI model to get response
  const aiResponse = `Simulated response for query: "${query}" with file: "${file}"`;

  res.json({ answer: aiResponse });
};

module.exports = { askAI };
