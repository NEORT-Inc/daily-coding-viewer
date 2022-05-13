<template>
  <div class="topPage">
    <TweetView v-if="currentTweet" :tweet="currentTweet" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Tweet } from '~/types/dto'
import TweetView from '~/components/TweetView.vue'

@Component({
  components: { TweetView },
})
export default class TopPage extends Vue {
  private slideShowTimer: any = null
  private slideShowDuration: number = 15 * 1000
  private currentIndex: number = 0

  async fetch({ store }) {
    try {
      await store.dispatch('tweets/fetchTweet')
    } catch (e) {
      console.log(e)
    }
  }

  mounted() {
    this.setSlideShowTimer()
    setInterval(async () => {
      try {
        await this.$store.dispatch('tweets/fetchTweet')
      } catch (e) {
        console.log(e)
      }
    }, 10 * 60 * 1000)
  }

  private setSlideShowTimer() {
    this.clearSlideShowTimer()
    this.slideShowTimer = setTimeout(() => {
      this.changeArt()
    }, this.slideShowDuration)
  }

  private clearSlideShowTimer() {
    if (this.slideShowTimer) {
      clearTimeout(this.slideShowTimer)
    }
  }

  private changeArt() {
    try {
      if (this.currentIndex < this.tweets.length - 1) {
        this.currentIndex++
      } else {
        this.currentIndex = 0
      }
      this.setSlideShowTimer()
    } catch (e) {
      console.log(e)
    }
  }

  private get tweets(): Tweet[] {
    return this.$store.state.tweets.items
  }

  private get currentTweet(): Tweet | null {
    return this.tweets.length > 0 ? this.tweets[this.currentIndex] : null
  }
}
</script>

<style scoped lang="stylus">
@require '~@/assets/style/variables.styl'
@require '~@/assets/style/mixin.styl'

.topPage
  height 100%
  width 100%
  position fixed
  overflow hidden
</style>
