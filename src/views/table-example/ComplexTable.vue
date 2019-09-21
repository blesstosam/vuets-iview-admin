<style lang="stylus">
.complex-table-wrap
  .search-wrap
    margin-bottom 24px
</style>

<template>
  <div class="complex-table-wrap">
    <div class="search-wrap">
      <Input style="width: 200px; margin-right: 12px;" placeholder="请输入文章标题" />
      <Input style="width: 200px; margin-right: 12px;" placeholder="请输入作者姓名" />
      <Button type="primary" style="margin-right: 12px;">查询</Button>
      <Button>重置</Button>
    </div>
    <Table :columns="columns" :data="data">
      <template slot-scope="{ row, index }" slot="index">
        <strong>{{ index + 1 }}</strong>
      </template>
      <template slot-scope="{ row }" slot="name">
        <strong>{{ row.name }}</strong>
      </template>
      <template slot-scope="{ row }" slot="status">
        <Tag color="success" v-if="row.status === 1">已发布</Tag>
        <Tag color="warning" v-else>未发布</Tag>
      </template>
      <template slot-scope="{ row }" slot="star">
        <Rate allow-half v-model="row.star" />
      </template>
      <template slot-scope="{ row, index }" slot="action">
        <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">详情</Button>
        <Button type="error" size="small" @click="remove(index)">删除</Button>
      </template>
    </Table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {}
})
export default class ComplexTable extends Vue {
  columns: Array<any> = [
    {
      title: '序号',
      slot: 'index',
      width: 60
    },
    {
      title: '标题',
      key: 'title'
    },
    {
      title: '作者',
      key: 'author'
    },
    {
      title: '评分',
      slot: 'star',
      width: 180
    },
    {
      title: '阅读数',
      key: 'readCount'
    },
    {
      title: '状态',
      slot: 'status'
    },
    {
      title: '时间',
      key: 'time'
    },
    {
      title: 'Action',
      slot: 'action',
      width: 150,
      align: 'center'
    }
  ];
  data: Array<any> = [
    {
      title: 'Lrzmm Nohqex Zunrmte Efvh Yyxldii Fhpipkt',
      author: 'Kimberly',
      star: 3.5,
      readCount: 6256,
      status: 1,
      time: '1999-09-09 06:11'
    },
    {
      title: 'Lrzmm Nohqex Zunrmte Efvh Yyxldii Fhpipkt',
      author: 'Kimberly',
      star: 3.5,
      readCount: 6256,
      status: 1,
      time: '1999-09-09 06:11'
    },
    {
      title: 'Lrzmm Nohqex Zunrmte Efvh Yyxldii Fhpipkt',
      author: 'Kimberly',
      star: 3.5,
      readCount: 6256,
      status: 1,
      time: '1999-09-09 06:11'
    }
  ];

  show(index: number) {
    this.$Modal.info({
      title: 'Article',
      content: `Title: ${this.data[index].title}<br>Author: ${this.data[index].author}<br>Read count: ${
        this.data[index].readCount
      }`
    });
  }
  remove(index: number) {
    this.data.splice(index, 1);
  }
}
</script>
