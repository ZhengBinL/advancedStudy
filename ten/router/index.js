const express  = require('express')
const indexCtrl = require('../controller/index')

const router = express.Router()

router
    .get('/',indexCtrl.showIndex)
    .get('/login',indexCtrl.showLogin)
    .post('/signup',indexCtrl.signup)
module.exports = router