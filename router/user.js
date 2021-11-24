/**
 * user.js路由模块：只定义路由与请求处理函数之间的映射关系，真正的请求处理函数定义到router_handler中
 */

import express from 'express'

// 引入路由处理模块
import { register, login } from '../router_handler/user.js'

// 引入校验规则模块
import userSchema from '../schema/user.js'

// 引入@escook/express-joi中间件，用于校验用户数据
import expressJoi from '@escook/express-joi'

// 创建路由对象
const router = express.Router()

// 创建路由规则并挂载到路由对象上
// 注册
// 使用expressJoi(userSchema)中间件按照userSchema中定义的验证规则对当前请求携带的请求参数进行校验
// userSchema中定义了对body中username和password的校验规则
// 那么这里就会对当前请求携带的body请求参数中的username和password进行校验
// 1.数据校验通过后，会将当前这次请求传递给后面的请求处理函数(register)
// 2.数据校验失败后，不会将当前这次请求传递给后面的请求处理函数(register)，而是终止后续代码的执行，并抛出一个全局的Error错误，进入全局错误中间件中进行错误处理
router.post('/register', expressJoi(userSchema), register)

// 登录
// 对当前请求携带的body请求参数中的username和password进行校验
router.post('/login', expressJoi(userSchema), login)


// 向外暴露路由对象
// 由于导出的只有一个router对象，因此采用默认导出
export default router