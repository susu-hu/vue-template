<template>
  <div class="contentBox">
    <List>
      <ListItem>
        <ListItemMeta
          :avatar="src"
          title="什么是插槽"
          description="插槽就是Vue实现的一套内容分发的API，将<slot></slot>元素作为承载分发内容的出口,没有插槽的情况下在组件标签内些一些内容是不起任何作用"
        />
      </ListItem>
      <ListItem>
        <ListItemMeta
          :avatar="src"
          title="什么是具名插槽"
          description="具名插槽，就是给这个插槽起个名字，如起名一个为name，一个为age，一个不命名"
        />
      </ListItem>
      <ListItem>
        <ListItemMeta
          :avatar="src"
          title="什么是作用域插槽"
          description="组件上的属性，可以在组件元素内使用，如为slot定义一个play属性，使用组件时候添加属性slot-scope"
        />
      </ListItem>
    </List>
    <test1 style="margin: 20px">eg：插槽的使用</test1>
    <test1 style="margin: 20px"
      >eg：具名插槽的使用 <template slot="name">苏苏小苏苏111</template
      ><template slot="age">18岁</template></test1
    >
    <test1 style="margin: 20px"
      >eg：作用域插槽使用
      <template slot="name" slot-scope="play"
        >Suunto{{ play }}</template
      ></test1
    >
    <test1 style="margin: 20px"
      >eg：作用域插槽使用
      <template slot="name" slot-scope="{ play }"
        >Suunto{{ play }}</template
      ></test1
    >
    <div style="margin: 20px">作用域插槽使用</div>
    <test2 :lists="list" style="margin: 20px">
      <template slot-scope="item">
        {{ item }}
      </template>
    </test2>
    <test2 :lists="list" style="margin: 20px">
      <template slot-scope="{ item }">
        {{ item.name }}
      </template>
    </test2>
    <test2 :lists="list" style="margin: 20px">
      <template slot-scope="{ item }">
        <div v-if="item.name == '苏苏1'">数据1</div>
        <div v-else>其他数据</div>
      </template>
    </test2>
  </div>
</template>

<script>
import Vue from "vue";
Vue.component("test1", {
  template: `<div>
    Hello,苏苏!
    <slot name="name" play="玩游戏"></slot>
    <slot name="age"></slot>
    <slot></slot>
   </div>`,
});
Vue.component("test2", {
  props: ["lists"],
  template: `
            <div>
                <ul>
                    <li v-for="item in lists">
                        <slot :item="item"></slot>
                    </li>
                </ul>
            </div>
        `,
});
export default {
  data() {
    return {
      src: require("@/assets/img/susu.jpg"),
      list: [
        {
          name: "苏苏1",
        },
        {
          name: "苏苏2",
        },
        {
          name: "苏苏3",
        },
        {
          name: "苏苏4",
        },
      ],
    };
  },
};
</script>

<style>
</style>