<template>
    <div>
     <x-header>详情页面</x-header>
      <div class="detail" v-if="datas">
        <div class="shop">
          <!--<img src="/static/img1.jpg" alt="">-->
          <!--<img :src="'http://localhost:3333/www/shops/uploads/${pict}'" alt="">-->
          <!--<img :src="'/static/photo/'+datas.productImage " alt="">-->
          <img :src="'http://localhost:3333/uploads/'+datas.productImage " alt="">
          <!--<img :src="'datas.productImage'" alt="">-->
          <p class="desc"> <b>热卖</b>
            {{ datas.describe }}
          </p>
          <p class="price">
            <span> <small>￥</small>{{datas.salePrice}}</span>
            <small class="new">新品促销</small>
          </p>
          <span class="activ" v-if="datas.salePrice > 50">
            <del class="zhuan">专柜价 <i class="delet">￥{{datas.salePrice + 150}}</i> </del>&#X3000
            <span class="shuang">狂欢价 <i>￥{{datas.salePrice - 40}}</i> </span>
          </span>
          <span class="activ" v-else>
            <del class="zhuan">专柜价 <i class="delet">￥{{datas.salePrice + 50}}</i> </del>&#X3000
            <span class="shuang">狂欢价 <i>￥{{datas.salePrice - 5}}</i> </span>
          </span>
          <p class="info">
            <span class="left">快递：0.00</span>
            <span class="middle">月销{{ datas.productNum }}件</span>
            <span class="right">江苏苏州</span>
          </p>
          <a href="#/car" class="facar">
            <i class="fa fa-shopping-cart"></i>
          </a>
          <div class="buy" v-if="user && !admin">
            <a href="#/car" @click="addcar" class="addcar">添加到购物车</a>
            <!--<a :href="'#/mai/'+datas._id">立即购买</a>-->
            <a @click.prevent="liji">立即购买</a>

          </div>
          <div class="buy" v-else-if="admin.name == datas.admin">
            <a :href="'#/update/'+datas._id" class="upda">修改商品</a>
            <a href="" @click="deleted($event)">要删除啦</a>
          </div>
          <div class="buy" v-else>
            <a href="#/login">购买前记得先登录哦</a>
          </div>
          <div class="fen"></div>
          <div class="juan">
            <p class="p1">领劵<span>满400减50元</span><i class="fa fa-angle-right"></i></p>
            <p class="p2">促销 <span class="cu"><span>积分</span>&#X3000购买可得76积分</span>
              <span class="zhe"><span>折扣</span>指定商品满3件九折 <i class="fa fa-angle-double-right"></i></span>
            </p>
            <div class="div1">
                <span>极速退货 · 正品保证 · 极速退款 · 赠运费险</span>
            </div>
          </div>

          <div class="fen"></div>
          <div class="ping">

            <p>商品评价({{datas.reply_num}}) <span>好评 <span>97%</span><i class="fa fa-angle-right"></i></span>
            </p>
            <div>
              <a :href="'#/reply/'+datas._id">查看更多评论</a>
            </div>
          </div>
        </div>
      </div>
      <div class="details" v-if="!datas">
        <h2>该商品已被删除</h2>
      </div>
    </div>
</template>
<script>

import { XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem } from 'vux'
  import  axios from  'axios'
  export default {
    directives: {
        TransferDom
    },
    components: {
      XHeader,
      Actionsheet,
      ButtonTab,
      ButtonTabItem
    },
    data () {
      return {
        loading: false,
        post: null,
        error: null,
        datas:'',
        admin:'',
        user:''
      }
    },
//   参考网址： https://router.vuejs.org/zh-cn/advanced/data-fetching.html
    created () {
      // 组件创建完后获取数据，
      // 此时 data 已经被 observed 了
      this.fetchData()
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route': 'fetchData'
    },
    mounted:function(){
//        console.log('===============');
//        console.log(window.location.hash);
//        console.log(window.location.hash.slice(7));
////        这两个一样获取地址栏的id
//        console.log(this.$route.params.id)
    },
    methods: {
      fetchData () {
        this.error = this.post = null;
        this.loading = true;
        // replace getPost with your data fetching util / API wrapper
//        console.log(this.$route.params);
        var id = this.$route.params.id;
//        console.log(id);
        axios.get('/goods/good/'+ id ).then((resData)=>{
            if(resData.data.data.admin){
              this.admin = resData.data.data.admin;
            }
            if(resData.data.data.user){
              this.user = resData.data.data.user;
            }
            this.datas = resData.data.data.data;
        }).catch((error)=>{
            console.log(error);
        })
      },
      addcar:function(){
//          console.log(this.datas._id)
          axios.post('/goods/addcar',{shop_id:this.datas._id}).then(function(car){
            console.log(car)
          }).catch(function(err){
              console.log(err);
          })
      },
      deleted:function(ev){
          ev.preventDefault();
//          console.log(ev)
        axios.get('/goods/deleted',{
            params:{shop_id:this.datas._id}
        }).then(function(car){
            if(car.data.error == 0){
                location.reload();
            }
        }).catch(function(err){
//          console.log(11)
          console.log(err);
        })
      },
	liji:function(){
//		console.log(this.datas.checked)
		let arr = [];
		this.datas.productNum = 1
		this.datas.checked = true;
//		console.log(this.datas.checked)
		if(this.datas.checked == true){
			arr.push(this.datas);
		}
		
		axios.post('/goods/liji',{arr:arr}).then((resData) =>{
			console.log(resData.data)
			location.href = '/#/sure';
		}).catch((err) =>{
			console.log(err);
		})
	}
      }
    }

</script>
<style scoped>
  .vux-header{
    background:linear-gradient(left,#ff9000,#ff5000);
    position: fixed;
    top:0;
    width: 100%;
  }
  .detail{
    width: 100%;
    font-size: 14px;
  }
  .detail .shop{
    list-style: none;
    margin-top: 44px;
  }
  .detail .desc{
    padding: 10px;
  }
  .detail img{
    width: 100%;
    height: 350px;
  }
  .detail b{
    font-size: 12px;
    color: #fff;
    background: red;
    padding: 1px 3px;
    border-radius: 6px;
  }
  .detail .price{
    color: #ff6700;
    font-size: 16px;
    padding: 10px;
  }
  .detail .price .new{
    border:solid 1px #ff6700;
    padding: 2px;
    font-size: 10px;
    margin-left: 10px;
  }
  .detail .activ{
    font-size: 10px;
    color: #666;
    padding: 10px;
  }
  .detail .activ .shuang i{
    color: red;
  }
  .detail .info{
    /*margin-top: 15px;*/
    overflow: hidden;
    text-align: center;
    font-size: 12px;
    color: #666;
    margin: 15px 10px;
  }
  .detail .info .left{
    float: left;
    font-size: 12px;
    color: #666;
  }
  .detail .info .right{
    float: right;
    font-size: 12px;
    color: #666;
  }
  .detail .buy{
    background: #fff;
    width: 100%;
    position: fixed;
    bottom: 0;
    margin-top: 20px;
    text-align: right;
    padding: 10px 0;
    z-index: 999;
    /*position: relative;*/
  }
  .detail .facar{
    position: fixed;
    background: transparent;
    color: #999;
    bottom: 50px;
    font-size: 50px;
  }
  .detail .buy .addcar{
    background: #FF9500;
    margin-right: -4px;
  }
  .detail a{
    width: 25%;
    padding: 10px 15px;
    text-decoration: none;
    background: #ff5000;
    color: #fff;
    font-size: 16px;
  }
  .detail a.upda{
    background: #ff9402;
    margin-right: -4px;
  }
  .details{
    margin-top: 100px;
    text-align: center;
    color: #ff6b6d;
    font-size: 30px;
  }
  .ping{
    margin-bottom: 50px;
  }
  .ping>p {
    line-height: 45px;
    border-bottom: 1px solid #ccc;
    color: #666;
    font-size: 14px;
    padding: 0 15px;
    overflow: hidden;
  }
  .ping>div {
    text-align: center;
    padding: 20px;
  }
  .ping>div>a {
    color: #666;
    border: 1px solid #666;
    padding: 5px 10px;
    border-radius: 4px;
    margin: 20px 0;
    background: #fff;
    font-size: 14px;
  }
  .ping>p>span {
    float: right;
  }
  .ping>p>span>span {
    color: red;
  }
  .ping>p>span>i {
    font-size: 26px;
    margin-left: 10px;
    position: relative;
    top: 2px;
  }
  .div1 {
    background: #fff;
    color: #666666;
    overflow: hidden;
    padding: 8px 0;
  }
  .div1>span {
    display: block;
    line-height: 30px;
    padding-left: 15px;
    float: left;
    font-size: 14px;
  }
  .div1>span>img {
    width: 18px;
  }
  .div1>span>span {
    position: relative;
    bottom: 3px;
  }
  .cu {
    position: relative;
    left: 6px;
    font-size: 12px;
    top: 0px;
  }
  .cu > span{
    border: 1px solid #d7063b;
    border-radius: 4px;
    padding: 0 3px;
    color: #d7063b;
    font-size: 14px;
  }
  .zhe {
    display: block;
    margin-top: 20px;
    margin-left: 35px;
    position: relative;
  }
  .zhe i {
    position: absolute;
    font-size: 20px;
    right: 15px;
  }
  .zhe>span{
    border: 1px solid #d7063b;
    border-radius: 4px;
    color: #d7063b;
    padding: 0 3px;
    margin-right: 5px;
  }
  .p1 {
    position: relative;
  }
  .p1 span {
    color: #ff6700;
    border: 1px solid #ff6700;
    padding: 0 10px;
    margin: 0 10px;
  }
  .p1>i {
    font-size: 22px;
    position: absolute;
    right: 15px;
  }
  .juan>p {
    margin-left: 15px;
    border-bottom: 1px solid #ccc;
    padding: 10px 0;
    font-size: 14px;
    color: #666;
  }
  .fen {
    padding: 5px;
    background-color: #dedede;
  }


</style>
