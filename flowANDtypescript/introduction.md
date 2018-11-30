# Flow 和 TypeScript

## 功能
Flow 和 TypeScript 都是用来做 JavaScript 类型检查的！

## 使用JavaScript进行编程时可能遇到的问题分析

## Flow的使用
```js
//一.创建package.json
npm init -y

// 需要给文件添加@flow标记，否则不进行监测
// @flow
//二.安装flow
npm install --save-dev flow-bin
//三.修改package.json中scripts
"scripts": {
    //...
    "flow":"flow"
  },
//四.创建flow配置文件
npm run flow init //生成.flowconfig
//五.运行npm run flow监测文件 
```
+ 在flow中如果想要为一个数据添加类型
  + 通过注释的方式进行添加（不会改写js代码,代码在添加完类型之后仍然可以正常运行）
  + 通过直接改写js代码结构（推荐）（如果要正常运行，需要使用babel进行转码）



+ 安装babel
```js
npm install --save-dev babel-cli babel-preset-flow
```
+ 创建babel配置文件
```shell
//创建.babelrc文件,并配置
{
  "presets":["flow"]
}
```
+ 在package.json中添加
```js
"scripts": {
    "build": "babel ./src -d ./dist"
  },
```
+ 运行npm run build

## Flow是什么？
Static Type Checker For JavaScript
静态类型检查工具
## Flow能做什么？
Flow能够给JavaScript提供静态类型检查的能力，其实就是为JavaScript添加了一个编译过程。
## Typescript的使用
FLow是工具，TypeScript是语言

TypeScript主要为JavaScript提供了类型系统和ES6语法的支持！
 
 ## 如何使用 

 ### 安装
 TypeScript命令行工具的安装（TS编译器）
 ```
 npm i typescript -g

 ```
 安装好了之后，全局会提供一个`tsc`命令给我们使用！

 ### 编写TypeScript代码

 ### 通过tsc进行编译,最终运行

 ### ts配置文件的说明
 + 创建配置文件
 ```
tsc --init
 ```
 + 设置配置项
  * target：指的就是将ts代码要转换成那个版本的js代码 es5 es3
  * module：指的就是将ts代码转换成js代码之后，使用的模块化的标准是什么
  * outDir: 指的就是将ts代码转换成js代码值，js代码存放的文件夹路径
  * rootDir: 指的就是要将那个目录中的ts代码进行ts编译
  * strict: 是否要将ts代码转换为严格模式的js代码

+ 使用配置文件
```
tsc -p ./tsconfig.json
```