<template>
  <div class="contentBox">
    <div>
      <CheckboxGroup v-model="checkMenuRow" style="text-align: left">
        <div @click="!item.checked ? getFileTree(item, index) : ''" v-for="(item, index) in checkMenuRowList" :key="item.horizonId + `${index}`" style="display: inline-block">
          <Checkbox :label="item.horizonId">
            <span>{{ item.horizonName }}</span>
          </Checkbox>
        </div>
      </CheckboxGroup>
      <!-- 树形结构 -->
      <div class="modal-tree">
        <div v-for="(item, index) in checkedTree" :key="item.horizonId + `${index}`" class="tree-box">
          <div class="tree-box-left">
            <div class="box-header">选择</div>
            <div class="box-content">
              <div class="flex box-content-search">
                <Input placeholder="请输入" clearable class="box-content-input" v-model.trim="searchInput" />
                <Button type="primary" class="box-content-btn" @click="search">查询</Button>
              </div>
              <div class="box-content-tree">
                <Tree ref="authTree" class="tree-tab" :show-checkbox="true" :data="authTreeData" @on-check-change="change"></Tree>
              </div>
            </div>
          </div>
          <div class="tree-box-right">
            <p>已选：{{ checkedText }}</p>
            <Button type="primary" @click="submit">提交</Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checkedText: "",
      searchInput: "",
      checkedTree: [1, 2, 3, 4, 5], //树形结构
      checkMenuRow: ["CUR_DEPT", "CUR_SUB_DEPT"],
      checkMenuRowList: [
        {
          horizonId: "CUR_DEPT",
          horizonName: "选项1",
          tableName: "bw_department",
          fieldName: "dept_id",
          meaning: "CUR_DEPT",
          fieldUrl: "",
          disabled: true,
        },
        {
          horizonId: "CUR_SUB_DEPT",
          horizonName: "选项2",
          tableName: "bw_department",
          fieldName: "dept_id",
          meaning: "CUR_SUB_DEPT",
          fieldUrl: "",
          disabled: true,
        },
        {
          horizonId: "SEL_DEPT",
          horizonName: "选项3",
          tableName: "bw_department",
          fieldName: "dept_id",
          meaning: "SEL_DEPT",
          fieldUrl: "/admin/department/data-permission-tree",
          disabled: true,
        },
        {
          horizonId: "MYSELF",
          horizonName: "选项4",
          tableName: "bw_user",
          fieldName: "user_id",
          meaning: "MYSELF",
          fieldUrl: "",
          disabled: true,
        },
        {
          horizonId: "SEL_USER",
          horizonName: "选项5",
          tableName: "bw_user",
          fieldName: "user_id",
          meaning: "SEL_USER",
          fieldUrl: "/admin/user/data-permission-tree",
          disabled: true,
        },
      ],
      authTreeData: [],
      originData: [],

      checkedList: [],
    };
  },
  async created() {
    await this.$api.getTreeData("getTreeDataTwo").then((res) => {
      if (res.code == 200) {
        this.authTreeData = this.initData([res.data]);
        this.originData = JSON.stringify(this.initData([res.data]));
      }
    });

    // 测试编辑回显
    let checkdID = "70,3,4,5,65,56";
    let a = checkdID.split(",");
    let checkdIdList = a.map((item) => parseInt(item));
    let checkedList = this.getDDD(checkdIdList, this.authTreeData, []);
    this.checkedText = checkedList.map((item) => item.title).join(",");
  },

  methods: {
    getDDD(checkdIdList, data, list) {
      data.forEach((item) => {
        if (checkdIdList.includes(item.id)) {
          list.push(item);
        }
        if (item.children && item.children.length) {
          this.getDDD(checkdIdList, item.children, list);
        }
      });
      return list;
    },
    submit() {
      // let nodes = this.$refs.authTree[0].getCheckedNodes();
      let a = this.checkedList.map((item) => item.id).join(",");
      console.log(a);
    },
    change(list, item) {
      let unCheckedIdList = this.tools.getUnCheckedList(
        [item],
        "checked",
        "id",
        []
      );
      let nodes = this.$refs.authTree[0].getCheckedNodes();
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
      console.log('"处理WAN"', this.checkedList);
      this.checkedText = this.checkedList.map((item) => item.title).join(",");
    },
    search() {
      if (!this.searchInput) {
        this.authTreeData = JSON.parse(this.originData);
      } else {
        // 方法一：直接筛出数据：
        this.authTreeData = this.selectList(
          this.searchInput,
          JSON.parse(this.originData)
        );
        // 方法二：颜色高亮
        //  this.authTreeData = this.tools.hightLight(
        //   this.searchInput,
        //   'name',
        //   JSON.parse(this.originData)
        // );
      }
      this.authTreeData = this.tools.getCheckedTree(
        "id",
        this.authTreeData,
        this.checkedList
      );
    },
    selISt(key, value, treeList, saveList = []) {
      treeList.forEach((item) => {
        if (item[key].indexOf(value) > -1) {
          saveList.push(item);
        } else {
          if (item.children && item.children.length > 0) {
            const _reData = this.selISt(key, value, item.children, saveList);
            if (_reData && _reData.length > 0) {
              saveList.push({
                ...item,
                children: _reData,
              });
            }
          }
        }
      });
      return saveList;
    },
    selectList(value, arr) {
      let newarr = [];
      arr.forEach((item) => {
        if (item.children && item.children.length) {
          if (item.name.indexOf(value) > -1) {
            item.expand = true;
            newarr.push(item);
          }
          const i = this.tools.duplicateList(
            this.selectList(value, item.children),
            "id"
          );
          const obj = {
            ...item,
            expand: true,
            children: i,
          };
          if (i && i.length) {
            newarr.push(obj);
          }
        } else {
          // 子节点
          if (item.name.indexOf(value) > -1) {
            newarr.push(item);
          }
        }
      });
      return newarr;
    },
    initData(data) {
      data.forEach((item) => {
        item.title = item.name;
        item.checked = false;
        item.expand = true;
        if (item.children && item.children.length) {
          this.initData(item.children);
        }
      });
      return data;
    },
    getFileTree(e, i) {
      console.log(e, i);
    },
  },
};
</script>
<style lang="less" scoped>
div {
  box-sizing: border-box;
}
.flex {
  display: flex;
  align-items: center;
}
.modal-tree {
  overflow-x: hidden;
  .tree-box {
    display: flex;
    align-items: flex-start;
    margin-top: 20px;
    &-left {
      width: 800px;
      border: 1px solid #ccc;
      border-radius: 10px;
      margin-right: 20px;
      height: 500px;
    }

    &-right {
      width: 400px;
      border: 1px solid #ccc;
      border-radius: 10px;
      height: 500px;
      margin-right: 20px;
      padding: 20px;
      text-align: left;
    }
    .box-header {
      border-bottom: 1px solid #ccc;
      padding: 10px 20px;
      text-align: left;
    }
    .box-content {
      padding: 10px 20px;
      .tree-tab {
        width: 100%;
        height: 100%;
        text-align: left;
        overflow-y: auto;
        padding-left: 0;
      }
      &-input {
        margin-right: 20px;
      }
      &-btn {
        height: 32px;
      }
      &-tree {
        text-align: left;
        height: 400px;
      }
    }
  }
}
</style>