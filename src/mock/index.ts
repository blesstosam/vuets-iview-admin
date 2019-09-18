import Mock from 'mockjs'
import { login, logout } from './login'

Mock.setup({
  timeout: 1000
})

// 登录相关和获取用户信息
Mock.mock(/\/api\/login/, login)
Mock.mock(/\/api\/logout/, logout)
Mock.mock(/\/save_error_logger/, 'success')



export default Mock
