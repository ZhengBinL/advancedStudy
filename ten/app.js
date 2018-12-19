const express = require('express')
const nunjucks = require('nunjucks')
const path = require('path')

const app = express()

//开放public目录资源
app.use('/public/',express.static(path.join(__dirname,'./public/')))

nunjucks.configure(path.join(__dirname,'./view'), {
    autoescape: true,
    express: app,
    watch:true//禁用模版文件缓存
})

app.get('/', (req, res, next) => {
    // res.status(200).send('hello')
    res.render('index.html')
})

app.get('/people/home', (req, res, next) => {
    // res.status(200).send('hello')
    res.render('people-home.html')
})

app.listen(3000, () => {
    console.log("服务启动成功.")
    console.log('http://localhost:3000/')
})