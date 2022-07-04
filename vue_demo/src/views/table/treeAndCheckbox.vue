<template>
  <div class="contentBox">
    <div style="width:1000px">
      <CheckboxGroup v-model="checkMenuRow" style="text-align:left" @on-change="changeBox">
        <div @click="!item.checked?getFileTree(item,index):''" v-for="(item,index) in checkMenuRowList" :key="item.horizonId+`${index}`" style="display:inline-block">
          <Checkbox :label="item.horizonId">
            <span>{{item.horizonName}}</span>
          </Checkbox>
        </div>
      </CheckboxGroup>
      <!-- 树形结构 -->
      <div class="modal-tree">
        <div v-for="(item,index) in checkedTree" :key="item.horizonId+`${index}`" class="tree-box">
          <div class="tree-box-left">
            <div class="box-header">选择指定部门</div>
            <div class="box-content">
              <div class="box-content-search flex">
                <Input placeholder="请输入" clearable class="box-content-input" />
                <Button type="primary" class="box-content-btn">查询</Button>
              </div>
              <div class="box-content-tree">
                <Tree ref="authTree" class="tree-tab" :show-checkbox="true" :data="authTreeData"></Tree>
              </div>
            </div>
          </div>
          <div class="tree-box-right">
            <p>已选：</p>
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
      checkedTree: [1, 2, 3], //树形结构
      checkMenuRow: [],
      checkMenuRowList: [
        {
          horizonId: "CUR_DEPT", //uuid(新生成)
          horizonName: "本部门", //横向条件名称
          tableName: "bw_department", //表名
          fieldName: "dept_id", //字段名
          meaning: "CUR_DEPT", //条件含义
          fieldUrl: "", //存放多选时候的树形数据url
          disabled: true,
        },
        {
          horizonId: "CUR_SUB_DEPT",
          horizonName: "本部门及下属部门",
          tableName: "bw_department",
          fieldName: "dept_id",
          meaning: "CUR_SUB_DEPT",
          fieldUrl: "",
          disabled: true,
        },
        {
          horizonId: "SEL_DEPT",
          horizonName: "指定部门",
          tableName: "bw_department",
          fieldName: "dept_id",
          meaning: "SEL_DEPT",
          fieldUrl: "/admin/department/data-permission-tree",
          disabled: true,
        },
        {
          horizonId: "MYSELF",
          horizonName: "本人",
          tableName: "bw_user",
          fieldName: "user_id",
          meaning: "MYSELF",
          fieldUrl: "",
          disabled: true,
        },
        {
          horizonId: "SEL_USER",
          horizonName: "指定用户",
          tableName: "bw_user",
          fieldName: "user_id",
          meaning: "SEL_USER",
          fieldUrl: "/admin/user/data-permission-tree",
          disabled: true,
        },
      ],
      authTreeData: [
        {
          parentId: -1,
          name: "公司",
          id: 0,
          children: [
            {
              parentId: 0,
              name: "信息控制中心",
              id: 1,
              children: [
                {
                  parentId: 1,
                  name: "0002",
                  id: 70,
                  children: null,
                },
              ],
            },
            {
              parentId: 0,
              name: "企管审计部",
              id: 2,
              children: null,
            },
            {
              parentId: 0,
              name: "人力资源部789",
              id: 3,
              children: null,
            },
            {
              parentId: 0,
              name: "生产服务部",
              id: 4,
              children: null,
            },
            {
              parentId: 0,
              name: "生产技术部",
              id: 5,
              children: null,
            },
            {
              parentId: 0,
              name: "生产调度室",
              id: 6,
              children: null,
            },
            {
              parentId: 0,
              name: "生产准备队",
              id: 7,
              children: null,
            },
            {
              parentId: 0,
              name: "生活服务中心",
              id: 8,
              children: null,
            },
            {
              parentId: 0,
              name: "生态环保部",
              id: 9,
              children: null,
            },
            {
              parentId: 0,
              name: "通修队",
              id: 10,
              children: [
                {
                  parentId: 10,
                  name: "通修队测试125",
                  id: 72,
                  children: [
                    {
                      parentId: 72,
                      name: "通修队126",
                      id: 73,
                      children: null,
                    },
                  ],
                },
              ],
            },
            {
              parentId: 0,
              name: "物资管理部",
              id: 11,
              children: null,
            },
            {
              parentId: 0,
              name: "销售中心",
              id: 12,
              children: null,
            },
            {
              parentId: 0,
              name: "综采一队",
              id: 13,
              children: null,
            },
            {
              parentId: 0,
              name: "综采二队",
              id: 14,
              children: null,
            },
            {
              parentId: 0,
              name: "综合办公室",
              id: 15,
              children: null,
            },
            {
              parentId: 0,
              name: "安全监察部",
              id: 16,
              children: null,
            },
            {
              parentId: 0,
              name: "安装三队一分队",
              id: 17,
              children: null,
            },
            {
              parentId: 0,
              name: "安装三队二分队",
              id: 18,
              children: null,
            },
            {
              parentId: 0,
              name: "安装三队三分队",
              id: 19,
              children: null,
            },
            {
              parentId: 0,
              name: "安装三队四分队",
              id: 20,
              children: null,
            },
            {
              parentId: 0,
              name: "南京北路测试",
              id: 21,
              children: null,
            },
            {
              parentId: 0,
              name: "财务资产部",
              id: 22,
              children: null,
            },
            {
              parentId: 0,
              name: "党委工作部",
              id: 23,
              children: null,
            },
            {
              parentId: 0,
              name: "地测技术部",
              id: 25,
              children: null,
            },
            {
              parentId: 0,
              name: "对外协调办公室",
              id: 26,
              children: null,
            },
            {
              parentId: 0,
              name: "辅助运输队22",
              id: 27,
              children: null,
            },
            {
              parentId: 0,
              name: "工会",
              id: 28,
              children: null,
            },
            {
              parentId: 0,
              name: "规划部",
              id: 29,
              children: null,
            },
            {
              parentId: 0,
              name: "机电队",
              id: 30,
              children: null,
            },
            {
              parentId: 0,
              name: "机电技术部",
              id: 31,
              children: null,
            },
            {
              parentId: 0,
              name: "机修车间",
              id: 32,
              children: null,
            },
            {
              parentId: 0,
              name: "机运队",
              id: 33,
              children: null,
            },
            {
              parentId: 0,
              name: "纪检监察室",
              id: 34,
              children: null,
            },
            {
              parentId: 0,
              name: "救护队",
              id: 35,
              children: null,
            },
            {
              parentId: 0,
              name: "掘进一队",
              id: 36,
              children: null,
            },
            {
              parentId: 0,
              name: "掘进二队",
              id: 37,
              children: null,
            },
            {
              parentId: 0,
              name: "掘进三队",
              id: 38,
              children: null,
            },
            {
              parentId: 0,
              name: "掘进五队",
              id: 39,
              children: null,
            },
            {
              parentId: 0,
              name: "安装三队五分队",
              id: 43,
              children: null,
            },
            {
              parentId: 0,
              name: "搬家中心",
              id: 47,
              children: null,
            },
            {
              parentId: 0,
              name: "梅雄测试部",
              id: 48,
              children: null,
            },
            {
              parentId: 0,
              name: "软件开发部",
              id: 53,
              children: null,
            },
            {
              parentId: 0,
              name: "测试部门2",
              id: 54,
              children: [
                {
                  parentId: 54,
                  name: "fsdf",
                  id: 56,
                  children: null,
                },
                {
                  parentId: 54,
                  name: "dg",
                  id: 57,
                  children: null,
                },
                {
                  parentId: 54,
                  name: "sdf",
                  id: 58,
                  children: null,
                },
              ],
            },
          ],
        },
      ],
    };
  },
  created() {
    this.initData(this.authTreeData);
  },

  methods: {
    initData(data) {
      data.forEach((item) => {
        item.title = item.name;
        item.checked = false;
        item.expand = true;
        if (item.children && item.children.length) {
          this.initData(item.children);
        }
      });
    },
    // 数据权限-多选框
    changeBox(e) {
      console.log(e);
    },
    getFileTree(e, i) {
      console.log(e, i);
      if (e.fieldUrl) {
        console.log("掉选接口了");
      }
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
  overflow-y: scroll;
  max-height: 550px;
  .tree-box {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-top: 20px;
    &-left {
      width: 600px;
      border: 1px solid #ccc;
      border-radius: 10px;
      margin-right: 20px;
      height: 300px;
    }

    &-right {
      width: 290px;
      border: 1px solid #ccc;
      border-radius: 10px;
      height: 300px;
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
        height: 200px;
        overflow-y: scroll;
      }
    }
  }
}
</style>