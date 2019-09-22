<style lang="stylus">
.product-list-wrap
  .product-item
    text-align center
    .ivu-tag
      position absolute
      right 10px
      top 10px
    & .title
      margin 8px 0
      font-weight 600
      font-size 18px
      color #000
    & .sub-title
      color #808695
    & .price
      color #ff6700
      margin 8px 0
</style>

<template>
  <div class="product-list-wrap">
    <CommonCardTitle />
    <Row>
      <Col
        :xs="24"
        :sm="12"
        :lg="8"
        v-for="(item, index) in productList"
        :key="index"
        :style="{ 'padding-right': (index + 1) % 3 !== 0 ? '24px' : 0 }"
      >
        <a target="blank" :href="item.href">
          <Card class="product-item" :bordered="false">
            <Tag v-if="item.label" color="green">{{ item.label }}</Tag>
            <img width="60%" :src="item.img" alt="cover" />
            <div class="title">{{ item.title }}</div>
            <div class="sub-title">{{ item.title }}</div>
            <div class="price">¥ {{ item.price }} 元</div>
          </Card>
        </a>
      </Col>
    </Row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CommonCardTitle from '@/components/CommonCardTitle.vue';

@Component({
  components: { CommonCardTitle }
})
export default class ProductList extends Vue {
  productList: Array<any> = [
    {
      title: '你不知道的JavaScript',
      subTitle: 'JavaScript入门经典教程 深入了解ES6 探索JavaScript语言核心概念',
      label: '推荐',
      img: 'http://img3m8.ddimg.cn/61/27/27883708-1_u_3.jpg',
      price: '142.8',
      href: 'http://product.dangdang.com/27883708.html'
    },
    {
      title: 'JavaScript权威指南',
      subTitle: '淘宝前端团队倾情翻译！经典权威的JavaScript犀牛书',
      label: '推荐',
      img: 'http://img3m0.ddimg.cn/13/17/22722790-1_w_6.jpg',
      price: '111.2',
      href: 'http://product.dangdang.com/22722790.html'
    },
    {
      title: 'JavaScript高级程序设计',
      subTitle: 'JavaScript技术名著，html+css+javascript教程精粹',
      label: '推荐',
      img: 'http://img3m3.ddimg.cn/2/21/22628333-1_u_2.jpg',
      price: '78.2',
      href: 'http://product.dangdang.com/22628333.html'
    }
  ];
}
</script>
