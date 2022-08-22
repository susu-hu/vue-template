<template>
  <div class="contentBox">
    <List>
      <ListItem>
        <ListItemMeta
          :avatar="src"
          title="什么是生命周期"
          description="当前组件在创建到销毁经历的一系列过程，称之为生命周期."
        />
      </ListItem>
    </List>
    <Steps :current="0" direction="vertical">
      <Step title="父组件" content="beforeCreate"></Step>
      <Step title="父组件" content="created"></Step>
      <Step title="父组件" content="beforeMount"></Step>
      <Step title="子组件" content="beforeCreate"></Step>
      <Step title="子组件" content="created"></Step>
      <Step title="子组件" content="beforeMount"></Step>
      <Step title="子组件" content="mounted"></Step>
      <Step title="父组件" content="mounted"></Step>
    </Steps>
    <child :name.sync="name"></child>
    <button @click="change">改变</button>
  </div>
</template>
 
<script>
import child from "./components/child.vue";
export default {
  name: "father",
  components: {
    child,
  },
  data() {
    return {
      src: require("@/assets/img/susu.png"),
      name: "susuxoaoss",
    };
  },
  methods: {
    change() {
      this.name = "dass";
    },
  },
  beforeCreate: function () {
    //debugger;
    console.log("父组件的beforeCreate");
  },
  created: function () {
    //debugger;
    console.log("父组件的created");
  },
  beforeMount: function () {
    //debugger;
    console.log("父组件的beforeMount");
  },
  mounted: function () {
    //debugger;
    console.log("父组件的mounted");
  },
};
</script>
<style >
.ivu-steps-item.ivu-steps-status-process .ivu-steps-head-inner {
  border-color: pink;
  background-color: pink;
}
</style>
<style scoped>
.contentBox {
  padding: 20px;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 1px 6px rgb(0 0 0 / 20%);
}
</style>