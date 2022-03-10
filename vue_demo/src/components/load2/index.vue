<template>
  <div v-if="show" :class="{ 'loading-box': content != '' }">
    <div class="load-circle flex-col">
      <div class="rect">
        <div class="rect1"></div>
        <div class="rect2"></div>
        <div class="rect3"></div>
        <div class="rect4"></div>
        <div class="rect5"></div>
      </div>
      <div class="text" v-if="content">{{ content }}</div>
    </div>
  </div>
  <!-- <div v-if="show" class="lds-spinner">
    <div class="spinner">
      <div class="double-bounce1"></div>
      <div class="double-bounce2"></div>
    </div>
  </div> -->
</template>
<script>
export default {
  name: "Loading",
  props: {
    show: Boolean,
    content: String,
  },
  data() {
    return {};
  },
};
</script>
<style lang="scss" scoped>
.loading-box {
  position: fixed;
  z-index: 1000;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
}
.flex-col {
  display: flex;
  align-items: center;
  flex-direction: column;
}
.text {
  margin-top: 10px;
  font-size: 15px;
  color: #fff;
}
.load-circle {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
}
.load-circle .rect > div {
  background-color: #ffc0cb;
  height: 15px;
  width: 15px;
  border-radius: 50%;
  float: left;
  margin-right: 5px;
  animation: stretchdelay 1.2s infinite ease-in-out;
}
.load-circle .rect > .rect2 {
  animation-delay: -1.1s;
}
.load-circle .rect > .rect3 {
  animation-delay: -1s;
}
.load-circle .rect > .rect4 {
  animation-delay: -0.9s;
}
.load-circle .rect > .rect5 {
  animation-delay: -0.8s;
}
@keyframes stretchdelay {
  0%,
  40%,
  100% {
    transform: scale(0.4);
    -webkit-transform: scale(0.4);
  }
  20% {
    transform: scale(1);
    -webkit-transform: scale(1);
  }
}
// .lds-spinner {
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
// }
// .spinner {
//   width: 25px;
//   height: 25px;
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%);
//   .double-bounce1,
//   .double-bounce2 {
//     width: 25px;
//     height: 25px;
//     border-radius: 50%;
//     background-color: #ff000f;
//     opacity: 0.6;
//     position: absolute;
//     top: 0;
//     left: 0;
//     -webkit-animation: bounce 2s infinite ease-in-out;
//     animation: bounce 2s infinite ease-in-out;
//   }
//   .double-bounce2 {
//     -webkit-animation-delay: -1s;
//     animation-delay: -1s;
//   }
// }

// @-webkit-keyframes bounce {
//   0%,
//   100% {
//     -webkit-transform: scale(0);
//   }
//   50% {
//     -webkit-transform: scale(1);
//   }
// }

// @keyframes bounce {
//   0%,
//   100% {
//     transform: scale(0);
//     -webkit-transform: scale(0);
//   }
//   50% {
//     transform: scale(1);
//     -webkit-transform: scale(1);
//   }
// }
</style>