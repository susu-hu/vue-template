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
      <ListItem>
        <ListItemMeta
          :avatar="src"
          title="生命周期的分为几个阶段？每个阶段有哪些钩子函数？"
          description="生命周期分为3个阶段，这三个阶段分别是： 初始化 、 运行中 、 销毁"
        />
      </ListItem>
    </List>
    <div class="t_name">初始化阶段：</div>
    <Collapse v-model="item">
      <Panel name="1">
        beforeCreate
        <p slot="content">
          1.组件即将创建，进行组件事件和生命周期的初始化 2.项目中一般不使用
          3.有的开发者也会在这里进行数据请求
        </p>
      </Panel>
      <Panel name="2">
        created
        <p slot="content">
          1.在模板渲染成html前调用，即通常初始化某些属性值，然后再渲染成视图 2.
          异步请求接口数据3.在created的时候，视图中的html并没有渲染出来，所以此时如果直接去操作html的dom节点，一定找不到相关的元素
          而在mounted中，由于此时html已经渲染出来了，所以可以直接操作dom节点
        </p>
      </Panel>
      <Panel name="3">
        beforeMount
        <p slot="content">
          1.组件即将挂载
          判断根实例组件是否有el选项，如果没有，那么手动挂载，判断根实例组件中的其他子组件是否有template选项，如果没有，那么使用outerHTML插入
        </p>
      </Panel>
      <Panel name="4">
        mounted
        <p slot="content">
          1.在模板渲染成html后调用，通常是初始化页面完成后，再对html的dom节点进行一些需要的操作组件挂载结束
          2.使用真实DOM替换VDOM 项目中 3.异步请求接口数据 真实DOM操作可以了(
          Vue一般情况下不要直接操作真实DOM,
          一般可以进行第三方库的实例化（静态数据渲染来的） )
        </p>
      </Panel>
    </Collapse>
    <div class="t_name">运行中阶段：data选项中的数据发生改变时</div>
    <Collapse v-model="item">
      <Panel name="1">
        beforeUpdate
        <p slot="content">内部操作 ： vdom生成和diff的对比</p>
      </Panel>
      <Panel name="2">
        updated
        <p slot="content">
          Rdom已经生成，可以进行异步数据请求得到的dom渲染的第三方库实例化
        </p>
      </Panel>
    </Collapse>
    <div class="t_name">销毁阶段：</div>
    <Collapse v-model="item">
      <Panel name="1">
        beforeDestory
        <p slot="content">
          组件即将销毁，准备调用 $destroy()
          方法,可以用来做善后,把一些计时器，第三方库实例化出来的实例
        </p>
      </Panel>
      <Panel name="2">
        destoryed
        <p slot="content">
          组件销毁结束,可以用来做善后,把一些计时器，第三方库实例化出来的实例
        </p>
      </Panel>
    </Collapse>
  </div>
</template>

<script>
export default {
  data() {
    return {
      src: require("@/assets/img/susu.jpg"),
      item: [1, 2, 3, 4],
      message: "susu",
    };
  },
  created() {
    console.log("created", this.$refs.test);
    console.group("created 创建完毕状态===============》");
    console.log("%c%s", "color:red", "el     : " + this.$el); //undefined
    console.log("%c%s", "color:red", "data   : " + this.$data); //已被初始化
    console.log("%c%s", "color:red", "message: " + this.message); //已被初始化
  },
  beforeCreate() {
    console.group("beforeCreate 创建前状态===============》");
    console.log("%c%s", "color:red", "el     : " + this.$el); //undefined
    console.log("%c%s", "color:red", "data   : " + this.$data); //undefined
    console.log("%c%s", "color:red", "message: " + this.message);
  },
  beforeMount: function () {
    console.group("beforeMount 挂载前状态===============》");
    console.log("%c%s", "color:red", "el     : " + this.$el); //已被初始化
    console.log(this.$el);
    console.log("%c%s", "color:red", "data   : " + this.$data); //已被初始化
    console.log("%c%s", "color:red", "message: " + this.message); //已被初始化
  },
  mounted: function () {
    console.log("mounted", this.$refs.test);
    console.group("mounted 挂载结束状态===============》");
    console.log("%c%s", "color:red", "el     : " + this.$el); //已被初始化
    console.log(this.$el);
    console.log("%c%s", "color:red", "data   : " + this.$data); //已被初始化
    console.log("%c%s", "color:red", "message: " + this.message); //已被初始化
  },
  beforeUpdate: function () {
    console.group("beforeUpdate 更新前状态===============》");
    console.log("%c%s", "color:red", "el     : " + this.$el);
    console.log(this.$el);
    console.log("%c%s", "color:red", "data   : " + this.$data);
    console.log("%c%s", "color:red", "message: " + this.message);
  },
  updated: function () {
    console.group("updated 更新完成状态===============》");
    console.log("%c%s", "color:red", "el     : " + this.$el);
    console.log(this.$el);
    console.log("%c%s", "color:red", "data   : " + this.$data);
    console.log("%c%s", "color:red", "message: " + this.message);
  },
  beforeDestroy: function () {
    console.group("beforeDestroy 销毁前状态===============》");
    console.log("%c%s", "color:red", "el     : " + this.$el);
    console.log(this.$el);
    console.log("%c%s", "color:red", "data   : " + this.$data);
    console.log("%c%s", "color:red", "message: " + this.message);
  },
  destroyed: function () {
    console.group("destroyed 销毁完成状态===============》");
    console.log("%c%s", "color:red", "el     : " + this.$el);
    console.log(this.$el);
    console.log("%c%s", "color:red", "data   : " + this.$data);
    console.log("%c%s", "color:red", "message: " + this.message);
  },
  methods: {},
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