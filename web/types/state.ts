import { Tweet } from '~/types/dto'

export interface TweetsState {
  items: Tweet[]
  hashTag: string
  lastId: number
}
