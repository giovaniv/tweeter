/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

function createTweetElement(data) {

  let result;
  let header;
  let footer;
  let username = data.user.name;
  let handle = data.user.handle;
  let text = data.content.text;
  let createdAt = data.created_at;
  let avatarSmall = data.user.avatars.small;
  let avatarRegular = data.user.avatars.regular;
  let avatarLarge = data.user.avatars.large;

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

$(document).ready(function() {

   // Test / driver code (temporary). Eventually will get this from the server.
  const tweetData = {
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
  };

  $("input").click(function(event) {

    event.preventDefault();
    let $tweet = createTweetElement(tweetData);
    //console.log($tweet);
    $('#allTweets').append($tweet);

    // let $tweet;
    // let header;
    // let footer;
    // let username = tweetData.user.name;
    // let handle = tweetData.user.handle;
    // let text = tweetData.content.text;
    // let createdAt = tweetData.created_at;
    // let avatarSmall = tweetData.user.avatars.small;
    // let avatarRegular = tweetData.user.avatars.regular;
    // let avatarLarge = tweetData.user.avatars.large;

    // $tweet = $("<article>").addClass("tweet");
    // header = "<header>";
    // header += "<img class='logo' src=" + avatarRegular + " width='50px' height='50px'>";
    // header += "<span class='name'>" + username + "</span>";
    // header += "<span class='login'>" + handle + "</span>";
    // header += "</header>";
    // $tweet.append(header);
    // $tweet.append("<p>" + text + "</p>");
    // footer = "<footer>";
    // footer += "<span class='time'>" + createdAt + "</span>";
    // footer += "<span class='icons'>";
    // footer += "<a href='#'><i class='fas fa-flag'></i></a>";
    // footer += "<a href='#'><i class='fas fa-retweet'></i></a>";
    // footer += "<a href='#'><i class='fas fa-heart'></i></a>";
    // footer += "</span></footer>"
    // $tweet.append(footer);

    // console.log($tweet);

  });

  // var $tweet = createTweetElement(tweetData);
  // console.log($tweet);
  //console.log(tweetData);

});



