import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      name: 'Index',
      component: () => import('@/views/dashboard/index')
    }]
  },

  // 用户管理
  {
    path: '/user',
    component: Layout,
    redirect: '/user/list',
    name: 'User',
    meta: { title: '用户管理' },
    children: [
      {
        path: 'list',
        name: 'UserList',
        component: () => import('@/views/user/list'),
        meta: { title: '用户列表' }
      },
      {
        path: 'edit/:id',
        name: 'UserEdit',
        component: () => import('@/views/user/form'),
        meta: { title: '编辑用户' },
        hidden: true
      }
    ]
  },
  // 管理员管理
  {
    path: '/admin_user',
    component: Layout,
    redirect: '/admin_user/list',
    name: 'AdminUser',
    meta: { title: '管理员管理' },
    children: [
      {
        path: 'list',
        name: 'AdminUserList',
        component: () => import('@/views/admin_user/list'),
        meta: { title: '管理员列表' }
      },
      {
        path: 'create',
        name: 'AdminUserCreate',
        component: () => import('@/views/admin_user/form'),
        meta: { title: '添加管理员' }
      },
      {
        path: 'edit/:id',
        name: 'AdminUserEdit',
        component: () => import('@/views/admin_user/form'),
        meta: { title: '编辑管理员' },
        hidden: true
      }
    ]
  },
  // 博客管理
  {
    path: '/blog',
    component: Layout,
    redirect: '/blog/list',
    name: 'Blog',
    meta: { title: '博客管理' },
    children: [
      {
        path: 'list',
        name: 'BlogList',
        component: () => import('@/views/blog/list'),
        meta: { title: '博客列表' }
      },
      {
        path: 'commmentlist',
        name: 'BlogCommmentList',
        component: () => import('@/views/blog/commmentlist'),
        meta: { title: '博客评论列表' }
      },
      {
        path: 'type',
        component: () => import('@/views/blog/type/list'),
        name: 'Type',
        meta: { title: '博客分类管理' },
        children: [
          {
            path: 'list',
            component: () => import('@/views/blog/type/list'),
            name: 'TypeList',
            meta: { title: '博客分类列表' }
          },
          {
            path: 'form',
            component: () => import('@/views/blog/type/form'),
            name: 'TypeForm',
            meta: { title: '博客分类添加' }
          },
          {
            path: 'edit/:id',
            name: 'TypeEdit',
            component: () => import('@/views/blog/type/form'),
            meta: { title: '博客分类修改' },
            hidden: true
          }
        ]
      }
    ]
  },
  // 论坛管理
  {
    path: '/forum',
    component: Layout,
    redirect: '/forum/list',
    name: 'Forum',
    meta: { title: '论坛管理' },
    children: [
      {
        path: 'list',
        name: 'ForumList',
        component: () => import('@/views/forum/list'),
        meta: { title: '论坛列表' }
      },
      {
        path: 'commmentlist',
        name: 'ForumCommmentList',
        component: () => import('@/views/forum/commmentlist'),
        meta: { title: '论坛评论列表' }
      },
      {
        path: 'type',
        component: () => import('@/views/forum/type/list'),
        name: 'Type',
        meta: { title: '论坛分类管理' },
        children: [
          {
            path: 'list',
            component: () => import('@/views/forum/type/list'),
            name: 'TypeList',
            meta: { title: '论坛分类列表' }
          },
          {
            path: 'form',
            component: () => import('@/views/forum/type/form'),
            name: 'TypeForm',
            meta: { title: '论坛分类添加' }
          },
          {
            path: 'edit/:id',
            name: 'TypeEdit',
            component: () => import('@/views/forum/type/form'),
            meta: { title: '论坛分类修改' },
            hidden: true
          }
        ]
      }
    ]
  },
  // 资源管理
  {
    path: '/resources',
    component: Layout,
    redirect: '/resources/list',
    name: 'Resources',
    meta: { title: '资源管理' },
    children: [
      {
        path: 'list',
        name: 'ResourcesList',
        component: () => import('@/views/resources/list'),
        meta: { title: '资源列表' }
      },
      {
        path: 'commmentlist',
        name: 'ResourcesCommmentList',
        component: () => import('@/views/resources/commmentlist'),
        meta: { title: '资源评论列表' }
      },
      {
        path: 'type',
        component: () => import('@/views/resources/type/list'),
        name: 'Type',
        meta: { title: '资源分类管理' },
        children: [
          {
            path: 'list',
            component: () => import('@/views/resources/type/list'),
            name: 'TypeList',
            meta: { title: '论坛分类列表' }
          },
          {
            path: 'form',
            component: () => import('@/views/resources/type/form'),
            name: 'TypeForm',
            meta: { title: '论坛分类添加' }
          },
          {
            path: 'edit/:id',
            name: 'TypeEdit',
            component: () => import('@/views/resources/type/form'),
            meta: { title: '论坛分类修改' },
            hidden: true
          }
        ]
      },
      {
        path: 'tag',
        component: () => import('@/views/resources/tag/list'),
        name: 'Tag',
        meta: { title: '资源标签管理' },
        children: [
          {
            path: 'list',
            component: () => import('@/views/resources/tag/list'),
            name: 'TagList',
            meta: { title: '论坛标签列表' }
          },
          {
            path: 'form',
            component: () => import('@/views/resources/tag/form'),
            name: 'TagForm',
            meta: { title: '论坛标签添加' }
          },
          {
            path: 'edit/:id',
            name: 'TagEdit',
            component: () => import('@/views/resources/tag/form'),
            meta: { title: '论坛标签修改' },
            hidden: true
          }
        ]
      }
    ]
  },
  // 统计分析
  {
    path: '/statistics',
    component: Layout,
    redirect: '/statistics/create',
    name: 'Statistics',
    meta: { title: '统计分析' },
    children: [
      {
        path: 'create',
        name: 'StatisticsCreate',
        component: () => import('@/views/statistics/create'),
        meta: { title: '生成统计' }
      },
      {
        path: 'chart',
        name: 'StatisticsChart',
        component: () => import('@/views/statistics/chart'),
        meta: { title: '统计图表' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]
export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
