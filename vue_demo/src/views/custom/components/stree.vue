
<template>
  <div>
    <div>
      <div class="flex mb10">
        <Input placeholder="请输入" v-model="filterText" clearable class="mr20" />
        <Button type="primary" class="box-content-btn" @click="searchOneTree()">查询</Button>
      </div>
      <Tree ref="sTree" :data="list" multiple :show-checkbox="true" @on-check-change="checkChange"></Tree>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "stree",
  props: {
    treeList: {
      type: Array,
      default: () => [],
    },
    originList: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      list: [],
      checkedList: [], //已勾选数据的ID
      filterText: "",
    };
  },
  watch: {
    treeList: {
      deep: true,
      handler: function (val) {
        this.list = val;
      },
    },
  },

  methods: {
    /**
     * 搜索
     */
    searchOneTree() {
      if (!this.filterText) {
        this.list = JSON.parse(this.originList);
      } else {
        this.list = this.tools.searchTree(
          "name",
          "id",
          this.filterText,
          JSON.parse(this.originList)
        );
      }
      this.list = this.tools.getCheckedTree("id", this.list, this.checkedList);
      this.$emit("update:treeList", this.list);
    },
    /**
     * 勾选树
     */
    checkChange(s, curr) {
      let unCheckedIdList = this.tools.getUnCheckedList(
        [curr],
        "checked",
        "id",
        []
      );
      let nodes = this.$refs.sTree.getCheckedNodes();
      let l = nodes.filter((item) => !item.children);
      l.forEach((item) => {
        this.checkedList.push(item);
      });
      this.checkedList = this.tools.duplicateList(this.checkedList, "id");
      if (unCheckedIdList.length) {
        let len = this.checkedList.length;
        while (len--) {
          if (unCheckedIdList.includes(this.checkedList[len].id)) {
            this.checkedList.splice(len, 1);
          }
        }
      }

      this.$emit("on-check-change", s, curr, this.checkedList);
    },
  },
};
</script>

<style lang="less" scoped>
.mr20 {
  margin-right: 20px;
}
.mb10 {
  margin-bottom: 10px;
}
</style>