import request from '@/utils/request'


export function addPosts({postsTitle,postsContent}) {
  return request({
    url:'myPosts/addPosts',
    method:'post',
    data:{
      postsTitle,
      postsContent
    }
  })
}



export function selectPosts({All,myPosts,pageIndex,pageSize}) {
  return request({
    url:'myPosts/selectPosts',
    method:'post',
    data:{
      All,
      myPosts,
      pageIndex,
      pageSize
    }
  })
}
