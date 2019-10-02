<style lang="stylus">
.left-sider .logo-con
  .blockies-wrap
    border-radius 50%
    margin-top 5px
    canvas
      border-radius 50%
      width 50px
      height 50px
  & .avatar-small
    canvas
      width 40px
      height 40px
</style>

<template>
  <div class="blockies-wrap" ref="blockiesWrap"></div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { createIcon } from '@download/blockies';
import { Getter } from 'vuex-class';

@Component
export default class BlockiesAvatar extends Vue {
  mounted() {
    let icon = createIcon({
      seed: this.username, // seed used to generate icon data, default: random
      color: '#f2de21', // to manually specify the icon color, default: random
      bgcolor: '#19be6b', // choose a different background color, default: white
      size: 15, // width/height of the icon in blocks, default: 10
      scale: 3 // width/height of each block in pixels, default: 5
    });

    (this.$refs.blockiesWrap as any).appendChild(icon); // icon is a canvas element
  }

  @Getter('username') readonly username!: string;
}
</script>
