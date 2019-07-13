import request from '@/utils/request'



export function login(account,password) {
  return request({
    url:'user/login',
    method:'post',
    data:{
      account,
      password
    }
  })
}


export function register({account,password,name,sex,nickName,qq,phone}) {
  return request({
    url:'user/register',
    method:'post',
    data:{
      account,
      password,
      name,
      sex,
      nickName,
      qq,
      phone
    }
  })
}


export function getInfo() {
  return request({
    url: '/user/getUserInfo',
    method: 'get'
  })
}
export function getRoles() {
  return request({
    url: '/user/getRoles',
    method: 'post',
  })
}
