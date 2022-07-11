<!--
 * @Author: susu 1628469970@qq.com
 * @Date: 2022-07-08 16:25:20
 * @LastEditors: susu 1628469970@qq.com
 * @LastEditTime: 2022-07-11 09:39:35
 * @FilePath: \vue_demo\src\views\custom\searchTree.vue
 * @Description: 基于iview的tree进行的二次封装，包括搜索关键字，搜索选中
-->
<template>
  <div class="contentBox">
    <s-tree :treeList.sync="list" :originList="originList" class="stree" @on-check-change="change"></s-tree>
  </div>
</template>

<script>
import sTree from "./components/stree.vue";
export default {
  nqme: "searchTree",
  components: {
    sTree,
  },
  data() {
    return {
      list: [],
      originList: "",
    };
  },
  created() {
    this.getTreeData();
  },
  methods: {
    change(s, cur, e1, e2, e3) {
      console.log("子节点勾选中", e1);
      console.log("勾选中的所有数据", e2);
      console.log("获取选中及半选节点ID", e3);
    },
    //   获取树列表
    async getTreeData() {
      const { data, code } = await this.$api.getTreeData("getTreeDataTwo");
      if (code == 200) {
        this.list = this.initData([data], 0);
        this.originList = JSON.stringify(this.initData([data], 0));
      }
    },
    // 树列表格式化
    initData(data, e) {
      data.forEach((item) => {
        item.title = item.name;
        item.checked = false;
        item.expand = e == 0;
        if (item.children && item.children.length) {
          this.initData(item.children, 1);
        }
      });
      return data;
    },
  },
};
</script>

<style lang="less" scoped>
.stree {
  width: 500px;
}
</style>