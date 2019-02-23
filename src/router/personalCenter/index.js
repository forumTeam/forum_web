import Layout from '../../views/layout/Layout'
import MyPosts from '../../views/personalCenter/MyPosts'
import PostsDetail from '../../views/personalCenter/posts/PostsDetail'
import AddPosts from '../../views/personalCenter/posts/AddPosts'
import MySpace from '../../views/personalCenter/MySpace'
import personaLinformation from '../../views/personalCenter/personaLinformation'
export default {
  path:'/personalCenter',
  name:'personalCenter',
  redirect:'/personalCenter/personaLinformation',
  meta: { title: '个人中心', },
  component:Layout,
  children:[
    {
      path:'personaLinformation',
      name:'personaLinformation',
      meta: { title: '个人信息' },
      component:personaLinformation
    },
    {
      path:'MyPosts',
      name:'MyPosts',
      meta: { title: '我的帖子' },
      component:MyPosts
    },
    {
      path:'MySpace',
      name:'MySpace',
      meta: { title: '我的空间' },
      component:MySpace
    },
    {
      path:'AddPosts',
      name:'AddPosts',
      hidden:true,
      meta: { title: '添加帖子' },
      component:AddPosts
    },
    {
      path:'PostsDetail',
      name:'PostsDetail',
      hidden:true,
      meta: { title: '帖子详情' },
      component:PostsDetail
    }
  ]
}
