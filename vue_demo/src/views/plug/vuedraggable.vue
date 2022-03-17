<template>
  <div class="contentBox">
    <div class="flex j_c">
      <div>
        <vuedraggable class="flex-row j_c" v-model="list">
          <transition-group>
            <div
              v-for="(item, index) in list"
              :key="item"
              class="item"
              :class="['blue-' + (index + 1)]"
            >
              <p>位置：{{ item }}</p>
            </div>
          </transition-group>
        </vuedraggable>
        <vuedraggable
          class="flex-row j_c"
          v-model="myArray"
          chosenClass="chosen"
          forceFallback="true"
          group="people"
          animation="1000"
          @start="onStart"
          @end="onEnd"
        >
          <transition-group>
            <div class="item00" v-for="element in myArray" :key="element.id">
              {{ element.name }}
            </div>
          </transition-group>
        </vuedraggable>
      </div>
      <div class="gf_box">
        <p>
          <a
            target="_blank"
            href="https://www.itxst.com/vue-draggable/tutorial.html"
            >中文文档</a
          >
        </p>
        <p>
          <a
            target="_blank"
            href="https://david-desmaisons.github.io/draggable-example/"
            >官方示例</a
          >
        </p>
        <p>
          <a
            target="_blank"
            href="https://sortablejs.github.io/Vue.Draggable/#/simple/"
            >官方示例</a
          >
        </p>
        <p>
          <a target="_blank" href="https://github.com/SortableJS/Vue.Draggable"
            >github地址</a
          >
        </p>
        <p>
          <router-link to="/plug/demoDrag">本地示例</router-link>
        </p>
      </div>
    </div>

    <!-- 介绍 -->
    <div>
      <table interlaced="enabled">
        <tbody>
          <tr class="ue-table-interlace-color-single firstRow">
            <th style="border-color: rgb(221, 221, 221); word-break: break-all">
              属性名称
            </th>
            <th style="border-color: rgb(221, 221, 221); word-break: break-all">
              说明
            </th>
          </tr>
          <tr class="ue-table-interlace-color-double">
            <td
              valign="top"
              style="border-color: rgb(221, 221, 221); word-break: break-all"
            >
              group
            </td>
            <td
              valign="top"
              style="border-color: rgb(221, 221, 221); word-break: break-all"
            >
              :group= "name"，相同的组之间可以相互拖拽
            </td>
          </tr>
          <tr class="ue-table-interlace-color-single">
            <td
              valign="top"
              style="border-color: rgb(221, 221, 221); word-break: break-all"
            >
              sort
            </td>
            <td
              valign="top"
              style="border-color: rgb(221, 221, 221); word-break: break-all"
            >
              :sort=
              "true",是否开启内部排序,如果设置为false,它所在组无法排序，在其他组可以拖动排序
            </td>
          </tr>
          <tr class="ue-table-interlace-color-double">
            <td
              valign="top"
              style="border-color: rgb(221, 221, 221); word-break: break-all"
            >
              delay
            </td>
            <td
              valign="top"
              style="border-color: rgb(221, 221, 221); word-break: break-all"
            >
              :delay= "0", 鼠标按下后多久可以拖拽
            </td>
          </tr>
          <tr class="ue-table-interlace-color-single">
            <td
              valign="top"
              style="border-color: rgb(221, 221, 221); word-break: break-all"
            >
              touchStartThreshold
            </td>
            <td
              valign="top"
              style="border-color: rgb(221, 221, 221); word-break: break-all"
            >
              鼠标移动多少px才能拖动元素
            </td>
          </tr>
          <tr class="ue-table-interlace-color-double">
            <td
              valign="top"
              style="border-color: rgb(221, 221, 221); word-break: break-all"
            >
              disabled
            </td>
            <td
              valign="top"
              style="border-color: rgb(221, 221, 221); word-break: break-all"
            >
              :disabled= "true",是否启用拖拽组件
            </td>
          </tr>
          <tr class="ue-table-interlace-color-single">
            <td
              valign="top"
              style="border-color: rgb(221, 221, 221); word-break: break-all"
            >
              animation
            </td>
            <td
              valign="top"
              style="border-color: rgb(221, 221, 221); word-break: break-all"
            >
              拖动时的动画效果，还是很酷的,数字类型。如设置<span
                style="background-color: rgb(252, 252, 252)"
                >animation=1000表示1秒过渡动画效果</span
              >
            </td>
          </tr>
          <tr class="ue-table-interlace-color-double">
            <td
              valign="top"
              style="border-color: rgb(221, 221, 221); word-break: break-all"
            >
              handle
            </td>
            <td
              valign="top"
              style="border-color: rgb(221, 221, 221); word-break: break-all"
            >
              :handle=".mover" 只有当鼠标移动到css为mover类的元素上才能拖动
            </td>
          </tr>
          <tr class="ue-table-interlace-color-single">
            <td
              valign="top"
              style="border-color: rgb(221, 221, 221); word-break: break-all"
            >
              filter
            </td>
            <td
              valign="top"
              style="border-color: rgb(221, 221, 221); word-break: break-all"
            >
              :filter=".unmover" 设置了unmover样式的元素不允许拖动
            </td>
          </tr>
          <tr class="ue-table-interlace-color-double">
            <td
              valign="top"
              style="border-color: rgb(221, 221, 221); word-break: break-all"
            >
              draggable
            </td>
            <td
              valign="top"
              style="border-color: rgb(221, 221, 221); word-break: break-all"
            >
              :draggable=".item" 那些元素是可以被拖动的
            </td>
          </tr>
          <tr class="ue-table-interlace-color-single">
            <td
              valign="top"
              style="border-color: rgb(221, 221, 221); word-break: break-all"
            >
              ghostClass
            </td>
            <td
              valign="top"
              style="border-color: rgb(221, 221, 221); word-break: break-all"
            >
              :ghostClass="ghostClass"&nbsp;设置拖动元素的占位符类名,你的自定义样式可能需要加!important才能生效，并把forceFallback属性设置成true
            </td>
          </tr>
          <tr class="ue-table-interlace-color-double">
            <td
              valign="top"
              colspan="1"
              rowspan="1"
              style="
                border-left-color: rgb(221, 221, 221);
                border-top-color: rgb(221, 221, 221);
                word-break: break-all;
              "
            >
              chosenClass
            </td>
            <td
              valign="top"
              colspan="1"
              rowspan="1"
              style="
                border-left-color: rgb(221, 221, 221);
                border-top-color: rgb(221, 221, 221);
                word-break: break-all;
              "
            >
              :ghostClass="hostClass" 被选中目标的样式，<span
                style="background-color: rgb(252, 252, 252)"
                >你的自定义样式可能需要加</span
              ><span style="background-color: rgb(252, 252, 252)"
                >!important才能生效，并把</span
              ><span style="background-color: rgb(252, 252, 252)"
                >forceFallback属性设置成true</span
              >
            </td>
          </tr>
          <tr class="ue-table-interlace-color-single">
            <td
              valign="top"
              colspan="1"
              rowspan="1"
              style="word-break: break-all"
            >
              dragClass
            </td>
            <td
              valign="top"
              colspan="1"
              rowspan="1"
              style="word-break: break-all"
            >
              :dragClass="dragClass"拖动元素的样式，<span
                style="background-color: rgb(252, 252, 252)"
                >你的自定义样式可能需要加</span
              ><span style="background-color: rgb(252, 252, 252)"
                >!important才能生效，并把</span
              ><span style="background-color: rgb(252, 252, 252)"
                >forceFallback属性设置成true</span
              >
            </td>
          </tr>
          <tr class="ue-table-interlace-color-double">
            <td
              valign="top"
              colspan="1"
              rowspan="1"
              style="word-break: break-all"
            >
              dataIdAttr
            </td>
            <td
              valign="top"
              colspan="1"
              rowspan="1"
              style="word-break: break-all"
            >
              dataIdAttr: 'data-id'
            </td>
          </tr>
          <tr class="ue-table-interlace-color-single">
            <td
              valign="top"
              colspan="1"
              rowspan="1"
              style="word-break: break-all"
            >
              forceFallback
            </td>
            <td
              valign="top"
              colspan="1"
              rowspan="1"
              style="word-break: break-all"
            >
              <span style="background-color: rgb(247, 250, 255)"
                >默认false，</span
              >忽略HTML5的拖拽行为，因为h5里有个属性也是可以拖动，你要自定义ghostClass
              chosenClass dragClass样式时，建议<span
                style="background-color: rgb(252, 252, 252)"
                >forceFallback设置为true</span
              >
            </td>
          </tr>
          <tr class="ue-table-interlace-color-double">
            <td
              valign="top"
              colspan="1"
              rowspan="1"
              style="word-break: break-all"
            >
              fallbackClass
            </td>
            <td
              valign="top"
              colspan="1"
              rowspan="1"
              style="word-break: break-all"
            >
              默认false，克隆的DOM元素的类名
            </td>
          </tr>
          <tr class="ue-table-interlace-color-single">
            <td
              valign="top"
              colspan="1"
              rowspan="1"
              style="word-break: break-all"
            >
              allbackOnBody
            </td>
            <td
              valign="top"
              colspan="1"
              rowspan="1"
              style="word-break: break-all"
            >
              默认false，克隆的元素添加到文档的body中
            </td>
          </tr>
          <tr class="ue-table-interlace-color-double">
            <td
              valign="top"
              colspan="1"
              rowspan="1"
              style="word-break: break-all"
            >
              fallbackTolerance
            </td>
            <td
              valign="top"
              colspan="1"
              rowspan="1"
              style="word-break: break-all"
            >
              拖拽之前应该移动的px
            </td>
          </tr>
          <tr class="ue-table-interlace-color-single">
            <td
              valign="top"
              colspan="1"
              rowspan="1"
              style="word-break: break-all"
            >
              scroll
            </td>
            <td
              valign="top"
              colspan="1"
              rowspan="1"
              style="word-break: break-all"
            >
              默认true,有滚动区域是否允许拖拽
            </td>
          </tr>
          <tr class="ue-table-interlace-color-double">
            <td
              valign="top"
              colspan="1"
              rowspan="1"
              style="word-break: break-all"
            >
              scrollFn
            </td>
            <td
              valign="top"
              colspan="1"
              rowspan="1"
              style="word-break: break-all"
            >
              滚动回调函数
            </td>
          </tr>
          <tr class="ue-table-interlace-color-single">
            <td
              valign="top"
              colspan="1"
              rowspan="1"
              style="word-break: break-all"
            >
              scrollSensitivity
            </td>
            <td
              valign="top"
              colspan="1"
              rowspan="1"
              style="word-break: break-all"
            >
              距离滚动区域多远时，滚动滚动条
            </td>
          </tr>
          <tr class="ue-table-interlace-color-double">
            <td
              valign="top"
              colspan="1"
              rowspan="1"
              style="word-break: break-all"
            >
              scrollSpeed
            </td>
            <td
              valign="top"
              colspan="1"
              rowspan="1"
              style="word-break: break-all"
            >
              滚动速度
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import vuedraggable from "vuedraggable";
export default {
  components: { vuedraggable },
  data() {
    return {
      list: [1, 2, 3, 4, 5, 6],
      myArray: [
        { people: "cn", id: 1, name: "www.itxst.com" },
        { people: "cn", id: 2, name: "www.baidu.com" },
        { people: "cn", id: 3, name: "www.taobao.com" },
        { people: "us", id: 4, name: "www.google.com" },
      ],
    };
  },
  methods: {
    //开始拖拽事件
    onStart() {},
    //拖拽结束事件
    onEnd() {},
  },
  updated() {
    console.log(this.list);
  },
};
</script>

<style lang="scss" scoped>
$blue_1: #3c7188;
$blue_2: #c6c919;
$blue_3: #250155;
$blue_4: #c0b1d3;
$blue_5: #df7d21;
$blue_6: #ee7f5d;
.item {
  width: 300px;
  height: 50px;
  background-color: pink;
  color: #ffffff;
  margin: 20px;
  border-radius: 20px;
  text-align: center;
  line-height: 50px;
}
$colors: #3c7188 #c6c919 #c0b1d3 #ee7f5d #250155 #df7d21;
@for $i from 1 through 6 {
  .blue-#{$i} {
    background-color: nth($colors, $i);
  }
}

/*被拖拽对象的样式*/
.item00 {
  padding: 6px;
  background-color: #fdfdfd;
  border: solid 1px #eee;
  margin-bottom: 10px;
  cursor: move;
  width: 300px;
}
/*选中样式*/
.chosen {
  border: solid 2px #3089dc !important;
}
th {
  background-color: #f1f1f1;
  padding: 8px 10px;
  font-size: 14px;
}
table,
tr,
th,
td {
  border: 1px solid #ddd;
  padding: 5px 2px;
  vertical-align: middle;
  text-align: center;
}
table {
  margin-top: 15px;
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
}
.ue-table-interlace-color-single td {
  background-color: #eceff7;
  padding: 6px 10px !important;
  font-size: 14px;
}
.gf_box {
  width: 300px;
  border-radius: 20px;
  padding: 20px;
  box-sizing: border-box;
  background-image: linear-gradient(to right, #a8edea 0%, #fed6e3 100%);
  color: #fff;
  font-size: 16px;
}
a {
  color: #fff;
}
</style>