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

// app.get('/', (req, res, next) => {
//     // res.status(200).send('hello')
//     res.render('index.html')
// })

// app.get('/people/home', (req, res, next) => {
//     // res.status(200).send('hello')
//     res.render('people-home.html')
// })
app.use(router)

app.listen(3000, () => {
    console.log("服务启动成功.")
    console.log('http://localhost:3000/')
})