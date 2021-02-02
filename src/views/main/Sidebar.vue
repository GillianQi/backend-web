<template>
  <div class="sidebar">
    <el-menu
      class="sidebar-el-menu"
      :default-active="$route.fullPath"
      :default-openeds="defaultMenus"
      :unique-opened="false"
      :collapse="collapse"
      background-color="#324157"
      text-color="#bfcbd9"
      active-text-color="#20a0ff"
      router
    >
      <template v-for="item in items">
        <template v-if="item.subs">
          <el-submenu :index="item.index" :key="item.index">
            <template slot="title">
              <i :class="item.icon"></i>
              <span slot="title">{{ item.title }}</span>
            </template>
            <template v-for="subItem in item.subs">
              <el-submenu
                v-if="subItem.subs"
                :index="subItem.index"
                :key="subItem.index"
              >
                <template slot="title">{{ subItem.title }}</template>
                <el-menu-item
                  v-for="(threeItem,i) in subItem.subs"
                  :key="i"
                  :index="threeItem.index"
                >{{ threeItem.title }}</el-menu-item>
              </el-submenu>
              <el-menu-item
                v-else
                :index="subItem.index"
                :key="subItem.index"
              >{{ subItem.title }}</el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index" :key="item.index">
            <i :class="item.icon"></i>
            <span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
import bus from '@/common/bus';
export default {
  data() {
    return {
      collapse: false,
      role: localStorage.getItem('role'),
      defaultMenus: ['workers', 'company', 'salary', 'invoice', 'invoice-todo', 'invoice-finish'],
      items: [
        {
          icon: 'el-icon-s-home',
          index: 'workers',
          title: '灵工管理',
          subs: [
            {
              index: 'workers',
              title: '灵工列表'
            }
          ]
        },
        {
          icon: 'el-icon-office-building',
          index: 'company',
          title: '商户管理',
          subs: [
            {
              index: 'company',
              title: '待处理认证'
            },
            {
              index: 'company-certified',
              title: '已认证'
            },
            {
              icon: 'el-icon-notebook-2',
              index: 'engineer-approve',
              title: '待审批项目'
            },
            {
              index: 'recharge-apply',
              title: '充值申请'
            },
            {
              index: 'recharge-finish',
              title: '已完成申请'
            },
          ]
        },
        {
          icon: 'el-icon-money',
          index: 'salary',
          title: '佣金管理',
           subs: [
            {
              index: 'salary',
              title: '待处理'
            },
            {
              index: 'salary-finish',
              title: '已完成'
            },
          ]
          
        },
        {
          icon: 'el-icon-receiving',
          index: 'invoice',
          title: '发票管理',
          subs: [
            {
              index: 'invoice-todo',
              title: '待处理',
              subs: [
                {
                  index: 'invoice-common',
                  title: '增税票'
                },
                {
                  index: 'invoice-special',
                  title: '服务票'
                },
              ]
            },
            {
              index: 'invoice-finish',
              title: '已完成',
              subs: [
                {
                  index: 'invoice-finish-common',
                  title: '增税票'
                },
                {
                  index: 'invoice-finish-special',
                  title: '服务票'
                },
              ]
            },
          ]
        },
        {
          icon: 'el-icon-headset',
          index: 'suggestion',
          title: '投诉意见',
        }
      ]
    };
  },
  computed: {
    onRoutes() {
      return this.$route.path.replace('/', '');
    }
  },
  created() {
    // 通过 Event Bus 进行组件间通信，来折叠侧边栏
    bus.$on('collapse', msg => {
      this.collapse = msg;
      bus.$emit('collapse-content', msg);
    });
    if (this.role == 99999) {
      this.items[0].subs.push({icon: 'el-icon-date', index: 'workers-clock',title: '打卡记录'})
      this.items.push({icon: 'el-icon-user', index: 'users', title: '用户管理'})
    }
  }
};
</script>

<style scoped>
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 70px;
  bottom: 0;
  overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
  width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
  width: 180px;
}
.sidebar > ul {
  height: 100%;
}
</style>
