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
          <Submenu v-for="(item, index) in menuMap" :name="index" :key="index" class="sub_title">
            <template slot="title" >
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
                    @click.native="loginOut"
                    name="loginOut"
                    key="loginOut"
                  >
                    苏苏的微信
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
    <!-- 修改密码 -->
    <Modal
      v-model="formModel"
      title="修改密码"
      :loading="formModalLoading"
      :mask-closable="false"
      @on-ok="submit"
      @on-cancel="cancel"
    >
      <Form
        ref="formValidate"
        :model="formItem"
        :rules="ruleValidate"
        :label-width="100"
      >
        <FormItem label="原密码" prop="pwd">
          <Input
            v-model="formItem.pwd"
            :type="eye ? 'text' : 'password'"
            placeholder="请输入原密码"
          >
            <Icon
              slot="suffix"
              :type="eye ? 'ios-eye' : 'ios-eye-off'"
              @click="eye = !eye"
            />
          </Input>
        </FormItem>
        <FormItem label="新密码" prop="newPwd">
          <Input
            v-model="formItem.newPwd"
            :type="eye1 ? 'text' : 'password'"
            placeholder="请输入新密码"
          >
            <Icon
              slot="suffix"
              :type="eye1 ? 'ios-eye' : 'ios-eye-off'"
              @click="eye1 = !eye1"
            />
          </Input>
        </FormItem>
        <FormItem label="确认新密码" prop="newPwd2">
          <Input
            v-model="formItem.newPwd2"
            :type="eye2 ? 'text' : 'password'"
            placeholder="请确认新密码"
          >
            <Icon
              slot="suffix"
              :type="eye2 ? 'ios-eye' : 'ios-eye-off'"
              @click="eye2 = !eye2"
            />
          </Input>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script>
// 左侧目录
const menuTree = [
  {
    code: "0001",
    createtime: "2021-08-06 16:35:55",
    icon: "ios-add-circle",
    label: "2111",
    mType: "0",
    parent: "",
    platformCode: "0001",
    showIndex: 1,
    status: "0",
    updatetime: "2021-08-06 16:35:55",
    url: "/",
    visible: "0",
  },
  {
    code: "0002",
    createtime: "2021-08-06 16:35:55",
    icon: "md-battery-charging",
    label: "22",
    mType: "0",
    parent: "0001",
    platformCode: "0001",
    showIndex: 1,
    status: "0",
    updatetime: "2021-08-06 16:35:55",
    url: "/",
    visible: "0",
  },
];

// const icons = {
//   "0001": "ios-settings",
//   "0006": "md-cube",
//   "0017": "md-home",
//   "0022": "md-card",
//   "0029": "md-notifications",
//   "0031": "md-options",
//   "0034": "logo-usd",
//   "0038": "md-cash",
//   "0043": "ios-podium",
//   "0045": "md-list-box",
// }
export default {
  name: "layout",
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入新密码"));
      } else if (value !== this.formItem.newPwd) {
        callback(new Error("两次输入新密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      logoURL: require("@/assets/img/logo.png"),
      userAvar: "https://i.postimg.cc/mgsKJGLw/susu1.jpg",
      crumList: [],

      menuTree,
      menuMap: {},
      name: "",
      roleName: "",
      isCollapsed: false,
      formModel: false,
      formModalLoading: true,
      formItem: {
        pwd: "",
        newPwd: "",
        newPwd2: "",
      },
      eye: false,
      eye1: false,
      eye2: false,
      ruleValidate: {
        pwd: [{ required: true, message: "请输入原密码", trigger: "blur" }],
        newPwd: [{ required: true, message: "请输入新密码", trigger: "blur" }],
        newPwd2: [
          { required: true, validator: validatePass2, trigger: "blur" },
        ],
      },
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
  created() {
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
    // console.log(menuMap)
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
    // 修改密码
    submit() {
      this.formModalLoading = false;
      this.$nextTick(() => {
        this.formModalLoading = true;
      });
      let data = { ...this.formItem };
      this.$refs["formValidate"].validate((valid) => {
        if (valid) {
          delete data.newPwd2;
          this.$api["userUpdatePwdCurr"](data).then((res) => {
            if (res.code == "200") {
              this.$Message.success("修改成功");
              this.cancel();
            }
          });
        }
      });
    },
    cancel() {
      Object.keys(this.formItem).forEach((key) => {
        this.formItem[key] = "";
      });
      this.$refs["formValidate"].resetFields();
      this.formModel = false;
    },
    // 退出登录
    loginOut() {
      let that = this;
      let data = {
        token: window.sessionStorage.getItem("token"),
      };
      this.$Modal.confirm({
        title: "提示",
        content: `确认退出登录`,
        okText: "确定",
        cancelText: "取消",
        onOk: async () => {
          that.$api["userExit"](data).then((res) => {
            if (res.code == "200") {
              that.$Message.success("退出成功");
              window.sessionStorage.clear();
              that.$router.replace("/login");
            }
          });
        },
      });
    },
  },
};
</script>
<style lang="less" scoped>
.ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu) {
  color: #ffc0cb;
  background: #ecf0f3;
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
  background: #ffc0cb;
}
.ivu-menu-vertical .ivu-menu-item:hover,
.ivu-menu-vertical .ivu-menu-submenu-title:hover {
  color: #ffc0cb;
}

.ivu-menu-vertical .ivu-menu-item:hover,
.ivu-menu-vertical .ivu-menu-submenu-title:hover {
  color: #ffc0cb !important;
}
.sub_title .ivu-menu-vertical .ivu-menu-submenu-title:hover{
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
