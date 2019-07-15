import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import {Message} from 'element-ui'
import {getToken} from '@/utils/auth' // 验权


const whiteList = ['/login', '/register']; // 不重定向白名单
router.beforeEach((to, from, next) => {
  if (getToken()) {
    if (to.path === '/login') {
      next({path: '/'});
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {

      if (store.getters.userInfo === null) {
        store.dispatch('GetInfo').then(resolve => { // 拉取用户信息
          store.dispatch('getRoles').then(res => {
            store.dispatch('filterAsyncRouter', res).then(role => {
              console.log(role)
              router.addRoutes(role);
              next('/personalCenter/personaLinformation')
            }).catch((err) => {
              store.dispatch('FedLogOut').then(() => {
                Message.error(err || '拉取用户路由失败');
                next({path: '/'})
              })
            })
          }).catch((err) => {
            store.dispatch('FedLogOut').then(() => {
              Message.error(err || '拉取用户角色失败');
              next({path: '/'})
            })
          })
        }).catch((err) => {
          store.dispatch('FedLogOut').then(() => {
            Message.error(err || '拉取用户信息失败');
            next({path: '/'})
          })
        })
      } else {
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) === -1) {
      next()
      NProgress.done()
    } else  {
      next({path:'/'}) // 否则全部重定向到登录页
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
