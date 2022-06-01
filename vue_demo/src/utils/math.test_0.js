// 思路来自：https://juejin.cn/post/7066792153027969032?share_token=789d3025-d75f-463a-accb-b28bb56c90a2
const math = require('./math')
// const result = math.add(3, 7);
// const expect = 10;

// if (result !== expect) {
//     throw new Error(`3 + 7 应该等于${expect}，结果却是${result}`);
// }

// const result1 = math.minus(3, 3);
// const expect1 = 0;

// if (result1 !== expect1) {
//     throw new Error(`3 - 3 应该等于${expect1}，结果却是${result1}`);
// }


// 如何将这堆代码进行简化，做成一个公用的函数???

function expect(result) {
    return {
        toBe(actual) {
            if (result !== actual) {
                throw new Error("预期值和实际值不相等");
            }
        },
    };
}

// // 测试 3 + 3 是否等于 6
// expect(math.add(3, 3)).toBe(6);

// // 测试 3 - 3 是否等于 0
// expect(math.minus(3, 3)).toBe(0);

// 们不知道是具体哪个方法出现了
function test(desc, fn) {
    try {
        fn();
        console.log(`${desc} 通过测试`);
    } catch {
        console.log(`${desc} 没有通过测试`);
    }
}

test("测试加法 3 + 3", () => {
    expect(math.add(3, 3)).toBe(6);
});

test("测试减法 3 - 3", () => {
    expect(math.minus(3, 3)).toBe(0);
});

// 前端自动化测试到底是什么
// 实际上就是写了一段其它的用来测试的js代码，通过测试代码去运行业务代码，判断实际结果是否满足预期结果，如果满足，就是没有问题，如果不满足，就是有问题。
// 上面实现的 expect 方法 和 test 方法 实际上和主流的前端自动化测试框架 jest 里面的语法是完全一致的。所以上面的示例代码可以理解为 jest 的底层实现原理