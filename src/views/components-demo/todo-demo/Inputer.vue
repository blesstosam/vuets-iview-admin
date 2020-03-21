<style lang="stylus">
.inputer
  margin-bottom 24px
  button
    margin-left 8px
</style>

<template>
  <div class="inputer">
    <h2 style="text-align: center; margin-bottom: 8px;">Todo List</h2>
    <Row>
      <Col span="20">
        <Input v-model="content" />
      </Col>
      <Col span="4">
        <Button @click="add" icon="md-add" class="shadow-lg">Add</Button>
      </Col>
    </Row>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from '@vue/composition-api';

interface TodoListType {
  content: string;
  completed: boolean;
  id: number;
}

export default defineComponent({
  name: 'Inputer',
  setup(props, ctx) {
    const content: Ref<string> = ref('');

    function add() {
      ctx.emit('add-todo', content.value);
      content.value = '';
    }

    return {
      content,
      add
    };
  }
});
</script>
