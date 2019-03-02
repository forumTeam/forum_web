import request from '@/utils/request'


export function selectDynamic({pageIndex,pageSize,pkDynamicId,dynamicTitle}) {
  return request({
    url:'dynamic/selectDynamic',
    method:'post',
    data:{
      pageIndex,
      pageSize,
      pkDynamicId,
      dynamicTitle
    }
  })
}








export function selectDynamicDetail({pkDynamicId}) {
  return request({
    url:'dynamic/selectDynamicDetail',
    method:'post',
    data:{
      pkDynamicId
    }
  })
}


export function addDynamic({dynamicTitle,dynamicContent}) {
  return request({
    url:'dynamic/addDynamic',
    method:'post',
    data:{
      dynamicTitle,
      dynamicContent
    }
  })
}



export function delDynamic({pkDynamicId}) {
  return request({
    url:'comment/delDynamic',
    method:'post',
    data:{
      pkDynamicId
    }
  })
}

