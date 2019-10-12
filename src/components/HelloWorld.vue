<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <br />
    <h2>local name: {{ name }}</h2>
    <br />
    <h2>filterName name: {{ name | filterName }}</h2>
    <h3>name from store: {{ localUser.username }}</h3>
    <h3>computedName: {{ computedName }}</h3>
    <br />
    <i-button @click="alert">Click Me!</i-button><br /><br />
    <i-button type="primary" @click="handleEmit">Change Msg</i-button>
    <!-- &nbsp;<a-button type="dashed">Antd Button</a-button> -->
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit, Watch } from 'vue-property-decorator';
import { User } from '../type';
// import { test } from '../api/user';
import { State, Mutation, Getter } from 'vuex-class';
import { UPDATE_USER } from '../store/mutation-types';

// let arr: (number | string)[] = [1, 2, '2'];
// arr.push('222')

// interface Person {
//     name: string;
//     age?: number;
//     func: (a: any) => void
//     work: {
//       dis: string,
//       salary: number
//     }
// }

// let tom: Person = {
//     func: (a) => {console.log(1)},
//     name: 'Tom',
//     work: {
//       dis: 'xxx',
//       salary: 10000,
//     }
// };

@Component({
  // 过滤器
  filters: {
    filterName(value: string) {
      return `--${value}--`;
    }
  }
  // mixin
  // mixins: []
})
export default class HelloWorld extends Vue {
  // 全局属性或方法
  // 还没加类型定义？
  $util: any;

  // lifecycle hook
  created() {
    // alert(this.isShowLoading)
    // const h1: HTMLElement = document.getElementsByTagName('h1')[0];
  }
  mounted() {}

  // watch
  @Watch('msg')
  onChildChanged(val: string, oldVal: string): void {
    /* eslint-disable-next-line no-console */
    console.log(`oldVal: ${oldVal} new val: ${val}`);
  }
  // 以前的写法
  // watch: {
  //   msg(val, oldVal) {

  //   }
  // }

  /* data */
  name: string = 'local name';
  localUser: User = {
    username: 'yyyyyyyy',
    token: '',
    avatar: '',
    roleId: '',
    adminId: '',
    proxyId: ''
  };

  /* computed */
  get computedName(): string {
    return 'hello ' + this.name;
  }
  get computedName2(): string {
    return '-- hello ' + this.name;
  }

  /* props */
  @Prop() msg!: string;

  // vuex
  @State('isShowLoading') isShowLoading!: boolean;
  @Getter('username') username!: string;

  /* methods */
  async alert(): Promise<any> {
    this.$Message;
    this.updateUser('abcdefg');
    // const res: AjaxResponse = await test({ siteId: '1,2', userId: '6' });
    // // console.log(res)
    // if (res.code !== 200) {
    //   this.$Message.info(res.msg);
    //   return;
    // }
  }
  toAbout() {
    this.$router.push('/about');
  }

  // emit
  // 详细用法 https://www.npmjs.com/package/vue-property-decorator#Emit
  @Emit('changeMsg')
  handleEmit(): string {
    return this.name;
  }
  // 以前的写法
  // handleEmit() {
  //   this.$emit('changeMsg', 'i changed msg!')
  // }

  // 怎么保证参数类型和vuex里定义的一样？
  @Mutation(UPDATE_USER) updateUser!: (str: string) => void;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
h3
  margin 40px 0 0

ul
  list-style-type none
  padding 0

li
  display inline-block
  margin 0 10px

a
  color #42b983
</style>
