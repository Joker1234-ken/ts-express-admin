module.exports = {
  // 继承的规则
  extends: ['@commitlint/config-conventional'],
  rules: {
    //   type类型定义,表示git提交的type必须在以下类型范围内
    'type-enum': [
      2,
      'always',
      [
        'feat', // 新功能 featurn
        'fix', // 修复bug
        'docs', // 文档注释
        'style', // 代码格式
        'refactor', // 重构
        'perf', // 性能优化
        'test', // 添加测试
        'chore', // 构建过程或者辅助工具的变动
        'revent', // 回退
        'build' // 打包
      ]
    ],
    // 大小写不做校验
    'subject-case': [0]
  }
}
