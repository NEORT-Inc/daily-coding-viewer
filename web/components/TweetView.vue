<template>
  <div class="tweetView">
    <ImageView v-if="tweet.media.length > 0" :url="tweet.media[0]" />
    <div class="infoContainer">
      <div class="hashTag">{{ hashTag }}</div>
      <div class="x">×</div>
      <UserView :tweet-user="tweet.user" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import ImageView from '~/basics/ImageView.vue'
import { Tweet } from '~/types/dto'
import UserView from '~/components/UserView.vue'

@Component({
  components: { UserView, ImageView },
})
export default class TweetView extends Vue {
  @Prop({ required: true }) private tweet!: Tweet

  private get hashTag(): string {
    return this.$store.state.tweets.hashTag
  }
}
</script>

<style scoped lang="stylus">
@require '~@/assets/style/variables.styl'
@require '~@/assets/style/mixin.styl'

.tweetView
  .imageView
    width 100%
    max-width 100%
    max-height 100%
    position fixed
    object-fit contain
    centerAbsContent()

  .infoContainer
    position fixed
    bottom 48px
    background-color white
    padding 16px
    left 50%
    transform translate(-50%, -50%)
    display flex
    align-items center

    .hashTag
      font-size 9.6rem
      font-weight bold
      text-align center

    .x
      font-size 6.2rem
      margin-left 16px
      margin-right 16px
</style>
