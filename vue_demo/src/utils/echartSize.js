/* Echarts图表字体、间距自适应 */
/* eslint-disable */
export const fitChartSize = (size) => {
  var width = document.documentElement.getBoundingClientRect().width;
  var height = document.documentElement.getBoundingClientRect().height;
  let screenDesignRatio = 1920 / 1080;
  var screenRatio = width / height;
  let w = width / 1920;
  let h = height / 1080;
  // let scale= null;
  if (!width) return size;
  // if (screenRatio < screenDesignRatio) {
  //   scale = w;
  // } else {
  //   scale = h;
  // }
  let scale = (width / 1920);
  return Number((size * scale).toFixed(2));
}
fitChartSize()
window.addEventListener('resize', () => fitChartSize());
