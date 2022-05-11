export interface TweetResponse {
  tweets: Tweet[]
  hashTag: string
  lastId: number
}

export interface Tweet {
  user: TweetUser
  media: string
  createdAt: string
}

export interface TweetUser {
  name: string
  screenName: string
  image: string
}
