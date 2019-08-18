
let baseUrl = ''

switch (process.env.NODE_ENV) {
  case 'production':
    baseUrl = 'http://192.168.3.225:9076'
    break;
  case 'development':
    baseUrl = 'http://192.168.3.225:9076'
    break;
}

export {baseUrl}
