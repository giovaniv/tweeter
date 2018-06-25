"use strict";

const cookieSession   = require('cookie-session')
const bcrypt          = require('bcryptjs');

const express         = require('express');

const usersRoutes     = express.Router();

module.exports = function(DataHelpers) {


  // ==========================================================
  // REGISTER SESSION - GET AND POST

  // Redirection to the register page
  usersRoutes.get("/register", (req, res) => {
    res.status(201).render("register", { myUser: req.session.myUser, myName: req.session.myName } );
  });

  // Register a new user in database
  usersRoutes.post("/register", (req, res) => {

    const fullName = req.body.fullname;
    const handle = req.body.handle;
    const avatar = req.body.avatar;
    const password = req.body.password;
    const hashed = bcrypt.hashSync(password, 10);

    const newUser = {
      name: fullName,
      handle: handle,
      password: hashed,   // encripted password
      avatars: {
        small: avatar,
        regular: avatar,
        large: avatar
      }
    };

    const checkUser = { handle: handle };

    // first we check if the user already exists
    DataHelpers.checkUser(checkUser, (err, resp) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        // if we had success and the user really dont exists, we create it
        let result = Object.keys(resp).length;
        if (result === 0) {
          DataHelpers.createNewUser(newUser, (err) => {
            if (err) {
              res.status(500).json({ error: err.message });
            } else {
              req.session.myUser = newUser.handle;
              req.session.myName = newUser.name;
              res.status(201).render("index", { myUser: req.session.myUser, myName: req.session.myName } );
            }
          });
        } else {
          res.status(201).render("register", { myUser: req.session.myUser, myName: req.session.myName, error: 'User already exists' });
        }
      }
    });

    return;

  });

  // ==========================================================


  // ==========================================================
  // LOGIN SESSION - GET AND POST

  // Redirection to the register page
  usersRoutes.get("/login", (req, res) => {
    res.status(201).render("login", { myUser: req.session.myUser, myName: req.session.myName } );
  });

  // Register a new user in database
  usersRoutes.post("/login", (req, res) => {

    const handle    = req.body.handle;
    const password  = req.body.password;

    const checkUser = { handle: handle };
    let paramVars =

    // first we check if the user already exists
    DataHelpers.checkUser(checkUser, (err, user) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        // if we had success and the user really exists,
        // we check if the password is the same
        let result = Object.keys(user).length;
        if (result > 0) {
          let checkPassword = bcrypt.compareSync(password, user[0].password);
          if (checkPassword) {
            req.session.myUser = user[0].handle;
            req.session.myName = user[0].name;
            res.status(201).render("index", { myUser: req.session.myUser, myName: req.session.myName } );
          } else {
            res.status(201).render("login", { myUser: req.session.myUser, myName: req.session.myName, error: 'Wrong password. Try again.' });
          }
        // if the user wasn't found, error
        } else {
          res.status(201).render("login", { myUser: req.session.myUser, myName: req.session.myName, error: 'Username not found. Try again.' });
        }
      }
    });

  });

  // ==========================================================


  // ==========================================================
  // LOGOUT SESSION - GET AND POST

  // Logout the user and clean cookie
  usersRoutes.post('/logout', (req, res) => {
    req.session = null;
    res.status(201).render("index", { myUser: null, myName: null } );
  });

  return usersRoutes;

}
