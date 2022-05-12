/*
 * @Author: susu 1628469970@qq.com
 * @Date: 2022-05-12 21:02:04
 * @LastEditors: susu 1628469970@qq.com
 * @LastEditTime: 2022-05-12 22:38:47
 * @FilePath: \vue_demo\tailwind.config.js
 * @Description: tailwind.config.js
 */
module.exports = {
  // 禁止tailwindcss的默认属性
  corePlugins: {
    preflight: false
  },
  content: [],
  theme: {
    // screens: {
    //   tablet: '768px',
    //   desktop: '1024px',
    // },
    // colors: {
    //   primary: {
    //     100: '#ebf8ff',
    //     300: '#90cdf4',
    //     500: '#4299e1',
    //     700: '#2b6cb0',
    //     900: '#2a4365',
    //   },
    //   secondary: {
    //     100: '#fffff0',
    //     300: '#faf089',
    //     500: '#ecc94b',
    //     700: '#b7791f',
    //     900: '#744210',
    //   },
    // },
    extend: {
      boxShadow: {
        huge: '0 30px 60px -15px rgba(0, 0, 0, .25)'
      }
    },
  },
  plugins: [],
  css: {
    loaderOptions: {
      postcss: {
        plugins: [require('tailwindcss'), require('autoprefixer')]
      }
    }
  }
}
