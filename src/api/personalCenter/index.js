import request from '@/utils/request'

export function getUserDetail() {
  return request({
    url: 'user/getUserDetail',
    method: 'post',

  })
}



  export function count() {
    return request({
      url:'user/count',
      method:'post',
    })
}
