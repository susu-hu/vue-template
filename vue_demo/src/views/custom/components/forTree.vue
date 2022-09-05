<template>
  <div>
    <ul>
      <li v-for="item in children" :key="item.id">
        <p type="primary" @click="change(item)" :disabled="!item.children">
          <span>
            <i  class="el-icon-arrow-up" v-if="item.show"></i>
            <i class="el-icon-arrow-down" v-else></i>
          </span>
          <span>{{item.name}}</span>
        </p>
        <div style="padding-left:30px">
          <for-tree v-if="item.children && item.show" :children="item.children"></for-tree>
        </div>
      </li>
    </ul>
  </div>
</template>
 
<script>
export default {
  name: "forTree",
  props: { children: Array },
  data() {
    return {};
  },
  methods: {
    change(item) {
      item.show = !item.show;
    },
  },
};
</script>