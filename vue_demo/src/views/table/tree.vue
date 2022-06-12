<template>
  <div class="contentBox">
    <Tree :data="data" show-checkbox multiple @on-check-change="change"></Tree>
  </div>
</template> 
<script>
export default {
  data() {
    return {
      data: [
        {
          title: "parent 1",
          expand: true,
          children: [
            {
              title: "parent 1-1",
              expand: true,
              children: [
                {
                  title: "leaf 1-1-1",
                  // disabled: false,
                  disableCheckbox: true,
                  is_d: 1,
                },
                {
                  title: "leaf 1-1-2",
                  // disabled: false,
                  disableCheckbox: true,
                  is_d: 1,
                },
              ],
            },
            {
              title: "parent 1-2",
              expand: true,
              children: [
                {
                  title: "leaf 1-2-1",
                  disableCheckbox: true,
                  is_d: 1,
                },
                {
                  title: "leaf 1-2-1",
                  disableCheckbox: false,
                  disable: true,
                  is_d: 0,
                },
              ],
            },
          ],
        },
      ],
    };
  },
  created() {
    this.data.forEach((item) => {
      if (item.children)
        item.children.forEach((i0) => {
          if (i0.children) {
            let num = i0.children.filter((i1) => i1.is_d == 1).length;
            if (num == i0.children.length) {
              i0.disableCheckbox = true;
              item.disableCheckbox = true;
            }
          }
        });
    });
  },
  methods: {
    change(e, l) {
      console.log(e, l);
    },
  },
};
</script>
