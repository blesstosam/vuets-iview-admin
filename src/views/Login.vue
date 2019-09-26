<style lang="stylus">
.login
  width 100%
  height 100%
  position relative
  background url('../assets/img/bg.jpg') no-repeat
  background-size 100% 100%
  .login-form
    width 300px
    position absolute
    top 50%
    right 10%
    transform translate(0, -50%)
</style>
<template>
  <div class="login">
    <LoginForm class="login-form" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import LoginForm from '@/components/LoginForm.vue';

@Component({
  components: { LoginForm }
})
export default class Login extends Vue {}
</script>
