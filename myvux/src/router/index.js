import Vue from 'vue';

import VueRouter from 'vue-router';
import HelloFromVux from '../components/HelloFromVux'
import LoginView from '../pages/LoginView.vue'
import ZhuceView from '../pages/ZhuceView.vue'
import AdminZhuce from '../pages/AdminZhuce.vue'
import AdminLogin from '../pages/AdminLogin.vue'
import dian from '../pages/dian.vue'
import MyTao from '../pages/MyTao.vue'
//import ReceiveView from '../pages/ReceiveView.vue'
import add from '../pages/add.vue'
import address from '../pages/address.vue'
import XiangQing from '../pages/XiangQing.vue'
import ShoppingCar from '../pages/ShoppingCar.vue'
import update from '../pages/update.vue'
import WeiTao from '../pages/WeiTao.vue'
import UserCenter from '../pages/UserCenter.vue'
import SearchView from '../pages/SearchView.vue'
import SureMai from '../pages/SureMai.vue'
import ReplyView from '../pages/ReplyView.vue'
import SubmitView from '../pages/SubmitView.vue'

import sure from '../pages/sure.vue'
import zhifu from '../pages/zhifu.vue'
import shou from '../pages/ShouHuo.vue'
import daizhifu from '../pages/daizhifu.vue'
import all from '../pages/all.vue'
import daishou from '../pages/daishou.vue'
import daiping from '../pages/DaiPing.vue'
import tongzhi from '../pages/tongzhi.vue'
const datas={
  props:['id'],
}
// 导入组件
Vue.use(VueRouter);
const routes = [
  //首页
  {
    path: '/',
    component: HelloFromVux
  },
  //用户登录
  {
    path:'/login',
    component:LoginView
  },
  //用户注册
  {
    path:'/zhuces',
    component:ZhuceView
  },
  //管理员注册
  {
    path:'/admin',
    component:AdminZhuce
  },
  //我的店铺
  {
    path:'/myDian',
    component:dian
  },
  //我的淘宝
  {
    path:'/my',
    component:MyTao
  },
  //快递物流
//{
//  path:'/receive',
//  component:ReceiveView
//},
  //管理员登录
  {
    path:'/adminlogin',
    component:AdminLogin
  },
  //管理员添加商品
  {
    path:'/add',
    component:add
  },
  //用户管理地址
  {
    path:'/address',
    component:address
  },
  //商品的详情页面
  {
    path:'/good/:id',
    component: XiangQing,
    // props:true
  },
  //购物车页面
  {
    path:'/car',
    component:ShoppingCar
  },
  //管理员更新商品页面
  {
    path:'/update/:id',
    component:update
  },
  //微淘页面
  {
    path:'/weitao',
    component:WeiTao
  },
  //个人中心
  {
    path:'/user',
    component:UserCenter
  },
  //搜索页面
  {
    path:'/searchs',
    component:SearchView
  },
  //立即购买
  {
    path:'/mai/:id',
    component:SureMai
  },
  //购物车中提交订单
  {
    path:'/sure',
    component:sure
  },
  //评论商品
  {
    path:'/reply/:id',
    component:ReplyView
  },
  //购买成功
  {
    path:'/submits',
    component:SubmitView
  },
{
    path:'/zhifu',
    component:zhifu
},
{
    path:'/shou',
    component:shou
},
{
    path:'/daizhifu',
    component:daizhifu
},
{
    path:'/all',
    component:all
},
{
    path:'/daishou',
    component:daishou
},
{
    path:'/daiping',
    component:daiping
},
{
    path:'/tongzhi',
    component:tongzhi
},


];

//
export default new VueRouter({
    routes
})
