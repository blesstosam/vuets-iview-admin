<style lang="stylus">
.chat-page
  display flex
  height 100%
  background #fff
  .chat-list
    background #fff
    width 25%
    height 100%
    padding 12px
    border-right 1px solid #ccc
    &-item
      list-style none
      display flex
      margin-bottom 12px
      padding-bottom 12px
      border-bottom 1px solid #eee
      img
        width 50px
        border-radius 50%
      & .introduction
        margin-left 24px
        .name
          font-weight 600
          font-size 16px
    .ivu-input
      border none
      border-bottom 1px solid #dcdee2
      &:focus
        box-shadow none !important
  & .chat-box
    width 75%
</style>

<template>
  <div class="chat-page">
    <div class="chat-list">
      <Input search placeholder="Enter something..." style="margin-bottom: 24px;" />
      <li class="chat-list-item" v-for="(item, index) in chatList" :key="index">
        <img :src="item.avatar" alt="avatar" />
        <div class="introduction">
          <div class="name">{{ item.name }}</div>
          <div class="latest-msg">{{ item.latestMsg }}</div>
        </div>
      </li>
    </div>
    <div class="chat-box">right</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

interface ChatList {
  avatar: string;
  name: string;
  latestMsg: string;
}

@Component({
  components: {}
})
export default class Chat extends Vue {
  avatar: string = require('@/assets/img/avatar.png');
  chatList: Array<ChatList> = [
    {
      avatar: require('@/assets/img/avatar.png'),
      name: 'Blesstosam',
      latestMsg: 'hello, I am sam'
    },
    {
      avatar: require('@/assets/img/avatar.png'),
      name: 'Blesstosam',
      latestMsg: 'hello, I am sam'
    },
    {
      avatar: require('@/assets/img/avatar.png'),
      name: 'Blesstosam',
      latestMsg: 'hello, I am sam'
    }
  ];
}
</script>
