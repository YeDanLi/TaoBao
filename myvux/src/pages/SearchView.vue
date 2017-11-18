<template>
    <div class="contain">
     <x-header>搜索页面</x-header>

    <div class="infos">
      <input type="text" v-model="cha" placeholder="输入你想要搜索的商品">
      <div class="shop" v-for="good in result" v-if="result">
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
        <!--<div v-if="good == ''">-->
          <!--<h3>没有你想要的商品呦</h3>-->
        <!--</div>-->
      </div>
      <div v-if="result == ''">
        <!--<h4>没有该商品哦</h4>-->
        <h3>{{ kong }}</h3>
        <h2>历史搜索</h2>
        <span v-for="data in arr" class="cate" >
          {{data}}
        </span>
      </div>
    </div>
    </div>
</template>
<script>
import { XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem } from 'vux'
import $ from '../assets/jquery';
  import axios from 'axios';
    export default {

    directives: {
        TransferDom
    },
       components: {
        XHeader,
        Actionsheet,
       ButtonTab, ButtonTabItem
      },
        data: function () {
            return {
                cha:'',
              result:[],
                arr:[
                    '爱马仕香水','爱小时光正版',  '鞋子女','睡眠足贴','妮子大衣女院宿风'
                  ,'失眠特效 安神 改善睡眠 足贴'
                  ,'匹克男鞋女鞋','手机包','男鞋冬季','衣服','秋装男'
                ],
              kong:''
            }
        },
      mounted:function(){
        var that = this;
        $('input').keydown(function(){
            let content = that.cha;
//            console.log(content);
            axios.post('/goods/search',{content:content}).then((resData) =>{
                if(resData.data.error == 0){
//                    console.log(0)
                  console.log(resData.data.message)

//                    console.log(1)
                    that.result = resData.data.message;
                  
                }
            }).catch((err) =>{
                console.log(err);
             })
        })
      },

    }
</script>
<style scoped>
 .vux-header{
    background:linear-gradient(left,#ff9000,#ff5000);
   position: fixed;
   top:0;
   width: 100%;
  }
.contain h2{
  text-align: center;
  color: #333;
  padding: 8px 0;
}
.infos{
  margin-top: 44px;
}
  div span.cate{
    font-size: 14px;
    background: #eee;
    padding: 5px 15px;
    margin: 18px;
    border-radius: 20px;
    line-height: 50px;
  }
 input{
   display: block;
   border: none;
   width: 80%;
   margin:0px auto;
   text-align: center;
   background: #eee;
   border-radius: 20px;
   padding: 10px 0;
 }

 .shop{
   list-style: none;
   float: left;
   border:solid 2px #ffcce6;
   width: 50%;
   font-size: 12px;
   color: #333;
   height: 270px;
 }
 .shop > a{
   text-decoration: none;
 }
 .shop p{
   padding: 5px;
 }
 .shop img{
   width: 100%;
   height: 140px;
 }
 .shop .desc{
   color: #333;
 }
 .shop .desc b{
   color: #fff;
   background: red;
   padding: 1px 3px;
   border-radius: 8px;
 }
 .shop .price{
   font-size: 10px;
   color: #333;
 }
 .shop .price span{
   color: red;
   font-size: 14px;
 }
 .shop .activ{
   margin: 30px 0;
   margin-left: 50px;
   font-size: 9px;
   color: red;
   border:solid 1px red;
   background: #ffd6eb;
 }
 .shop .activ .jin{
   padding:0 5px;
   border-right: solid 1px #ff5d6a;
 }
 .shop .activ .jian{
   padding:0 5px;
 }
 .shop .maijia{
   color: #aa8b46;
 }

</style>
