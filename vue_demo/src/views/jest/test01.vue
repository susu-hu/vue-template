<template>
  <div class="contentBox">
    <p class="msg">{{ msg }}</p>
    <h1 class="number">{{ count }}</h1>
    <Button type="primary" class="addCount" @click="addCount">ADD</Button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "测试苏苏",
      count: 10,
    };
  },
  methods: {
    addCount() {
      this.count++;
    },
  },
};
</script>
<style scoped>
.contentBox {
  line-height: 30px;
}
</style>