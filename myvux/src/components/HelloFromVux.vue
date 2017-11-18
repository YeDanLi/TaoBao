<template>
  <div>
    <header-bar></header-bar>
    <div class="vux-demo">
      <swiper :list="baseList" v-model="demo01_index"  auto loop>
      </swiper>
      <ul class="mains">
        <li v-for="item in main ">
          <img :src="item.img" alt="" />
          <span>{{item.name}}</span>
        </li>
      </ul>
      <div class="swip">
        <img src="/static/toutiao.png" alt="">
        <swiper auto height="30px" direction="vertical"
                :interval=2000 class="text-scroll" :show-dots="false">
          <swiper-item><p><b>&#X3000热门&#X3000</b>土豪撒钱！400万仅一天</p></swiper-item>
          <swiper-item><p><b>&#X3000旅行&#X3000</b>爽翻！999元开战机！</p></swiper-item>
          <swiper-item><p><b>&#X3000特惠&#X3000</b> 血拼！100万份爆款！</p></swiper-item>
          <swiper-item><p><b>&#X3000疯抢&#X3000</b>海外浓妆直邮，狂欢3天！</p></swiper-item>
        </swiper>
      </div>

      <div class="sort">
        <p>排个序吧：
          <b v-show="isTop" @click="sort"> 价格
            <i class="fa fa-long-arrow-down"></i>
          </b>
          <b v-show="!isTop"  @click="sort" > 价格
            <i class="fa fa-long-arrow-up"></i>
          </b>
        </p>
      </div>

      <div class="root" v-if="goods">
        <ul class="shops">
          <li class="shop" v-for="good in goods">

            <a :href="'#/good/'+good._id" >
              <img :src="'http://localhost:3333/uploads/'+good.productImage " alt="">
            <p class="desc" > <b v-if="good.productNum > 5">热卖</b>
              <b v-if="good.productNum > 15">活动</b><b v-else>卖场</b>
              {{ good.describe }}
            </p>
            <p class="price">
              <span> <small>￥</small> {{ good.salePrice }}.00</span>&#X3000;{{good.productNum}}人付款
            </p>
            <span class="activ">
                <span class="jin">购物津贴</span>
                <span class="jian">每满400减50</span>
            </span>
            <p class="maijia">我是旺家：{{good.admin}}</p>
            </a>
          </li>
        </ul>
      </div>
      <div class="details" v-else>
        <h2>还没有商品，请稍后......</h2>
      </div>
    </div>
    <footer-bar></footer-bar>
  </div>
</template>
<script>
  import HeaderBar from './HeaderBar.vue'
  import FooterBar from  './FooterBar'
  import {Swiper,SwiperItem} from 'vux';
  import axios from 'axios';
  const baseList = [
    {
      url: 'javascript:',
      img: '/static/img1.jpg',
    },
    {
      url: 'javascript:',
      img: '/static/img2.jpg',
    },
    {
      url: 'javascript:',
      img: '/static/img3.jpg',
    },
    {
      url: 'javascript:',
      img: '/static/img4.jpg',
    },
    {
      url: 'javascript:',
      img: '/static/img5.jpg',
    },
  ];

export default {

  components: {
    FooterBar,
     Swiper,SwiperItem,
    HeaderBar,
  },
  data () {
    return {
      isTop:true,
      num:1,
//    pageSize:8,
      sortFlag:true,
      baseList:baseList,
      demo01_index: 0,
      priceChecked:'all',
      id:'',
      goods:'',
      main:[
        {
          name:'天猫',
          img:'/static/1.png',
        },
        {
          name:'聚划算',
          img:'/static/2.png',
        },
        {
          name:'天猫国际',
          img:'/static/3.png',
        },
        {
          name:'外卖',
          img:'/static/4.png',
        },
        {
          name:'天猫超市',
          img:'/static/5.png',
        },
        {
          name:'充值中心',
          img:'/static/6.png',
        },
        {
          name:'飞猪旅行',
          img:'/static/7.png',
        },
        {
          name:'领金币',
          img:'/static/8.png',
        },
        {
          name:'拍卖',
          img:'/static/9.png',
        },
        {
          name:'分类',
          img:'/static/10.png',
        },
      ]
    }
  },
  mounted:function(){
//      将商品数据返回到首页上
      var that = this;
      axios.get(`goods/index?limit=${this.num}`).then(function(goods){
          that.goods = goods.data.message;
        if(goods.data.error == 0){

        }
      }).catch(function(err){
          console.log(err);
      });
//      加载更多
      var isShow = false;

          window.onscroll = function(){
          	var conHeight = document.body.clientHeight;
            //获取滚动条的偏移量
            var scrollTop = (document.body.scrollTop || document.documentElement.scrollTop);
            //获取可视窗口的高度
            var windowH = window.innerHeight;
            if(scrollTop + windowH >= conHeight - 40){
              if(!isShow){
              	isShow = true;
                axios.get(`goods/indexs?limit=${that.num += 1}`).then(function(responce){
								
									that.goods = responce.data.message;
									isShow = false
                }).catch(function(err){
                  console.log(err);
                });
              }
            }
          }
            
          
//      }else {
////        alert(resData.data);
//      }
//    }).catch((err) =>{
//      console.log(err)
//    })
  },
  methods:{
//      以价格排序
    sort:function(){
      this.isTop = !this.isTop;
      this.goods.sort(function(a,b){
        return b - a;
      })
    },
  }
}
</script>

<style scoped>

  .details{
    margin-top: 100px;
    text-align: center;
    color: #ff6b6d;
    font-size: 30px;
  }
.vux-demo{
  margin-top: 44px;
}
.mains{
  margin: 10px 0;
  padding: 0;
  overflow: hidden;
}
.mains li{
  list-style: none;
  width: 20%;
  float: left;
  text-align: center;
  margin: 5px 0;
}
.mains li span{
  display: block;
  color: #777;
  font-size: 12px;
}
.mains li img{
  width: 50px;
  height: 35px;
}
  div.swip{
    overflow: hidden;
    height: 35px;
    border-top: solid 1px #eee;
    padding: 3px 0;
    color: #333;
  }
div.swip p{
  margin: 5px 0;
}
div.swip b{
  color:red;
}
  div.swip img{
    float: left;
    width: 25%;
    height: 30px;
    padding: 2px 0;
    margin-left: 10px;
  }
  div.swip .text-scroll{
    width: 70%;
    float: right;
  }
  .sort{
    /*text-align: center;*/
    color: #ff600c;
    padding: 5px 0;
  }
.root .shops{
  overflow: hidden;
  margin-bottom: 60px;
}
.root .shops .shop{
  list-style: none;
  float: left;
  border:solid 2px #ffcce6;
  width: 50%;
  font-size: 12px;
  color: #333;
  height: 270px;
}
.root .shops .shop > a{
  text-decoration: none;
}
.root .shops .shop p{
  padding: 5px;
}
.root .shops .shop img{
  width: 100%;
  height: 140px;
}
.root .shops .shop .desc{
  color: #333;
}
.root .shops .shop .desc b{
  color: #fff;
  background: red;
  padding: 1px 3px;
  border-radius: 8px;
}
.root .shops .shop .price{
  font-size: 10px;
  color: #333;
}
.root .shops .shop .price span{
  color: red;
  font-size: 14px;
}
.root .shops .shop .activ{
  margin: 30px 0;
  margin-left: 50px;
  font-size: 9px;
  color: red;
  border:solid 1px red;
  background: #ffd6eb;
}
.root .shops .shop .activ .jin{
  padding:0 5px;
  border-right: solid 1px #ff5d6a;
}
.root .shops .shop .activ .jian{
  padding:0 5px;
}
.root .shops .shop .maijia{
  color: #aa8b46;
}
</style>
