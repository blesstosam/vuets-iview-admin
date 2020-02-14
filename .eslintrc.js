module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', '@vue/prettier', '@vue/typescript', 'eslint:recommended'],
  rules: {
    'no-unused-vars': 'off',
    "@typescript-eslint/no-unused-vars": ["error", {
      "vars": "all",
      "args": "after-used",
      "ignoreRestSiblings": false
    }],
    eqeqeq: 'error',
    'no-eval': 'error',
    /**
     * 禁止将常量作为分支条件判断中的测试表达式，但允许作为循环条件判断中的测试表达式
     */
    'no-constant-condition': [
      'error',
      {
        checkLoops: false
      }
    ],
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

    /**
     * 数组的方法除了 forEach 之外，回调函数必须有返回值
     */
    'array-callback-return': 'error',
    /**
     * 禁止函数的循环复杂度超过 20
     * @reason https://en.wikipedia.org/wiki/Cyclomatic_complexity
     */
    complexity: [
      'error',
      {
        max: 20
      }
    ],
    /**
     * constructor 中必须有 super
     */
    'constructor-super': 'error',
    /**
     * 禁止方向错误的 for 循环
     */
    'for-direction': 'error',
    /**
     * getter 必须有返回值，并且禁止返回空
     */
    'getter-return': 'error',
    /**
     * for in 内部必须有 hasOwnProperty
     */
    'guard-for-in': 'error',
    /**
     * 禁止使用 hasOwnProperty, isPrototypeOf 或 propertyIsEnumerable
     * @reason hasOwnProperty 比较常用
     */
    'no-prototype-builtins': 'off',
    /**
     * 代码块嵌套的深度禁止超过 5 层
     */
    'max-depth': ['error', 5],
    /**
     * 限制一个文件最多的行数
     */
    'max-lines': ['error', 800],
    /**
     * 限制函数块中的代码行数
     */
    'max-lines-per-function': ['error', 100],
    /**
     * 回调函数嵌套禁止超过 3 层，多了请用 async await 替代
     */
    'max-nested-callbacks': ['error', 3],
    /**
     * new 后面的类名必须首字母大写
     */
    'new-cap': [
      'error',
      {
        newIsCap: true,
        capIsNew: false,
        properties: true
      }
    ],
    /**
     * 禁止将 async 函数做为 new Promise 的回调函数
     * @reason 出现这种情况时，一般不需要使用 new Promise 实现异步了
     */
    'no-async-promise-executor': 'error',
    /**
     * 禁止直接使用 Buffer
     * @reason Buffer 构造函数是已废弃的语法
     */
    'no-buffer-constructor': 'error',
    /**
     * switch 的 case 内有变量定义的时候，必须使用大括号将 case 内变成一个代码块
     */
    'no-case-declarations': 'error',
    /**
     * 禁止对已定义的 class 重新赋值
     */
    'no-class-assign': 'error',
    /**
     * 必须使用 ... 而不是 Object.assign，除非 Object.assign 的第一个参数是一个变量
     */
    'prefer-object-spread': 'error',


    /************************ vue模板内检测 *****************/
    'vue/eqeqeq': ['error', 'always'],
    /**
     * 计算属性禁止包含异步方法
     */
    'vue/no-async-in-computed-properties': 'error',
    /**
     * 禁用已废弃的 scope 属性
     */
    'vue/no-deprecated-scope-attribute': 'error',
    // /**
    //  * 使用 v-slot 替代已废弃的 slot
    //  */
    // 'vue/no-deprecated-slot-attribute': 'error',
    // /**
    //  * 禁用已废弃的 slot-scope
    //  */
    // 'vue/no-deprecated-slot-scope-attribute': 'error',


    /************************ ts相关 目前不增加过多相关检查 *****************************/
    /**
     * 类型断言必须使用 as Type，禁止使用 <Type>，禁止对对象字面量进行类型断言（断言成 any 是允许的）
     * @reason <Type> 容易被理解为 jsx
     */
    '@typescript-eslint/consistent-type-assertions': [
      'error',
      {
          assertionStyle: 'as',
          objectLiteralTypeAssertions: 'never'
      }
    ],
    /**
     * 禁止定义空的接口
     */
    '@typescript-eslint/no-empty-interface': 'error',
    /**
     * 禁止使用 any
     */
    '@typescript-eslint/no-explicit-any': 'off',

  },
  parserOptions: {
    parser: '@typescript-eslint/parser'
  },
  plugins: ['@typescript-eslint']
};
