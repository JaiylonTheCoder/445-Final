const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  name: String,
  title: String,
  upvotes: Number,
  comments: [
    {
      author: String,
      text: String,
    },
  ],
  content: [String],
});

module.exports = mongoose.model("articleModel", articleSchema);