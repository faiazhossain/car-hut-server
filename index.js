const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 5000;

const app = express();

app.get("/", async (req, res) => {
  res.send("Car hut server is running");
});

app.listen(port, () => console.log(`Car Hut running on ${port}`));
