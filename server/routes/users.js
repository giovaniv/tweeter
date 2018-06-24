"use strict";

// const userHelper    = require("../lib/util/user-helper")

const express       = require('express');
const usersRoutes  = express.Router();

module.exports = function(DataHelpers) {


  // ==========================================================
  // REGISTER SESSION - GET AND POST

  // Redirection to the register page
  usersRoutes.get("/register", (req, res) => {
    res.status(201).render('register');
  });

  // Register a new user in database
  usersRoutes.post("/register", (req, res) => {
    // let userID = req.session.user_id;
    // let templateVars = { user: userDatabase[userID] };
    // res.render('register', templateVars);

    const fullName = req.body.name;
    const handle = req.body.handle;
    const avatar = req.body.avatar;
    const password = req.body.password;

    const user = {
      name: fullName,
      handle: handle,
      password: password,
      avatars: {
        small: avatar,
        regular: avatar,
        large: avatar
      }
    };

    console.log(user);

    return;
  });

  // ==========================================================


  // ==========================================================
  // LOGIN SESSION - GET AND POST

  // Redirection to the register page
  usersRoutes.get("/login", (req, res) => {
    res.status(201).render('login');
  });

  // // Login in the Tweeter App
  // usersRoutes.post("/login", (req, res) => {
  //   // let userID = req.session.user_id;
  //   // let templateVars = { user: userDatabase[userID] };
  //   // res.render('login', templateVars);
  //   res.render('login');
  // });

  // ==========================================================


  // ==========================================================
  // LOGOUT SESSION - GET AND POST

  // Logout the user and clean cookie
  usersRoutes.post('/logout', (req, res) => {
    // req.session = null;
    console.log('login');
    res.send("login");
  });

 // ==========================================================




  // usersRoutes.get("/register", function(req, res) {
  //   if


  //   DataHelpers.getTweets((err, tweets) => {
  //     if (err) {
  //       res.status(500).json({ error: err.message });
  //     } else {
  //       res.json(tweets);
  //     }
  //   });
  // });

  // usersRoutes.get("/", function(req, res) {
  //   if (!req.body.text) {
  //     res.status(400).json({ error: 'invalid request: no data in POST body'});
  //     return;
  //   }

  //   const user = req.body.user ? req.body.user : userHelper.generateRandomUser();
  //   const tweet = {
  //     user: user,
  //     content: {
  //       text: req.body.text
  //     },
  //     created_at: Date.now(),
  //     likes: 0,
  //     liked: false
  //   };

  //   DataHelpers.saveTweet(tweet, (err) => {
  //     if (err) {
  //       res.status(500).json({ error: err.message });
  //     } else {
  //       res.status(201).send();
  //     }
  //   });
  // });

  // // Route to update likes of a tweet
  // usersRoutes.post("/:id", function(req, res) {
  //   let uid = req.params.id;
  //   let liked = req.body.liked;
  //   DataHelpers.saveLikes(uid, liked, (err) => {
  //     if (err) {
  //       res.status(500).json({ error: err.message });
  //     } else {
  //       res.status(201).send();
  //     }
  //   });
  // });

  return usersRoutes;

}
