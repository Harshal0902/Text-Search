const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const PostRoutes = require("./routes/PostRoutes.js");
const PORT = 8000;

const app = express();
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '50mb' }));

app.use("/posts", PostRoutes);

const connectionUrl = process.env.DATABASE_URL;
mongoose
  .connect(connectionUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server running on port " + PORT);
    });
  })
  .catch((e) => {
    console.log("error", e.message);
  });