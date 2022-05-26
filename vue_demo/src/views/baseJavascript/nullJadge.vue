<!--
 * @Author: 胡苏珍 1628469970@qq.com
 * @Date: 2022-05-26 11:04:24
 * @LastEditors: 胡苏珍 1628469970@qq.com
 * @LastEditTime: 2022-05-26 11:56:25
 * @FilePath: \vue_demo\src\views\baseJavascript\es6.vue
 * @Description: es6语法
-->
<template>
  <div class="contentBox">
    <div class="module">
      <p class="title">链式判断</p>
      <p>
        意义：当访问一个对象不存在某个属性的时候，会报错，所以需要去判断这个对象自身是否存在。
      </p>
      <p>obj.link.has.name:{{ obj?.link?.has?.name || "" }}</p>
      {{ aa ?? "susu" }}
      <section
        id="nice"
        data-tool="mdnice编辑器"
        data-website="https://www.mdnice.com"
        style="
          font-size: 16px;
          color: black;
          padding: 0 10px;
          line-height: 1.6;
          word-spacing: 0px;
          letter-spacing: 0px;
          word-break: break-word;
          word-wrap: break-word;
          text-align: left;
          font-family: Optima-Regular, Optima, PingFangSC-light,
            PingFangTC-light, 'PingFang SC', Cambria, Cochin, Georgia, Times,
            'Times New Roman', serif;
        "
      >
        <pre
          class="custom"
          data-tool="mdnice编辑器"
          style="
            margin-top: 10px;
            margin-bottom: 10px;
            border-radius: 5px;
            box-shadow: rgba(0, 0, 0, 0.55) 0px 2px 10px;
          "
        ><span style="display: block; background: url(https://files.mdnice.com/user/3441/876cad08-0422-409d-bb5a-08afec5da8ee.svg); height: 30px; width: 100%; background-size: 40px; background-repeat: no-repeat; background-color: #282c34; margin-bottom: -7px; border-radius: 5px; background-position: 10px 10px;"></span><code class="hljs" style="overflow-x: auto; padding: 16px; color: #abb2bf; display: -webkit-box; font-family: Operator Mono, Consolas, Monaco, Menlo, monospace; font-size: 12px; -webkit-overflow-scrolling: touch; padding-top: 15px; background: #282c34; border-radius: 5px;">某对象：<br>obj:&nbsp;{<br>&nbsp;&nbsp;link:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;has:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;name:&nbsp;<span class="hljs-string" style="color: #98c379; line-height: 26px;">"susu"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;},<br>&nbsp;&nbsp;},<br>},<br><br>普通判断：<br>obj&nbsp;&amp;&amp;&nbsp;obj.link&nbsp;&amp;&amp;&nbsp;obj.link.has&nbsp;&amp;&amp;&nbsp;obj.link.has.name&nbsp;?&nbsp;obj.link.has.nam&nbsp;:<span class="hljs-string" style="color: #98c379; line-height: 26px;">""</span><br>obj&nbsp;&amp;&amp;&nbsp;obj.link&nbsp;&amp;&amp;&nbsp;obj.link.has&nbsp;&amp;&amp;&nbsp;obj.link.has.name&nbsp;||&nbsp;:<span class="hljs-string" style="color: #98c379; line-height: 26px;">""</span><br><br>链式判断：<br>obj?.link?.has?.name&nbsp;||&nbsp;<span class="hljs-string" style="color: #98c379; line-height: 26px;">''</span><br></code></pre>
      </section>
      <p>在vue项目中使用,需要安装babel依赖,并添加到babel.config.js</p>
    </div>
  </div>
</template>

<script>
// //NULL判断运算符 ??
// npm install @babel/plugin-proposal-nullish-coalescing-operator --save-dev
//链判断运算符  ?.
// npm install @babel/plugin-proposal-optional-chaining --save-dev
export default {
  name: "nullJadge",
  data() {
    return {
      obj: {
        link: {
          has: {
            name: "susu",
          },
        },
      },
      test: {
        ...obj,
      },
    };
  },
};
</script>

<style scoped lang="less">
.module {
  font-size: 18px;
  margin-bottom: 20px;
  padding: 20px;
  line-height: 30px;
  .title {
    font-size: 20px;
    margin-bottom: 20px;
  }
}
</style>