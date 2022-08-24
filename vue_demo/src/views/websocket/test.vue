<!--
 * @Author: 胡苏珍 1628469970@qq.com
 * @Date: 2022-08-22 11:41:36
 * @LastEditors: 胡苏珍 1628469970@qq.com
 * @LastEditTime: 2022-08-24 17:15:52
 * @FilePath: \vue_demo\src\views\websocket\test.vue
 * @Description: websocket测试连接
-->
<template>
  <div class="contentBox">
    <p>websocket测试连接</p>
    <div class="box">
      <div class="flex-row mb20">
        <Input type="text" placeholder="输入信息...." v-model="send" />
        <Button @click="sendMsg" class="ml20">发送</Button>
      </div>
      <div v-for="(item,index) in msgList" :key="index" class="mb20">
        <div>发送消息：{{item.send}}</div>
        <div>服务端返回消息：{{item.receive}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      send: "",
      msgList: [],
    };
  },
  mounted() {
    this.initWebSocket(); // 智能矿灯
  },
  methods: {
    initWebSocket() {
      this.ws = new WebSocket("ws://82.157.123.54:9010/ajaxchattest");
      this.ws.onmessage = this.wsetonmessage;
      this.ws.onopen = this.wsetonopen;
      this.ws.onerror = this.wsetonerror;
      this.ws.onclose = this.wsetclose;
    },
    wsetonopen() {},
    wsetonmessage(e) {
      console.log(e);
      const res = JSON.parse(e.data.split(" ")[0]);
      this.$nextTick(() => {
        this.msgList.forEach((item) => {
          if (item.times == res.times) this.$set(item, "receive", res.send);
        });
      });
    },
    wsetonerror() {},
    wsetclose() {},
    // 发送消息
    wsetSend(e) {
      console.log(e);
      this.ws.send(e ? JSON.stringify(e) : "");
      if (e) {
        this.msgList.push(e);
      }
    },
    sendMsg() {
      this.wsetSend({
        send: this.send,
        times: new Date().getTime(),
      });
    },
  },
};
</script>

<style scoped lang="less">
.box {
  border: 1px solid pink;
  border-radius: 10px;
  width: 100%;
  height: 600px;
  margin-top: 20px;
  padding: 20px;
}
.ml20 {
  margin-left: 20px;
}
</style>