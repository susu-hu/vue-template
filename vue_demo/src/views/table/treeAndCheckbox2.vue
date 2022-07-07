<template>
  <div>
    <Row>
      <Col span="24">
        <Input
          prefix="ios-search"
          v-model="searchName"
          clearable
          placeholder="请输入名称"
          @on-enter="searchTree"
        />
      </Col>
      <Col span="24">
        <Tree :data="treeData" @on-select-change="selectChange"></Tree>
      </Col>
    </Row>
  </div>
</template>
 
<script>
export default {
  data() {
    return {
      treeRawData: [
        { title: "地球", id: "1", parentId: "0" },
        { title: "中国", id: "2", parentId: "1" },
        { title: "上海", id: "3", parentId: "2" },
        { title: "徐汇", id: "4", parentId: "3" },
        { title: "美国", id: "5", parentId: "1" },
        { title: "纽约", id: "6", parentId: "5" },
        { title: "金山", id: "7", parentId: "6" },
        { title: "苏苏", id: "8", parentId: "6" },
        { title: "解决", id: "9", parentId: "6" },
        { title: "解决1", id: "19", parentId: "6" },
        { title: "解决2", id: "323", parentId: "8" },
        // { title: "解决3", id: "12", parentId: "6" },
        // { title: "解决4", id: "13", parentId: "6" },
        // { title: "解决5", id: "14", parentId: "6" },
        // { title: "解决6", id: "15", parentId: "6" },
      ],
      treeData: [],
      searchName: "",
      currentId: "",
    };
  },
  mounted() {
    this.treeData = this.listToTree(this.treeRawData);
    console.log(this.treeData);
  },
  methods: {
    listToTree(list) {
      var arr = [];
      let items = {};
      var idsStr = "";
      for (let i = 0; i < list.length; i++) {
        let key = list[i].parentId;
        if (items[key]) {
          items[key].push(list[i]);
        } else {
          items[key] = [];
          items[key].push(list[i]);
        }
        idsStr += idsStr === "" ? list[i].id : "," + list[i].id;
      }
      for (var key in items) {
        if (idsStr.indexOf(key) === -1) {
          arr = this.formatTree(items, key);
        }
      }
      delete arr[0].parentId;
      return arr;
    },
    formatTree(items, parentId) {
      let result = [];
      if (!items[parentId]) {
        return result;
      }
      for (let t of items[parentId]) {
        t.children = this.formatTree(items, t.id);
        t.expand = true;
        result.push(t);
      }
      return result;
    },
    searchTree() {
      let exist = false;
      for (var i = 0; i < this.treeRawData.length; i++) {
        if (this.treeRawData[i].title.indexOf(this.searchName) !== -1) {
          exist = true;
          this.currentId = this.treeRawData[i].id;

          this.treeRawData = [
            { title: "地球", id: "1", parentId: "0" },
            { title: "中国", id: "2", parentId: "1" },
            { title: "上海", id: "3", parentId: "2" },
            { title: "徐汇", id: "4", parentId: "3" },
            { title: "美国", id: "5", parentId: "1" },
            { title: "纽约", id: "6", parentId: "5" },
            { title: "金山", id: "7", parentId: "6" },
            { title: "苏苏", id: "8", parentId: "6" },
            { title: "解决", id: "9", parentId: "6" },
            { title: "解决1", id: "19", parentId: "6" },
            { title: "解决2", id: "323", parentId: "8" },
          ];
          this.treeData = this.listToTree(this.treeRawData);

          this.treeData = this.fineCurrentIdRecursive(this.treeData);
          break;
        } else if (!exist && i === this.treeRawData.length - 1) {
          this.$Message.error("无搜索结果");
        }
      }
    },

    fineCurrentIdRecursive(list) {
      for (var i = 0; i < list.length; i++) {
        if (list[i].id === this.currentId) {
          list[i].selected = true;
          break;
        } else {
          if (list[i].children && list[i].children.length > 0) {
            list[i].children = this.fineCurrentIdRecursive(list[i].children);
            for (var j = 0; j < list[i].children.length; j++) {
              if (list[i].children[j].selected || list[i].children[j].expand) {
                list[i].expand = true;
                break;
              }
            }
          }
        }
      }
      return list;
    },

    // 点击节点文字展开收起
    selectChange(data, selectedNode) {
      this.$set(selectedNode, "expand", !selectedNode.expand);
    },
  },
};
</script>