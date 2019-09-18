let baseUrl = '',
  wsUrl = '';

switch (process.env.NODE_ENV) {
  case 'production':
    baseUrl = 'http://192.168.3.225:9076';
    wsUrl = '';
    break;
  case 'development':
    baseUrl = '';
    wsUrl = '';
    break;
}

export { baseUrl, wsUrl };
