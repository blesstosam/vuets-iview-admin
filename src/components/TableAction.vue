<template>
  <span @click="handleEmit">
    <Tooltip :content="tooltipContent" placement="top">
      <Icon
        :type="tooltipObj[tooltipType].iconType"
        class="action-icon-style"
        :style="tooltipObj[tooltipType].iconStyle"
      />
    </Tooltip>
  </span>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator';

@Component({})
export default class TableAction extends Vue {
  // /* props */
  @Prop() tooltipType!:
    | 'ipSetting'
    | 'edit'
    | 'open'
    | 'hide'
    | 'look'
    | 'retransmission'
    | 'locking'
    | 'roomManagement'
    | 'limit'
    | 'resetLogin'
    | 'delete'
    | 'site'
    | 'link'
    | 'hierarchy'
    | 'refresh'
    | 'unlock'
    | 'game'
    | 'card'
    | 'resetPayPsd';
  @Prop() tooltipContent!: string;

  @Emit('click')
  handleEmit() {
    return;
  }

  // 定义匹配
  tooltipObj: any = {
    ipSetting: {
      iconType: 'ios-cog-outline',
      iconStyle: 'background-color: #8DC43C'
    },
    edit: {
      iconType: 'md-create',
      iconStyle: 'background-color: #18bc9c'
    },
    open: {
      iconType: 'md-checkmark-circle-outline',
      iconStyle: 'background-color: #19be6b'
    },
    hide: {
      iconType: 'md-close-circle',
      iconStyle: 'background-color: #778885'
    },
    look: {
      iconType: 'ios-eye-outline',
      iconClass: 'action-icon-style',
      iconStyle: 'background-color: #2d8cf0'
    },
    locking: {
      iconType: 'md-lock',
      iconStyle: 'background-color: #778885'
    },
    roomManagement: {
      iconType: 'ios-home',
      iconStyle: 'background-color: #6809F7'
    },
    limit: {
      iconType: 'ios-git-compare',
      iconStyle: 'background-color: #916F76'
    },
    resetLogin: {
      iconType: 'md-redo',
      iconStyle: 'background-color: #945EA2'
    },
    resetPayPsd: {
      iconType: 'logo-usd',
      iconStyle: 'background-color: #FF9900'
    },
    delete: {
      iconType: 'md-trash',
      iconStyle: 'background-color: #e74c3c'
    },
    site: {
      iconType: 'md-analytics',
      iconStyle: 'background-color: #8F6699'
    },
    link: {
      iconType: 'ios-link',
      iconStyle: 'background-color: #A3BB44'
    },
    hierarchy: {
      iconType: 'md-barcode',
      iconStyle: 'background-color: #997166'
    },
    refresh: {
      iconType: 'md-refresh',
      iconStyle: 'background-color: #997166'
    },
    unlock: {
      iconType: 'md-unlock',
      iconStyle: 'background-color: darkseagreen'
    },
    retransmission: {
      iconType: 'ios-send',
      iconStyle: 'background-color: #516e66'
    },
    game: {
      iconType: 'md-game-controller-b',
      iconStyle: 'background-color: darkseagreen'
    },
    card: {
      iconType: 'md-card',
      iconStyle: 'background-color: #87d3f3'
    }
  };
}
</script>
