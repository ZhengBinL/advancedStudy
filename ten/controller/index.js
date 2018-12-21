// const User = require('../service/user')
const axios = require('axios')





exports.showIndex = async (req, res, next) => {
    res.render('index.html')
}

exports.showLogin = async (req, res, next) => {
    res.render('signin.html')
}

exports.signup = async (req, res, next) => {
    // console.log('signup') 
    // http://localhost:8000/api/v1/
    //1. 获取表单数据
    // console.log(req.body)
    const {
        username,
        password,
        nickname,
        verify_code
    } = req.body
    //2. 表单数据验证

    //3. 业务处理
    //3.1 校验用户名是否被占用
    const findByNickname = await axios({
        url:"http://localhost:8000/api/v1/users",
        method:'GET',
        params:{
            nickname:nickname
        }
    })       
    console.log(findByNickname.data)
    // if (await User.findByUsername(use rname)) {
    //     return res.status(200).json({
    //         code: 1,
    //         message: '用户名已存在'
    //     })
    // }
    //3.2 校验昵称是否被占用
    // if (await User.findByNickname(nickname)) {
    //     return res.status(200).json({
    //         code: 2,
    //         message: '昵称已存在'
    //     })
    // }
    //3.3 创建用户
    // const user = await User.create({
    //     username,
    //     password,
    //     nickname
    // })
    // if (user.id) {
    //     return res.status(200).json({
    //         code: 0,
    //         message: 'OK'
    //     })
    // }
    //4. 发送结果响应
}