const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Article = require("./models/articleModel");

require("dotenv").config({ path: __dirname + "/.env" });

const uri = process.env.MONGO_URI;
const port = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json()); // Middleware to parse JSON request bodies

// Connect to MongoDB
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

// Listen for MongoDB connection events
db.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

db.once("open", () => {
  console.log("Connected to MongoDB");

  // Start your Express.js server only after MongoDB connection is established
  app.listen(port, () => {
    console.log(`costaatt app listening on port ${port}`);
  });
});

app.get("/", (req, res) => {
  res.send("Hello from the server");
});

app.post("/articles", async (req, res) => {
  try {
    // Extract article data from the request body
    const { name, title, content } = req.body;

    // Create a new article using the Article model
    const newArticle = new Article({ name, title, content });

    // Save the new article to the database
    await newArticle.save();

    // Send a success response
    res.status(201).json(newArticle);
  } catch (error) {
    console.error("Error creating article:", error);
    res.status(500).json({ message: "Server error" });
  }
});
