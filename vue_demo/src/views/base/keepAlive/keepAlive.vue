<!--
 * @Author: susu 1628469970@qq.com
 * @Date: 2022-05-15 20:51:18
 * @LastEditors: susu 1628469970@qq.com
 * @LastEditTime: 2022-05-20 23:33:49
 * @FilePath: \vue_demo\src\views\base\keepAlive.vue
 * @Description: keep-alive
-->
<template>
  <div class="contentBox">
    <div class="flex-row j_b hd_tab">
      <div
        @click="tabNav(index, item, $route.path)"
        v-for="(item, index) in tab"
        :key="index"
        :class="['hd_tab_item', curr == index ? 'hd_tab_item_active' : '']"
      >
        {{ item.name }}
      </div>
    </div>
    <!-- :include="aliveList"  三级路由无法缓存问题2022-5-20待解决-->
    <keep-alive :max="10">
      <router-view class="rv" v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view class="rv" v-if="!$route.meta.keepAlive" />
  </div>
</template>

<script>
export default {
  name: "keepAliveIndex",
  data() {
    return {
      tab: [
        {
          name: "菜单一",
          url: "/base/keepAlive/A",
        },
        {
          name: "菜单二",
          url: "/base/keepAlive/B",
        },
        {
          name: "菜单三",
          url: "/base/keepAlive/C",
        },
      ],
      curr: 0,
      aliveList: ["A", "B", "C"],
    };
  },
  mounted() {
    // console.log(this.$router);
    // console.log(this.$route);
    // console.log(this.$route.path);
    switch (this.$route.path) {
      case "/base/keepAlive/C":
        this.curr = 2;
        break;
      case "/base/keepAlive/B":
        this.curr = 1;
        break;
      case "/base/keepAlive/A":
        this.curr = 0;
        break;
      default:
        this.curr = 0;
        break;
    }
  },
  methods: {
    tabNav(e, item, path) {
      this.curr = e;
      // this.$router.push({
      //   path: item.url,
      // });
      console.log("path-------------------", path);
    },
  },
};
</script>

<style scoped lang="less">
.contentBox {
  padding: 50px;
}
.hd_tab {
  width: 400px;
  &_item {
    width: 60px;
    text-align: center;
    padding-bottom: 5px;
    &_active {
      position: relative;
      &::after {
        content: "";
        position: absolute;
        width: 100%;
        height: 5px;
        background: pink;
        left: 0;
        bottom: 0;
      }
    }
  }
}
.rv {
  margin-top: 20px;
  padding: 50px;
  border: 1px solid pink;
  border-radius: 5px;
}
</style>