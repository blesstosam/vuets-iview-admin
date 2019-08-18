<template>
  <div>
    dashboard
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
// import { login, getAuthCode } from '@/api/user';
/* eslint-disable-next-line no-unused-vars */
import { IForm } from '../../type';

interface UserInfo {
  username: string;
  password: string;
  authcode: string;
}

@Component({})
export default class Dashboard extends Vue {
  async created() {
    // const resp = await getAuthCode();
    // if (resp.code !== 200) {
    //   this.$Message.info('验证码获取失败');
    //   return;
    // }
    // this.authCode = `data:image/jpeg;base64,${resp.data}`;
  }

  isShowAccountBottom: boolean = false;
  isShowPassBottom: boolean = false;
  isShowCodeBottom: boolean = false;

  authCode: string = '';

  formValidate: UserInfo = {
    username: '',
    password: '',
    authcode: ''
  };

  ruleValidate: object = {
    username: [{ required: true, message: '请填写用户名！', trigger: 'blur' }],
    password: [{ required: true, message: '请填写密码', trigger: 'blur' }],
    authcode: [{ required: true, message: '请填写验证码', trigger: 'blur' }]
  };
}
</script>
