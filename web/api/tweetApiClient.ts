import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { TweetResponse } from '~/types/dto'

export const getTweets = async (
  axios: NuxtAxiosInstance,
  lastId: number
): Promise<TweetResponse> => {
  const config = {
    params: {
      lastId,
    },
  }
  const { data } = await axios.get(`${process.env.API_ENDPOINT}/tweets`, config)
  return data
}
