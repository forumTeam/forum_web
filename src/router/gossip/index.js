import Layout from '../../views/layout/Layout'
import index from '../../views/gossip/index'
export default {
  path:'/gossip',
  name:'gossip',
  redirect:'/personalCenter/personaLinformation',
  meta: { title: '一览芳华', },
  component:Layout,
  children:[
    {
      path:'index',
      name:'index',
      meta: { title: '聊天' },
      component:index
    },

  ]
}
