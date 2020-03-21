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
import CommonCardTitle from '@/components/CommonCardTitle.vue';
import TodoList from './TodoList.vue';
import Inputer from './Inputer.vue';
import { defineComponent, reactive } from '@vue/composition-api';
import { Message } from 'view-design';

export default defineComponent({
  name: 'TodoListIndex',
  components: { CommonCardTitle, TodoList, Inputer },

  setup() {
    const list = reactive([
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
    ]);

    function addTodo(content: string) {
      if (!content) {
        (Message as any).error('请输入内容');
        return;
      }
      const index = list.findIndex(item => item.content === content);
      if (index !== -1) {
        (Message as any).info(`您已添加'${content}'`);
        return;
      }
      list.push({
        id: list[list.length - 1].id + 1,
        content,
        completed: false
      });
    }

    return {
      list,
      addTodo
    };
  }
});
</script>
