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
          path: '/workers-clock',
          component: () => import('@/views/workers/clockin.vue'),
          meta: { title: '打卡记录' }
        },
        {
          path: '/company',
          component: () => import('@/views/company/index.vue'),
          meta: { title: '商户管理' }
        },
        {
          path: '/company-certified',
          component: () => import('@/views/company/certified.vue'),
          meta: { title: '商户管理' }
        },
        {
          path: '/company-engineer',
          component: () => import('@/views/company/engineer.vue'),
          meta: { title: '工程管理' }
        },
        {
          path: '/engineer-approve',
          component: () => import('@/views/company/approuve.vue'),
          meta: { title: '待审批项目' }
        },
        {
          path: '/recharge-apply',
          component: () => import('@/views/company/rechargeApply.vue'),
          meta: { title: '充值申请' }
        },
        {
          path: '/recharge-finish',
          component: () => import('@/views/company/rechargeFinish.vue'),
          meta: { title: '充值申请' }
        },
        {
          path: '/recharge-history',
          component: () => import('@/views/company/rechargeHistory.vue'),
          meta: { title: '充值记录' }
        },
        {
          path: '/salary',
          component: () => import('@/views/salary/index.vue'),
          meta: { title: '佣金管理-待申请' }
        },
        {
          path: '/salary-finish',
          component: () => import('@/views/salary/finish.vue'),
          meta: { title: '佣金管理-已完成' }
        },
        {
          path: '/salary-list',
          component: () => import('@/views/salary/list.vue'),
          meta: { title: '佣金管理' }
        },
        {
          path: '/salary-edit',
          component: () => import('@/views/salary/edit.vue'),
          meta: { title: '佣金管理' }
        },
        {
          path: '/invoice-common',
          component: () => import('@/views/invoice/index.vue'),
          meta: { title: '发票管理-未完成' }
        },
        {
          path: '/invoice-finish-common',
          component: () => import('@/views/invoice/finish.vue'),
          meta: { title: '发票管理-已完成' }
        },
        {
          path: '/invoice-special',
          component: () => import('@/views/invoice/todoSpe.vue'),
          meta: { title: '专项发票-未完成' }
        },
        {
          path: '/invoice-finish-special',
          component: () => import('@/views/invoice/finishSpe.vue'),
          meta: { title: '专项发票-已完成' }
        },
        {
          path: '/suggestion',
          component: () => import('@/views/suggestion/index.vue'),
          meta: { title: '意见反馈' }
        },
        {
          path: '/users',
          component: () => import('@/views/users/index.vue'),
          meta: { title: '用户信息' }
        },
        {
          path: '/reset-password',
          component: () => import('@/views/users/reset.vue'),
          meta: { title: '重置密码' }
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
    }
  ]
});
