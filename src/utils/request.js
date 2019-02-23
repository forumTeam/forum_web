import axios from 'axios'
import { getToken } from '@/utils/auth'
import {MessageBox} from 'element-ui'
import store from '../store'
import {errorMessageBox} from "./message";

const service=axios.create({
  baseURL:process.env.BASE_API,
  timeout:5000
})


service.interceptors.request.use(
  config =>{
    if (store.getters.token){
      config.headers['token']=getToken()
    }
    return config
  }
),
  error=>{
    console.log(error) // for debug
    Promise.reject(error)
  }

service.interceptors.response.use(
   response => {
     const res=response.data
     if (res.code !== 0 ){
       errorMessageBox(res.message)

       if (res.code  === 2 ){
         MessageBox.confirm(
           '你已被登出，可以取消继续留在该页面，或者重新登录',
           '确定登出',
           {
             confirmButtonText:'请重新登录',
             cancelButtonText:'取消',
             type:'warning'
           }
         ).then(()=>{
           store.dispatch('FedLogOut').then(() => {
             location.reload() // 为了重新实例化vue-router对象 避免bug
           })
         })
       }
       return Promise.reject(res.message)
     } else {
       return response.data
     }
   },
  error=>{
    console.error('err'+error)
    errorMessageBox(error.message)
    return Promise.reject(error)
  }

)

export default service




