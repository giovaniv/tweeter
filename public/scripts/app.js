/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// fake temporary data
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];

// We create our container with each tweet
function createTweetElement(tweet) {

  let result;
  let header;
  let footer;
  let username = tweet.user.name;
  let handle = tweet.user.handle;
  let text = tweet.content.text;
  let createdAt = tweet.created_at;
  let avatarSmall = tweet.user.avatars.small;
  let avatarRegular = tweet.user.avatars.regular;
  let avatarLarge = tweet.user.avatars.large;

  result = $("<article>").addClass("tweet");
  header = "<header>";
  header += "<img class='logo' src=" + avatarRegular + " width='50px' height='50px'>";
  header += "<span class='name'>" + username + "</span>";
  header += "<span class='login'>" + handle + "</span>";
  header += "</header>";
  result.append(header);
  result.append("<p>" + text + "</p>");
  footer = "<footer>";
  footer += "<span class='time'>" + createdAt + "</span>";
  footer += "<span class='icons'>";
  footer += "<a href='#'><i class='fas fa-flag'></i></a>";
  footer += "<a href='#'><i class='fas fa-retweet'></i></a>";
  footer += "<a href='#'><i class='fas fa-heart'></i></a>";
  footer += "</span></footer>"
  result.append(footer);

  return result;

}

// We loop through tweets, calling createTweetElement function
// for each tweet to appends it to the tweets container
function renderTweets(tweets) {

  for (let i = 0; i < tweets.length; i++) {
      let $tweet = createTweetElement(tweets[i]);
      $('#allTweets').append($tweet);
  }

}

// Main function that on click event of input button
// we prevent the submit and call renderTweets function
$(document).ready(function() {

  $("input").click(function(event) {
    event.preventDefault();
    renderTweets(data);
  });

});



