require("dotenv").config();
const express = require("express");

//express app
const app = express();

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next(); // Ensure the request proceeds to the next middleware or route handler
});

//routes
app.get("/", (req, res) => {
  res.json({ mssg: "welcome!" });
});

//listen for requests
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
