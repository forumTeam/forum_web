import {getToken, setToken, removeToken} from "../../utils/auth";
import {login, getInfo, getRoles} from "../../api/user/login"
import {asyncRouterMap} from '../../router'

/**
 *
 * @param route  需要的角色
 * @param roles  拥有的角色
 */
function getChildren(route, roles) {
  for (let item of  roles) {
    for (let role of route) {
      if (item === role) return true
    }
  }
  return false
}

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    routers: [],
    userInfo: null,
  },
  mutations: {
    setRoles(state, roles) {
      return state.roles = roles
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_USER_INFO: (state, userInfo) => {
      state.userInfo = userInfo
    },
    setRouters: (state, router) => {
      state.routers = router
    }


  },
  actions: {
    //登录
    Login({commit}, userInfo) {
      const username = userInfo.username.trim();
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          const data = response.data;
          setToken(data);
          commit('SET_TOKEN', data);
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    getRoles({commit, state}) {
      return new Promise((resolve, reject) => {
        getRoles().then(response => {
          const data = response.data;
          commit("setRoles", data);
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },


    GetInfo({commit, state}) {
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(response => {
          const data = response.data;
          commit('SET_NAME', data.name);
          commit('SET_USER_INFO', data);
          /* commit('SET_AVATAR', data.headerImage ? data.headerImage : 'more_money/images/platform/10000/0a14505d-6274-4339-bc19-9812e588a7f7.gif')*/
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    filterAsyncRouter({commit, state}, res) {
      return new Promise((resolve, reject) => {
        let paths = asyncRouterMap.filter(item => {
          if (item.role && !getChildren(item.role, res)) return false;
          if (item.children && item.children.length > 0) {
            item.children.filter(child => {
              if (child.role && !getChildren(child.role, res)) return false
            })
          }
          return true
        });
        commit('setRouters', paths);
        resolve(paths)
      })
    },
    //登出
    LoginOut({commit, state}) {
      return new Promise((resolve, reject) => {
        commit('SET_TOKEN', '');
        commit('setRouters', '');
        removeToken();
        location.reload()
      })
    },
    //前端登出
    FedLogOut({commit}) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '');
        commit('setRouters', '');
        removeToken();
        resolve()
      })
    }

  }
}

export default user
