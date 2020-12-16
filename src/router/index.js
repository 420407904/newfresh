import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
  {
    path:'/',
    component:()=>import('../views/Index'),
    meta: {
      title: ' 首页'   // 标题设置
    }
  },
  {
    path:'/about',
    component:()=>import('../views/About'),
  },
  {
    path:'/news',
    component:()=>import('../views/News'),
  },
  {
    path:'/news_detail/:nid',
    component:()=>import('../views/NewsDetail'),
    name:"news_detail",
  },
  {
    path:'/contact',
    component:()=>import('../views/Contact'),
  },
  {
    path:'/login',
    component:()=>import('../views/Login'),
  },
  {
    path:'/register',
    component:()=>import('../views/Register'),
  },
  {
    path:'/product/:type',
    component:()=>import('../views/Product'),
    name:"product",
  },
  {
    path:'/product_detail/:pid',
    component:()=>import('../views/ProductDetail'),
    props: true,
    name: "product_detail",
  },
  {
    path:'/cart/:uid',
    component:()=>import('../views/Cart'),
    props:true,
    name:"cart",
  },
]

const router = new VueRouter({
  mode:"history",
  routes
})

export default router
