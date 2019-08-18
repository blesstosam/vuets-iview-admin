<template>
  <div class="scroll-container sidebar-container" ref="scrollContainer" @wheel.prevent="handleScroll">
    <div class="scroll-wrapper" ref="scrollWrapper" :style="{ top: top + 'px' }">
      <slot></slot>
    </div>
  </div>
</template>

<script>
const delta = 15;

export default {
  name: 'scrollBar',
  data() {
    return {
      top: 0
    };
  },
  methods: {
    handleScroll(e) {
      const eventDelta = e.wheelDelta || -e.deltaY * 3;
      const $container = this.$refs.scrollContainer;
      const $containerHeight = $container.offsetHeight;
      const $wrapper = this.$refs.scrollWrapper;
      const $wrapperHeight = $wrapper.offsetHeight;

      if (eventDelta > 0) {
        this.top = Math.min(0, this.top + eventDelta);
      } else {
        if ($containerHeight - delta < $wrapperHeight) {
          if (this.top < -($wrapperHeight - $containerHeight + delta)) {
            this.top = this.top;
          } else {
            // 多出来的50是margin-top 50px
            this.top = Math.max(this.top + eventDelta, $containerHeight - $wrapperHeight - delta - 50);
          }
        } else {
          this.top = 0;
        }
      }
    }
  }
};
</script>

<style scoped>
.scroll-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
}
.scroll-wrapper {
  position: absolute;
  width: 100% !important;
}
::-webkit-scrollbar {
  display: none;
}
</style>
