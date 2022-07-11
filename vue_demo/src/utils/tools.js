/* eslint-disable */
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
    if (accurate) {
      return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
    }
    return year + '-' + month + '-' + day;
  },

  // 选择器时间转月份 yyyy-mm
  yyyymm: function (d) {
    if (!d) {
      return ''
    }
    let str = new Date(d);
    let y = String(str.getFullYear());
    let m = String(str.getMonth() + 1);
    if (m.length == 1) {
      m = '0' + m
    }
    return y + m;
  },

  // 将数组转换成树的形式,传入array数据，返回tree数据；
  arrayToTree(list, type, name, cid, pid) {
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
        // expand: item.parent > -1 ? false : true,
      }
    })
    return cloneList.filter((father) => {
      let branchArr = cloneList.filter(
        (child) => father[cid] == child[pid]
      )
      branchArr.length > 0 ? (father['children'] = branchArr) : '';
      return father[pid] == ''; //父级code键名，默认为''
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
  },

  /*函数节流*/
  throttle(fn, interval) {
    var enterTime = 0; //触发的时间
    var gapTime = interval || 300; //间隔时间，如果interval不传值，默认为300ms
    return function () {
      var that = this;
      var backTime = new Date(); //第一次函数return即触发的时间
      if (backTime - enterTime > gapTime) {
        fn.call(that, arguments)
        enterTime = backTime; //赋值给第一次触发的时间 保存第二次触发时间
      }
    };
  },
  /*函数防抖*/
  debounce(fn, interval) {
    var timer;
    var gapTime = interval || 1000; //间隔时间 不传值默认为1000ms
    return function () {
      clearTimeout(timer);
      var that = this;
      var args = arguments; //保存arguments setTimeout是全局的 arguments不是防抖函数需要的
      timer = setTimeout(function () {
        fn.call(that, args);
      }, gapTime);
    };
  },
  /** 
   * 深拷贝  
   *  @param source Array/Object  对象/数组
   */
  deepClone(source) {
    const targetObj = source.constructor === Array ? [] : {}; // 判断复制的目标是数组还是对象
    for (let keys in source) { // 遍历目标
      if (source.hasOwnProperty(keys)) {
        if (source[keys] && typeof source[keys] === 'object') { // 如果值是对象，就递归一下
          targetObj[keys] = source[keys].constructor === Array ? [] : {};
          targetObj[keys] = deepClone(source[keys]);
        } else { // 如果不是，就直接赋值
          targetObj[keys] = source[keys];
        }
      }
    }
    return targetObj;
  },

  /**
 * 数组去重
 * @param {*} arr 数组
 * @param {*} key 去重key值
 */
  duplicateList(arr, key) {
    let obj = {};
    arr = arr.reduce((item, next) => {
      if (!obj[next[key]]) {
        item.push(next);
        obj[next[key]] = true;
      }
      return item;
    }, []);
    return arr;
  },

  /**
 * 搜索树
 * @param {*} key 搜索匹配字段，如name
 * @param {*} primary 数组去重字段 唯一
 * @param {*} value 搜索字段
 * @param {*} arr 树列表
 * @returns 
 */
  searchTree(key, primary, value, arr) {
    let newarr = [];
    arr.forEach((item) => {
      if (item.children && item.children.length) {
        if (item[key].indexOf(value) > -1) {
          item.expand = true;
          newarr.push(item);
        }
        const i = this.duplicateList(this.searchTree(key, primary, value, item.children), primary);
        const obj = {
          ...item,
          expand: true,
          children: i,
        };
        if (i && i.length) {
          newarr.push(obj);
        }
      } else {
        if (item[key].indexOf(value) > -1) {
          newarr.push(item);
        }
      }
    });
    return newarr;
  },

  /**
   * 回显已选中的树
   * @param {*} key 判断是否选择的字段
   * @param {*} data 树
   * @param {*} list 已选中列表
   * @returns 
   */
  getCheckedTree(key, data, list) {
    data.forEach((item) => {
      if (
        list.filter((it) => {
          return it[key] == item[key];
        }).length > 0
      ) {
        item.checked = true;
      } else {
        item.checked = false;
      }
      if (item.children && item.children.length) {
        item.children = this.getCheckedTree(key, item.children, list);

      }
    });
    return data;
  },

  /**
   * 获取满足条件的树列表下面的所有target字段
   * @param {*} data 
   * @param {*} key 
   * @param {*} target 
   * @param {*} outList 
   * @returns 
   */
  getUnCheckedList(data, key, target, outList) {
    data.forEach((item) => {
      if (!item[key]) {
        outList.push(item[target]);
      }
      if (item.children && item.children.length) {
        this.getUnCheckedList(item.children, key, target, outList);
      }
    });
    return outList;
  },

  /**
   * 高亮
   * @param {*} value 
   * @param {*} key 
   * @param {*} data 
   * @returns 
   */
  hightLight(value, key, data) {
    data.forEach((item) => {
      if (
        item[key].indexOf(value) > -1
      ) {
        item.selected = true;
      } else {
        item.selected = false;
      }
      if (item.children && item.children.length) {
        item.children = this.hightLight(value, key, item.children);
      }
    });
    return data;
  },
  /**
   * 数组-转到树
   * @param {*} items 
   * @param {*} key 
   * @returns 
   */
  arrayToTree2(items, key) {
    const result = [];   // 存放结果集
    const itemMap = {};  // 
    for (const item of items) {
      const id = item.id;
      const pid = item[key];
      if (!itemMap[id]) {
        itemMap[id] = {
          children: [],
        }
      }
      itemMap[id] = {
        ...item,
        children: itemMap[id]['children']
      }
      const treeItem = itemMap[id];
      if (pid === 0) {
        result.push(treeItem);
      } else {
        if (!itemMap[pid]) {
          itemMap[pid] = {
            children: [],
          }
        }
        itemMap[pid].children.push(treeItem)
      }
    }
    return result;
  },
  /**
   * 数组-转到树 非递归
   * @param {*} arr 
   * @returns 
   */
  arrayToTree3(arr, key) {
    const newArr = []
    const map = {}
    arr.forEach(item => {
      item.children = []
      map[item.id] = item

    })
    arr.forEach(item => {
      const parent = map[item[key]]
      parent ? parent.children.push(item) : newArr.push(item)
    })
    return newArr
  },
  arrayToTree4(data, key) {
    let tree = []
    if (!Array.isArray(data)) {
      return tree
    }
    let map = {}
    data.forEach(item => {
      map[item.id] = item
    })
    data.forEach(item => {
      let parent = map[item[key]]
      item['label'] = item.name
      if (parent) {
        (parent.children || (parent.children = [])).push(item)
      } else {
        tree.push(item)
      }
    })
    return tree
  }
}

//加0
function addZero(num) {
  return num < 10 ? '0' + num : num;
}





