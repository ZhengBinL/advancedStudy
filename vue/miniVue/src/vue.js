/* 定义一个类，用于创建Vue实例 */ 
class Vue {
    constructor(options = {}){
        // //防止用户不传递参数
        // options = options || {}
        //给Vue实例增加属性
        this.$el = options.el
        this.$data = options.data

        //如果指定了el参数，对el进行解析
        if(this.$el){
            // compile 负责解析模板的内容
            // 需要：模板和数据
            new Compile(this.$el,this)
        }
    }
}

