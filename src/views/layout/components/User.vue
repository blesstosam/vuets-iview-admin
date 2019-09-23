<style lang="stylus">
.user
  &-avatar-dropdown
    cursor: pointer;
    display: inline-block;
    vertical-align: middle;
    .ivu-badge-dot
      top: 16px
    .ivu-dropdown > .ivu-dropdown-rel
      height: 64px
</style>

<template>
  <div class="user-avatar-dropdown">
    <Dropdown @on-click="handleClick">
      <Badge>
        <Icon type="md-more" :size="23" />
      </Badge>
      <DropdownMenu slot="list">
        <!-- <DropdownItem name="message">
          消息中心
          <Badge style="margin-left: 10px" :count="messageUnreadCount"></Badge>
        </DropdownItem> -->
        <DropdownItem name="logout" @click="doLogout">{{ $t('exit') }}</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';
import { LOGOUT } from '@/store/mutation-types';

@Component({})
export default class User extends Vue {
  @Getter('avatar') readonly userAvatar!: string;
  @Prop({ default: 0 }) readonly messageUnreadCount!: number;

  message(name: string): void {
    this.$router.push({
      name
    });
  }

  handleClick(name: string): void {
    switch (name) {
      case 'logout':
        this.doLogout();
        break;
      default:
        break;
    }
  }

  doLogout() {
    this.logout();
  }

  @Action(LOGOUT) logout!: () => void;
}
</script>
