const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const jwt = require("jsonwebtoken");

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
    const bookingsCollection = client.db("carHut").collection("bookings");
    const usersCollection = client.db("carHut").collection("users");

    app.get("/brands", async (req, res) => {
      const query = {};
      const cursor = carCollection.find(query);
      const brands = await cursor.toArray();
      res.send(brands);
    });

    app.get("/brands/:id", async (req, res) => {
      let id = req.params.id;
      let query = { categoryid: id };
      const cursor = allCars.find(query);
      const items = await cursor.toArray();
      res.send(items);
    });

    app.get("/bookings", async (req, res) => {
      const email = req.query.email;
      const query = { email: email };
      const bookings = await bookingsCollection.find(query).toArray();
      res.send(bookings);
    });

    app.post("/bookings", async (req, res) => {
      const booking = req.body;
      console.log(booking);
      const result = await bookingsCollection.insertOne(booking);
      res.send(result);
    });

    app.get("/users", async (req, res) => {
      const query = {};
      const users = await usersCollection.find(query).toArray();
      res.send(users);
    });

    app.post("/users", async (req, res) => {
      const user = req.body;
      const result = await usersCollection.insertOne(user);
      res.send(result);
    });
  } finally {
  }
}
run().catch((err) => console.error(err));

app.get("/", async (req, res) => {
  res.send("Car hut server is running");
});

app.listen(port, () => console.log(`Car Hut running on ${port}`));
