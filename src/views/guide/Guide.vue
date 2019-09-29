<style lang="stylus">
.dynamic-card
  .ivu-card-body
    text-align center
  & .value
    font-size 38px
    font-weight 500
  & .tip
    margin-top 8px
</style>

<template>
  <div>
    <Alert show-icon style="margin-top: 24px;"
      >引导页对于一些第一次进入项目的人很有用，你可以简单介绍下项目的功能。本 Demo 是基于 driver.js.</Alert
    >
    <Button @click="openGuide" type="primary" style="margin-top: 12px;" size="large">打开引导</Button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Driver from 'driver.js';
import 'driver.js/dist/driver.min.css';

@Component({
  components: {}
})
export default class Guide extends Vue {
  driver!: Driver;

  mounted() {
    this.openGuide();
  }

  openGuide() {
    if (this.driver) {
      this.driver.start();
      return;
    }
    this.driver = new Driver();
    this.driver.defineSteps([
      {
        element: '.sider-trigger-a',
        popover: {
          title: 'Hamburger',
          description: 'open or close sidebar'
        }
      },
      {
        element: '.custom-bread-crumb',
        popover: {
          title: 'Breadcrumb',
          description: 'Indicate the current page location'
        }
      },
      {
        element: '.lang-switch-wrap',
        popover: {
          title: 'Switch language',
          description: 'Switch language',
          position: 'left'
        }
      },
      {
        element: '.full-screen-btn-con',
        popover: {
          title: 'Screenfull',
          description: 'Set the page into fullscreen',
          position: 'left'
        }
      },
      {
        element: '.tagview',
        popover: {
          title: 'Tags view',
          description: 'The history of the page you visited',
          position: 'bottom'
        }
      },
      {
        element: '.handle-button',
        popover: {
          title: 'Style Switch',
          description: 'You can change page style here',
          position: 'left'
        }
      }
    ]);

    this.driver.start();
  }
}
</script>
