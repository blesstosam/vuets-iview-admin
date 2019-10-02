<style lang="stylus">
.chat-page
  display flex
  height 100%
  background #fff
  .avatar
    width 40px
    height 40px
    border-radius 40px
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
      cursor pointer
      & .introduction
        margin-left 24px
        .name
          font-weight 600
          font-size 16px
    .ivu-input
      border none
      border-bottom 1px solid #dcdee2
      border-radius 0
      &:focus
        box-shadow none !important
  & .chat-box
    width 75%
    .header
      display flex
      justify-content space-between
      padding 8px
      border-bottom 1px solid #ccc
      .current-avatar
        span
          font-size 18px
          font-weight 600
          vertical-align middle
          margin-left 12px
        .avatar
          vertical-align middle
          width 30px
          height 30px
      .ivu-icon
        margin-right 5px
        margin-top 5px
    .content
      border-bottom 1px solid #ccc
      height calc(100% - 157px)
</style>

<template>
  <div class="chat-page">
    <div class="chat-list">
      <Input search placeholder="Enter something..." style="margin-bottom: 24px; margin-top: 3px;" />
      <li class="chat-list-item" v-for="(item, index) in chatList" :key="index" @click="currentChatIndex = index">
        <img :src="item.avatar" alt="avatar" class="avatar" />
        <div class="introduction">
          <div class="name">{{ item.name }}</div>
          <div class="latest-msg">{{ item.latestMsg }}</div>
        </div>
      </li>
    </div>
    <div class="chat-box">
      <div class="header">
        <div class="current-avatar">
          <img :src="currentChatItem.avatar" alt="currentAvatar" class="avatar" />
          <span>{{ currentChatItem.name }}</span>
        </div>
        <div><Icon type="md-add" size="24" /></div>
      </div>
      <div class="content">111</div>
      <div class="input-box">footer</div>
    </div>
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
  created() {}

  currentChatIndex: number = 0;
  get currentChatItem() {
    return this.chatList[this.currentChatIndex];
  }

  chatList: Array<ChatList> = [
    {
      avatar: require('@/assets/img/avatar.png'),
      name: 'Blesstosam',
      latestMsg: 'hello, I am Sam'
    },
    {
      avatar: require('@/assets/img/avatar1.jpeg'),
      name: 'Kal',
      latestMsg: 'hello, I am Kal'
    },
    {
      avatar: require('@/assets/img/avatar2.jpeg'),
      name: 'Jason',
      latestMsg: 'hello, I am Jason'
    }
  ];
}
</script>
