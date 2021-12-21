<template>
  <div class="content">
    <div class="i_box"></div>
    <div><a v-access="'m.add'">新增</a></div>
    <a v-access="'m.del'">删除</a>

    <div><a v-if="hasPermission('add')">新增</a></div>
    <a>删除</a>
    <div>
      <i-switch
        :disabled="!hasPermission('aaa')"
        :value="status == 1"
        @on-change="(v) => stateChange(v)"
        size="small"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      status: 1,
    };
  },
  methods: {
    stateChange() {},
  },
};
</script>

<style lang="less" scoped>
// .content {

// }
</style>
