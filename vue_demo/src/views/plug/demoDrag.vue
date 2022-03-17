<template>
  <div class="contentBox">
    <div class="fluid container">
      <div class="form-group form-group-lg panel panel-default">
        <div class="panel-heading">
          <h3 class="panel-title mb20">是否可拖动</h3>
        </div>
        <div class="panel-body ">
          <div class="checkbox mb20">
            <label
              ><input type="checkbox" v-model="editable" />Enable drag and
              drop</label
            >
          </div>
          <Button type="primary"  @click="orderList">
            原始排序
          </Button>
        </div>
      </div>

      <div class="col-md-3">
        <draggable
          class="list-group"
          tag="ul"
          v-model="list"
          v-bind="dragOptions"
          :move="onMove"
          @start="isDragging = true"
          @end="isDragging = false"
        >
          <transition-group type="transition" :name="'flip-list'">
            <li
              class="list-group-item"
              v-for="element in list"
              :key="element.order"
            >
              <i
                :class="
                  element.fixed ? 'fa fa-anchor' : 'glyphicon glyphicon-pushpin'
                "
                @click="element.fixed = !element.fixed"
                aria-hidden="true"
              ></i>
              {{ element.name }}
              <span class="badge">{{ element.order }}</span>
            </li>
          </transition-group>
        </draggable>
      </div>

      <div class="col-md-3">
        <draggable
          element="span"
          v-model="list2"
          v-bind="dragOptions"
          :move="onMove"
        >
          <transition-group name="no" class="list-group" tag="ul">
            <li
              class="list-group-item"
              v-for="element in list2"
              :key="element.order"
            >
              <i
                :class="
                  element.fixed ? 'fa fa-anchor' : 'glyphicon glyphicon-pushpin'
                "
                @click="element.fixed = !element.fixed"
                aria-hidden="true"
              ></i>
              {{ element.name }}
              <span class="badge">{{ element.order }}</span>
            </li>
          </transition-group>
        </draggable>
      </div>

      <div class="list-group col-md-3">
        <pre>{{ listString }}</pre>
      </div>
      <div class="list-group col-md-3">
        <pre>{{ list2String }}</pre>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
const message = [
  "vue.draggable",
  "draggable",
  "component",
  "for",
  "vue.js 2.0",
  "based",
  "on",
  "Sortablejs",
];
export default {
  name: "hello",
  components: {
    draggable,
  },
  data() {
    return {
      list: message.map((name, index) => {
        return { name, order: index + 1, fixed: false };
      }),
      list2: [],
      editable: true,
      isDragging: false,
      delayedDragging: false,
    };
  },
  methods: {
    orderList() {
      this.list = this.list.sort((one, two) => {
        return one.order - two.order;
      });
    },
    onMove({ relatedContext, draggedContext }) {
      const relatedElement = relatedContext.element;
      const draggedElement = draggedContext.element;
      return (
        (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
      );
    },
  },
  computed: {
    dragOptions() {
      return {
        animation: 0,
        group: "description",
        disabled: !this.editable,
        ghostClass: "ghost",
      };
    },
    listString() {
      return JSON.stringify(this.list, null, 2);
    },
    list2String() {
      return JSON.stringify(this.list2, null, 2);
    },
  },
  watch: {
    isDragging(newValue) {
      if (newValue) {
        this.delayedDragging = true;
        return;
      }
      this.$nextTick(() => {
        this.delayedDragging = false;
      });
    },
  },
};
</script>

<style scoped>
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.list-group {
  min-height: 20px;
}
.list-group-item {
  cursor: move;
  margin: 20px;
  background-image: linear-gradient(to right, #a8edea 0%, #fed6e3 100%);
  padding: 10px;
  border-radius: 20px;
  color: #fff;
}
.list-group-item i {
  cursor: pointer;
}
pre {
  background: #222;
  color: #fff;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 20px;
}
</style>