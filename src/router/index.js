import Vue from 'vue'
import Router from 'vue-router'
import notFount from '../views/404/notFount'
Vue.use(Router);


/* Layout */
import personalCenter from './personalCenter'
import gossip from './gossip'
export const constantRouterMap = [
  { path: '/', component: () => import('@/views/login/login'), hidden: true },
  { path: '/register', component: () => import('@/views/login/register'), hidden: true },
  {path: '/404', name: '404', component:notFount},
  {path: '*', redirect:'/404'}
];

export const asyncRouterMap = [
  personalCenter,
  gossip,
];

export default new Router({


  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap

})
