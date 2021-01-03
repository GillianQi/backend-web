import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/workers'
    },
    {
      path: '/',
      component: () => import('@/views/main/Home.vue'),
      meta: { title: '布局' },
      children: [
        {
          path: '/workers',
          component: () => import('@/views/workers/index.vue'),
          meta: { title: '工人管理' }
        },
        {
          path: '/company',
          component: () => import('@/views/company/index.vue'),
          meta: { title: '施工单位管理' }
        },
        {
          path: '/company-certified',
          component: () => import('@/views/company/certified.vue'),
          meta: { title: '施工单位管理' }
        },
        {
          path: '/company-engineer',
          component: () => import('@/views/company/engineer.vue'),
          meta: { title: '工程管理' }
        },
        {
          path: '/salary',
          component: () => import('@/views/salary/index.vue'),
          meta: { title: '工资管理-待申请' }
        },
        {
          path: '/salary-finish',
          component: () => import('@/views/salary/finish.vue'),
          meta: { title: '工资管理-已完成' }
        },
        {
          path: '/salary-list',
          component: () => import('@/views/salary/list.vue'),
          meta: { title: '工资管理' }
        },
        {
          path: '/salary-edit',
          component: () => import('@/views/salary/edit.vue'),
          meta: { title: '工资管理' }
        },
        {
          path: '/invoice',
          component: () => import('@/views/invoice/index.vue'),
          meta: { title: '发票管理' }
        },
        {
          // 图片上传组件
          path: '/upload',
          component: () => import(/* webpackChunkName: "upload" */ '@/views/Upload.vue'),
          meta: { title: '文件上传' }
        },
        {
          // 权限页面
          path: '/permission',
          component: () => import(/* webpackChunkName: "permission" */ '@/views/Permission.vue'),
          meta: { title: '权限测试', permission: true }
        },
        {
          path: '/404',
          component: () => import(/* webpackChunkName: "404" */ '@/views/404.vue'),
          meta: { title: '404' }
        },
        {
          path: '/403',
          component: () => import(/* webpackChunkName: "403" */ '@/views/403.vue'),
          meta: { title: '403' }
        }
      ]
    },
    {
      path: '/login',
      component: () => import(/* webpackChunkName: "login" */ '@/views/Login.vue'),
      meta: { title: '登录' }
    },
    // {
    //   path: '*',
    //   redirect: '/404'
    // }
  ]
});
