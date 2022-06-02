# 苏苏的vue
![输入图片说明](https://img.shields.io/badge/vue-2.6.11-red)
![输入图片说明](https://img.shields.io/badge/iview-3.5.4-orange)
![输入图片说明](https://img.shields.io/badge/element--ui-2.15.6-brightgreen)
![输入图片说明](https://img.shields.io/badge/vuex-3.6.2-red)
![输入图片说明](https://img.shields.io/badge/less--loader-4.1.0-red)
![输入图片说明](https://img.shields.io/badge/node--sass-4.14.1-red)

|  插件   | 版本  |介绍|
|  ----  | ----  |----  |
| vuedraggable  | 2.24.3 |vuedraggable 是标准的组件式封装，并且将可拖动元素放进了 transition-group 上面，过渡动画都比较好|
| awe-dnd  | 0.3.4 |封装了 v-dragging 全局指令，然后通过全局指令去数据绑定等。相比及 vuedraggable 来说， awe-dnd 是没有双向绑定（这里没有双向绑定并不是很严谨，准确的来说没有暴露双向绑定的方式），因此提供了事件，在拖拽结束的时候用来更新列表（不需要手动更新列表，其实内部是实现了双向绑定的）或者是去触发父组件监听的事件|
| vue-quill-editor  | 3.0.6 |基于 Quill,适用于Vue的富文本编辑器,支持服务端渲染和单页应用，兼容IE10+|
| Jest  | 27.5.1 |Jest是 Facebook 的一套开源的 JavaScript 测试框架， 它自动集成了断言、JSDom、覆盖率报告等开发者所需要的所有测试工具，是一款几乎零配置的测试框架。并且它对同样是 Facebook 的开源前端框架 React 的测试十分友好。|
| dplayer| 1.26.0 | 视频播放组件：http://dplayer.js.org/|

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
![输入图片说明](demo%E5%9B%BE%E9%9B%86/%E4%B8%8B%E6%8B%89%E6%A1%86-vue.gif)
#### 4.2 定义全局loading组件
![输入图片说明](demo%E5%9B%BE%E9%9B%86/vue-loading.gif)
#### 4.3 自定义日期组件-可选主题色
![输入图片说明](demo%E5%9B%BE%E9%9B%86/%E8%87%AA%E5%AE%9A%E4%B9%89%E6%97%A5%E6%9C%9F%E7%BB%84%E4%BB%B6.png)
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


#### 参与贡献

1.  Fork 本仓库
2.  新建 Feat_xxx 分支
3.  提交代码
4.  新建 Pull Request


#### 特技

1.  使用 Readme\_XXX.md 来支持不同的语言，例如 Readme\_en.md, Readme\_zh.md
2.  Gitee 官方博客 [blog.gitee.com](https://blog.gitee.com)
3.  你可以 [https://gitee.com/explore](https://gitee.com/explore) 这个地址来了解 Gitee 上的优秀开源项目
4.  [GVP](https://gitee.com/gvp) 全称是 Gitee 最有价值开源项目，是综合评定出的优秀开源项目
5.  Gitee 官方提供的使用手册 [https://gitee.com/help](https://gitee.com/help)
6.  Gitee 封面人物是一档用来展示 Gitee 会员风采的栏目 [https://gitee.com/gitee-stars/](https://gitee.com/gitee-stars/)
