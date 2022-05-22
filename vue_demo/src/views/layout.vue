<template>
  <div class="layout">
    <a
      style="
        position: fixed;
        z-index: 11111;
        right: 10px;
        bottom: 15px;
        cursor: pointer;
      "
      href="https://gitee.com/susuhhhhhh/su-sus-vue"
      target="_blank"
      ><img
        src="https://gitee.com/susuhhhhhh/su-sus-vue/widgets/widget_2.svg"
        alt="Fork me on Gitee"
    /></a>
    <Layout>
      <Sider
        class="sider"
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
          ref="asideMenu"
          :active-name="activeName"
          :open-names="openNames"
          accordion
          theme="light"
          :style="{ width: 'auto' }"
          :class="isCollapsed ? 'collapsed-menu' : 'menu-item'"
        >
          <MenuItem
            @click.native="selectMenu({ path: '/index', title: '首页' })"
            name="index"
            key="index"
          >
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
                @click.native="selectMenu(each, i, index)"
                ><span class="menuTitle">{{ each.title }}</span>
              </MenuItem>
            </template>
          </Submenu>
        </Menu>
      </Sider>
      <Layout style="overflow-x: auto">
        <Header
          :style="{
            background: '#fff',
            height: '114px',
            boxShadow: '0px 1px 4px 0px #EBEBFD',
          }"
        >
          <Row type="flex" justify="space-between" class="code-row-bg">
            <Col>
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
                    <div class="droptitle">苏苏</div>
                    <div>苏苏小苏苏</div>
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
          <Row class="head-tags">
            <div class="head-left left" @click="setTranx(0)">
              <Icon type="ios-rewind" size="30" color="#ffc0cb" />
            </div>
            <div class="tags-box">
              <div
                ref="tags"
                class="tags-box-scroll"
                :style="{ transform: `translateX(${tranx}px)` }"
              >
                <Tag
                  :ref="'tag' + index"
                  class="tags-item"
                  :class="{ 'tags-item-active': activePath === item.path }"
                  v-for="(item, index) in tabList"
                  :key="index"
                  :name="item.path"
                  :closable="item.path !== '/index'"
                  @click.native="changeMenu(item)"
                  @on-close="handleClose(item, index)"
                  >{{ item.label }}</Tag
                >
              </div>
            </div>
            <div class="head-left right" @click="getTrans(1)">
              <Icon type="ios-fastforward" size="30" color="#ffc0cb" />
            </div>
          </Row>
        </Header>
        <Content class="content" ref="Content">
          <div v-if="list && !ishomepage" class="topBar">
            <div class="topBarTitle">{{ list[list.length - 1].name }}</div>
            <Button @click="goback">返回</Button>
          </div>
          <div>
            <!-- 方法一：利用页面的name,此方法需要所有页面都定义name，基于页面较多，先放弃此法 -->
            <!-- <keep-alive :include="catch_components" :max="10">
              <router-view></router-view>
            </keep-alive> -->
            <!-- 方法二： -->
            <keep-alive :max="10">
              <router-view
                :key="$route.path"
                v-if="catch_components.includes(this.$route.path)"
              ></router-view>
            </keep-alive>
            <router-view
              :key="$route.path"
              v-if="!catch_components.includes(this.$route.path)"
            ></router-view>
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
import { mapState } from "vuex";
export default {
  name: "layout",
  data() {
    const menuTree = this.menus.menuTree;
    return {
      logoURL: require("@/assets/img/logo.png"),
      userAvar: "https://i.postimg.cc/mgsKJGLw/susu1.jpg",
      menuTree,
      isCollapsed: false,
      formModel: false,
      menuMap: {},
      formModalLoading: true,
      currentIndex: "",
    };
  },
  computed: {
    ...mapState({
      activePath: (state) => state.activePath, // 已选中菜单
      tabList: (state) => state.tabList, // tags菜单列表
      catch_components: (state) => state.catch_components, // keepalive缓存
      openNames: (state) => state.openNames,
      activeName: (state) => state.activeName,
      tranx: (state) => state.tranx,
    }),

    cache: {
      get() {
        // console.log(this.$route.matched);
        if (!this.$route.matched[1]) return;
        const instances = this.$route.matched[1].instances;
        // console.log(instances);
        return instances && instances.default && instances.default.$vnode
          ? instances.default.$vnode.parent.componentInstance.cache
          : {};
      },
      set(val) {
        this.$route.matched[1].instances.default.$vnode.parent.componentInstance.cache =
          val;
      },
    },
    cache_key: {
      get() {
        if (!this.$route.matched[1]) return;
        const instances = this.$route.matched[1].instances;
        return instances && instances.default && instances.default.$vnode
          ? instances.default.$vnode.parent.componentInstance.keys
          : [];
      },
      set(val) {
        this.$route.matched[1].instances.default.$vnode.parent.componentInstance.keys =
          val;
      },
    },
  },
  watch: {
    $route() {
      // 监听路由变化
      this.list = [];
      this.list = this.$route.meta.menu;
      this.ishomepage = this.$route.name === "index" ? true : false;
      // 路由跳转页面回到0
      this.$refs.Content.$el.scrollTo(0, 0);
      // console.log("当前路由", this.$route.path);
      // console.log("当前缓存路径", this.$store.state.catch_components);
      // console.log(
      //   "是否被缓存",
      //   this.$store.state.catch_components.includes(this.$route.path)
      // );
    },
    openNames() {
      this.$nextTick(() => {
        this.$refs.asideMenu.updateOpened();
      });
    },
    activeName() {
      this.$nextTick(() => {
        this.$refs.asideMenu.updateActiveName();
      });
    },
  },
  mounted() {
    // console.log(this.$router.options.routes);//所有路由信息
  },
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
    // 获取菜单
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
          name: menu.name,
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
      this.$router.push({
        path: this.list[this.list.length - 2].path,
      });
    },
    loginOut() {
      // let token = window.sessionStorage.getItem("token");
      this.$Modal.confirm({
        title: "提示",
        content: `确认退出登录`,
        okText: "确定",
        cancelText: "取消",
        onOk: async () => {
          window.sessionStorage.clear();
        },
      });
    },
    getPermission() {
      // 模拟权限数据集合 有以下几个权限
      let perms = ["search", "view", "edit", "delete", "add"];
      // 用于把权限集合提交到 actions 中的 SET_PERMISSION 函数
      // 第一个为函数名，后面的参数为 我们需要提交的参数，可以是多个
      this.$store.dispatch("SET_PERMISSION", perms);
    },
    handleClose(tab, index) {
      // console.log("缓存-------------------------------", this.cache);
      // console.log("keys---------------------------------", this.cache_key);
      let cache = this.cache,
        keys = this.cache_key;
      if (cache[tab.path] != null) {
        delete cache[tab.path];
        keys.splice(keys.indexOf(tab.path), 1);
      }
      var oldOpenNames = this.$store.state.openNames,
        oldActiveName = this.$store.state.activeName,
        oldActivePath = this.$store.state.activePath,
        oldTabList = this.$store.state.tabList;
      let length = oldTabList.length - 1;
      for (let i = 0; i < oldTabList.length; i++) {
        let item = oldTabList[i];
        if (item.path === tab.path) {
          oldTabList.splice(i, 1);
        }
      }
      // 删除keepAlive缓存
      // 方法一：利用include
      // this.$store.commit("removeKeepAliveCache", tab.name);
      // 方法二：利用path
      this.$store.commit("removeKeepAliveCache", tab.path);
      this.getTrans(2, tab);
      if (tab.path !== oldActivePath) {
        return;
      }
      if (length === 1) {
        this.$store.commit("closeTab", {
          activePath: "/index",
          tabList: oldTabList,
        });
        this.$router.push({ path: oldTabList[index - 1].path });
        return;
      }
      if (index === length) {
        oldActivePath = oldTabList[index - 1].path;
        oldOpenNames = [oldTabList[index - 1].subName];
        oldActiveName =
          oldTabList[index - 1].subName + "-" + oldTabList[index - 1].index;
        this.$store.commit("closeTab", {
          activePath: oldActivePath,
          tabList: oldTabList,
          openNames: oldOpenNames,
          activeName: oldActiveName,
        });
        this.$router.push({ path: oldTabList[index - 1].path });
      } else {
        oldActivePath = oldTabList[index].path;
        oldOpenNames = [oldTabList[index].subName];
        oldActiveName =
          oldTabList[index].subName + "-" + oldTabList[index].index;
        this.$store.commit("closeTab", {
          activePath: oldActivePath,
          tabList: oldTabList,
          openNames: oldOpenNames,
          activeName: oldActiveName,
        });
        this.$router.push({ path: oldTabList[index].path });
      }
    },
    changeMenu(item) {
      var oldActivePath = this.$store.state.activePath;
      if (oldActivePath === item.path) {
        return;
      }
      this.$store.commit("changeMenu", item);
      this.$router.push({ path: item.path });
      this.$nextTick(() => {
        this.getTrans(0);
      });
    },
    selectMenu(item, i, subName) {
      // 方法一：利用include
      // this.$store.commit("addKeepAliveCache", item.name);
      // 方法二：利用path
      this.$store.commit("addKeepAliveCache", item.path);
      var submenu = {
        path: item.path,
        name: item.name,
        label: item.title,
        index: i,
        subName: subName,
      };
      this.$store.commit("selectMenu", submenu);
      this.$router.push({ path: item.path });
      this.$nextTick(() => {
        this.getTrans(0);
      });
    },
    getTrans(e, tab) {
      let width = 0;
      if (this.$refs.tags) {
        width = this.$refs.tags.clientWidth;
      }
      this.tabList.map((item, index) => {
        if (item.path === this.activePath) {
          this.currentIndex = index;
        }
        if (this.$refs[`tag${index}`] && this.$refs[`tag${index}`][0]) {
          this.$set(
            this.tabList[index],
            "width",
            this.$refs[`tag${index}`][0].$el.clientWidth + 4
          );
        }
      });
      let list = this.tabList.filter((item, index) => {
        return index <= this.currentIndex;
      });
      let totalWidth = list.reduce((total, currentValue) => {
        return total + Number(currentValue.width);
      }, 0);
      let totalAllWidth = this.tabList.reduce((total, currentValue) => {
        return total + Number(currentValue.width);
      }, 0);

      if (e == 0) {
        if (Number(width) > Number(totalWidth) || Number(width) == 0) {
          this.setTranx(-0);
          return false;
        }
        this.setTranx(Number(width) - Number(totalWidth) - 60);
      } else if (e == 1) {
        if (Number(width) > Number(totalAllWidth)) {
          return false;
        }
        this.setTranx(Number(width) - Number(totalAllWidth) - 60);
      } else {
        if (
          Number(width) > Number(totalAllWidth) &&
          this.$store.state.tranx < 0
        ) {
          this.setTranx(-0);
        } else {
          let double = Math.floor(Number(totalAllWidth) / Number(width));
          if (double > 0 && this.$store.state.tranx < 0) {
            this.setTranx(this.$store.state.tranx + tab.width);
          }
        }
      }
    },
    setTranx(val) {
      this.$store.commit("setTranx", val);
    },
    submit() {},
    cancel() {},
  },
};
</script>
<style lang="less">
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
// tag样式
.tags-item .ivu-tag-text {
  color: #ffc0cb !important;
}
.tags-item-active .ivu-tag-text {
  color: #fff !important;
}
.tags-item .ivu-icon-ios-close:before {
  color: #ffc0cb;
}
.tags-item-active .ivu-icon-ios-close:before {
  color: #ffff;
}
</style>
<style  lang="less" scoped>
@import "./layout.less";
</style>
