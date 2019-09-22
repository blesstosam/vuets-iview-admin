let baseUrl = '',
  wsUrl = '';

switch (process.env.NODE_ENV) {
  case 'production':
    baseUrl = '';
    wsUrl = '';
    break;
  case 'development':
    baseUrl = '';
    wsUrl = '';
    break;
}

export { baseUrl, wsUrl };
