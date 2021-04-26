import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index',
    routes: [
      { path: '/dashbord', component: '@/pages/views/Dashbord/index'},
      { path: '/handsontable', component: '@/pages/views/Handsontable/index'},
      { path: '/luckysheet', component: '@/pages/views/Luckysheet/index'},
      { path: '/test', component: '@/pages/views/Test/index'},
    ],
    },
    
  ],
  fastRefresh: {},
  targets: {
    ie: 11,
    chrome: 49,
  },
  proxy: {
    '/api': {
      'target': 'http://10.244.231.135:8080/dfmqa/api/search',
      // 'target': 'http://jsonplaceholder.typicode.com/',
      'changeOrigin': true,
      'pathRewrite': { '^/api' : '' },
    },
  },
  // plugins: [
  //   // npm 依赖
  //   // 'umi-plugin-hello',
  //   // 相对路径
  //   './mylucksheet.ts',
  //   // 绝对路径
  //   `${__dirname}/mylucksheet.ts`,
  // ],
});
