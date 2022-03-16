export default {
  // 时间戳转年月日，accurate为true时精确到时分秒
  formatDate: function (timestamp, accurate) {
    if (!timestamp) {
      return ''
    }
    var date = new Date(timestamp);
    var year = date.getFullYear();
    var month = addZero(date.getMonth() + 1);
    var day = addZero(date.getDate());
    var hours = addZero(date.getHours());
    var minutes = addZero(date.getMinutes());
    var seconds = addZero(date.getSeconds());
    if (accurate) { return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds; }
    return year + '-' + month + '-' + day;
  },

  // 选择器时间转月份 yyyy-mm
  yyyymm: function (d) {
    if (!d) { return '' }
    let str = new Date(d);
    let y = String(str.getFullYear());
    let m = String(str.getMonth() + 1);
    if (m.length == 1) { m = '0' + m }
    return y + m;
  },

  // 将数组转换成树的形式,传入array数据，返回tree数据；
  arrayToTree(list, type, name) {
    let key = name ? name : 'name';
    let cloneList = list.map((item) => {
      // type 1树形选择 2树形目录
      return type == 1 ? {
        ...item,
        opened: true,
      } : {
        ...item,
        title: item[key],
        expand: true,
      }
    })
    return cloneList.filter((father) => {
      let branchArr = cloneList.filter(
        (child) => father['code'] == child['parentCode']
      )
      branchArr.length > 0 ? (father['children'] = branchArr) : '';
      return father['code'] == '';//父级code键名，默认为''
    })
  },

  // 将树转换成数组的形式,传入tree数据，返回array数据
  treeToArray: function (tree) {
    let arr = [];
    const expanded = datas => {
      if (datas && datas.length > 0) {
        datas.forEach(e => {
          arr.push(e);
          expanded(e.children);
        })
      }
    };
    expanded(tree);
    return arr;
  },
  sleep(milliSeconds) {
    var startTime = new Date().getTime();
    while (new Date().getTime() < startTime + milliSeconds);
  }
}

//加0
function addZero(num) {
  return num < 10 ? '0' + num : num;
}