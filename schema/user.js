// 引入joi模块，用于定义验证规则
import joi from 'joi'

// 定义username和password的验证规则
 /**
 * string() 值必须是字符串
 * alphanum() 值只能是包含 a-z A-Z 0-9 的字符串
 * min(length) 最小长度
 * max(length) 最大长度
 * required() 值是必填项，不能为 undefined
 * pattern(正则表达式) 值必须符合正则表达式的规则
 */
// username必须是字符串，只能包含a-z/A-Z/0-9，最小长度是3，最大长度是12，必须要有
const username = joi.string().alphanum().min(2).max(12).required()
// password必须是字符串，必须以非空字符开头，长度为6-16位，必须要有
const password = joi.string().pattern(/^[\S]{6,16}$/).required()

// 将username和password的验证规则挂载到验证规则对象上
const userSchema = {
    // 验证req.body中的username和password
    // 在express中只要使用了express.urlencoded/express.json中间件，就会将请求参数对象挂载到req.body上
    // 在这里就可以对req.body中的username和password属性进行校验
    body: {
        username,
        password
    }
}

// 向外暴露验证规则对象
export default userSchema