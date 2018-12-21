const request = require('../utils/request')

exports.findByNickname = async (nickname) => {
    const {
        data
    } = await request({
        url: '/users',
        method:'GET',
        params: {
            nickname
        }
    })
    return data[0]
}

exports.findByUsername = async (username) => {
    const {
        data
    } = await request({
        url: '/users',
        method:'GET',
        params: {
            username
        }
    })
    return data[0]
}

exports.create = async (user) => {
    const {
        data
    } = await request({
        url: '/users', 
        method:'POST',
        data: {
            username: user.username,
            password: user.password,
            nickname: user.nickname
        }
    })
    return data
}