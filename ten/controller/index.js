const axios = require('axios')

const api = 'http://localhost:8000/api/v1/'



exports.showIndex = async (req, res, next) => {
    res.render('index.html')
}

exports.showLogin = async (req, res, next) => {
    res.render('signin.html')
}

exports.signup = async (req, res, next) => {
    console.log('signup')

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
    const findUserNameRes = await axios({
        url: api + 'users',
        method: 'GET',
        params: {
            username
        }
    })
    if (findUserNameRes.data[0]) {
        return res.status(200).json({
            code: 1,
            message: '用户名已存在'
        })
    }
    //3.2 校验昵称是否被占用
    const findNickNameRes = await axios({
        url: api + 'users',
        method: 'GET',
        params: { //GET 请求参数要写到params中
            nickname
        }
    })
    if (findNickNameRes.data[0]) {
        return res.status(200).json({
            code: 2,
            message: '昵称已存在'
        })
    }
    //3.3 创建用户
    const createUserRes = await axios({
        url: api + 'users',
        method: 'POST',
        data: { //POST 请求参数要写到data中
            nickname,
            password, //md5 处理
            username
        }
    })
    if (createUserRes.data.id) {
        return res.status(200).json({
            code: 0,
            message: 'OK'
        })
    }
    //4. 发送结果响应
}