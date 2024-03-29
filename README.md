# 苏苏的vue
![输入图片说明](https://img.shields.io/badge/vue-2.6.11-red)
![输入图片说明](https://img.shields.io/badge/iview-3.5.4-orange)
![输入图片说明](https://img.shields.io/badge/element--ui-2.15.6-brightgreen)
![输入图片说明](https://img.shields.io/badge/vuex-3.6.2-red)
![输入图片说明](https://img.shields.io/badge/less--loader-4.1.0-red)
![输入图片说明](https://img.shields.io/badge/node--sass-4.14.1-red)

#### 联系我
##### 公众号：苏苏的bug
![](https://camo.githubusercontent.com/927762d2b67f6d53db4b1146ca78273ccbb380f731ec285470d3b35acba76a53/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f737573752d68752f737573752d68752f696d672fe88b8fe88b8fe79a846275672e6a7067)
![](https://s3.bmp.ovh/imgs/2022/07/27/c3bdf18a88cc56a5.png)

|  插件   | 版本  |介绍|
|  ----  | ----  |----  |
| vuedraggable  | 2.24.3 |vuedraggable 是标准的组件式封装，并且将可拖动元素放进了 transition-group 上面，过渡动画都比较好|
| awe-dnd  | 0.3.4 |封装了 v-dragging 全局指令，然后通过全局指令去数据绑定等。相比及 vuedraggable 来说， awe-dnd 是没有双向绑定（这里没有双向绑定并不是很严谨，准确的来说没有暴露双向绑定的方式），因此提供了事件，在拖拽结束的时候用来更新列表（不需要手动更新列表，其实内部是实现了双向绑定的）或者是去触发父组件监听的事件|
| vue-quill-editor  | 3.0.6 |基于 Quill,适用于Vue的富文本编辑器,支持服务端渲染和单页应用，兼容IE10+|
| Jest  | 27.5.1 |Jest是 Facebook 的一套开源的 JavaScript 测试框架， 它自动集成了断言、JSDom、覆盖率报告等开发者所需要的所有测试工具，是一款几乎零配置的测试框架。并且它对同样是 Facebook 的开源前端框架 React 的测试十分友好。|
| dplayer| 1.26.0 | 视频播放组件：http://dplayer.js.org/|
| vue-dplayer| 0.0.10 | 视频播放组件，npm对DPlayer做了封装，vue项目中使用vue-dplayer|
| tailwindcss| npm:@tailwindcss/postcss7-compat@^2.2.17 | https://tailwindcss.com/ Tailwind CSS 是一个功能类优先的 CSS 框架，它集成了诸如 flex, pt-4, text-center 和 rotate-90 这样的的类，它们能直接在脚本标记语言中组合起来，构建出任何设计|
|vue-pdf| 4.3.0 | vue-pdf 一个基于vue的pdf预览插件 npm install --save vue-pdf|
|Luckysheet| 直接引入js文件/cdn | Luckysheet ，一款纯前端类似excel的在线表格，功能强大、配置简单、完全开源。文档地址：https://mengshukeji.gitee.io/LuckysheetDocs/zh/|
|x - sheet| 直接引入js文件 | 开源的高性能js电子表格。地址：https://gitee.com/eigi/x-sheet|
#### 介绍
##### 1.vue基础语法 

##### 2.less,sass,stylus等css预处理器，pug模板的使用 

##### 3.iview,饿了么ui，ant-vue等ui组件库的使用 

##### 4.事件优化+自定义组件，二次封装等等 

##### 5.常见的一些需求demo等等

##### 6.总结在vue使用过程中遇到的一些问题们~，战胜小困难，成为大boss吧！
 

#### demo案例
## 0.菜单列表-切换多页面
![输入图片说明](demo%E5%9B%BE%E9%9B%86/tab%E5%88%87%E6%8D%A2.gif)

## 1.iview篇章
#### 1.1 表格数据分页多选
![输入图片说明](demo%E5%9B%BE%E9%9B%86/%E5%88%86%E9%A1%B5%E5%A4%9A%E9%80%89.gif)
#### 1.2 动态表单校验
![输入图片说明](https://gitee.com/susuhhhhhh/su-sus-vue/raw/master/demo%E5%9B%BE%E9%9B%86/%E5%8A%A8%E6%80%81%E6%A0%A1%E9%AA%8C.gif)
#### 1.3 日期选择+禁用
![输入图片说明](demo%E5%9B%BE%E9%9B%86/%E6%97%A5%E6%9C%9F%E9%80%89%E6%8B%A9+%E7%A6%81%E7%94%A8.gif)
## 2. 预处理器sass篇章
#### 2.1 sass中的颜色函数
![输入图片说明](demo%E5%9B%BE%E9%9B%86/sasscolor.png)
## 3.页面布局
#### 3.1 文件导出+进度条
![输入图片说明](demo%E5%9B%BE%E9%9B%86/%E6%96%87%E4%BB%B6%E5%AF%BC%E5%87%BA.png)
#### 3.2 loading动画
![输入图片说明](demo%E5%9B%BE%E9%9B%86/loading-v.png)
#### 3.3 平行四边形渐变
![输入图片说明](demo%E5%9B%BE%E9%9B%86/%E5%B9%B3%E8%A1%8C%E5%9B%9B%E8%BE%B9%E5%BD%A2.png)
## 4.自定义组件
#### 4.1 自定义下拉框
![输入图片说明](demo%E5%9B%BE%E9%9B%86/%E4%B8%8B%E6%8B%89%E6%A1%86.gif)
![输入图片说明](demo%E5%9B%BE%E9%9B%86/%E4%B8%8B%E6%8B%89%E6%A1%862.gif)
#### 4.2 定义全局loading组件
![输入图片说明](demo%E5%9B%BE%E9%9B%86/vue-loading.gif)
#### 4.3 自定义日期组件-可选主题色
![输入图片说明](demo%E5%9B%BE%E9%9B%86/%E8%87%AA%E5%AE%9A%E4%B9%89%E6%97%A5%E6%9C%9F%E7%BB%84%E4%BB%B6.png)
#### 4.4 iview二次封装Page组件（设置默认的pageSize数组）
#### 4.5 iview二次封装Modal组件（是否可拖拽，按钮文字等）
#### 4.6 自定义指定v-drag
#### 4.7 iview二次封装Tree组件（前端搜索，搜索选中）
![输入图片说明](demo%E5%9B%BE%E9%9B%86/stree.gif)
## 5.事件优化
#### 5.1 节流+防抖
#### 5.2 lodash的使用
## 6.vue相关语法基础内容
#### 6.1 vue生命周期
![输入图片说明](demo%E5%9B%BE%E9%9B%86/%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F.png)
#### 6.2 .sync
![输入图片说明](demo%E5%9B%BE%E9%9B%86/sync.png)
#### 6.3 子组件与父组件生命周期执行顺序
![输入图片说明](demo%E5%9B%BE%E9%9B%86/%E7%88%B6%E5%AD%90%E7%BB%84%E4%BB%B6%E6%89%A7%E8%A1%8C%E9%A1%BA%E5%BA%8F.png)
#### 6.4 slot插槽的使用(具名插槽+默认插槽+作用域插槽)
![输入图片说明](demo%E5%9B%BE%E9%9B%86/slot%E6%8F%92%E6%A7%BD.png)
![输入图片说明](demo%E5%9B%BE%E9%9B%86/v-slot.png)
## 7.vue插件
#### 7.1 vuedraggable
![输入图片说明](demo%E5%9B%BE%E9%9B%86/vue-drag.gif)
#### 7.2 awe-dnd
![输入图片说明](https://gitee.com/susuhhhhhh/su-sus-vue/raw/master/demo%E5%9B%BE%E9%9B%86/awe-dnd.gif)
#### 7.3 富文本编辑器vue-quill-editor
![输入图片说明](demo%E5%9B%BE%E9%9B%86/vue-quill-editor.gif)
#### 7.4 pdf预览vue-pdf
![输入图片说明](demo%E5%9B%BE%E9%9B%86/vue-pdf.gif)
#### 7.5 Xsheet-在线表格预览
![输入图片说明](demo%E5%9B%BE%E9%9B%86/xsheet.png)
#### 7.6 Luckysheet-在线表格预览
![输入图片说明](demo%E5%9B%BE%E9%9B%86/lucksheet.png)
## 8.数据可视化
#### 8.1 data-V
![输入图片说明](demo%E5%9B%BE%E9%9B%86/data-v.png)
#### 8.2 echarts图表-折线图（路径动画)/立体柱状/饼图/关系图等
![输入图片说明](demo%E5%9B%BE%E9%9B%86/echarts1.gif)

## 9.饿了么ui篇章
#### 9.1 二次封装饿了么表单页面
![输入图片说明](demo%E5%9B%BE%E9%9B%86/%E8%A1%A8%E5%8D%952.png)
## 10.Jest
#### 10.1 Jest入门
![输入图片说明](demo%E5%9B%BE%E9%9B%86/jest%E5%85%A5%E9%97%A8.png)
## 11.地图
#### 11.1 高德地图
![输入图片说明](demo%E5%9B%BE%E9%9B%86/%E9%AB%98%E5%BE%B7map.png)
## 12.js+
#### 12.1 添加babel，配置链式（?.）/NULL(??)判断运算符
## 13.websocket
#### 13.1 websocket定义与基本使用

#### 参与贡献

1.  Fork 本仓库
2.  新建 Feat_xxx 分支
3.  提交代码
4.  新建 Pull Request



