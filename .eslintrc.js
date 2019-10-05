module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', '@vue/prettier', '@vue/typescript', 'eslint:recommended'],
  rules: {
    // 'no-unused-vars': 'off',
    eqeqeq: 'error',
    'no-eval': 'error',
    "no-constant-condition": 'error', //禁止在条件中使用常量表达式 if(true) if(1)
    "no-alert": 'error',
    'no-var': 'error',
    'no-useless-call': 'error',
    'no-unused-expressions': [
      0,
      {
        allowShortCircuit: true,
        allowTernary: true
      }
    ],
    'vue/no-parsing-error': ['error', { "x-invalid-end-tag": false }],
    // "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    // "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off"

    'object-shorthand': 'error', // 对象属性缩写
    'no-useless-escape': 'error',  // 不要转义字符串中不必要的字符
    'no-dupe-class-members': 'error',  // 避免定义重复的类成员
    'no-duplicate-imports': 'error',   // 只从一个路径导入所有需要的东西
    // 'import/no-mutable-exports': 'error',  // 不要导出可变的引用 需要插件
    'no-unneeded-ternary': 'error',  // 避免不必要的三目表达式
    'no-else-return': 'error',  // 如果一个 if 块总是执行一个 return 语句，那么接下来的 else 块就没有必要了

    /************************ ts相关 目前不增加过多相关检查 *****************************/
    'typescript/class-name-casing': 'error'

  },
  parserOptions: {
    parser: '@typescript-eslint/parser'
  },
  plugins: ['typescript']
};
