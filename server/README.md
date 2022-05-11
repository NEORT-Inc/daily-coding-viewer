# Server App

## Setup
### Add files to secret
- service_account_dev.json  
Download from Firebase console.

- twitterConfig.js  
Ger info from Twitter developer page
```
const twitterConfig = {
    consumerKey: '',
    consumerSecret: '',
    accessTokenKey: '',
    accessTokenSecret: ''
};
module.exports = twitterConfig;
```

## Start
```
yarn install
node index.js
```

## Deployment
Use Vercel [Vercel CLI](https://vercel.com/cli) to deploy files to server

### Preparation
- Install Vercel CLI
    ```shell script
    yarn global add vercel
    ```
- Login to Vercel at first
    ```shell script
    vercel login
    ```
### Deployment
#### For Development
```shell script
vercel
```

#### For Production
```shell script
vercel --prod
```