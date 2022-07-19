const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// mongodb config
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.7adfu.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect((err) => {
  const frontPageTopImgCollection = client
    .db("onlineBook")
    .collection("topImg");

  // INSERT Top Image  AT THE DATABASE home page
  app.post("/addFrontPageTopImage", async (req, res) => {
    try {
      const data = await req.body;
      const result = await frontPageTopImgCollection.insertOne(data);
      res.send(result.acknowledged);
    } catch (error) {
      console.log("err", error);
    }
  });

  // get the front page Top Image from  collection home page
  app.get("/getFrontPageTopImage", async (req, res) => {
    try {
      const topImg = await frontPageTopImgCollection.find().toArray();
      if (topImg.length > 0) {
        res.send(topImg);
      }
    } catch (error) {
      console.log("err", error);
    }
  });

  // mongodb connected message
  console.log("database connected");
});

// root url route
app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(process.env.PORT || 5000, () => {
  console.log("app listening");
});
