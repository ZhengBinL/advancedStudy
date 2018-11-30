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