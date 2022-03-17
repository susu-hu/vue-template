<template>
  <div class="container">
    <div class="title">
      <p>Welcome to SUSU's Blog</p>
      <div class="head"></div>
    </div>
    <div class="box"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {
    // window.addEventListener("resize", function () {
    //   document.getElementById("demo").innerHTML = sometext;
    // });
    // window.addEventListener("load", () => {
    //   let body = document.body;
    //   let content = [
    //     "❤去活出你自己。❤",
    //     "❤《日不落》❤",
    //     "❤《一格格》❤",
    //     "❤《森林巴士》❤",
    //     "❤《爱就一个字》❤",
    //     "❤《星辰大海》❤",
    //     "❤《千千万万》❤",
    //     "❤《我在等》❤",
    //     "❤《如一》❤",
    //     "❤《收敛》❤",
    //     "❤《间距》❤",
    //     "❤《早点早点》❤",
    //     "❤《阿拉斯加海湾》❤",
    //     "❤《Peace&Love》❤",
    //     "❤《灰色》❤",
    //     "❤《带你回家》❤",
    //     "❤《等我回家》❤",
    //     "❤《0919》❤",
    //     "❤《我很好》❤",
    //     "❤《会不会》❤",
    //     "❤《经济舱》❤",
    //     "❤《我走后》❤",
    //     "❤《不删》❤",
    //     "❤《Girls》❤",
    //     "❤《Let Her Go》❤",
    //     "❤《关于你的梦》❤",
    //     "❤《慢慢》❤",
    //     "❤《下雨天》❤",
    //     "❤《翅膀》❤",
    //     "❤《靠近一点》❤",
    //     "❤《翅膀》❤",
    //     "❤《This Is Love》❤",
    //     "❤《重来》❤",
    //     "❤《晴天》❤",
    //     "❤《空白格》❤",
    //     "❤《爱你3000》❤",
    //     "❤《下落不明》❤",
    //     "❤《我要》❤",
    //     "❤《晚星》❤",
    //     "❤《你，好不好？》❤",
    //     "❤《50 Feet》❤",
    //     "❤《COCO》❤",
    //     "❤《NUMB》❤",
    //     "❤《重演》❤",
    //     "❤《所念皆星河》❤",
    //   ]; //自定义内容的数组
    //   body.addEventListener("click", (e) => {
    //     console.log("dasdasdas");
    //     let x = e.pageX;
    //     let y = e.pageY; //当前坐标
    //     let randContent = Math.ceil(Math.random() * content.length);
    //     let text = new Text(x, y, randContent);
    //     let span = document.createElement("span");
    //     span.style.color = text.getRandom();
    //     text.create(span);
    //     setTimeout(function () {
    //       text.out(span);
    //     }, 1900);
    //   });
    //   function Text(x, y, rand) {
    //     this.x = x;
    //     this.y = y;
    //     this.rand = rand;
    //   }
    //   Text.prototype.create = function (_this) {
    //     let body = document.body;
    //     _this.innerHTML = content[this.rand - 1];
    //     _this.className = "text";
    //     _this.style.top = this.y - 20 + "px";
    //     _this.style.left = this.x - 50 + "px";
    //     _this.style.animation = "remove 142s";
    //     body.appendChild(_this);
    //     let i = 0;
    //     setInterval(() => {
    //       _this.style.top = this.y - 20 - i + "px";
    //       i++;
    //     }, 10);
    //   };
    //   Text.prototype.out = function (_this) {
    //     _this.remove();
    //   };
    //   //设置随机颜色
    //   Text.prototype.getRandom = function () {
    //     let allType = "0,1,2,3,4,5,6,7,8,9,a,b,c,d,e,f"; //16进制颜色
    //     let allTypeArr = allType.split(","); //通过','分割为数组
    //     let color = "#";
    //     for (var i = 0; i < 6; i++) {
    //       //随机生成一个0-16的数
    //       var random = parseInt(Math.random() * allTypeArr.length);
    //       color += allTypeArr[random];
    //     }
    //     return color; //返回随机生成的颜色
    //   };
    // });
  },
  created() {},
  methods: {},
};
</script>

<style scoped>
.container {
  background: pink;
  border-radius: 10px;
  width: 100%;
  background-image: url(https://files.cnblogs.com/files/yanggb/flower-opacity-30-lit.gif);
}
.title {
  position: relative;
  font-size: 60px;
  text-align: center;
  font-weight: bold;
}
.title p {
  background-image: -webkit-gradient(
    linear,
    left top,
    right top,
    color-stop(0, #fbccd0),
    color-stop(0.15, #f3eca4),
    color-stop(0.3, #a1c0fe),
    color-stop(0.45, #8de29b),
    color-stop(0.6, #fbccd0),
    color-stop(0.75, #f3eca4),
    color-stop(0.9, #a1c0fe),
    color-stop(1, #64dcec)
  );
  color: transparent;
  background-clip: text;
  -webkit-background-clip: text;
  transform-origin: center center;
  animation: shake 5s infinite ease-in-out running;
}
@keyframes shake {
  0% {
    transform: translate(0px, 0px) rotate(0deg);
  }
  2% {
    transform: translate(6px, -7px) rotate(2.5deg);
  }
  4% {
    transform: translate(8px, -8px) rotate(2.5deg);
  }
  6% {
    transform: translate(1px, -8px) rotate(-3.5deg);
  }
  8% {
    transform: translate(-3px, 4px) rotate(-0.5deg);
  }
  10% {
    transform: translate(0px, -3px) rotate(1.5deg);
  }
  12% {
    transform: translate(-1px, 2px) rotate(0.5deg);
  }
  14% {
    transform: translate(6px, 6px) rotate(-1.5deg);
  }
  16% {
    transform: translate(-7px, 4px) rotate(-0.5deg);
  }
  18% {
    transform: translate(7px, 8px) rotate(-3.5deg);
  }
  20% {
    transform: translate(-6px, 2px) rotate(1.5deg);
  }
  22% {
    transform: translate(9px, 5px) rotate(-1.5deg);
  }
  24% {
    transform: translate(7px, -2px) rotate(0.5deg);
  }
  26% {
    transform: translate(-7px, -10px) rotate(-0.5deg);
  }
  28% {
    transform: translate(-10px, -8px) rotate(-1.5deg);
  }
  30% {
    transform: translate(8px, 4px) rotate(0.5deg);
  }
  32% {
    transform: translate(0px, 4px) rotate(1.5deg);
  }
  34% {
    transform: translate(-8px, 6px) rotate(-0.5deg);
  }
  36% {
    transform: translate(-5px, 7px) rotate(1.5deg);
  }
  38% {
    transform: translate(-4px, -4px) rotate(-1.5deg);
  }
  40% {
    transform: translate(9px, 4px) rotate(-1.5deg);
  }
  42% {
    transform: translate(9px, -5px) rotate(2.5deg);
  }
  44% {
    transform: translate(-5px, -4px) rotate(-2.5deg);
  }
  46% {
    transform: translate(7px, -7px) rotate(1.5deg);
  }
  48% {
    transform: translate(-5px, 8px) rotate(0.5deg);
  }
  50% {
    transform: translate(9px, 1px) rotate(-1.5deg);
  }
  52% {
    transform: translate(-9px, -5px) rotate(-3.5deg);
  }
  54% {
    transform: translate(-2px, 9px) rotate(1.5deg);
  }
  56% {
    transform: translate(6px, -1px) rotate(1.5deg);
  }
  58% {
    transform: translate(-6px, 0px) rotate(-0.5deg);
  }
  60% {
    transform: translate(3px, 1px) rotate(1.5deg);
  }
  62% {
    transform: translate(5px, -7px) rotate(-0.5deg);
  }
  64% {
    transform: translate(9px, 2px) rotate(2.5deg);
  }
  66% {
    transform: translate(6px, 0px) rotate(-2.5deg);
  }
  68% {
    transform: translate(5px, -4px) rotate(-2.5deg);
  }
  70% {
    transform: translate(-8px, 5px) rotate(-2.5deg);
  }
  72% {
    transform: translate(-6px, -2px) rotate(0.5deg);
  }
  74% {
    transform: translate(-3px, 7px) rotate(-3.5deg);
  }
  76% {
    transform: translate(-7px, -8px) rotate(-3.5deg);
  }
  78% {
    transform: translate(-1px, -2px) rotate(2.5deg);
  }
  80% {
    transform: translate(8px, 6px) rotate(-2.5deg);
  }
  82% {
    transform: translate(-2px, -9px) rotate(2.5deg);
  }
  84% {
    transform: translate(8px, -10px) rotate(-0.5deg);
  }
  86% {
    transform: translate(-6px, 0px) rotate(2.5deg);
  }
  88% {
    transform: translate(-1px, 9px) rotate(-3.5deg);
  }
  90% {
    transform: translate(-7px, 8px) rotate(1.5deg);
  }
  92% {
    transform: translate(-10px, -8px) rotate(0.5deg);
  }
  94% {
    transform: translate(-8px, 6px) rotate(1.5deg);
  }
  96% {
    transform: translate(4px, -9px) rotate(2.5deg);
  }
  98% {
    transform: translate(-4px, 9px) rotate(0.5deg);
  }
}
.head {
  width: 120px;
  height: 120px;
  background-image: url("https://i.postimg.cc/BnM0rzn9/sunrise.gif");
  background-repeat: no-repeat;
  background-size: 120px 120px;
  opacity: 0.8;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 1;
}
.box {
  width: 100%;
  height: calc(100vh - 260px);
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 1px 6px rgb(0 0 0 / 20%);
}
</style>