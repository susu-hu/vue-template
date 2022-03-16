<template>
  <div>
    <div class="contentBox">
      <List>
        <ListItem>
          <ListItemMeta :avatar="src" title="" description="" />
        </ListItem>
        <ListItem>
          <ListItemMeta :avatar="src" title="" description="" />
        </ListItem>
        <ListItem>
          <ListItemMeta :avatar="src" title="" description="" />
        </ListItem>
        <ListItem>
          <ListItemMeta :avatar="src" title=" " description="  " />
        </ListItem>
      </List>
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
          font-family: Roboto, Oxygen, Ubuntu, Cantarell, PingFangSC-light,
            PingFangTC-light, 'Open Sans', 'Helvetica Neue', sans-serif;
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
        ><code class="hljs" style="overflow-x: auto; padding: 16px; color: #abb2bf; display: -webkit-box; font-family: Operator Mono, Consolas, Monaco, Menlo, monospace; font-size: 12px; -webkit-overflow-scrolling: touch; padding-top: 15px; background: #282c34; border-radius: 5px;"><span class="hljs-keyword" style="color: #c678dd; line-height: 26px;">for</span>&nbsp;(var&nbsp;i&nbsp;=&nbsp;0;&nbsp;i&nbsp;&lt;&nbsp;5;&nbsp;i++)&nbsp;{<br>&nbsp;&nbsp;setTimeout((<span class="hljs-keyword" style="color: #c678dd; line-height: 26px;">function</span>(i)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;console.log(i);<br>&nbsp;&nbsp;})(i),&nbsp;i&nbsp;*&nbsp;1000);<br>}<br></code></pre>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      src: require("@/assets/img/susu.jpg"),
    };
  },
  created() {
    setTimeout(() => {
      console.log("settime 西哈哈哈");
    }, 0);
    console.log("嘻嘻嘻哈哈哈");
    for (var i = 0; i < 5; i++) {
      setTimeout(
        (function (i) {
          console.log(i);
        })(i),
        i * 1000
      );
    }
  },
  methods: {
    sleep(milliSeconds) {
      var startTime = new Date().getTime();
      while (new Date().getTime() < startTime + milliSeconds);
    },
  },
};
</script>

<style>
</style>