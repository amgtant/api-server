import mysql from 'mysql2'

// 创建数据库连接池，建立与mysql数据库之间的连接
let pool = mysql.createPool({
    // // 数据库服务器主机ip地址
    // host: '192.168.0.59',
    // // 数据库服务器端口，默认就是3306，可以省略
    // port: 3306,
    // // 登录数据库的账号
    // user: 'root',
    // // 登录数据库的密码
    // password: '123456',
    // // 指定需要连接的数据库名
    // database: 'mydb',
    
    // 数据库服务器主机ip地址
    host: '127.0.0.1',
    // 数据库服务器端口，默认就是3306，可以省略
    port: 3306,
    // 登录数据库的账号
    user: 'root',
    // 登录数据库的密码
    password: 'root',
    // 指定需要连接的数据库名
    database: 'demo',
})

// 向外暴露数据库连接池对象
// 如果暴露的是pool，那么使用的就是mysql中的pool，不支持Promise
// 如果暴露的是pool.promise()，那么就使用的就是mysql2中的pool，支持Promise
export default pool.promise()