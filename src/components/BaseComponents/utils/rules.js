const rules = {
  /* 必传条件 */
  required: (item) => {
    let rule = { required: true, message: '请输入' + item.label }
    if (item.type === 'image') rule.message = '请上传' + item.label
    if (item.type === 'date') rule.message = '请选择' + item.label
    if (item.type === 'select') rule.message = '请选择' + item.label
    if (item.type === 'password') rule.message = '请输入' + item.label
    return rule
  },

  /* 手机号码 */
  phone: (item) => {
    return { pattern: /^1([34578])\d{9}$/, message: '请输入正确的手机号码' }
  },

  /* 身份证号码 */
  idNumber: (item) => {
    return { pattern: /^\d{18}|\d{15}/, message: '请输入正确的身份证号码' }
  },

  /* 性别 */
  sex: (item) => {
    return { pattern: /[男女]/, message: '请输入正确的性别，男或女' }
  },
  /* 密码 */
  password: (item) => {
    return { pattern: /.{5,}/, message: '请输入5位以上的密码' }
  },
  /* 金额 */
  money: () => {
    return { pattern: /^\d+$|^\d+\.\d+$/, message: '请输入正确的金额' }
  },

  /* 自定义校验器 */
  validator: (item) => {
    return { validator: item.validator }
  }
}

export default rules
