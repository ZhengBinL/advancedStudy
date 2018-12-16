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
            // let fragment = document.createDocumentFragment()
            let fragment = this.node2fragment(this.el)
            //2. 在内存中编译fragment
            this.compile(fragment)
            //3. 把fragment一次性的添加到页面
            this.el.appendChild(fragment)
        }
    }
    /* 核心方法 */
    node2fragment(node) {
        let fragment = document.createDocumentFragment()
        // 把el中所有的子节点挨个添加到文档碎片中
        let childNodes = node.childNodes
        this.toArray(childNodes).forEach(node => {
            // 把所有子节点添加到fragment中
            fragment.appendChild(node)
        })
        return fragment
    }
    /* 变异文档碎片 （内存中） */
    compile(fragment) {
        let childNodes = fragment.childNodes
        this.toArray(childNodes).forEach(node => {
            //  编译子节点
            // 如果是元素，需要解析指令
            if (this.isElementNode(node)) {
                this.compileElement(node)
            }
            // 如果是文本节点，需要解析插值表达式
            if (this.isTextNode(node)) {
                this.compileText(node)
            }

            //如果当前节点有子节点，需要递归解析
            if (node.childNodes && node.childNodes.length > 0) {
                this.compile(node)
            }
        })
    }

    //解析html标签
    compileElement(node) {
        //1. 获取当前节点中的所有属性
        let attributes = node.attributes
        this.toArray(attributes).forEach(attr => {
            //2. 解析vue指令（所有以v-开头的属性）
            let attrName = attr.nodeName
            if (this.isDirective(attrName)) {
                let type = attrName.slice(2)
                let attrValue = attr.nodeValue
                // //如果是v-text指令
                // if (type === 'text') {
                //     node.textContent = this.vm.$data[attrValue]
                // }
                // //如果是v-html指令
                // if (type === 'html') {
                //     node.innerHTML = this.vm.$data[attrValue]
                // }
                // //如果是v-model指令
                // if (type === 'model') {
                //     node.value = this.vm.$data[attrValue]
                // }
                //如果是v-on指令
                if (this.isEventDirective(type)) {
                    CompileUtil["eventHandler"](node,this.vm,type,attrValue)
                } else {
                    CompileUtil[type] && CompileUtil[type](node, this.vm, attrValue)
                }
            }
        })

    }

    //解析文本节点 
    compileText(node) {
      let txt =  node.textContent
      let reg = /\{\{(.+)\}\}/
      if(reg.test(txt)){
          let expr = RegExp.$1
          node.textContent = txt.replace(reg,this.vm.$data[expr])
      }

    }

    /* 工具方法 */
    toArray(likeArray) {
        return [].slice.call(likeArray)
    }

    isElementNode(node) {
        //nodeType: 节点都类型 1:元素节点 3: 文本节点
        return node.nodeType === 1
    }
    isTextNode(node) {
        //nodeType: 节点都类型 1:元素节点 3: 文本节点
        return node.nodeType === 3
    }
    isDirective(name) {
        return name.startsWith('v-')
    }
    isEventDirective(attrName) {
        return attrName.split(":")[0] === "on"
    }
}


let CompileUtil = {
    // 处理各种指令
    text(node, vm, attrValue) {
        node.textContent = vm.$data[attrValue]
    },
    html(node, vm, attrValue) {
        node.innerHTML = vm.$data[attrValue]
    },
    model(node, vm, attrValue) {
        node.value = vm.$data[attrValue]
    },
    eventHandler(node, vm, type, attrValue) {
        console.log("解析v-on")
        let eventType = type.split(":")[1]
        // node.addEventListener(eventType,this.vm.$methods[attrValue])
        let fn = vm.$methods && vm.$methods[attrValue]
        if(eventType&&fn){
            node.addEventListener(eventType, fn.bind(vm))
        }
    }
}