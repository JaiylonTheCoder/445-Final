// Import necessary modules and the Article model

const express = require("express");
const router = express.Router();
const Article = require("../models/articleModel"); // Import the Article model

// GET All Articles route
router.get("/", async (req, res) => {
    try {
        const articles = await Article.find();
        res.json(articles);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// GET Article by Name route
router.get("/:name", async (req, res) => {
    const name = req.params.name;
    try {
        const article = await Article.findOne({ name });
        if (!article) {
            return res.status(404).json({ message: "Article not found" });
        }
        res.json(article);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// PUT (Update) Upvotes for an Article route
router.put("/:name/upvotes", async (req, res) => {
    const name = req.params.name;
    try {
        const article = await Article.findOne({ name });
        if (!article) {
            return res.status(404).json({ message: "Article not found" });
        }
        article.upvotes += 1;
        await article.save();
        res.json(article);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// POST Create New Article route (you can place it here)
router.post("/", async (req, res) => {
    try {
        const { name, title, content } = req.body;

        // Create a new article instance
        const newArticle = new Article({
            name,
            title,
            content: [content], // Assuming content is an array based on your schema
        });

        // Save the new article to the database
        const savedArticle = await newArticle.save();
        res.status(201).json(savedArticle);
    } catch (error) {
        console.error("Error creating article:", error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
