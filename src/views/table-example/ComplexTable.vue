<style lang="stylus">
.complex-table-wrap
  padding-bottom 20px
  .search-wrap
    margin-bottom 24px
  & .ivu-alert
    // margin-bottom 24px
</style>

<template>
  <Card class="complex-table-wrap" :bordered="false" dis-hover>
    <CommonCardTitle />
    <div class="search-wrap">
      <Input style="width: 200px; margin-right: 12px;" placeholder="请输入文章标题" />
      <Input style="width: 200px; margin-right: 12px;" placeholder="请输入作者姓名" />
      <Button type="primary" style="margin-right: 12px;">{{ $t('search') }}</Button>
      <Button>{{ $t('reset') }}</Button>
    </div>
    <Alert show-icon
      >文章总数为 <strong>{{ data.length }} </strong>篇， 共计阅读量为 <strong>{{ totalReadCount }}</strong> 次</Alert
    >
    <Table :columns="columns" :data="data">
      <template slot-scope="{ row, index }" slot="index">
        <strong>{{ index + 1 }}</strong>
      </template>
      <template slot-scope="{ row }" slot="title">
        <a target="blank" :href="row.href">{{ row.title }}</a>
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
  </Card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CommonCardTitle from '@/components/CommonCardTitle.vue';

@Component({
  components: { CommonCardTitle }
})
export default class ComplexTable extends Vue {
  columns: Array<any> = [
    {
      title: '序号',
      slot: 'index',
      width: 80,
      sortable: true
    },
    {
      title: '标题',
      slot: 'title'
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
      key: 'readCount',
      sortable: true
    },
    {
      title: '状态',
      slot: 'status',
      filters: [
        {
          label: '已发布',
          value: 1
        },
        {
          label: '未发布',
          value: 2
        }
      ],
      filterMultiple: false,
      filterMethod(value: number, row: any) {
        if (value === 1) {
          return row.status === 1;
        } else if (value === 2) {
          return row.status === 2;
        }
      }
    },
    {
      title: '时间',
      key: 'time'
    },
    {
      title: '操作',
      slot: 'action',
      width: 150,
      align: 'center'
    }
  ];
  data: Array<any> = [
    {
      title: '前端交互体验优化若干点',
      href: 'https://segmentfault.com/a/1190000020048654',
      author: 'Blesstosam',
      star: 3.5,
      readCount: 171,
      status: 1,
      time: '2019-01-17 06:11:00'
    },
    {
      title: 'vue权限管理系统',
      href: 'https://segmentfault.com/a/1190000017921971',
      author: 'Blesstosam',
      star: 4.5,
      readCount: 506,
      status: 1,
      time: '2019-01-17 06:11:56'
    },
    {
      title: '又是一波前端知识点总结',
      href: 'https://segmentfault.com/a/1190000019779495',
      author: 'Blesstosam',
      star: 3.5,
      readCount: 138,
      status: 1,
      time: '2019-07-16 06:11:00'
    },
    {
      title: '写后台总结',
      href: 'https://segmentfault.com/a/1190000017781804',
      author: 'Blesstosam',
      star: 5,
      readCount: 138,
      status: 2,
      time: '2019-07-16 06:11:00'
    }
  ];

  get totalReadCount() {
    let total = 0;
    this.data.forEach(item => (total += item.readCount));
    return total;
  }

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
