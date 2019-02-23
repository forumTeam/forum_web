import request from '@/utils/request'

export function getUserDetail() {
  return request({
    url:'user/getUserDetail',
    method:'post',

  })
}
