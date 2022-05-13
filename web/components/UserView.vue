<template>
  <div class="userView">
    <ImageView :url="tweetUser.image" />
    <div class="nameContainer">
      <div class="name">{{ tweetUser.name }}</div>
      <div class="screenName">@{{ tweetUser.screenName }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import ImageView from '~/basics/ImageView.vue'
import { TweetUser } from '~/types/dto'

@Component({
  components: { ImageView },
})
export default class UserView extends Vue {
  @Prop({ required: true }) private tweetUser!: TweetUser
}
</script>

<style scoped lang="stylus">
@require '~@/assets/style/variables.styl'
@require '~@/assets/style/mixin.styl'

.userView
  display inline-flex
  align-items center
  justify-content center

  .imageView
    width 80px
    height 80px
    border-radius 50%
    border 1px #efefef solid

  .nameContainer
    margin-left 16px

    .name
      font-size 4.8rem
      font-weight bold

    .screenName
      font-size 3.6rem
</style>
