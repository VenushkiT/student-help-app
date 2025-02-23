const askAI = async (req, res) => {
  const { query, file } = req.body;

  if (!query || !file) {
    return res.status(400).json({ error: "Query and file are required" });
  }

  // Simulate AI response (replace with actual AI service call)
  const aiResponse = `Simulated response for query: "${query}" with file: "${file}"`;

  res.json({ answer: aiResponse });
};

module.exports = { askAI };
