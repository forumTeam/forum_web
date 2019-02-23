import {Message,MessageBox} from 'element-ui'


export function errorMessageBox(message) {
  return new Promise((resolve , reject)=>{
  MessageBox.confirm(message,'提示',{
    confirmButtonText:'确认',
    showCancelButton:false,
    type:'warning '
  }).then(()=>{
    resolve()
  }).catch(()=>{
    reject()
  })
  })
}

/**
 * 消息提示框
 * @param title
 * @param content
 * @param sureBtnText
 * @param cancelBtnText
 * @param type
 * @returns {Promise<any>}
 */
export function messageBox({ title = '提示', content = 'content', sureBtnText = '确认', cancelBtnText = '取消', type = 'warning' }) {
  if (typeof title !== 'string') {
    title.toString()
  }
  if (typeof content !== 'string') {
    title.toString()
  }
  if (typeof sureBtnText !== 'string') {
    title.toString()
  }
  if (typeof cancelBtnText !== 'string') {
    title.toString()
  }
  return new Promise((resolve, reject) => {
    MessageBox.confirm(content, title, {
      confirmButtonText: sureBtnText,
      cancelButtonText: cancelBtnText,
      type: type
    }).then(() => {
      resolve()
    }).catch(() => {
      reject()
    })
  })
}

export function successMessageBox(message) {
  return new Promise(((resolve, reject) => {
    MessageBox.confirm(message,'成功',{
      confirmButtonText:'确认',
      showCancelButton:false,
      type:'success'
    })
  }))
}
