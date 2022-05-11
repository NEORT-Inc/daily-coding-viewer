const express = require('express');
const cors = require('cors');
const TwitterClient = require('./src/twitterClient');

const app = express();
app.use(cors());

const port = process.env.PORT || 9000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});

app.get('/', (req, res) => {
    res.send('HELLO.');
});
app.get('/tweets', (req, res) => {
    TwitterClient.getTweets(req.query.token, req.query.secret)
        .then((data) => {
            const newData = [];
            for (const tweet of data) {
                newData.push(toTweetItem(tweet));
            }
            res.send(newData);
        })
        .catch((error) => {
            res.status(500);
            res.send({ error: error });
        });
});

const serviceAccount = require("./secret/service_account.json");
const admin = require("firebase-admin");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`
});

const idToken = "";

if (idToken) {
    admin.auth()
        .verifyIdToken(idToken)
        .then((decodedToken) => {
            let uid = decodedToken.uid;
            return admin.auth().getUser(uid);
        })
        .then((user) => {
            console.log(user);
        })
        .catch((error) => {
            console.log(error);
        });
}

const toTweetItem = (tweet) => {
    const urls = tweet.entities.urls.map((entity) => {
        return entity.url;
    });
    if (tweet.entities.media) {
        tweet.entities.media.forEach((m) => {
            urls.push(m.url);
        });
    }

    let text = tweet.text;
    urls.forEach((url) => {
        text = text.replace(url, "");
    });

    return {
        id: tweet.id,
        text: text,
        createdAt: tweet.created_at
    };
};