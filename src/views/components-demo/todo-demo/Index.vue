<style lang="stylus">
.todo-wrap
  width 60%
  margin 0 auto
</style>

<template>
  <div>
    <Card :bordered="false" dis-hover>
      <CommonCardTitle />
      <div class="todo-wrap">
        <Inputer @add-todo="addTodo" />
        <TodoList :list="list" />
      </div>
    </Card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CommonCardTitle from '@/components/CommonCardTitle.vue';
import TodoList from './TodoList.vue';
import Inputer from './Inputer.vue';

@Component({
  components: { CommonCardTitle, TodoList, Inputer }
})
export default class TodoIndex extends Vue {
  list = [
    {
      content: '学习vue3.0',
      completed: false,
      id: 1
    },
    {
      content: '学做饭',
      completed: true,
      id: 2
    }
  ];

  addTodo(content: string) {
    const index = this.list.findIndex(item => item.content === content);
    if (index !== -1) {
      this.$Message.info(`您已添加'${content}'`);
      return;
    }
    this.list.push({
      id: this.list[this.list.length - 1].id + 1,
      content,
      completed: false
    });
  }
}
// export default createComponent({

//   // props: {
//   //   user: {
//   //     type: Object as () => User,
//   //     required: true
//   //   }
//   // },

//   setup () {
//     const fullName = computed(() => `${user.firstName} ${user.lastName}`)
//     const user = reactive({firstName: 'wei', lastName: 'lei'})
//     const message = ref('This is a message')

//     return {
//       fullName,
//       message
//     }
//   }
// })
</script>
