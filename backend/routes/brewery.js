// routes/brewery.js
const express = require("express");
const axios = require("axios");
const Review = require("../model/review");
const auth = require("../middleware/user.middleware");
const router = express.Router();

router.get("/search", async (req, res) => {
  const { city, name, type } = req.query;
  let url = "http://api.openbrewerydb.org/v1/breweries";

  if (city) {
    url += `?by_city=${city}`;
  } else if (name) {
    url += `?by_name=${name}`;
  } else if (type) {
    url += `?by_type=${type}`;
  }

  try {
    const response = await axios.get(url);
    const breweries = response.data;

    // Fetch reviews for each brewery
    const breweriesWithReviews = await Promise.all(
      breweries.map(async (brewery) => {
        // const reviews = await Review.find({ breweryId: brewery.id }).populate('userId', 'username');
        const reviews = await Review.find({ breweryId: brewery.id });
        return {
          ...brewery,
          reviews: reviews.map((review) => ({
            username: review.username,
            rating: review.rating,
            description: review.description,
          })),
        };
      })
    );

    res.json(breweriesWithReviews);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const reviews = await Review.find({ breweryId: id }).populate(
      "userId",
      "username"
    );
    res.json(reviews);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/review/:id", auth, async (req, res) => {
  const { id } = req.params;
  const { rating, description } = req.body;
  //   console.log(req.username.username);
  try {
    const review = new Review({
      breweryId: id,
      username: req.username,
      rating,
      description,
    });

    await review.save();
    res.json(review);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
