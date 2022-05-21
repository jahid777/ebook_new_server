const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;
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
  const termsConditionCollection = client
    .db("onlineBook")
    .collection("termsAndCondition");

  const frontPageTopImgCollection = client
    .db("onlineBook")
    .collection("topImg");

  const frontPageMiddleImgCollection = client
    .db("onlineBook")
    .collection("middleImg");

  const frontPageDisclaimerCollection = client
    .db("onlineBook")
    .collection("disclaimer");

  const displayBookBannerImg = client
    .db("onlineBook")
    .collection("displayBookImage");

  const bookCollection = client.db("onlineBook").collection("books");

  // INSERT terms and condition data AT THE DATABASE
  app.post("/addTermsCondition", async (req, res) => {
    try {
      const data = await req.body;
      const result = await termsConditionCollection.insertOne(data);
      res.send(result.acknowledged);
    } catch (error) {
      console.log("err", error);
    }
  });

  // get the terms and Condition data from  collection
  app.get("/getTermsCondition", async (req, res) => {
    try {
      const allTermsAndCondition = await termsConditionCollection
        .find()
        .toArray();
      if (allTermsAndCondition.length > 0) {
        res.send(allTermsAndCondition);
      }
    } catch (error) {
      console.log("err", error);
    }
  });

  //delete the terms and condition data from database
  app.delete("/termsConditiondelete/:id", async (req, res) => {
    try {
      const termsCondtionId = req.params.id;
      const result = await termsConditionCollection.deleteOne({
        _id: ObjectId(termsCondtionId),
      });
      if (result.deletedCount > 0) {
        res.send(true);
      }
    } catch (error) {
      console.log("err", error);
    }
  });

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

  // delete the front page Top Image from  collection home page
  app.delete("/topImgdelete/:id", async (req, res) => {
    try {
      const FrontTopImgId = req.params.id;
      const result = await frontPageTopImgCollection.deleteOne({
        _id: ObjectId(FrontTopImgId),
      });
      if (result.deletedCount > 0) {
        res.send(true);
      }
    } catch (error) {
      console.log("err", error);
    }
  });

  // INSERT middle Image AT THE DATABASE home page
  app.post("/addFrontPageMiddleImage", async (req, res) => {
    try {
      const data = await req.body;
      const result = await frontPageMiddleImgCollection.insertOne(data);
      res.send(result.acknowledged);
    } catch (error) {
      console.log("err", error);
    }
  });

  // get the front page middle Image from  collection home page
  app.get("/getFrontPageMiddleImage", async (req, res) => {
    try {
      const midImg = await frontPageMiddleImgCollection.find().toArray();
      if (midImg.length > 0) {
        res.send(midImg);
      }
    } catch (error) {
      console.log("err", error);
    }
  });

  // delete the front page middle Image from  collection home page
  app.delete("/middleImgdelete/:id", async (req, res) => {
    try {
      const midImgId = req.params.id;
      const result = await frontPageMiddleImgCollection.deleteOne({
        _id: ObjectId(midImgId),
      });
      if (result.deletedCount > 0) {
        res.send(true);
      }
    } catch (error) {
      console.log("err", error);
    }
  });

  // INSERT disclaimer data AT THE DATABASE home page
  app.post("/addFrontPageDisclaimer", async (req, res) => {
    try {
      const data = await req.body;
      const result = await frontPageDisclaimerCollection.insertOne(data);
      res.send(result.acknowledged);
    } catch (error) {
      console.log("err", error);
    }
  });

  // get the front page disclaimer from  collection home page
  app.get("/getFrontPageDisclaimer", async (req, res) => {
    try {
      const disclaimer = await frontPageDisclaimerCollection.find().toArray();
      if (disclaimer.length > 0) {
        res.send(disclaimer);
      }
    } catch (error) {
      console.log("err", error);
    }
  });

  // delete the front page disclaimer from  collection home page
  app.delete("/disclaimerDelete/:id", async (req, res) => {
    try {
      const disclaimerId = req.params.id;
      const result = await frontPageDisclaimerCollection.deleteOne({
        _id: ObjectId(disclaimerId),
      });
      if (result.deletedCount > 0) {
        res.send(true);
      }
    } catch (error) {
      console.log("err", error);
    }
  });

  //Insert display book top banner Image books display page
  app.post("/addDisplayBookTopImage", async (req, res) => {
    try {
      const data = await req.body;
      const result = await displayBookBannerImg.insertOne(data);
      res.send(result.acknowledged);
    } catch (error) {
      console.log("err", error);
    }
  });

  //get the display books top banner
  app.get("/DisplayBookTopImage", async (req, res) => {
    try {
      const displayBook = await displayBookBannerImg.find().toArray();
      if (displayBook.length > 0) {
        res.send(displayBook);
      }
    } catch (error) {
      console.log("err", error);
    }
  });

  //delete the display book banner
  app.delete("/bookDisplayImgdelete/:id", async (req, res) => {
    try {
      const displayBooksBannerImgId = req.params.id;
      const result = await displayBookBannerImg.deleteOne({
        _id: ObjectId(displayBooksBannerImgId),
      });
      if (result.deletedCount > 0) {
        res.send(true);
      }
    } catch (error) {
      console.log("err", error);
    }
  });

  // INSERT Books DATA AT THE DATABASE
  app.post("/addBookData", async (req, res) => {
    try {
      const data = await req.body;
      const result = await bookCollection.insertOne(data);
      res.send(result.acknowledged);
    } catch (error) {
      console.log("err", error);
    }
  });

  // get the Books DATA from  collection
  app.get("/getBookData", async (req, res) => {
    try {
      const bookData = await bookCollection.find().toArray();
      if (bookData.length > 0) {
        res.send(bookData);
      }
    } catch (error) {
      console.log("err", error);
    }
  });

  //get the single book for editing from collection
  app.get("/singleBook/:id", async (req, res) => {
    try {
      const books = await bookCollection
        .find({ _id: ObjectId(req.params.id) })
        .toArray();
      if (books.length > 0) {
        res.send(books[0]);
      }
    } catch (error) {
      console.log("err", error);
    }
  });

  //update books data edit
  app.patch("/updateBook/:id", (req, res) => {
    bookCollection
      .updateOne(
        { _id: ObjectId(req.params.id) },
        {
          $set: {
            bookImg: req.body.bookImg,
            bookName: req.body.bookName,
            authorName: req.body.authorName,
            isbn: req.body.isbn,
            bookNumber: req.body.bookNumber,
            bookLink: req.body.bookLink,
            downloadBookLink: req.body.downloadBookLink,
          },
        }
      )
      .then((result) => {
        res.send(result);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  //delete the books data from colletion
  app.delete("/bookDelete/:id", async (req, res) => {
    try {
      const booksId = req.params.id;
      const result = await bookCollection.deleteOne({
        _id: ObjectId(booksId),
      });
      if (result.deletedCount > 0) {
        res.send(true);
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
