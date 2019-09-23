<style lang="stylus">
.login
  width 100%
  height 100%
  position relative
  background url('../assets/img/bg.jpg') no-repeat
  background-size 100% 100%
  .form-wrap
    width 300px
    position absolute
    top 50%
    right 10%
    transform translate(0, -50%)
    & p
      // color #1c7275
    .ivu-input-group-append
      padding 0
      img
        width 70px
        height 30px
        vertical-align middle
    & .login-btn
      width: 100%
      background #1c7275
      border-color #1c7275
</style>
<template>
  <div class="login">
    <Card class="form-wrap">
      <p slot="title">欢迎登录</p>
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate">
        <FormItem prop="username">
          <Input type="text" v-model="formValidate.username" placeholder="请输入用户名">
            <Icon size="14" type="md-person" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="password">
          <Input :type="passwordInputType" v-model="formValidate.password" placeholder="请输入密码">
            <Icon size="14" type="md-key" slot="prepend"></Icon>
            <Icon size="14" :type="iconType" slot="append" style="width: 27px;" @click.native="togglePassword"></Icon>
          </Input>
        </FormItem>

        <FormItem>
          <Button :loading="loading" type="primary" @click="doLogin" class="login-btn">
            <span v-if="!loading">登录</span>
            <span v-else>登录中...</span>
          </Button>
        </FormItem>
      </Form>
    </Card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
/* eslint-disable-next-line no-unused-vars */
import { IForm, User } from '../type';
import sha256 from 'sha256';
import { Action, Mutation } from 'vuex-class';
import { UPDATE_USER, UPDATE_AUTHORIZATION, CHANGE_SETTING } from '@/store/mutation-types';
import { toRouterComponent } from '@/router/router-list';
import storage from '@/assets/script/storage';
import { login } from '@/api/user/index';

interface LoginForm {
  username: string;
  password: string;
}

@Component({})
export default class Login extends Vue {
  created() {
    this.ruleValidate = this.getValidator();
  }

  passwordInputType: 'password' | 'text' = 'password';
  loading: boolean = false;

  formValidate: LoginForm = {
    username: 'admin',
    password: '123456'
  };

  ruleValidate: object = {};

  get iconType() {
    return this.passwordInputType === 'password' ? 'ios-eye-off' : 'ios-eye';
  }

  getValidator() {
    return {
      username: [
        {
          required: true,
          message: '',
          trigger: 'blur'
        }
      ],
      password: [
        {
          required: true,
          message: '',
          trigger: 'blur'
        }
      ]
    };
  }

  async doLogin(): Promise<void> {
    (this.$refs.formValidate as IForm).validate(
      async (valid: boolean | undefined): Promise<void> => {
        if (valid) {
          this.loading = true;
          const { username, password } = this.formValidate;
          const resp = await login({ username, password: sha256(password) });

          // 将状态保存到store 和 localstorage 里
          this.updateUser({
            username: this.formValidate.username,
            roleId: resp.data.roleId,
            adminId: resp.data.adminId,
            token: resp.data.token,
            avatar: resp.data.avatar,
            proxyId: resp.data.proxyId
          });

          // 将ui setting 保存到store 和 localstorage
          // try {
          //   this.changeSetting({ key: 'sidebarTheme', val: uiSetting.sidebarTheme });
          //   this.changeSetting({ key: 'headerTheme', val: uiSetting.headerTheme });
          //   this.changeSetting({ key: 'showTagsView', val: uiSetting.showTagsView });
          //   this.changeSetting({ key: 'showMenuInHeader', val: uiSetting.showMenuInHeader });
          // } catch (e) {
          //   /* eslint-disable-next-line no-console */
          //   console.log('解析ui方案配置信息失败', e);
          // }

          // 动态添加路由
          // this.addRouters();

          this.$router.push('/home');
        }
      }
    );
  }

  addRouters(menuList: Array<any>) {
    storage.set('menuTree', menuList);
    const routerArr = toRouterComponent(menuList);
    if (routerArr.length) {
      routerArr.forEach(item => {
        (this.$router as any).options.routes.push(item);
      });

      this.$router.addRoutes(routerArr);
    }
  }

  togglePassword() {
    this.passwordInputType = this.passwordInputType === 'text' ? 'password' : 'text';
  }

  @Action(UPDATE_USER) updateUser!: (userinfo: User) => void;
  @Mutation(UPDATE_AUTHORIZATION) updateAuthorization!: (str: string) => void;
  @Mutation(CHANGE_SETTING) changeSetting!: (data: { key: string; val: string }) => void;
}
</script>
