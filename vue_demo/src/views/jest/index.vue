<template>
  <div class="contentBox">
    <div>a+b={{ c }}</div>
    <div>a-b={{ d }}</div>
    <div>Jest 框架介绍</div>
    <div>
      Jest 是用来创建、执行和构建测试用例的一个 JavaScript
      测试库。你可以在任何项目中以 npm 包的形式，安装并使用它。Jest
      是当前最受欢迎的测试执行器，并且是在创建 React App 时的默认选项。 性能好
      、功能齐全、 易用性很好、 速度快（可以自动监测修改过的代码，不会重复测试）
      、API 简单、数量少 、易配置、 隔离性好 、监控模式、 IDE 整合（比如vs
      code） 、Snapshot（快照测试）、 多项目并行 覆盖率、 Mock 丰富
      、对新技术支持度好.
    </div>
    <div>
      安装 ：
      <pre>npm install jest -D（注：-D 是 --save -dev 的缩写）</pre>
    </div>
    <div>
      <pre>npx jest --init 命令来 初始化默认配置</pre>
    </div>
    <div>
      <pre>npx jest --coverage 命令来 代码测试覆盖率</pre>
    </div>
    <div>package.json配置,使用npm run coverage 查看 代码测试覆盖率</div>
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
        font-family: Optima-Regular, Optima, PingFangSC-light, PingFangTC-light,
          'PingFang SC', Cambria, Cochin, Georgia, Times, 'Times New Roman',
          serif;
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
      ><span style="display: block; background: url(https://files.mdnice.com/user/3441/876cad08-0422-409d-bb5a-08afec5da8ee.svg); height: 30px; width: 100%; background-size: 40px; background-repeat: no-repeat; background-color: #282c34; margin-bottom: -7px; border-radius: 5px; background-position: 10px 10px;"></span><code class="hljs" style="overflow-x: auto; padding: 16px; color: #abb2bf; display: -webkit-box; font-family: Operator Mono, Consolas, Monaco, Menlo, monospace; font-size: 12px; -webkit-overflow-scrolling: touch; padding-top: 15px; background: #282c34; border-radius: 5px;"><span class="hljs-string" style="color: #98c379; line-height: 26px;">"scripts"</span>:&nbsp;{<br>&nbsp;&nbsp;<span class="hljs-string" style="color: #98c379; line-height: 26px;">"test"</span>:&nbsp;<span class="hljs-string" style="color: #98c379; line-height: 26px;">"jest"</span>,<br>&nbsp;&nbsp;<span class="hljs-string" style="color: #98c379; line-height: 26px;">"coverage"</span>:&nbsp;<span class="hljs-string" style="color: #98c379; line-height: 26px;">"jest&nbsp;--coverage"</span><br>},<br></code></pre>
    </section>
    <div>生成coverage文件夹---lcov-report文件夹-----index.html</div>
    <div>总结来说：测试覆盖率就是我们编写的测试代码对原来的功能代码的占比</div>
    <!-- 输入 —— 预期输出 —— 验证结果 -->
  </div>
</template>

<script>
// const math = require("../../utils/math");
import math from "../../utils/math";
export default {
  data() {
    return {
      c: 0,
      d: 0,
    };
  },
  mounted() {},
  created() {
    let a = 10,
      b = 30;
    this.c = math.add(a, b);
    this.d = math.minus(a, b);
    console.assert(a === 1, "a 的值不是3！");
  },
  methods: {},
};
</script>

<style scoped>
.contentBox {
  font-size: 17px;
  line-height: 30px;
}
</style>