+ 导入（Inporting）
    + 命名导入（Named Imports）
        + 从源模块导入其原始名称的特定项目
            ```javascript
            import {something} from './module.js'
            ```
        + 从源模块导入特定项，并在导入时指定自定义名称
            ```javascript
            import { something as somethingElse } from './module.js';
            ```
    + 命名空间导入（Namespace Imports）
        + 将源模块中的所有内容座位对象导入，将所有源模块的命名导出公开为属性和方法。默认导出被排除在此对象之外。
            ```javascript
            import * as module from './module.js'
            ```
            eg. 上面的"something"的例子将被附加到作为属性的导入对象上。"module.something"
    + 默认导入(Default Import)
        + 导入源文件的默认导出
        ```javascript
        import something from './module.js'
        ```
    + 空的导入(Empty Import)
        + 加载模块代码，但不要创建任何新对象。
            ```javascript
            import './module.js';
            ```
            这对于[polyfills]是有用的，或者当导入的代码的主要目的是和原型有关的时候。

+ 导出（Exporting）
    + 命名导出（Named exports）
        + 导出以前声明的值：
        ```javascript
        var something = true;
        export { something };
        ```
        + 在导出时重命名：
        ```javascript
        export { something as somethingElse };
        ```
        + 声明后立即导出：
        ```javascript
        //这可以与`var`,`let`,`const`,`class`,and `function`配合使用
        export var something = true;
        ```
    + 默认导出（Default Export）
        + 导出一个值作为源模块的默认导出：
        ```javascript
        export default something;
        ```
        仅当源模块只有一个导出时，才建议使用此做法。
        将默认和命名导出组合在同一模块中是不好的做法，尽管它是规范允许的。


