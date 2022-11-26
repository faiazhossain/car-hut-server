const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();
const port = process.env.PORT || 5000;

const app = express();

//middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.fpsp1lt.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const carCollection = client.db("carHut").collection("carData");
    const allCars = client.db("carHut").collection("allCars");

    app.get("/brands", async (req, res) => {
      const query = {};
      const cursor = carCollection.find(query);
      const brands = await cursor.toArray();
      res.send(brands);
    });
  } finally {
  }
}
run().catch((err) => console.error(err));

app.get("/", async (req, res) => {
  res.send("Car hut server is running");
});

app.listen(port, () => console.log(`Car Hut running on ${port}`));
