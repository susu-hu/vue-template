<template>
  <div>
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
      name: "susuxoaoss",
    };
  },
  methods: {
    change() {
      this.name = "dass";
    },
  },
  beforeCreate: function () {
    // eslint-disable-next-line no-debugger
    debugger;
    console.log("父组件的beforeCreate");
  },
  created: function () {
    // eslint-disable-next-line no-debugger
    debugger;
    console.log("父组件的created");
  },
  beforeMount: function () {
    // eslint-disable-next-line no-debugger
    debugger;
    console.log("父组件的beforeMount");
  },
  mounted: function () {
    // eslint-disable-next-line no-debugger
    debugger;
    console.log("父组件的mounted");
  },
};
</script>