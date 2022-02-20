<template>
  <div class="layout">
    <Layout>
      <Sider
        ref="side1"
        hide-trigger
        collapsible
        :collapsed-width="92"
        v-model="isCollapsed"
        style="background: #fff; box-shadow: 2px 0px 6px 0px #e7e7fc"
      >
        <div class="logobox">
          <router-link to="/" v-if="!isCollapsed">
            <img :src="logoURL" alt="susu" title="susu" class="logo" />
          </router-link>
          <Icon
            type="md-reorder"
            size="20"
            color="#ffc0cb"
            @click.native="collapsedSider"
            :class="isCollapsed ? 'logoBoxI' : ''"
          />
        </div>
        <Menu
          accordion
          theme="light"
          :style="{ width: 'auto' }"
          :class="isCollapsed ? 'collapsed-menu' : 'menu-item'"
        >
          <MenuItem to="/index" name="index" key="index">
            <Icon type="ios-paw"></Icon>
            <span class="menuTitle">首页</span>
          </MenuItem>
          <Submenu
            v-for="(item, index) in menuMap"
            :name="index"
            :key="index"
            class="sub_title"
          >
            <template slot="title">
              <svg class="icon" aria-hidden="true" v-if="item.fonticon">
                <use :xlink:href="item.fonticon"></use>
              </svg>
              <Icon :type="item.icon" v-else />
              <span class="menuTitle">{{ item.title }}</span>
            </template>
            <template v-if="item.children">
              <MenuItem
                v-for="(each, i) in item.children"
                :name="index + '-' + i"
                :key="index + '-' + i"
                :to="each.path"
                ><span class="menuTitle">{{ each.title }}</span>
              </MenuItem>
            </template>
          </Submenu>
        </Menu>
      </Sider>
      <Layout>
        <Header
          :style="{ background: '#fff', boxShadow: '0px 1px 4px 0px #EBEBFD' }"
        >
          <Row type="flex" justify="space-between" class="code-row-bg">
            <Col span="20">
              <Breadcrumb>
                <BreadcrumbItem
                  v-for="(item, index) in list"
                  :key="index"
                  :to="item.path"
                  >{{ item.name }}
                </BreadcrumbItem>
              </Breadcrumb>
            </Col>
            <Col class="headerCol">
              <img :src="userAvar" alt="autor" title="autor" class="autor" />
              <Dropdown trigger="click" style="margin-left: 6px">
                <div class="dropcontent">
                  <div class="dropleft">
                    <div class="droptitle">{{ name }}</div>
                    <div>{{ roleName }}</div>
                  </div>
                  <Icon type="ios-arrow-down" />
                </div>
                <Dropdown-menu slot="list">
                  <Dropdown-item
                    @click.native="formModel = true"
                    name="reset"
                    key="reset"
                  >
                    关于苏苏
                  </Dropdown-item>
                  <Dropdown-item
                    @click.native="formModel = true"
                    name="loginOut"
                    key="loginOut"
                  >
                    联系我
                  </Dropdown-item>
                </Dropdown-menu>
              </Dropdown>
            </Col>
          </Row>
        </Header>
        <Content class="content">
          <div v-if="list && !ishomepage" class="topBar">
            <div class="topBarTitle">{{ list[list.length - 1].name }}</div>
            <Button @click="goback">返回</Button>
          </div>
          <div>
            <router-view></router-view>
          </div>
        </Content>
      </Layout>
    </Layout>
    <!-- 关于苏苏 -->
    <Modal
      v-model="formModel"
      title="关于苏苏"
      :loading="formModalLoading"
      :mask-closable="false"
      @on-ok="submit"
      @on-cancel="cancel"
    >
    </Modal>
  </div>
</template>
<script>
// 左侧目录
const menuTree = [
  {
    code: "0001",
    icon: "ios-add-circle",
    label: "iview篇章",
    parent: "",
    url: "/",
  },
  {
    code: "0001-01",
    label: "Table",
    parent: "0001",
    url: "/",
  },
  {
    code: "0002",
    icon: "ios-add-circle",
    label: "预处理器sass",
    parent: "",
    url: "/",
  },
  {
    code: "0002-01",
    icon: "ios-add-circle",
    label: "颜色函数",
    parent: "0002",
    url: "/sassColor",
  },
];
export default {
  name: "layout",
  data() {
    return {
      logoURL: require("@/assets/img/logo.png"),
      userAvar: "https://i.postimg.cc/mgsKJGLw/susu1.jpg",
      menuTree,
      isCollapsed: false,
      formModel: false,
      menuMap: {},
    };
  },
  watch: {
    $route() {
      // 监听路由变化
      this.list = [];
      this.list = this.$route.meta.menu;
      this.ishomepage = this.$route.name === "index" ? true : false;
    },
  },
  mounted() {},
  created() {
    this.getPermission();
    var mm = [
      {
        code: "0086",
        createtime: "2021-12-18 19:51:47",
        icon: "",
        label: "添加按钮",
        mType: "2",
        parent: "0002",
        platformCode: "0001",
        showIndex: 1,
        status: "0",
        updatetime: "2021-12-18 19:51:47",
        url: "m.add",
        visible: "0",
      },
      {
        code: "0086",
        createtime: "2021-12-18 19:51:47",
        icon: "",
        label: "删除按钮",
        mType: "2",
        parent: "0002",
        platformCode: "0001",
        showIndex: 1,
        status: "0",
        updatetime: "2021-12-18 19:51:47",
        url: "m.del",
        visible: "0",
      },
    ];
    window.sessionStorage.setItem(
      "menus",
      encodeURIComponent(JSON.stringify(mm))
    );

    this.list = this.$route.meta.menu;
    this.ishomepage = this.$route.name === "index" ? true : false;
    // // 获取菜单
    const menuMap = {};
    // let menus = window.sessionStorage.getItem("menus");
    // menus = JSON.parse(decodeURIComponent(menus));
    let menus = this.menuTree;
    menus.forEach((menu) => {
      // parent
      if (!menu.parent) {
        menuMap[menu.code] = {
          title: menu.label,
          icon: menu.icon,
          children: [],
        };
      }

      if (menu.parent) {
        menuMap[menu.parent].children.push({
          title: menu.label,
          path: menu.url,
        });
      }
    });
    this.$set(this, "menuMap", menuMap);
  },
  methods: {
    //点击按钮收缩展开目录
    collapsedSider() {
      this.$refs.side1.toggleCollapse();
    },
    //点击返回
    goback() {
      console.log();
      this.$router.push({
        path: this.list[this.list.length - 2].path,
      });
    },
    loginOut() {
      // let that = this;
      // let data = {
      //   token: window.sessionStorage.getItem("token"),
      // };
      // this.$Modal.confirm({
      //   title: "提示",
      //   content: `确认退出登录`,
      //   okText: "确定",
      //   cancelText: "取消",
      //   onOk: async () => {
      //     that.$api["userExit"](data).then((res) => {
      //       if (res.code == "200") {
      //         that.$Message.success("退出成功");
      //         window.sessionStorage.clear();
      //         that.$router.replace("/login");
      //       }
      //     });
      //   },
      // });
    },

    getPermission() {
      // 模拟接口 获取 权限数据集合
      // 模拟获取的数据 有以下几个权限
      let perms = ["search", "view", "edit", "delete", "add"];
      // 用于把权限集合提交到 actions 中的 SET_PERMISSION 函数
      // 第一个为函数名，后面的参数为 我们需要提交的参数，可以是多个
      this.$store.dispatch("SET_PERMISSION", perms);
    },
  },
};
</script>
<style lang="less" >
.ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu) {
  color: #ffc0cb !important;
  background: #ecf0f3 !important;
  z-index: 2;
}
.ivu-menu-light.ivu-menu-vertical
  .ivu-menu-item-active:not(.ivu-menu-submenu):after {
  content: "";
  display: block;
  width: 2px;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  background: #ffc0cb !important;
}
.ivu-menu-vertical .ivu-menu-item:hover,
.ivu-menu-vertical .ivu-menu-submenu-title:hover {
  color: #ffc0cb;
}

.ivu-menu-vertical .ivu-menu-item:hover,
.ivu-menu-vertical .ivu-menu-submenu-title:hover {
  color: #ffc0cb !important;
}
.sub_title .ivu-menu-vertical .ivu-menu-submenu-title:hover {
  color: #ffc0cb !important;
}
</style>
<style scoped>
.logobox {
  height: 64px;
  width: 100%;
  border-bottom: 1px solid #e4e4e4;
  box-shadow: 2px 0px 6px 0px #e7e7fc;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 15px;
}
.logobox i {
  cursor: pointer;
}
.logoBoxI {
  transform: rotate(-90deg);
  align-items: center;
  justify-content: center;
  display: flex;
  width: 100%;
}
.logo {
  height: 63px;
  vertical-align: top;
}

.ivu-layout-header {
  padding: 0 20px;
}
.content {
  padding: 24px;
  background: #ecf0f3;
  min-height: calc(100vh - 112px);
}
.autor {
  height: 42px;
  width: 42px;
  border-radius: 50%;
}
.headerCol {
  display: flex;
  align-items: center;
  height: 64px;
}
.headerCol .dropcontent {
  display: flex;
  align-items: center;
  cursor: pointer;
}
.headerCol .dropcontent .dropleft {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 64px;
  margin-right: 20px;
}
.headerCol .dropcontent .dropleft div {
  height: 22px;
  line-height: 22px;
  text-align: center;
  font-size: 13px;
  font-weight: 400;
  color: #a9a8a8;
}
.headerCol .dropcontent .dropleft div.droptitle {
  font-size: 15px;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.65);
}
.ivu-menu-vertical.ivu-menu-light:after {
  width: 0;
  box-shadow: 2px 0px 6px 0px #e7e7fc;
}
.topBar {
  height: 70px;
  background: #fff;
  margin: -23px -24px 24px -24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  border-bottom: 1px solid #e9e9e9;
}
.topBarTitle {
  font-size: 20px;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.85);
  line-height: 28px;
}

.menu-item .icon {
  width: 14px;
  height: 14px;
  margin-bottom: -1px;
  margin-right: 8px;
}
.collapsed-menu span.menuTitle {
  display: none;
}
.collapsed-menu i {
  font-size: 20px;
}
.collapsed-menu .icon {
  width: 20px;
  height: 20px;
}
</style>
