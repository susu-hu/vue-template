<template>
  <Button type="primary" @click="debounce"><slot></slot></Button>
</template>

<script>
export default {
  name: "deBtn",
  props: {
    time: {
      type: Number,
      default: 400,
    },
  },
  data() {
    return {
      record: 0,
    };
  },
  methods: {
    debounce() {
      let newTime = new Date();
      if (newTime.getTime() - this.record > this.time) {
        this.$$emit("click");
      }
      this.record = new Date().getTime();
    },
  },
};
</script>

<style>
</style>