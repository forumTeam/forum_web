import {getToken,setToken, removeToken} from "../../utils/auth";
import {login,getInfo,getRoles} from "../../api/user/login"
import {asyncRouterMap} from '../../router'

function getChildren(route, roles) {
  const children = [];
  route.forEach(item => {
    if (item.children !== undefined) {
      if (item.children && item.children.length > 0) {
        item.children = selectChildren(item, roles)
      }
    }
    children.push(item)
  });
  return children
}

function selectChildren(item, roles) {
  const childrens = [];
  item.children.forEach(roule => {
    if (roule.role) {
      if (roule.role.indexOf(roles) >= 0) {
        childrens.push(roule)
      }
    } else if (!roule.role) {
      childrens.push(roule)
    }
    item.children = childrens
  });
  return childrens
}
const user={
  state:{
    token:getToken(),
    name:'',
    avatar:'',
    roles: [],
    userInfo:null,
  },
  mutations:{
    setRoles(state, roles) {
      return state.roles = roles
    },
    SET_TOKEN:(state,token)=>{
      state.token=token
    },
    SET_NAME:(state,name)=>{
      state.name=name
    },
    SET_USER_INFO:(state,userInfo)=>{
      state.userInfo=userInfo
    }
  },
  actions:{
    //登录
    Login({commit},userInfo){
      const username=userInfo.username.trim();
      return new Promise((resolve, reject) =>{
        login(username,userInfo.password).then(response=>{
          const data=response.data;
          setToken(data);
          commit('SET_TOKEN',data);
          resolve()
        }).catch(error=>{
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




    GetInfo({ commit, state }){
      return new Promise((resolve, reject ) =>{
        getInfo(state.token).then(response =>{
          const data =response.data;
          commit('SET_NAME', data.name);
          commit('SET_USER_INFO', data);
         /* commit('SET_AVATAR', data.headerImage ? data.headerImage : 'more_money/images/platform/10000/0a14505d-6274-4339-bc19-9812e588a7f7.gif')*/
          resolve(response)
        }).catch(error =>{
          reject(error)
        })
      })
    },
    filterAsyncRouter(res) {
      return new Promise((resolve, reject) => {
        const roles = [];
        res.getters.roles.forEach(item => {
          asyncRouterMap.filter(route => {
            if (route.role.indexOf(item) >= 0) {
              if (route.children && route.children.length) {
                route.children = getChildren(route.children, item)
              }
              roles.push(route)
            }
          });
          resolve(roles)
        });
        reject()
      })

    },
    //登出
    LoginOut({commit , state}){
      return new Promise((resolve,reject)=>{
        commit('SET_TOKEN','');
        removeToken();
        location.reload()
      })
    },
    //前端登出
    FedLogOut({commit}){
      return new Promise(resolve => {
        commit ('SET_TOKEN','');
        removeToken();
        resolve()
      })
    }

  }
}

export default user
