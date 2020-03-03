<template>
  <Page
    :total="pager.total"
    :current="pager.current"
    :page-size="pager.pageSize"
    show-total
    show-sizer
    v-on="$listeners"
    v-bind="$attrs"
  />
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Pager } from '@/type';

@Component
export default class MyPager extends Vue {
  @Prop({ default: { total: 0, current: 1, pageSize: 10 } }) readonly pager!: Pager;
}
</script>
