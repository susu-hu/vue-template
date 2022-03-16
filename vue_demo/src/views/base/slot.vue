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
          title="什么是默认插槽"
          description=" 木有name的就是默认插槽，捕获所有未被匹配的内容"
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
      <ListItem>
        <ListItemMeta
          :avatar="src"
          title="什么是解构插槽 Prop"
          description="作用域插槽的内部工作原理是将你的插槽内容包裹在一个拥有单个参数的函数里，可以使用 ES2015 解构来传入具体的插槽 prop"
        />
      </ListItem>
    </List>
    <test1 style="margin: 20px"></test1>
    <test1 style="margin: 20px">eg：插槽的使用</test1>
    <test1 style="margin: 20px"
      >eg：具名插槽的使用 <template slot="name">苏苏小苏苏111</template
      ><template slot="age">18岁</template></test1
    >
    <test1 style="margin: 20px"
      >eg：作用域插槽使用
      <template slot="name" slot-scope="play">Suunto{{ play }}</template></test1
    >
    <test1 style="margin: 20px"
      >eg：作用域插槽使用
      <template slot="name" slot-scope="{ play }"
        >Suunto{{ play }}</template
      ></test1
    >
    <div style="margin: 20px; font-weight: bold; font-size: 25px">
      作用域插槽使用
    </div>
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
    <div style="margin: 20px; font-weight: bold; font-size: 25px">
      v-slot的使用
    </div>
    <div style="margin: 20px; font-weight: bold; font-size: 20px">
      注意 v-slot 只能添加在 template 上
      (或者独占默认插槽的缩写语法)，这一点和已经废弃的 slot attribute 不同。
    </div>
    <test1 style="margin: 20px">
      <template v-slot:name>这是v-slot使用的具名插槽</template></test1
    >
    <test1 style="margin: 20px">
      <template v-slot:default="{ play }"
        >这是v-slot使用的作用域插槽 {{ play }}</template
      ></test1
    >
    <test1 style="margin: 20px" v-slot:default="{ play }">
      独占默认插槽的缩写语法：当被提供的内容只有默认插槽时，组件的标签才可以被当作插槽的模板来使用------{{
        play
      }}
    </test1>
    <test1 style="margin: 20px" v-slot="{ play }">
      独占默认插槽的缩写语法：不带参数的 v-slot 被假定对应默认插槽 -------{{
        play
      }}
    </test1>
    <div style="margin: 20px; font-weight: bold; font-size: 20px">
      注意默认插槽的缩写语法不能和具名插槽混用，因为它会导致作用域不明确，只要出现多个插槽，请始终为所有的插槽使用完整的基于
      template 的语法
    </div>
    <div style="margin: 20px; font-weight: bold; font-size: 20px">
      解构插槽 Prop
    </div>
    <test2 :lists="list" style="margin: 20px">
      <template v-slot="{ item }"> 解构： {{ item }} </template>
    </test2>
    <test2 :lists="list" style="margin: 20px">
      <template v-slot="{ item: user }"> 重命名： {{ user.name }} </template>
    </test2>
    <test2 :lists="list" style="margin: 20px">
      <template v-slot="{ item = { name: '2332' } }">
        定义后备内容，用于插槽 prop 是 undefined 的情形： {{ item.name }}
      </template>
    </test2>
    <div style="margin: 20px; font-weight: bold; font-size: 20px">
      动态插槽名
    </div>
    <test1 style="margin: 20px">
      <template v-slot:[dynamicSlotName]> 动态插槽名--sss </template>
    </test1>
    <div style="margin: 20px; font-weight: bold; font-size: 20px">
      具名插槽的缩写,跟 v-on 和 v-bind 一样，v-slot
      也有缩写，即把参数之前的所有内容 (v-slot:) 替换为字符 #。例如
      v-slot:header 可以被重写为
      #header,然而，和其它指令一样，该缩写只在其有参数的时候才可用，你希望使用缩写的话，你必须始终以明确插槽名取而代之，以#default=开始
    </div>
  </div>
</template>

<script>
// 在 2.6.0 中，我们为具名插槽和作用域插槽引入了一个新的统一的语法 (即 v-slot 指令)。它取代了 slot 和 slot-scope 这两个目前已被废弃但未被移除且仍在文档中的 attribute
import Vue from "vue";
Vue.component("test1", {
  template: `<div>
    Hello,苏苏!
    <slot name="name" play="玩游戏"></slot>
    ---这是米----
    <slot name="age"></slot>
    <slot play="玩耍">这是默认的slot</slot>
    <slot say="说哈">这是默认的slot</slot>
   </div>`,
});

// 绑定在 <slot> 元素上的 attribute 被称为插槽 prop
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
      dynamicSlotName: "name",
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