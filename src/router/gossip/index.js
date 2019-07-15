import Layout from '../../views/layout/Layout'
import index from '../../views/gossip/index'
export default {
  path:'/gossip',
  name:'gossip',
  redirect:'/gossip/index',
  meta: { title: '一览芳华s', },
  component:Layout,
  role:['dddd'],
  children:[
    {
      path:'index',
      name:'index',
      meta: { title: '聊天' },
      component:index
    },
  ]
}
