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
    // eslint-disable-next-line no-debugger
    debugger;
    console.log("子组件的beforeCreate");
  },
  created() {
    // eslint-disable-next-line no-debugger
    debugger;
    console.log("子组件的created");
  },
  beforeMount() {
    // eslint-disable-next-line no-debugger
    debugger;
    console.log("子组件的beforeMount");
  },
  mounted() {
    // eslint-disable-next-line no-debugger
    debugger;
    console.log("子组件的mounted");
  },
};
</script>