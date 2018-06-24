/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Main function that on click event of input button
// we prevent the submit and call renderTweets function
$(document).ready(function() {

  // function to load the page rendered by the routes
  function renderPage(data) {
    let newDoc = document.open("text/html", "replace");
    newDoc.write(data);
    newDoc.close();
  }

  // function to validate the textarea before the user submit the tweet
  function isTweetFormValidated() {
    const limitChars = 140; // Limit of chars that can be tweeted
    //let text = $('textarea').val().length;
    let tweetText = $('textarea').val();
    // if the tweet is empty
    if (!tweetText) {
      alert('Please write something before submit');
      return false;
    }
    // if the tweet length is bigger than 140 chars (limitChars variable)
    if (tweetText.length > limitChars) {
      alert(`Maximum of ${limitChars} characters`);
      return false;
    }
    return true;
  }

  // function to check if register fields are good before submit
  function isRegisterFormValidated() {
    let fullname = $('#fullname').val();
    let handle = $('#handle').val();
    let avatar = $('#avatar').val();
    let password = $('#password').val();
    console.log(fullname, handle, avatar, password);
    return true;
  }

  // function to check if login fields are good before submit
  function isLoginFormValidated() {
    let handle = $('#handle').val();
    let password = $('#password').val();
    console.log(handle, password);
    return true;
  }

  // function that avoid exploit code (XSS) in our tweet message
  function escape(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  // article creation for each new tweet sent in the app
  function createTweetElement(tweet) {

    let result = '';
    let header = '';
    let footer = '';
    let userID = tweet._id;
    let username = tweet.user.name;
    let handle = tweet.user.handle;
    let tweetMessage = tweet.content.text;
    let createdAt = tweet.created_at;
    let avatarSmall = tweet.user.avatars.small;
    let avatarRegular = tweet.user.avatars.regular;
    let avatarLarge = tweet.user.avatars.large;
    let liked = tweet.liked;

    // to show how many likes the tweet have
    let likes = tweet.likes;
    if (!likes) {
      likes = 0;
    }

    result = $("<article>").addClass("tweet");
    header = "<header>";
    header += "<img class='logo' src=" + avatarRegular + " width='50px' height='50px'>";
    header += "<span class='name'>" + username + "</span>";
    header += "<span class='login'>" + handle + "</span>";
    header += "</header>";
    result.append(header);
    result.append("<p>" + escape(tweetMessage) + "</p>");
    footer = "<footer>";
    footer += "<span class='time'>" + moment(createdAt).fromNow() + "</span>";
    footer += "<span class='icons'>";
    footer += "<button><i class='fas fa-flag'></i></button>";
    footer += "<button><i class='fas fa-retweet'></i></button>";
    footer += "<button id='likes' data-uid=" + userID + " data-liked=" + liked + "><i class='fas fa-heart'> " + likes + " likes</i></button>";
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


  // TWEET submit button form
  $('form').on('submit', function(event) {

    event.preventDefault();
    let elementID = $(this).attr('id');

    // user clicked in tweet button
    if (!elementID) {
      // if validateForm function returns true
      if (isTweetFormValidated()) {
        let formData = $("form").serialize(); //Get the data from the form
        // Ajax request for create a new tweet in JSON at /tweets
        $.ajax('/tweets', {
          method: 'POST',
          data: formData
        }).done(function() {
          // we update the page with the loadTweets function
          $('#allTweets').load(loadTweets());
          $('form textarea').val(''); // cleanning textarea text
        })
      }
    }

  });


  // REGISTER submit button form
  $("#register").submit(function(event) {
    if (isRegisterFormValidated()) {
      console.log('registro validado');
    }
  });


  // LOGIN submit button form
  $("#login").submit(function(event) {
    if (isLoginFormValidated()) {
      console.log('login validado');
    }
  });


  // executed when the user click to like the tweet
  $(document).on('click', '#likes', function(event) {
    let userID = $(this).data("uid");   //tweet _id value
    let liked = $(this).data("liked");  //tweet liked value (if tweet liked or not)
    let url = "/tweets/" + userID;          //endpoint to update tweet
    // Ajax request to like the tweet
    $.ajax(url, {
      method: 'PUT',
      data: { liked: liked }
    }).done(function() {
      // we update the page with the loadTweets function
      $('#allTweets').load(loadTweets());
      $('form textarea').val(''); // cleanning textarea text
    })
  });

  // executed when we click in the compose button in NAV
  $("button.newTweet").click(function(){
    $(".new-tweet").slideToggle("slow");
    $("textarea").focus();
  });

  // executed when we click in the register button in NAV
  $("button.register").click(function(){
    $.ajax({
      url: '/users/register',
      type: 'GET',
      success: function(data) {
        renderPage(data);
      },
      error: function(e) {
        console.log(e.message);
      }
    });
  });

  // executed when we click in the login button in NAV
  $("button.login").click(function(){
    $.ajax({
      url: '/users/login',
      type: 'GET',
      success: function(data) {
        renderPage(data);
      },
      error: function(e) {
        console.log(e.message);
      }
    });
  });

  // executed when we click in the logout button in NAV
  $("button.logout").click(function(){
    $.ajax('/users/logout', {
      method: 'POST',
      success: function() {
        console.log("logout");
      }
    });
  });

});




