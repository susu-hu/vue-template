<template>
  <div>
    <div class="burr_f-haibao" id="posterHtml" v-if="posterImg == ''">
      <div>测试海报</div>
    </div>
    <div class="burr_f-haibao" v-if="posterImg != ''">
      <img style="z-index: 100" :src="posterImg" />
    </div>
  </div>
</template>

<script>
import html2canvas from "html2canvas";
export default {
  data() {
    return {
      posterImg: "",
    };
  },
  mounted() {
    let that = this;
    let domObj = document.getElementById("posterHtml");
    html2canvas(domObj, {
      useCORS: true,
      allowTaint: false,
      logging: false,
      letterRendering: true,
      onclone(doc) {
        let e = doc.querySelector("#posterHtml");
        e.style.display = "block";
      },
    }).then((canvas) => {
      that.posterImg = canvas.toDataURL("image/png");
    });
  },
};
</script>

<style scoped>
.burr_f-haibao {
  width: 80%;
  height: 80vh;
  margin: 3vh 10% 0;
  float: left;
  background-color: #000;
  position: relative;
}
.burr_f-haibao > img {
  width: 100%;
  height: 100%;
}
.burr_f-haibao > div {
  font-size: 14px;
  color: #fff;
  text-align: center;
  line-height: 80vh;
}
</style>