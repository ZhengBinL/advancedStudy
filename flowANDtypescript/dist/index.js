// 在flow中如果想要为一个数据添加类型
// 1. 通过注释的方式进行添加
// 2. 通过直接改写js代码结构（推荐）

// 需要给文件添加标记，否则不进行监测
var a = 10;
// a = 'abc';
a = 5;
console.log(a);

function sum(a, b) {
    return a + b;
}
sum(1, 2);
sum('1', '2');