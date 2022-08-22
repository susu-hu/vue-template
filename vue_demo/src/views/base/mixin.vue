<template>
  <div class="contentBox">
    <List>
      <ListItem>
        <ListItemMeta
          :avatar="src"
          title="什么是Mixin"
          description="混入 (mixin) 提供了一种非常灵活的方式，来分发 Vue 组件中的可复用功能。一
          个混入对象可以包含任意组件选项。当组件使用混入对象时，所有混入对象的选项将被“混合”进入该组件本身的选项。"
        />
      </ListItem>
      <ListItem>
        <ListItemMeta
          :avatar="src"
          title="特点"
          description="1.生命周期属性，会优先执行来自 Mixins 当中的，后执行来自组件当中的
          2.对象类型属性，来自 Mixins 和来自组件中的会共存。3.
          小程序中的自定义方法，优先级为 Page > Mixins，即 Page 中的自定义方法会覆盖 Mixins 当中的"
        />
        
      </ListItem>
    </List>
  </div>
</template>

<script>
import { myMixin } from "@/mixin/mixins.js";
export default {
  mixins: [myMixin], //混入  相当把 混入对象的 属性 都 写在了当前 组件里。
  data() {
    return {
      src: require("@/assets/img/susu.png"),
      o_data: "苏苏来了",
    };
  },
  methods: {},
  created() {
    console.log("这是父组件"); //先执行父组件
    console.log(this.$data); //还包括了混入对象的mixdata
  },
  mounted() {
    this.hello("这是一个混入的案例"); //在执行---混入对象方法---调用混入对象中methods中的方法
  },
};
</script>

<style>
</style>