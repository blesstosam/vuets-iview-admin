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
      background #f3f4f7
      padding-top: 8px
      padding-bottom 24px
      height calc(100% - 92px)
      overflow-y auto
      .row
        padding: 0 15px;
        margin-top: 20px;
        display: flex;
        .avatar
          width: 35px;
          height: 35px;
          display: block;
        & .text
          text-align: left;
          margin-top: 0;
          background: #fff;
          padding: 8px;
          box-sizing: border-box;
          position: relative;
          border-radius: 4px;
          max-width: 80%;
          font-size: 14px;
        &-left
          .text
            margin-left: 12px;
          & .text:before
            width: 0;
            height: 0;
            position: absolute;
            left: -12px;
            top: 11px;
            content: "";
            border: 6px solid transparent;
            border-right-color: #fff
        &-right
          flex-direction: row-reverse;
          .text
            margin-right: 12px;
          & .text:after
            width: 0;
            height: 0;
            position: absolute;
            right: -12px;
            top: 11px;
            content: "";
            border: 6px solid transparent;
            border-left-color: #fff
    .input-box
      height 35px
      display flex
      .ivu-input
        height 35px
        border 0
        outline none
        &.ivu-input:focus
          box-shadow none
</style>

<template>
  <div class="chat-page">
    <div class="chat-list">
      <Input search style="margin-bottom: 24px; margin-top: 3px;" />
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

      <div class="content" ref="content">
        <div
          class="row"
          :class="[item.type === 'other' ? 'row-left' : 'row-right']"
          v-for="(item, index) in currentChatList"
          :key="'index' + index"
        >
          <img class="avatar" :src="item.type === 'other' ? currentChatItem.avatar : myAvatar" alt="avatar" />
          <p class="text">{{ item.msg }}</p>
        </div>
      </div>

      <div class="input-box">
        <Input v-model="msg" type="text" />
        <Icon @click="send" type="md-send" size="24" style="margin-top: 10px; margin-right: 5px; " />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

interface ChatList {
  avatar: string;
  name: string;
  latestMsg: string;
  msgList: Array<{ msg: string; type: string }>;
}

@Component
export default class Chat extends Vue {
  msg: string = '';

  currentChatIndex: number = 0;
  get currentChatItem() {
    return this.chatList[this.currentChatIndex];
  }

  get currentChatList() {
    return this.chatList[this.currentChatIndex].msgList;
  }

  chatList: Array<ChatList> = [
    {
      avatar: require('@/assets/img/avatar.png'),
      name: 'Blesstosam',
      latestMsg: 'hello, I am Sam',
      msgList: [
        {
          msg: 'hello, I am Sam',
          type: 'other'
        },
        { msg: '哈哈哈', type: 'me' },
        { msg: '嘻嘻嘻', type: 'other' },
        { msg: '嘻嘻嘻', type: 'other' },
        { msg: '嘻嘻嘻', type: 'other' },
        { msg: '嘻嘻嘻', type: 'other' },
        { msg: '嘻嘻嘻', type: 'other' },
        { msg: '嘻嘻嘻', type: 'other' }
      ]
    },
    {
      avatar: require('@/assets/img/avatar1.jpeg'),
      name: 'Kal',
      latestMsg: 'hello, I am Kal',
      msgList: [
        {
          msg: 'hello, I am Kal',
          type: 'other'
        },
        { msg: '哈哈哈', type: 'me' },
        { msg: '嘻嘻嘻', type: 'other' }
      ]
    },
    {
      avatar: require('@/assets/img/avatar2.jpeg'),
      name: 'Jason',
      latestMsg: 'hello, I am Jason',
      msgList: [
        {
          msg: 'hello, I am Jason',
          type: 'other'
        },
        { msg: '哈哈哈', type: 'me' },
        { msg: '嘻嘻嘻', type: 'other' }
      ]
    }
  ];

  myAvatar = 'https://avatar-static.segmentfault.com/285/486/285486960-59226f974c266_big64';

  send() {
    if (!this.msg) return;
    this.chatList[this.currentChatIndex].msgList.push({
      msg: this.msg,
      type: 'me'
    });

    this.$nextTick(() => {
      (this.$refs.content as any).scrollTo(0, (this.$refs.content as any).scrollHeight);
    });
    this.msg = '';
  }
}
</script>
