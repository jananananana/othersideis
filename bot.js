var 
  twit = require('twit'),
  config = require('./config.js'),
  utils = require('./src/utils.js'),
  Twitter = new twit(config);

var tweet = function() {
  var whatToTweet = utils.myFunc();
  Twitter.post('statuses/update', { status: whatToTweet}, function(err, data, response) {
    console.log(data);
  });
};

var puppyRetweet = function() {  
  var params = {
    q: '#puppies',
    //result_type: 'recent',
    lang: 'en'
  }
  Twitter.get('search/tweets', params, function(err, data) {
    // if there no errors
      if (!err) {
        // grab ID of tweet to retweet
          var retweetId = data.statuses[0].id_str;
          // Tell TWITTER to retweet
          Twitter.post('statuses/retweet/:id', {
              id: retweetId
          }, function(err, response) {
              if (response) {
                  console.log('Retweeted!!!');
              }
              // if there was an error while tweeting
              if (err) {
                  console.log('Something went wrong while RETWEETING... Duplication maybe...');
              }
          });
      }
      // if unable to Search a tweet
      else {
        console.log('Something went wrong while SEARCHING...');
      }
  });
};

tweet();

// Twitter.post('statuses/update', { status: 'Puppy test tweet' }, function(err, data, response) {
//   console.log(data)
// });
