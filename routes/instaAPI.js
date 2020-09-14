const cheerio = require("cheerio");
const express = require("express");
const Router = express.Router();
const axios = require("axios");
const config = require("config");


// Route to get Instagram followers, following, no.of posts and recent posts
// GET Route

Router.get("/", async (req, res, next) => {
	let followers_count,
		follow_count,
		posts,
		post_count,
		string,
		final_args;

	try {
    await axios
			.get("https://www.instagram.com/advertere.tms/")
			.then((response) => {
				let $ = cheerio.load(response.data);
				string = $("meta[property='og:description']").attr("content");
				final_args = string.split(" - ")[0].split(", ");
				let followers = final_args[0].split(" ");
				let follow = final_args[1].split(" ");
				let post = final_args[2].split(" ");
				followers_count = followers[0];
				post_count = post[0];
				follow_count = follow[0];
			});

		posts = await axios.get(
			`https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url&access_token=${config.get(
				"access_token"
			)}`
		);

		posts = posts.data.data.map((post) => {
			return post.media_url;
		});

		posts.splice(6);

		res.status(200).json({
			posts,
			follow_count,
			followers_count,
			post_count,
		});
  } catch (err) {
    res.status(500).json({ msg: "Server Error" })
  }
});

module.exports = Router;
