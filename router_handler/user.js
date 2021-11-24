/**
 * user.js路由处理模块：定义请求处理函数，并向外暴露出去，由于请求处理函数比较多，因此采用按需导出
 */
// 引入数据库连接池模块
import pool from '../db/index.js'

// 引入bcryptjs模块，对密码加密
import bcrypt from 'bcryptjs'

// 注册
export const register = async (req, res) => {
    // 获取用户提交服务器的请求参数信息
    const userInfo = req.body

    // 对表单中的数据进行合法性的校验
    // 判断用户是否输入了username或password
    /*
    if (!userInfo.username || !userInfo.password) {
        // 如果用户没有输入username或password，结束请求处理函数，提示用户：用户名或密码不能为空！
        // return res.send({ code: 0, msg: '用户名或密码不能为空！' })
        return res.cc('用户名或密码不能为空！')
    }
    */
    // 如果用户输入了username和password，就判断用户名是否存在
    
    try {
        // 查询ev_users表中的所有数据，返回一个包装了结果集的数组，数组中第一个元素就是结果集，因此可以将结果集解构出来
        // [ result ]：解构返回的数组，将数组中第一个元素赋值给result
        const [ result ] = await pool.query('SELECT * FROM ev_users WHERE username = ?', userInfo.username)

        // 判断结果集数组长度是否大于0
        // 如果大于0，说明用户名存在，结束请求处理函数，提示用户：用户名已存在，请更换其他用户名！
        // if (result.length) return res.send({ code: 0, msg: '用户名已存在，请更换其他用户名！' })
        if (result.length) return res.cc('用户名已存在，请更换其他用户名！')

        // 如果小于0，说明用户名不存在，将用户名加密后保存到数据库中
        // 将密码加密后重新赋值给userInfo.password
        userInfo.password = bcrypt.hashSync(userInfo.password, 10)

        // 将userInfo保存到数据库中
        // 只要userInfo中包含username和password即可，因为在数据库中设置了username和password字段必须存在
        // 插入数据，返回的是一个数组，数组中第一个元素是一个对象，根据对象中的affectedRows属性值是否为1，就可以判断是否插入成功
        // 从数组中解构第一个对象元素，再在对象中解构affectedRows属性
        const [ { affectedRows } ] = await pool.query('INSERT INTO ev_users SET ?', userInfo)
        // 如果affectedRows不等于1，说明插入失败，结束请求处理函数，提示用户：注册失败，请稍后再试！
        if (affectedRows !== 1)  {
            // return res.send({ code: 0, msg: '注册失败，请稍后再试！' })
            return res.cc('注册失败，请稍后再试！')
        }

        // 如果affectedRows等于1，说明插入成功，提示用户：注册成功！
        // res.send({ code: 1, msg: '注册成功! '})
        res.cc('注册成功! ', 1)

    } catch (error) {
        // 如果执行sql语句出现异常，响应客户端错误信息
        // res.send({ code : 0, msg: error.message })
        res.cc(error)
    }
}

// 登录
export const login = (req, res) => {
    res.send('login Ok')
}

