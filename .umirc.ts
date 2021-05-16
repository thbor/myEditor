import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
    { path: '/mybord', component: '@/pages/mybord/index',exact:false },

  ],
  fastRefresh: {},
});
