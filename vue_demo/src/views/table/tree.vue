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
                  disabled: true,
                  is_d: 1,
                },
                {
                  title: "leaf 1-2-1",
                  // disableCheckbox: false,
                  disabled: false,
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

    // test
    let arr = [
      { id: 1, name: "部门1", parentId: 0 },
      { id: 2, name: "部门2", parentId: 1 },
      { id: 3, name: "部门3", parentId: 1 },
      { id: 4, name: "部门4", parentId: 3 },
      { id: 5, name: "部门5", parentId: 4 },
    ];
    // 数组-转树
    let newArr = this.tools.arrayToTree2(arr, "parentId");
    console.log(newArr);
    let newArr1 = this.tools.arrayToTree3(arr, "parentId");
    console.log(newArr1);
    let newArr2 = this.tools.arrayToTree4(arr, "parentId");
    console.log(newArr2);

    let newArr3 = this.tools.arrayToTree(arr, 0, null, "id", "parentId");
    console.log(newArr3);
  },
  methods: {
    change(e, l) {
      console.log(e, l);
    },
  },
};
</script>
