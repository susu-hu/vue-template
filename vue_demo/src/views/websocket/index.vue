<!--
 * @Author: susu 1628469970@qq.com
 * @Date: 2022-05-27 23:36:42
 * @LastEditors: susu 1628469970@qq.com
 * @LastEditTime: 2022-08-18 22:19:59
 * @FilePath: \vue_demo\src\views\websocket\index.vue
 * @Description: websocket
-->
<template>
  <div class="contentBox">
    <List>
      <ListItem>
        <ListItemMeta
          title="定义:"
          description="WebSocket是一种在单个TCP连接上进行全双工通信的协议。WebSocket通信协议于2011年被IETF定为标准RFC 6455，并由RFC7936补充规范。WebSocket API也被W3C定为标准。."
        />
      </ListItem>
      <ListItem>
        <ListItemMeta
          title="作用:"
          description="WebSocket使得客户端和服务器之间的数据交换变得更加简单，允许服务端主动向客户端推送数据。在WebSocket API中，浏览器和服务器只需要完成一次握手，两者之间就直接可以创建持久性的连接，并进行双向数据传输。"
        />
      </ListItem>
    </List>
    <div class="t_name">WebSocket 触发事件:</div>
    <Collapse v-model="item">
      <Panel name="1">
        open
        <p slot="content">Socket.onopen:连接建立时触发</p>
      </Panel>
      <Panel name="2">
        message
        <p slot="content">Socket.onmessage:客户端接收服务端数据时触发</p>
      </Panel>
      <Panel name="3">
        error
        <p slot="content">Socket.onerror:通信发生错误时触发</p>
      </Panel>
      <Panel name="4">
        close
        <p slot="content">Socket.onclose:连接关闭时触发</p>
      </Panel>
    </Collapse>
    <div class="t_name">WebSocket 方法:</div>
    <Collapse v-model="item">
      <Panel name="1">
        Socket.send()
        <p slot="content">使用连接发送数据</p>
      </Panel>
      <Panel name="2">
        Socket.close()
        <p slot="content">关闭连接</p>
      </Panel>
    </Collapse>
    <div class="t_name">WebSocket 在线测试网站:</div>
    <Collapse v-model="item">
      <Panel name="1">
        <a href="http://www.wetools.com/websocket/" target="_blank"
          >http://www.wetools.com/websocket/
        </a></Panel
      >
      <Panel name="2">
        <a href="http://coolaf.com/sfds/tool/chattest" target="_blank"
          >http://coolaf.com/sfds/tool/chattest
        </a></Panel
      >
      <Panel name="3">
        ws或wss地址的地址格式为：
        ws://IP/域名:端口（例如：ws://192.168.1.9:9898）</Panel
      >
      <Panel name="24"> websocket在线测试工具同样适用于内网的环境的测试</Panel>
    </Collapse>
  </div>
</template>

<script>
export default {
  data() {
    return {
      item: [1, 2, 3, 4],
    };
  },
};
</script>

<style scoped>
.contentBox {
  padding: 20px;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 1px 6px rgb(0 0 0 / 20%);
}
.t_name {
  font-size: 20px;
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
<!-- a标签target属性
_Blank	打开新的标签页
_Self	自身窗口
_Parent	产生该页面的父级页面
_Top	产生该页面的祖级页面
 -->
