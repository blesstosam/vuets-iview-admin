module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', '@vue/prettier', '@vue/typescript', 'eslint:recommended'],
  rules: {
    eqeqeq: 2,
    "no-constant-condition": 2, //禁止在条件中使用常量表达式 if(true) if(1)
    "no-alert": 2,
    'no-var': 'error',
    'no-useless-call': 1,
    'no-unused-expressions': [
      0,
      {
        allowShortCircuit: true,
        allowTernary: true
      }
    ],
    'vue/no-parsing-error': [2, { "x-invalid-end-tag": false }],
    // "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    // "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off"

    /************************ ts相关 目前不增加过多相关检查 *****************************/
    'typescript/class-name-casing': 'error'

  },
  parserOptions: {
    parser: '@typescript-eslint/parser'
  },
  plugins: ['typescript']
};
