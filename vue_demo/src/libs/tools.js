/* eslint-disable no-unused-vars */
/**
 * 比较两个日期的大小
 * @param {*} startTime 开始时间
 * @param {*} endTime 结束时间
 * @returns 
 */
export const compareTime = (startTime, endTime) => {
    return (new Date(endTime && endTime.replace(/-/g, "\\/"))) > (new Date(startTime && startTime.replace(/-/g, "\\/")));
}

/**
 * 获取数组中时间最小的对象
 * @param {*} arr 
 * @param {*} type 
 * @returns 
 */
export const getMinObj = (arr, type) => {
    var mini = 0;
    for (let i = 0; i < arr.length; i++) {
        if (new Date(arr[mini].dataTime.replace(/-/g, "/")) >= new Date(arr[i].dataTime.replace(/-/g,
            "/"))) {
            mini = i;
        }
    }
    return arr[mini];
}


/**
 * 获取数组中时间最大的对象
 * @param {*} arr 
 * @param {*} type 
 * @returns 
 */
export const getMaxObj = (arr, type) => {
    var maxi = 0;
    for (let i = 0; i < arr.length; i++) {
        if (new Date(arr[maxi].dataTime.replace(/-/g, "/")) <= new Date(arr[i].dataTime.replace(/-/g,
            "/"))) {
            maxi = i;
        }
    }
    return arr[maxi];
}

/**
 * 获取指定日期的前一天，后一天
 * @param {*} date 指定日期
 * @param {*} day 1：后一天 -1：前一天
 * @returns 
 */
export const getNextDate = (date, day) => {
    if (!date) date = new Date();
    let dd = new Date(date);
    dd.setDate(dd.getDate() + day);
    let y = dd.getFullYear(),
        m = dd.getMonth() + 1 < 10 ? "0" + (dd.getMonth() + 1) : dd.getMonth() + 1,
        d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate();
    return y + "-" + m + "-" + d;
}

/**
 * 日期格式化
 * @param {*} timestamp 
 * @param {*} accurate ：true 带时间 
 * @returns 
 */
export const formatDate = (timestamp, accurate) => {
    if (!timestamp) {
        return "";
    }
    var date = new Date(timestamp);
    var year = date.getFullYear();
    var month = addZero(date.getMonth() + 1);
    var day = addZero(date.getDate());
    var hours = addZero(date.getHours());
    var minutes = addZero(date.getMinutes());
    var seconds = addZero(date.getSeconds());
    if (accurate) {
        return (
            year +
            "-" +
            month +
            "-" +
            day +
            " " +
            hours +
            ":" +
            minutes +
            ":" +
            seconds
        );
    }
    return year + "-" + month + "-" + day;
}

/**
 * 数组扁平化
 * @param {*} arr 
 * @returns 
 */
export const flatten = (arr) => {
    return arr.reduce((prev, curValue) => {
        return prev.concat(Array.isArray(curValue) ? flatten(curValue) : curValue)
    }, [])
}


//加0
function addZero(num) {
    return num < 10 ? "0" + num : num;
}