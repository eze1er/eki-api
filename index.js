const express = require("express");
const request = require("request-promise");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to Eki-API.");
});

app.listen(PORT, () => console.log(`eki-API server running on port ${PORT}`));
