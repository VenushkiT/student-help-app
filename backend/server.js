require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const subjectRoutes = require("./routes/subjectRoute");
const materialRoutes = require("./routes/materialRoute");

//express app
const app = express();

//middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next(); // Ensure the request proceeds to the next middleware or route handler
});

// Using routes
app.use("/api/subjects", subjectRoutes);
app.use("/api/materials", materialRoutes);

//connect to mongodb
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    //listen for requests
    const PORT = process.env.PORT;
    app.listen(PORT, () => {
      console.log(`Connected to db & listening on port`, PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
