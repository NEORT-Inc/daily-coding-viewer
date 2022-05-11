const Twitter = require('twitter');
const twitterConfig = require("../secret/twitterConfig.js");

const TwitterClient = {
    getTweets(accessToken, accessTokenSecret) {
        const client = new Twitter({
            consumer_key: twitterConfig.consumerKey,
            consumer_secret: twitterConfig.consumerSecret,
            access_token_key: accessToken,
            access_token_secret: accessTokenSecret
        });
        return new Promise((resolve, reject) => {
            // https://developer.twitter.com/en/docs/tweets/timelines/api-reference/get-statuses-user_timeline
            client.get('statuses/user_timeline', (error, data, response) => {
                if(error) {
                    reject(error);
                    return;
                }
                resolve(data);
            });
        });
    }
};

module.exports = TwitterClient;