创建第一个bundle
+ npm install rollup --global #or `npm i rollup -g`
+ rollup  //运行rollup命令
+ mkdir -p my-rollup-project/src //创建一个简单的项目
+ cd my-rollup-project
//创建入口，将以下代码粘贴到新建的文件src/main.js中:
+ import foo from './foo.js';
+ export default function(){
    coonsole.log(foo);
}
+ 之后创建入口文件引用的foo.js模块：
export default 'hello world!';
+ 创建bundle
+ rollup src/main.js -f cjs //-f选项（--output.format的缩写）指定所创建bundle的类型
`js`
'use strict';
var foo = 'hello world!';
function main (){
    console.log(foo);
}
module.exports = main
+ 将bundle保存为文件
`js`
rollup src/main.js -o bundle.js -f cjs


+ 使用配置文件（config）