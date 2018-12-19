exports.showIndex = async (req,res,next)=>{
    res.render('index.html')
}

exports.showLogin = async (req,res,next)=>{
    res.render('signin.html')
    console.log('signup')
    //1. 获取表单数据
    //2. 表单数据验证
    //3. 业务处理
    //4. 发送结果响应
}

exports.showQuestionNew = async (req,res,next)=>{
    res.render('topic-new.html')
}
exports.showQuestionId = async (req,res,next)=>{
    res.render('topic-show.html')
}
exports.showTags = async (req,res,next)=>{
    res.render('tags-index.html')
}