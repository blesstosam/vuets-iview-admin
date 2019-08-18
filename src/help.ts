import storage from '@/assets/script/storage'

interface BtnMap  {
  [key: string]: string
}

export default function install (Vue: any) {
  // btnMap['/data-center/xxx/search'] = 'search' | '搜索'
  // btnMap: key为后台返回的按钮唯一标识 用当前路由+按钮类型定义 ； value 为 name : eng_name | name
  // const btnMap = storage.get('btnMap') || {}
  const btnMap: BtnMap = {
    '/overview-operations/data-center/search': '搜索',
    '/home/search': '搜索'
  }
  // console.log('vue help js installed...')

  Vue.mixin({
    created() {
      const btnConfig = {
        // key为按钮类型； 现在和value保持一致
        // 手动在 __isBtnShow 里 拼接上当前路由 和 btnMap 进行匹配
        search: 'search',  // 搜索
        export: 'export',  // 导出
        disable: 'disable', // 禁用
        recharge: 'recharge', // 充值
        reset: 'reset',  // 重置
        add: 'add', // 添加
        edit: 'edit',// 编辑
        lookMember: 'look member',// 查看会员
        siteInfo: 'site info',// 站点信息
        extendAddress: 'extend address',// 推广地址
        agentLevelManage: 'agent level manage',// 代理层级管理
        enable: 'enable',// 启用
        resetLoginPsw: 'reset login psw',// 重置登录密码
        resetPayPsw: 'reset pay psw',// 重置支付密码
        gameGrade: 'game grade',// 游戏分数
        bankCardManage: 'bank card manage',// 银行卡管理
        resetIdentity: 'reset identity',// 重置身份密码
        addOrder: 'add order',// 补单
        lock: 'lock',// 锁定
        lookGameConfront: 'look game confront',// 查看游戏对局牌
        detail: 'detail',// 详情
        operateData: 'operate data',// 运营数据
        unlock: 'unlock',// 解锁
        refresh: 'refresh',// 刷新
        delete: 'delete',// 删除
        stop: 'stop',// 停用
        hide: 'hide',// 隐藏
        look: 'look', // 查看
        show: 'show',// 显示
        sendEmail: 'send email',// 发送邮件
        repeat: 'repeat',// 重发
        save: 'save',// 保存
        modify: 'modify',// 修改
        showOrHide: 'show or hide',// 展开和隐藏
        submit: 'submit',// 提交
        systemDeploy: 'system deploy',// 系统维护配置
        channelPackage: 'channel package',// 渠道包
        batchStart: 'batch start',// 批量启用
        batchForbidden: 'batch forbidden',// 批量禁用
        startGoogle: 'start google',// 开启谷歌验证
        userUpscoreDetail: 'user upscore detail',// 用户上分详情
        memberUpscore: 'member upscore',
        start: 'start'  // 开启
      }
      // const arr = ['MemberManage', 'PayManage', '...']
      // if (arr.indexOf(this.$options.name) !== -1) {
        this.btnMap__ = btnMap
        this.btnConfig__ = btnConfig  
      // }
    },
    data() {
      return {
        btnMap__: {}
      }
    },
    methods: {
      __getBtnName(key: string): string {
        return btnMap[`${(this as any).$route.path}/${key}`] || ''
      },
      __isBtnShow(key: string): string {
        // console.log((this as any).$route.path, key, 'key')
        return btnMap[`${(this as any).$route.path}/${key}`] ? 'display: inline-block' : 'display: none'
      },
    }
  })
}

// // 通过v-if来控制
// <Button v-if="btnMap__[btnConfig__.search]">搜索</Button>

// // 通过方法来控制，更加灵活
// <Button :style="__isBtnShow(btnConfig__.search)">搜索</Button>