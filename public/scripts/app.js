/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Main function that on click event of input button
// we prevent the submit and call renderTweets function
$(document).ready(function() {

  function validateForm() {
    let text = $('textarea').val().length;
    if (!text) {
      alert('Please write something before submit');
      return false;
    }
    if (text > limitChars) {
      alert(`Maximum of ${limitChars} characters`);
      return false;
    }
    return true;
  }

  // function that check if the text have some HTML tags
  // and if has, change it to blank space
  function checkXss(text) {
    let result = text;
    let regex = /(<([^>]+)>)/ig;
    let hasTags = regex.test(text);
    if (hasTags) {
      result = text.replace(regex,'');
    }
    return result;
  }

  function escape(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  // We create our container with each tweet
  function createTweetElement(tweet) {

    let result = '';
    let header = '';
    let footer = '';
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
    result.append("<p>" + escape(text) + "</p>");
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
    let $tweet = $('<div>');
    for (let i = 0; i < tweets.length; i++) {
      $tweet = $tweet.prepend(createTweetElement(tweets[i]));
    }
    $('#allTweets').html($tweet);
  }

  // Function to load the tweets of the JSON
  function loadTweets() {
    $.ajax('/tweets', {
      method: 'GET',
      success: function(tweet) {
        renderTweets(tweet);  //function to render our tweets
      }
    });
  }

  // function to load the tweets
  loadTweets();

  // executed when we click in the tweet button in form
  $("input").click(function(event) {

    event.preventDefault();

    // if validateForm function returns true
    if (validateForm()) {
      let formData = $("form").serialize(); //Get the data from the form
      // Ajax request for create a new tweet in JSON at /tweets
      $.ajax('/tweets', {
        method: 'POST',
        data: formData
      }).done(function() {
        // we update the page with the loadTweets function
        $('#allTweets').load(loadTweets());
        $('form textarea').val('');
      })
    }

  });

  // executed when we click in the compose button
  $("button").click(function(){
    $(".new-tweet").slideToggle("slow");
    $("textarea").focus();
  });

});




