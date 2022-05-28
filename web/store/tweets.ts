import { TweetsState } from '~/types/state'
import { Tweet } from '~/types/dto'
import { getTweets } from '~/api/tweetApiClient'

export const state = (): TweetsState => ({
  items: [],
  hashTag: '',
  lastId: 0,
})

export const mutations = {
  setItems(state: TweetsState, items: Tweet[]) {
    state.items = items
  },
  addItems(state: TweetsState, items: Tweet[]) {
    state.items.push(...items)
  },
  setHashTag(state: TweetsState, hashTag: string) {
    state.hashTag = hashTag
  },
  setLastId(state: TweetsState, lastId: number) {
    state.lastId = lastId
  },
}

export const actions = {
  async fetchTweet({ state, commit }) {
    const result = await getTweets((this as any).$axios, state.lastId)
    commit('addItems', result.tweets)
    commit('setHashTag', result.hashTag)
    if (result.lastId > 0) {
      commit('setLastId', result.lastId)
    }
  },
  clear({ commit }) {
    commit('setItems', [])
    commit('setLastId', '')
  },
}
