const express = require("express");
const request = require("request-promise");

const app = express();
const PORT = process.env.PORT || 8080;

// const apiKey = 'a79075d062f5c2b26776c6ded816ba73';
// const generateScraperUrl(apiKey) = `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`
const generateScraperUrl = (apiKey) =>
  `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to Eki-API.");
});

// GET Product Details
app.get("/products/:productId", async (req, res) => {
  const { productId } = req.params;
  const { api_key } = req.query;
  try {
    const response = await request(
      `${generateScraperUrl(
        api_key
      )}&url=https://www.amazon.com/dp/${productId}`
    );
    res.json(JSON.parse(response));
  } catch (error) {
    res.json({ message: error });
  }
});

// GET Product Review
app.get("/products/:productId/reviews", async (req, res) => {
  const { productId } = req.params;
  const { api_key } = req.query;

  try {
    const response = await request(
      `${generateScraperUrl(
        api_key
      )}&url=https://www.amazon.com/product-reviews/${productId}`
    );
    res.json(JSON.parse(response));
  } catch (error) {
    res.json({ message: error });
  }
});

// GET Product Offers
app.get("/products/:productId/offers", async (req, res) => {
  const { productId } = req.params;
  const { api_key } = req.query;

  try {
    const response = await request(
      `${generateScraperUrl(
        api_key
      )}&url=https://www.amazon.com/gp/offer-listing/${productId}`
    );
    res.json(JSON.parse(response));
  } catch (error) {
    res.json({ message: error });
  }
});

// GET Search Results
app.get("/search/:searchQuery", async (req, res) => {
  const { searchQuery } = req.params;
  const { api_key } = req.query;

  try {
    const response = await request(
      `${generateScraperUrl(
        api_key
      )}&url=https://www.amazon.com/s?k=${searchQuery}`
    );
    res.json(JSON.parse(response));
  } catch (error) {
    res.json({ message: error });
  }
});

app.listen(PORT, () => console.log(`eki-API server running on port ${PORT}`));
