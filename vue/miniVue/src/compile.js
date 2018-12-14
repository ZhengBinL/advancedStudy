/*
    专门负责解析模板内容
 */
class Compile {
    //参数一：模板
    //参数二：vue实例
    constructor(el, vm) {
        // el: new Vue时传递的选择器
        // this.el = el
        // this.el = document.querySelector(el)
        // 真正的vue中el不仅仅可以是字符串的选择器也可以是DOM对象,所以
        this.el = typeof el === 'string' ? document.querySelector(el) : el
        // vm：new的Vue实例
        this.vm = vm

        // 编译模板
        if (this.el) {
            //1. 把el中所有的子节点都放入到内存中， fragment
            let fragment = document.createDocumentFragment()
            //2. 在内存中编译fragment
            //3. 把fragment一次性的添加到页面
        }
    }
}