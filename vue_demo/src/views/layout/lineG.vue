<template>
  <div class="contentBox">
    <p class="mb20 hd_t">渐变</p>
    <div class="line1 mb20"></div>
    <p class="mb20 hd_t">transform: skew(-45deg)</p>
    <div class="line2 mb20">
      <div class="line-item"></div>
      <div class="line-item"></div>
      <div class="line-item"></div>
      <div class="line-item"></div>
      <div class="line-item"></div>
      <div class="line-item"></div>
      <div class="line-item"></div>
      <div class="line-item"></div>
      <div class="line-item"></div>
      <div class="line-item"></div>
      <div class="line-item"></div>
      <div class="line-item"></div>
      <div class="line-item"></div>
    </div>
    <p class="mb20 hd_t">平行四边形+文字:伪元素skew</p>
    <div class="line3 mb20">苏苏就是小苏苏</div>
    <!-- transform中的skew()/skewX()/skewY()方法，可以让元素斜切，从而实现平行四边形效果 ，局限性，使得文字也倾斜-->
    <p class="mb20 hd_t">CSS Shapes布局与三角</p>
    <!-- CSS Shapes实现平行四边形布局的关键不在于平行四边形本身，而在于左上角和右下角的两个三角形 -->
    <div class="mb20">
      <div class="shape-left"></div>
      <div class="shape-right"></div>
      <content class="content">
        <p>内容内容内容内容内容内容内容内容内容内容内</p>
        <p>内容内容内容内容内容内容内容内容内容内容内</p>
        <p>内容内容内容内容内容内容内容内容内容内容内</p>
        <p>内容内容内容内容内容内容内容内容内容内容内</p>
      </content>
    </div>
    <div class="mb20">
      <div class="line4">
        <img src="../../assets/img/susu.png" alt="" width="200" height="90" />
        <p>苏苏</p>
      </div>
    </div>
    <div class="mb20">
      <div class="line5">
        <a href="javascript:;" class="fp active"><span>1</span></a>
        <a href="javascript:;" class="mp"><span>2</span></a>
        <a href="javascript:;" class="mp"><span>3</span></a>
        <a href="javascript:;" class="mp"><span>4</span></a>
        <a href="javascript:;" class="mp"><span>5</span></a>
        <a href="javascript:;" class="np"><span>next</span></a>
        <a href="javascript:;" class="lp"><span>last</span></a>
      </div>
    </div>

    <div class="fixed">
      <div class="tran">
        <span>
          <a target="_blank" href="https://gitee.com/susuhhhhhh/su-sus-vue"
            >Gitee</a
          ></span
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="less" scoped>
.fixed {
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  right: 100px;
  margin: 0 0.938rem 3.125rem;
  display: inline-block;
  border: 1px solid #eee;
  border-radius: 5px;
  min-height: 17.813rem;
  width: 300px;
  transition: all 0.3s;
  box-shadow: 1px 10px 6px -6px #ccc;
  z-index: 11;
  background: #fff;
  .tran {
    position: absolute;
    right: -5px;
    top: -5px;
    z-index: 1;
    overflow: hidden;
    width: 75px;
    height: 75px;
    text-align: right;
    span {
      font-size: 0.75rem;
      font-weight: bold;
      text-transform: uppercase;
      text-align: center;
      line-height: 20px;
      -webkit-transform: rotate(45deg);
      -ms-transform: rotate(45deg);
      transform: rotate(45deg);
      -webkit-transform: rotate(45deg);
      width: 100px;
      display: block;
      background: #b31917;
      position: absolute;
      top: 19px;
      right: -21px;
      background: #df5a1d;
      a {
        color: #fff;
      }
      &:before {
        content: "";
        position: absolute;
        left: 0;
        top: 100%;
        z-index: -1;
        border-right: 3px solid transparent;
        border-bottom: 3px solid transparent;
        border-left: 3px solid #b5e5ee;
        border-top: 3px solid #b5e5ee;
      }
      &:after {
        content: "";
        position: absolute;
        right: 0;
        top: 100%;
        z-index: -1;
        border-left: 3px solid transparent;
        border-bottom: 3px solid transparent;
        border-right: 3px solid #b5e5ee;
        border-top: 3px solid #b5e5ee;
      }
    }
  }
}
.line5 {
  &::after {
    display: block;
    content: "";
    clear: both;
  }
  a {
    display: block;
    float: left;
    color: antiquewhite;
    height: 20px;
    margin-right: 10px;
    text-decoration: none;
    background: pink;
    &.active,
    &:hover {
      color: #fff !important;
    }
  }
  div {
    float: left;
  }
  .mp {
    width: 40px;
    transform-origin: 0 0;
    transform: skew(30deg);
    position: relative;
    span {
      display: block;
      transform-origin: 0 0;
      transform: skew(-30deg);
      position: relative;
      left: 22px;
    }
  }
  .fp {
    width: 30px;
    position: relative;
    margin-right: 12px;
    span {
      display: block;
      text-align: center;
    }
    &::after {
      display: inline-block;
      content: "";
      position: absolute;
      top: 0;
      right: -12px;
      border-top: 10px solid transparent;
      border-right: 6px solid transparent;
      border-bottom: 10px solid pink;
      border-left: 6px solid pink;
    }
  }
  .np {
    width: 40px;
    position: relative;
    margin-left: 12px;
    &::before {
      display: inline-block;
      content: "";
      position: absolute;
      top: 0;
      left: -12px;
      border-top: 10px solid pink;
      border-right: 6px solid pink;
      border-bottom: 10px solid transparent;
      border-left: 6px solid transparent;
    }
    span {
      display: block;
      text-align: center;
    }
  }
  .lp {
    width: 40px;
    span {
      display: block;
      text-align: center;
    }
  }
}
.line4 {
  width: 120px;
  height: 160px;
  transform-origin: 0 0;
  transform: skew(-26deg);
  background: pink;
  position: relative;
  overflow: hidden;
  & > * {
    transform-origin: 0 0;
    transform: skew(-26deg);
    position: relative;
  }
  p {
    transform: skew(26deg);
    width: 80px;
    left: 30px;
  }
}
.shape-left {
  float: left;
  width: 100px;
  height: 200px;
  shape-outside: polygon(0 0, 100% 0, 0 100%);
}
.shape-right {
  float: right;
  width: 100px;
  height: 200px;
  shape-outside: polygon(100% 0, 100% 100%, 0 100%);
}
.content {
  display: block;
  position: relative;
  z-index: 1;
  width: 400px;
  padding: 20px;
  color: #fff;
}
.content::after {
  content: "";
  position: absolute;
  left: 40px;
  right: 40px;
  top: 0;
  bottom: 80px;
  background: pink;
  transform: skewX(-20deg);
  z-index: -1;
  width: 100%;
  height: 100%;
}
.line3 {
  width: 100px;
  height: 50px;
  text-align: center;
  line-height: 50px;
  color: #fff;
  position: relative;
  z-index: 1;
  &::after {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: pink;
    z-index: -1;
    transform: skewX(-22deg);
  }
}
.line2 {
  width: 100%;
  height: 2px;
  overflow: hidden;
  .line-item {
    width: 15px;
    height: 2px;
    margin-right: 6px;
    color: #333;
    transform: skew(-45deg);
    float: left;
    &:nth-child(odd) {
      background-color: #1989fa;
    }
    &:nth-child(even) {
      background-color: #ff6c6c;
    }
    &:last-child {
      margin-right: 0;
    }
  }
}

.line1 {
  height: 10px;
  background-color: #fff;
  position: relative;
  &::after {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    height: 2px;
    background: repeating-linear-gradient(
      -45deg,
      #ff6c6c,
      #ff6c6c 20%,
      transparent 0,
      transparent 25%,
      #1989fa 0,
      #1989fa 45%,
      transparent 0,
      transparent 50%
    );
    background-size: 80px;
    content: "";
  }
}
</style>