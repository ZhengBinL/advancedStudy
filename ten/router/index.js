const express  = require('express')
const indexCtrl = require('../controller/index')

const router = express.Router()

router
    .get('/',indexCtrl.showIndex)
    .get('/signin',indexCtrl.showLogin)
    .get('/questions/new',indexCtrl.showQuestionNew)
    .get('/questions/:id',indexCtrl.showLogin)
    .get('/tags',indexCtrl.showTags)
module.exports = router