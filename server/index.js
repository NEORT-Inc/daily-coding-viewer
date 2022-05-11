const express = require('express')
const cors = require('cors')
const TwitterClient = require('./src/twitterClient')

const app = express()
app.use(cors())

const port = process.env.PORT || 9000
app.listen(port, () => {
  console.log(`Listening on port ${port}...`)
})

app.get('/', (_req, res) => {
  res.send('HELLO.')
})
app.get('/tweets', (req, res) => {
  TwitterClient.getTweets(req.query.lastId)
    .then((data) => {
      res.send(data)
    })
    .catch((error) => {
      res.status(500)
      res.send({ error })
    })
})
