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


export function selectPostsDetail({pkPostsId}) {
  return request({
    url:'myPosts/selectPostsDetail',
    method:'post',
    data:{
      pkPostsId
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


export function selectComment({pkPostsId,pageIndex,pageSize}) {
  return request({
    url:'comment/selectComment',
    method:'post',
    data:{
      pkPostsId,
      pageIndex,
      pageSize
    }
  })
}


export function addPostsDetail({pkPostsId,content}) {
  return request({
    url:'comment/addComment',
    method:'post',
    data:{
      pkPostsId,
      content
    }
  })
}

