<template>
  <div class="contentBox">
    <List>
      <ListItem>
        <ListItemMeta
          :avatar="src"
          title="vue提供了.sync修饰符是一种简写的方式"
          description="我们可以将其当作是一种语法糖,比如v-on: click可以简写为@click,sync修饰符，与我们平常使用$emit实现父子组件通信没有区别，只不过是写法上方便一些"
        />
      </ListItem>
      <ListItem>
        <ListItemMeta
          :avatar="src"
          title="父子组件双向绑定的问题，但是考虑到组件的可维护性，vue中是不允许子组件改变父组件传的props值的"
          description="vue中也提供了一种解决方案.sync修饰符"
        />
      </ListItem>
      <ListItem>
        <ListItemMeta
          :avatar="src"
          title="子组件使用$emit向父组件发送事件"
          description="this.$emit('update:title', newTitle)"
        />
      </ListItem>
      <ListItem>
        <ListItemMeta
          :avatar="src"
          title="父组件监听这个事件并更新一个本地的数据title"
          description=" :title.sync"
        />
      </ListItem>
    </List>
    <myComponent
      :show.sync="valueChild"
      style="
        padding: 30px 20px 30px 5px;
        border: 1px solid #ddd;
        margin-bottom: 10px;
      "
    ></myComponent>
    <button @click="changeValue">父组件关闭弹框</button>
  </div>
</template>
<script>
import Vue from "vue";
Vue.component("myComponent", {
  template: `<div v-if="show"><p>默认初始值是{{show}}，所以是显示的</p><button @click.stop="closeDiv">关闭</button> </div>`,
  props: ["show"],
  methods: {
    closeDiv() {
      this.$emit("update:show", false); //触发 input 事件，并传入新值
    },
  },
});
export default {
  data() {
    return {
      src: require("@/assets/img/susu.png"),
      valueChild: true,
    };
  },
  methods: {
    changeValue() {
      this.valueChild = !this.valueChild;
    },
  },
};
</script>