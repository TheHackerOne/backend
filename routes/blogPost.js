const express = require("express");
const Router = express.Router();
const axios = require("axios");
const Blog = require("../models/blog");

// Add a blog
// POST -> "/blog"z
Router.post("/", async (req, res, next) => {
	let blogpost = new Blog({
		title: req.body.title,
		description: req.body.description,
		markdown: req.body.markdown,
	});

	try {
		const blogPost = await blogpost.save();

		console.log(blogPost);
		res.status(200).json({ msg: "successfully created" });
	} catch (err) {
		console.log(err);
		res.status(500).json({ msg: "Server Error" });
	}
});

// Delete a blog
// DELETE -> "/blog/:id"
Router.delete("/:id", async (req, res, next) => {
	try {
		await Blog.findByIdAndDelete(req.params.id);

		res.status(201).json({ msg: "Successfully Deleted" });
	} catch (error) {
		console.log(error);
		res.status(500).json({ msg: "Server Error" });
	}
});

// Edit a blog
// PUT -> "/blog/:id"
Router.put("/:id", async (req, res, next) => {
	let blogpost = await Blog.findById(req.params.id);

	blogpost.title = req.body.title;
	blogpost.description = req.body.description;
	blogpost.markdown = req.body.markdown;

	try {
		const blogz = await blogpost.save();
		console.log(blogz);
		res.status(200).json("Blogpost successfully updated");
	} catch (err) {
		console.log(err);
		res.status(500).json({ msg: "Server Error" });
	}
});

// Get all blogs
// GET -> "/blog"
Router.get("/", async (req, res, next) => {
	try {
		const blogs = await Blog.find().sort({
			createdAt: "desc",
		});

		res.status(200).json(blogs);
	} catch (err) {
		console.log(err);
		res.status(500).json({ msg: "Server Error" });
	}
});

// Get a single Blog
// GET -> "/blog/:slug"
Router.get("/:slug", async (req, res, next) => {
	try {
		const blog = await Blog.findOne({ slug: req.params.slug });

		res.status(200).json(blog);
	} catch (err) {
		console.log(err);
		res.status(500).json({ msg: "ServerError" });
	}
});

module.exports = Router;
