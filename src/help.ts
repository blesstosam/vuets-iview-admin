// import storage from '@/assets/script/storage';

interface BtnMap {
  [key: string]: string;
}

export default function install(Vue: any) {
  // btnMap['/data-center/xxx/search'] = 'search' | '搜索'
  // btnMap: key为后台返回的按钮唯一标识 用当前路由+按钮类型定义 ； value 为 name : eng_name | name
  // const btnMap = storage.get('btnMap') || {}
  const btnMap: BtnMap = {
    '/home/search': '搜索'
  };
  // console.log('vue help js installed...')

  Vue.mixin({
    created() {
      const btnConfig = {
        // key为按钮类型； 现在和value保持一致
        // 手动在 __isBtnShow 里 拼接上当前路由 和 btnMap 进行匹配
        search: 'search', // 搜索
        export: 'export', // 导出
        disable: 'disable', // 禁用
        reset: 'reset', // 重置
        add: 'add', // 添加
        edit: 'edit', // 编辑
        delete: 'delete' // 删除
      };
      // const arr = ['MemberManage', 'PayManage', '...']
      // if (arr.indexOf(this.$options.name) !== -1) {
      this.btnMap__ = btnMap;
      this.btnConfig__ = btnConfig;
      // }
    },
    data() {
      return {
        btnMap__: {}
      };
    },
    methods: {
      __getBtnName(key: string): string {
        return btnMap[`${(this as any).$route.path}/${key}`] || '';
      },
      __isBtnShow(key: string): string {
        return btnMap[`${(this as any).$route.path}/${key}`] ? 'display: inline-block' : 'display: none';
      }
    }
  });
}

// // 通过v-if来控制
// <Button v-if="btnMap__[btnConfig__.search]">搜索</Button>

// // 通过方法来控制，更加灵活
// <Button :style="__isBtnShow(btnConfig__.search)">搜索</Button>
