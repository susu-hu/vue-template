
<template>
  <div>
    <div>
      <div class="flex mb10">
        <Input placeholder="请输入" v-model="filterText" clearable class="mr20" />
        <Button type="primary" class="box-content-btn" @click="searchOneTree()">查询</Button>
      </div>
      <Tree ref="sTree" :data="list" multiple :show-checkbox="true" @on-check-change="checkChange" @on-select-change="selectChange"></Tree>
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
      checkedList: [], //已勾选数据列表
      checkedListIncludeParent: [], //已勾选数据的列表-包括父节点
      immNodesList: [], //获取选中及半选节点列表
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
     * 点击树节点时触发	当前已选中的节点数组、当前项
     */
    selectChange() {
      // selected为true的数据
      let nodes0 = this.$refs.sTree.getSelectedNodes();
      console.log(nodes0);
    },
    /**
     * 勾选树
     */
    checkChange(s, curr) {
      let immNodes = this.$refs.sTree.getCheckedAndIndeterminateNodes();
      immNodes.forEach((item) => {
        this.immNodesList.push(item);
      });
      this.immNodesList = this.tools.duplicateList(this.immNodesList, "id");
      let unCheckedIdList = this.tools.getUnCheckedList(
        [curr],
        "checked",
        "id",
        []
      );
      let nodes = this.$refs.sTree.getCheckedNodes();
      nodes.forEach((item) => {
        this.checkedListIncludeParent.push(item);
      });
      this.checkedListIncludeParent = this.tools.duplicateList(
        this.checkedListIncludeParent,
        "id"
      );
      let l = nodes.filter((item) => !item.children);
      l.forEach((item) => {
        this.checkedList.push(item);
      });
      this.checkedList = this.tools.duplicateList(this.checkedList, "id");
      if (unCheckedIdList.length) {
        this.immNodesList = this.deleteALl(this.immNodesList, unCheckedIdList);
        this.checkedList = this.deleteALl(this.checkedList, unCheckedIdList);
        this.checkedListIncludeParent = this.deleteALl(
          this.checkedListIncludeParent,
          unCheckedIdList
        );
      }
      this.$emit(
        "on-check-change",
        s,
        curr,
        this.checkedList,
        this.checkedListIncludeParent,
        this.immNodesList
      );
    },
    /**
     * 数组-删除所有满足条件的数据
     */
    deleteALl(data, e) {
      let len = data.length;
      while (len--) {
        if (e.includes(data[len].id)) {
          data.splice(len, 1);
        }
      }
      return data;
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