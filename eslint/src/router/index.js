import Vue from 'vue'
import Router from 'vue-router'
import login from '@/pages/login'
// {
//   path: '/home',
//     name: 'home',
//   component: home
// },
import home from '@/components/home'

import page404 from '@/pages/error/404'

Vue.use(Router)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/404',
    name: 'page404',
    component: page404
  },
  {
    path: '/home',
    name: 'home',
    component: home,
    children: [
      {
        path: '/uploadMonitor', // 上传管理spld
        name: 'uploadMonitor',
        meta: {title: 'uploadMonitor',requireAuth: true},
        component: () => import ('@/pages/uploadFile/uploadMonitor')
      },
      {
        path: '/uploadMonitor/add', // 上传管理spld新增文件
        name: 'uploadMonitorAdd',
        meta: {title: 'uploadMonitorAdd',requireAuth: true},
        component: () => import ('@/pages/uploadFile/uploadAdd')
      },
      {
        path: '/uploadApproval', // 上传管理fad
        name: 'uploadApproval',
        meta: {title: 'uploadApproval',requireAuth: true},
        component: () => import ('@/pages/uploadFile/uploadApproval')
      },
      {
        path: '/incompletePart', // incompletePart
        name: 'incompletePart',
        meta: {title: 'incompletePart',requireAuth: true},
        component: () => import ('@/pages/incomplete/incompletePart')
      },
      {
        path: '/incompletePart/incompletePartAdd', //  incompletePart点击create
        name: 'incompletePartAdd',
        meta: {title: 'incompletePartAdd',requireAuth: true},
        component: () => import ('@/pages/incomplete/incompletePartAdd')
      },
      {
        path: '/incompletePart/incompletePartView', //  incompletePart点击view
        name: 'incompletePartView',
        meta: {title: 'incompletePartView',requireAuth: true},
        component: () => import ('@/pages/incomplete/incompletePartView')
      },
      {
        path: '/uploadApproval/mapped', //  part No. to HS No.
        name: 'mapped',
        meta: {title: 'mapped',requireAuth: true},
        component: () => import ('@/pages/uploadFile/mapped')
      },
      {
        path: '/uploadApproval/paired',  // List Paired PartNo. to HS No.
        name: 'paired',
        meta: {title: 'paired',requireAuth: true},
        component: () => import ('@/pages/uploadFile/paired')
      },
      {
        path: '/part',  // partNo.管理
        name: 'part',
        meta: {title: 'part',requireAuth: true},
        component: () => import ('@/pages/partNo/list')
      },
      {
        path: '/part/create', //  Part点击create
        name: 'partAdd',
        meta: {title: 'partAdd',requireAuth: true},
        component: () => import ('@/pages/incomplete/incompletePartAdd')
      },
      {
        path: '/material',  // material管理
        name: 'material',
        meta: {title: 'material',requireAuth: true},
        component: () => import ('@/pages/material/list')
      },
      {
        path: '/material/create',  // material管理新增/编辑
        name: 'materialCreate',
        meta: {title: 'materialCreate',requireAuth: true},
        component: () => import ('@/pages/material/create')
      },
      {
        path: '/material/view',  // material管理详情
        name: 'materialView',
        meta: {title: 'materialView',requireAuth: true},
        component: () => import ('@/pages/material/view')
      },
      {
        path: '/function',  // function管理
        name: 'functionList',
        meta: {title: 'functionList',requireAuth: true},
        component: () => import ('@/pages/function/list')
      },
      {
        path: '/function/create',  // function管理新增/编辑
        name: 'functionCreate',
        meta: {title: 'functionCreate',requireAuth: true},
        component: () => import ('@/pages/function/create')
      },
      {
        path: '/function/view',  // function管理详情
        name: 'functionView',
        meta: {title: 'functionView',requireAuth: true},
        component: () => import ('@/pages/function/view')
      },
      {
        path: '/installation',  // installation管理
        name: 'installation',
        meta: {title: 'installation',requireAuth: true},
        component: () => import ('@/pages/installation/list')
      },
      {
        path: '/installation/create',  // installation管理新增/编辑
        name: 'installationCreate',
        meta: {title: 'installationCreate',requireAuth: true},
        component: () => import ('@/pages/installation/create')
      },
      {
        path: '/installation/view',  // installation管理详情
        name: 'installationView',
        meta: {title: 'installationView',requireAuth: true},
        component: () => import ('@/pages/installation/view')
      },
      {
        path: '/hs', // hsNo.管理
        name: 'hs',
        meta: {title: 'hs',requireAuth: true},
        component: () => import ('@/pages/hsNo/list')
      },
      {
        path: '/hs/create', // hsNo.管理新增/编辑
        name: 'hsCreate',
        meta: {title: 'hsCreate',requireAuth: true},
        component: () => import ('@/pages/hsNo/create')
      },{
        path: '/hs/view', // hsNo.管理详情
        name: 'hsView',
        meta: {title: 'hsView',requireAuth: true},
        component: () => import ('@/pages/hsNo/view')
      },
      {
        path: '/media', // media管理
        name: 'media',
        meta: {title: 'media',requireAuth: true},
        component: () => import ('@/pages/media/list')
      },
      {
        path: '/media/create', // media管理新增
        name: 'mediaCreate',
        meta: {title: 'mediaCreate',requireAuth: true},
        component: () => import ('@/pages/media/create')
      },
      {
        path: '/ruleName', // ruleName管理
        name: 'ruleName',
        meta: {title: 'ruleName',requireAuth: true},
        component: () => import ('@/pages/ruleName/list')
      },
      {
        path: '/ruleName/create', // ruleName管理新增/修改
        name: 'ruleNameCreate',
        meta: {title: 'ruleNameCreate',requireAuth: true},
        component: () => import ('@/pages/ruleName/create')
      },
      {
        path: '/ruleName/view', // ruleName管理详情
        name: 'ruleNameView',
        meta: {title: 'ruleNameView',requireAuth: true},
        component: () => import ('@/pages/ruleName/view')
      },
      {
        path: '/partRule', // partRule管理
        name: 'partRule',
        meta: {title: 'partRule',requireAuth: true},
        component: () => import ('@/pages/partRule/list')
      },
      {
        path: '/partRule/create', // partRule管理新增/编辑
        name: 'partRuleCreate',
        meta: {title: 'partRuleCreate',requireAuth: true},
        component: () => import ('@/pages/partRule/create')
      },
      {
        path: '/partRule/view', // partRule管理详情
        name: 'partRuleView',
        meta: {title: 'partRuleView',requireAuth: true},
        component: () => import ('@/pages/partRule/view')
      },
      {
        path: '/hsRule', // hsRule管理
        name: 'hsRule',
        meta: {title: 'hsRule',requireAuth: true},
        component: () => import ('@/pages/hsRule/list')
      },
      {
        path: '/hsRule/create', // hsRule管理添加
        name: 'hsRuleAdd',
        meta: {title: 'hsRuleAdd',requireAuth: true},
        component: () => import ('@/pages/hsRule/create')
      },
      {
        path: '/hsRule/view', // hsRule管理查看
        name: 'hsRuleView',
        meta: {title: 'hsRuleView',requireAuth: true},
        component: () => import ('@/pages/hsRule/view')
      },
      {
        path: '/role', // 角色管理
        name: 'role',
        meta: {title: 'role',requireAuth: true},
        component: () => import ('@/pages/role/list')
      },
      {
        path: '/role/create', // 编辑角色
        name: 'roleAdd',
        meta: {title: 'roleAdd',requireAuth: true},
        component: () => import ('@/pages/role/roleAdd')
      },
      {
        path: '/role/privilege', // 权限管理
        name: 'rolePrivilege',
        meta: {title: 'rolePrivilege',requireAuth: true},
        component: () => import ('@/pages/role/rolePrivilege')
      },
    ]
  }
]
const router = new Router({
  routes
});
//  to.matched.some(r => r.meta.requireAuth)
// router.beforeEach((to, from, next) => {
//   let urlArr = JSON.parse(localStorage.getItem('urls'));
//   if(urlArr){
//     let urlStr = urlArr.join(',');
//     let arr = to.path.split('/');
//
//     if (urlStr.indexOf(arr[1])>-1) {
//       next();
//     }
//     else {
//       next({
//         path: '/home'
//       })
//     }
//   }else {
//     if (to.name == 'home'){
//       next()
//     }else {
//       next({
//         path: '/'
//       })
//     }
//   }
//
// })
export default router;
