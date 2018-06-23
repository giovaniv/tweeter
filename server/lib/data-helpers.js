"use strict";

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
      db.collection("tweets").insertOne(newTweet,(err) => {
        if (err) {
          return callback(err);
        }
        callback(null, true);
      });
    },

    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
      db.collection("tweets").find().toArray((err, tweets) => {
        if (err) {
          return callback(err);
        }
        callback(null, tweets);
      });

    },

    // Save a like to a tweet
    saveLikes: function(userID, liked, callback) {

      let ObjectID = require('mongodb').ObjectID;
      let newValue = 0;
      let newLiked = liked;

      // if the tweet was liked, we unlike and decrease in 1 like
      // else we like and increase in 1 like
      if(liked === 'true') {
        newLiked = false;
        newValue = -1;
      } else {
        newLiked = true;
        newValue = 1;
      }

      // we set the new entries for SET and INC actions
      let setValues = { "liked": newLiked };
      let incValues = { "likes": newValue };

      // we do the update of the ObjectID
      db.collection("tweets").update({ "_id": ObjectID(userID) }, { $set: setValues, $inc: incValues }, (err) => {
        if (err) {
          return callback(err);
        }
        callback(null, true);
      });
    }

  };
}
