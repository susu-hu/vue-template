// AMap.js
// 项目只有几处需要用到地图，并不需要全局引入
// 在index文件中引入js会明显拖慢首屏加载速度
// 高德map   https://webapi.amap.com/maps?v=1.4.11&key=你的高德地图的key
export default function MapLoader() {
  return new Promise((resolve, reject) => {
    if (window.AMap) {
      resolve(window.AMap);
    } else {
      var script = document.createElement("script");
      script.type = "text/javascript";
      script.async = true;
      //https://webapi.amap.com/loader.js
      script.src =
        "http://webapi.amap.com/maps?v=1.4.11&callback=initAMap&key='";
      script.onerror = reject;
      document.head.appendChild(script);
    }
    window.initAMap = () => {
      resolve(window.AMap);
    };
  });
}
