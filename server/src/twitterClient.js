const Twitter = require('twitter')
const twitterConfig = require('../secret/twitterConfig.js')

const TwitterClient = {
  getTweets(lastId) {
    const client = new Twitter({
      consumer_key: twitterConfig.consumerKey,
      consumer_secret: twitterConfig.consumerSecret,
      access_token_key: twitterConfig.accessTokenKey,
      access_token_secret: twitterConfig.accessTokenSecret,
    })
    const hashTag = '#dailycoding'
    return new Promise((resolve, reject) => {
      const params = { q: hashTag, tweet_mode: 'extended', count: 100 }
      if (lastId) {
        params.since_id = lastId
      }
      client.get('search/tweets', params, (error, tweets, _response) => {
        if (error) {
          console.log(error)
          reject(error)
          return
        }
        const response = {
          tweets: [],
          hashTag,
          lastId: 0,
        }
        for (let i = tweets.statuses.length - 1; i >= 0; i--) {
          const event = tweets.statuses[i]
          response.lastId = event.id

          if (event.id === lastId || /^RT /g.test(event.full_text)) {
            continue
          }

          let media = event.entities.media
          if (media === undefined) {
            if (event.extended_entities !== undefined)
              media = event.extended_entities.media
            if (media === undefined) continue
          }
          const _medias = []
          for (let j = 0; j < media.length; j++) {
            _medias.push(media[j].media_url_https)
          }
          if (_medias.length > 0) {
            response.tweets.push({
              user: {
                name: event.user.name,
                screenName: event.user.screen_name,
                image: event.user.profile_image_url_https,
              },
              media: _medias,
              createdAt: event.created_at,
            })
          }
        }
        resolve(response)
      })
    })
  },
}

module.exports = TwitterClient
