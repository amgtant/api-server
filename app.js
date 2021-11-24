// 引入express框架
import express from 'express'

// 引入cors中间件
import cors from 'cors'

// 引入路由模块
import apiUser from './router/user.js'

// 引入joi模块，用于在错误处理中间件中判断是否是joi.ValidationError
import joi from 'joi'

// 创建web服务器实例
const app = express()

// 使用cors中间件，允许跨域资源共享
app.use(cors())

// 使用express.urlencoded中间件，解析x-www-form-urlencoded格式的请求体参数
// 解析生成的请求体参数对象会挂载到req.body上
app.use(express.urlencoded({ extended: false }))

// 使用express.json中间件，解析json格式的请求体参数
// 解析生成的请求体参数对象会挂载到req.body上
app.use(express.json())


// 封装一个res.cc()，用于简化处理res.send()
app.use((req, res, next) => {
    // 为res对象挂载一个cc方法
    // err：错误信息，可能是一个错误对象，也可能是一个错误描述字符串
    // code：默认值为0，代表失败的情况
    res.cc = (err, code = 0) => {
        res.send({
            code,
            // 如果err是Error的实例，代表err是一个错误对象，将err.message赋值给msg
            // 否则err是一个错误描述字符串，将err赋值给msg
            msg: err instanceof Error ? err.message : err
        })
    }

    // 将请求交给下一个中间件处理，在下一个中间件中就可以通过res调用cc函数处理res.send()
    next()
})

// 注册路由模块，并为路由模块添加统一的访问路径前缀
app.use('/api', apiUser)

// 在所有路由之后，定义全局错误处理中间件，捕获可能出现的错误
app.use((err, req, res, next) => {
    // joi.ValidationError：joi校验错误
    // 如果是joi校验错误，就结束当前请求处理函数，将错误信息err.message响应给客户端
    if (err instanceof joi.ValidationError) return res.cc(err)

    // 如果前面的所有错误都没有匹配上，那么就响应客户端：未知的错误
    res.cc('未知的错误')
})

// 监听服务器端口，启动web服务器
app.listen(80, () => console.log('web server running at http://127.0.0.1'))