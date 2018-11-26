+ rollup.js 目前使用范围为打包js，对其他文件并不支持打包。
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
在项目中创建一个名为rollup.config.js的文件
`js`
export default {
    input : 'src/main.js',//入口文件
    output : {
        file : 'bundle.js',//打包后的出口文件名，与地方
        format: 'cjs'
    }
}
+ 我们使用--config 或 -c 来使用配置文件
rm bundle.js//删除已经存在的bundle.js
rollup -c
+ 如果愿意的haul，也可以指定与默认rollup.config.js文件不同的配置文件
rollup --config rollup.config.dev.js
rollup --config rollup.config.prod.js
+ 使用插件(eg.rollup-plugin-json)
`js`
npm install --save-dev rollup-plugin-json//我们用的是 --save-dev 而不是 --save，因为代码实际执行时不依赖这个插件——只是在打包时使用
更新 src/main.js 文件，从 package.json 而非 src/foo.js 中读取数据：
`js`// src/main.js
import { version } from '../package.json';

export default function () {
  console.log('version ' + version);
}
`js`//编辑 rollup.config.js 文件，加入 JSON 插件：
// rollup.config.js
import json from 'rollup-plugin-json';

export default {
  input: 'src/main.js',
  output: {
    file: 'bundle.js',
    format: 'cjs'
  },
  plugins: [ json() ]
};
+ npm run build 执行 Rollup
`js`
"scripts": {
    "rollup":"rollup -c rollup.config.js"
  },
  npm run rollup

+ rollup.config.js配置文件详情观看rollup.config.js 文件