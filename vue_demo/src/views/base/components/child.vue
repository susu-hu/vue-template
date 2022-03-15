<template>
  <div>
    <input :value="name" @input="getValue" type="text" />
  </div>
</template>
<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  methods: {
    getValue(e) {
      this.$emit("update:name", e.target.value);
    },
  },
  beforeCreate() {
    //debugger;
    console.log("子组件的beforeCreate");
  },
  created() {
    //debugger;
    console.log("子组件的created");
  },
  beforeMount() {
    //debugger;
    console.log("子组件的beforeMount");
  },
  mounted() {
    //debugger;
    console.log("子组件的mounted");
  },
};
</script>