"use strict";

// Basic express setup:
const PORT            = 8080;
const express         = require("express");
const bodyParser      = require("body-parser");
const sassMiddleware  = require("node-sass-middleware");
const app             = express();

app.use(sassMiddleware({
    /* Options */
    src: '/sass',
    dest: '/public',
    debug: true,
    outputStyle: 'compressed',
    prefix:  '/styles'  // Where prefix is at <link rel="stylesheets" href="prefix/style.css"/>
}));

// MongoDB parameters
const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = "mongodb://localhost:27017/tweeter";

app.use(bodyParser.urlencoded({ extended: true }));
//app.use(express.static("public"));

app.use(express.static("public"));
app.set('view engine', 'ejs');

// Try a connection to MongoDB
MongoClient.connect(MONGODB_URI, (err, db) => {

  // If the connection failed
  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }

  // The `data-helpers` module provides an interface to the database of tweets.
  // This simple interface layer has a big benefit: we could switch out the
  // actual database it uses and see little to no changes elsewhere in the code
  // (hint hint).
  //
  // Because it exports a function that expects the `db` as a parameter, we can
  // require it and pass the `db` parameter immediately:
  const DataHelpers = require("./lib/data-helpers.js")(db);

  // The `tweets-routes` module works similarly: we pass it the `DataHelpers` object
  // so it can define routes that use it to interact with the data layer.
  const tweetsRoutes = require("./routes/tweets")(DataHelpers);
  const usersRoutes = require("./routes/users")(DataHelpers);

  // Mount the tweets routes at the "/tweets" path prefix:
  app.use("/tweets", tweetsRoutes);

  app.use("/users", usersRoutes);

  app.get("/", (req, res) => {
    res.render("index");
  });

  app.listen(PORT, () => {
    console.log("Example app listening on port " + PORT);
  });

});
