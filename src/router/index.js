import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../views/layout/index.vue'
import layout from '../views/layout/index.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'home',
    component: home
  },
  {
    path: '/项目管理',
    component: layout,
    children: [{
      path: '/项目管理',
      name: '项目管理',
      component: () => import('../views/others/pm'),
      meta: {
        title: '项目管理'
      }
    }]
  },
  {
    path: '/控制台',
    component: layout,
    children: [{
      path: '/控制台',
      name: '控制台',
      component: () => import('../views/others/kzt'),
      meta: {
        title: '控制台'
      }
    }]
  },
  {
    path: '/文件管理',
    component: layout,
    children: [{
      path: '/文件管理',
      name: '文件管理',
      component: () => import('../views/others/file'),
      meta: {
        title: '文件管理'
      }
    }]
  },
  {
    path: '/商品管理',
    component: layout,
    children: [{
      path: '/商品管理',
      name: '商品管理',
      component: () => import('../views/others/sp'),
      meta: {
        title: '商品管理'
      }
    }]
  },
  {
    path: '/公司管理',
    component: layout,
    children: [{
      path: '/公司管理',
      name: '公司管理',
      component: () => import('../views/others/gs'),
      meta: {
        title: '公司管理'
      }
    }]
  },
  {
    path: '/成员管理',
    component: layout,
    children: [{
      path: '/成员管理',
      name: '成员管理',
      component: () => import('../views/others/cy'),
      meta: {
        title: '成员管理'
      }
    }]
  },
  {
    path: '/商贸图谱',
    component: layout,
    children: [{
      path: '/商贸图谱',
      name: '商贸图谱',
      component: () => import('../views/others/sm'),
      meta: {
        title: '商贸图谱'
      }
    }]
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
