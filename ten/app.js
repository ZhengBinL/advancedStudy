const express = require('express')
const nunjucks = require('nunjucks')
const path = require('path')
const router = require('./router/')

const app = express()

//开放public目录资源
app.use('/public/',express.static(path.join(__dirname,'./public/')))
app.use('/node_modules/',express.static(path.join(__dirname,'./node_modules/')))

// 接收解析客户端提交的 json 格式数据
// appliction/json
app.use(express.json())
app.use(express.urlencoded({
    extended:true
}))
  
nunjucks.configure(path.join(__dirname,'./view'), {
    autoescape: true,
    express: app,
    watch:true//禁用模版文件缓存
})

app.use(router)

app.listen(3000, () => {
    console.log("服务启动成功.")
    console.log('http://localhost:3000/')
})

// process.on('unhandledRejection', (reason, p) => {
//     console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
//     // application specific logging, throwing an error, or other logic here
//   });
  