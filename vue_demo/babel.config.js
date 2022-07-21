module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    // null判断运算符支持 ??
    '@babel/plugin-proposal-nullish-coalescing-operator',
    // 链判断运算符支持 ?.
    '@babel/plugin-proposal-optional-chaining',
    'syntax-dynamic-import'
  ]
}