let baseUrl = '',
  wsUrl = '';

switch (process.env.NODE_ENV) {
  case 'production':
    // 预上线 - 测试环境
    if (process.env.VUE_APP_CURRENTMODE === 'predeploy') {
      baseUrl = '';
      wsUrl = '';
    } else {
      // 正式生产环境
      baseUrl = '';
      wsUrl = '';
    }
    break;
  case 'development':
    baseUrl = '';
    wsUrl = '';
    break;
}

export { baseUrl, wsUrl };
