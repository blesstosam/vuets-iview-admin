<style lang="stylus">
.ivu-radio-group
  margin-bottom 12px
.completed-item
  text-decoration line-through
</style>

<template>
  <div>
    <RadioGroup v-model="listType">
      <Radio label="all" border>All</Radio>
      <Radio label="completed" border>Completed</Radio>
      <Radio label="uncompleted" border>Uncompleted</Radio>
    </RadioGroup>

    <div v-for="(item, index) in showList" :key="index" style="margin-top: 8px;">
      <Checkbox v-model="item.completed"></Checkbox>
      <span style="margin-left: 12px;" :class="{ 'completed-item': item.completed }">{{ item.content }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, Ref } from '@vue/composition-api';

interface TodoListType {
  content: string;
  completed: boolean;
  id: number;
}

export default defineComponent({
  name: 'TodoList',
  props: {
    list: {
      type: Array as () => Array<TodoListType>,
      required: true
    }
  },

  setup(props) {
    const listType: Ref<'all' | 'completed' | 'uncompleted'> = ref('all');
    const showList = computed(() => {
      if (listType.value === 'all') return props.list;
      else if (listType.value === 'completed') return props.list.filter(item => item.completed);
      return props.list.filter(item => !item.completed);
    });
    return {
      listType,
      showList
    };
  }
});
</script>
