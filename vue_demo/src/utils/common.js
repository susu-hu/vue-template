/**
 * *****防抖****
 *
 * 在连续的操作中，无论进行了多长时间，
 * 只有某一次的操作后在指定的时间内没有再操作，这一次才被判定有效
 * @param fn
 * @param t
 * @returns {function(...[*]=)}
 * @constructor
 */
export const Debounce = function (fn, t) {
    let delay = t || 300;
    let timer = null;
    return function () {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            fn.apply(this, arguments);
        }, delay);
    }
}

/**
 * ***节流****
 *
 * 一定时间内一定执行而且只执行一次。我们通常规定300ms执行一下的话，
 * 那不管你持续不断的点击，一到300ms就执行一次了。
 * 所以你持续不断的点击足够久的话，那就执行很多次了。
 * @param fn
 * @param delay
 * @returns {function(...[*]=)}
 * @constructor
 */
export const Throttle = function (fn, delay = 300) {
    let canRun = true; // 通过闭包保存一个标记
    return function () {
        console.log(canRun)
        if (!canRun) return;//在delay时间内，直接返回，不执行fn
        canRun = false;
        setTimeout(() => {
            fn.apply(this, arguments);
            canRun = true;//直到执行完fn,也就是delay时间后，打开开关，可以执行下一个fn
        }, delay);
    };
}


/**
 * 函数防抖 
 * @param fn
 * @param delay
 * @returns {Function}
 * @constructor
 */
export const Debounce1 = (fn, t) => {
    let delay = t || 500;
    let timer;
    return function () {
        let args = arguments;
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            timer = null;
            fn.apply(this, args);
        }, delay);
    }
};


/**
 1. 函数节流
 2. @param fn
 3. @param interval
 4. @returns {Function}
 5. @constructor
 */
export const Throttle1 = (fn, t) => {
    let last;
    let timer;
    let interval = t || 500;
    return function () {
        let args = arguments;
        let now = +new Date();
        if (last && now - last < interval) {
            clearTimeout(timer);
            timer = setTimeout(() => {
                last = now;
                fn.apply(this, args);
            }, interval);
        } else {
            last = now;
            fn.apply(this, args);
        }
    }
}


// 防止重复点击触发事件
export const debounce = function (fn, time) {
    let _arguments = arguments
    let timeout = null
    return function () {
        if (timeout) {
            clearTimeout(timeout)
        }
        timeout = setTimeout(() => {
            fn.call(this, _arguments)
        }, time);
    }
}

// 两者结合
export const boDebounce = (func, wait, immediate) => {
    let timeout;
    return function () {
        const context = this;
        const args = [...arguments];
        if (timeout) clearTimeout(timeout);
        if (immediate) {
            const callNow = !timeout;
            timeout = setTimeout(() => {
                timeout = null;
            }, wait)
            if (callNow) func.apply(context, args)
        }
        else {
            timeout = setTimeout(() => {
                func.apply(context, args)
            }, wait);
        }
    }
}


// 参考lodas
export const debounce2 = function (fn, delay, immediate) {
    var timeout,
        args,
        context,
        timestamp,
        result;
    var later = function () {
        var last = Date.now() - timestamp;

        if (last < delay && last >= 0) {
            timeout = setTimeout(later, delay - last);
        } else {
            timeout = null;
            if (!immediate) {
                result = fn.apply(context, args);

                if (!timeout) {
                    context = args = null;
                }
            }
        }
    };

    return function () {
        context = this;
        args = arguments;
        timestamp = Date.now();
        console.log(timestamp);
        var callNow = immediate && !timeout;
        if (!timeout) {
            timeout = setTimeout(later, delay);
        }
        if (callNow) {
            result = fn.apply(context, args);
            context = args = null;
        }
        return result
    }
};
export const throttle2 = function (method, duration, delay) {
    var timer = null,
        // 记录下开始执行函数的时间
        begin = new Date();

    return function () {
        var context = this,
            args = arguments,
            // 记录下当前时间
            current = new Date();
        // 函数节流里的思路
        clearTimeout(timer);

        // 记录下的两个时间相减再与duration进行比较
        if (current - begin >= duration) {
            method.apply(context, args);
            begin = current;
        } else {
            timer = setTimeout(function () {
                method.apply(context, args);
            }, delay);
        }
    }
}
