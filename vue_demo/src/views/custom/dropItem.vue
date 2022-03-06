<template>
  <div>
    <DropSelet :showText="true" v-slot="{ selectedData }" :options="selectedData">
      {{ "+" + selectedData.value }}
    </DropSelet>
  </div>
</template>

<script>
import DropSelet from "./components/dropSelet.vue";
export default {
  name: "dropItem",
  components: {
    DropSelet,
  },

  data() {
    return {
      type: "",
      selectedData: [
        {
          text: "ss +852",
          value: "852",
        },
        {
          text: "ss +853",
          value: "853",
        },
        {
          text: "s +86",
          value: "86",
        },
        {
          text: "ces  +886",
          value: "886",
        },
        {
          text: "cessd +44",
          value: "44",
        },
      ],
    };
  },
};
</script>

<style>
</style>