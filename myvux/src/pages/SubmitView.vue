<template>
  <div class="ok">
    <nav>
      <a class="nav-zuo" href="">
        <i class="fa fa-angle-left" ></i>
      </a>
      提交订单页面
    </nav>
    <flow class="flow">
      <flow-line :process-span="100" :is-done="true"></flow-line>
      <flow-state :is-done="true" title="确认信息"></flow-state>

      <flow-line :process-span="100" :is-done="true"></flow-line>

      <flow-state :is-done="true" title="订单详情"></flow-state>

      <flow-line :process-span="50" :is-done="true"></flow-line>

      <flow-state title="支付"></flow-state>
      <flow-line ></flow-line>

      <flow-state title="完成"></flow-state>

    </flow>
    <div class="dizhi">
      <a class="a">
        <span><i class="fa fa-map-marker"></i></span>
        <div class="di" v-for="address in addresses">
          <h3>收货人: {{address.userName}}</h3>
          <p>
            收货地址: {{address.address}}{{address.streetName}}
            <span class="pori">联系电话：{{address.tele}}</span>
          </p>
          <span class="mian">(收获不便时,可选择免费代收货服务哦)</span>
        </div>
        <i class="fa fa-angle-right"></i>
      </a>
      <img src="../assets/tiao.jpg" alt="">
    </div>
    <div class="li" v-for="data in datas">
     {{data.salePrice}}
      <img :src="'http://localhost:3333/uploads/'+data.productImage " alt="">
      <div>
        <p class="ming">商品名称:{{data.productName}}</p><b></b>
        <p class="fah">卖家承诺: 卖家承诺7天内</p>
        <p class="jisuan">¥ {{data.salePrice * data.productNum}}<span>
              x{{data.productNum}}
            </span></p>
      </div>
    </div>
    <p class="fu">订单 总价格： ￥ <b>{{total}}</b></p><br>
 	<footer>
      <a href="" @click.prevent="surezhifu">支付</a>
    </footer>
  </div>
</template>
<script>
  import axios from 'axios';
import { XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem } from 'vux'
import { Flow,FlowState,FlowLine } from 'vux';

  export default {
    data: function () {
      return {
        progress:[],
        datas:'',
        addresses:'',
      }
    },
    components:{
        XHeader,
        Actionsheet,
        ButtonTab,
        ButtonTabItem,
      Flow,
      FlowState,
      FlowLine
      },
    mounted:function(){
        axios.get('/goods/data').then((resData) =>{
//          console.log(resData.data.message)
          this.datas = resData.data.message.datas;
          this.addresses = resData.data.message.addresses;
        })
    },
    methods:{
        surezhifu:function(){
        	var params = {
                shops:this.datas,
                addressed:this.addresses
            }
        	axios.post('/goods/surezhifu',params).then((data)=>{
        		console.log(data.data)
        		console.log('data.data')
        		if(data.data.error ==0){
        			location.href = '/#/zhifu'
        		}
        	}).catch((err) =>{
        		console.log(err)
        	})
        }
    },
    computed:{
      total :function(){
        let total= 0;
        for(var i = 0;i <this.datas.length ;i++){
          total += this.datas[i].productNum * this.datas[i].salePrice
        }
        return total;
      }
    }
  }
</script>
<style scoped>
  .vux-header{
    background:linear-gradient(left,#ff9000,#ff5000);
  }
    nav{
    background:linear-gradient(left,#ff9000,#ff5000);
    text-align: center;
    color: #fff;
    line-height: 45px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 999;
  }
  nav a{
    position: absolute;
    left: 20px;
    font-size: 28px;
    color: #fff;
    top: -3px;;
  }
  html{
  	/*margin-top: 44px;*/
  }
  .container{
    width: 50%;
    margin: 0px auto;
    text-align: center;
  }
  .container img{
    width: 120px;
    height: 150px;
  }
  .fu{
    border-top: solid 1px #eee;
    line-height: 50px;
    margin-bottom: 20px;
    background: #fff;
    padding-right: 20px;
    text-align: right;
  }
  .fu b{
    color: #ff6700;
  }

  h2{
    color: #555;
  }
  .container p{
    line-height: 25px;
  }
  .container a{
    text-decoration: none;
    color: #ff6700;
    border:solid 1px #ff6700;
    padding: 5px;
  }
  .li{
    height: 120px;
    border: 1px solid #eee;
    margin-top: 10px;
    background: #efefef;
    list-style: none;
    font-size: 14px;
  }
  .li > img{
    display: block;
    float: left;
    width: 20%;
    margin: 10px;
  }
  .a > i{
    position: absolute;
    top:45px;
    right: 10px;
    font-size: 28px;
  }
  .mian{
    color: #cc0000;
    font-size: 12px;
    margin-left: 10px;
  }
  .di h3{
    margin: 10px 0;
    font-size: 16px;
  }
  .di p{
    font-size: 14px;
    width: 350px;
    word-wrap:break-word ;
    line-height: 25px;
  }
  .pori{
    position: absolute;
    top: 10px;
    right: 20px;
  }
  .dizhi{
    background: #eee;
    /*margin-bottom: 80px;*/
  }
  .a {
    border: 1px solid #eee;
    display: block;
    height: 130px;
    color: #333;
    position: relative;
    text-decoration: none;
  }
  .a > span{
    float: left;
    width: 15px;
    height: 100%;
    font-size: 26px;
    margin: 0 10px;
    position: relative;
    top: 40px;
  }
  .jisuan{
    color: #cc0000;
    margin-top: 10px;
  }
  footer{
    line-height: 35px;
    padding: 10px;
    position: fixed;
    left: 0;
    bottom: 0;
    right: 0;
    text-align: right;
    background: #fff;
  }
  footer > a{
    display: inline-block;
    border:solid 1px #ff5000;
    text-decoration: none;
    color: #ff5000;
    border-radius: 30px;
    height: 100%;
    padding: 0 15px;
  }
	.flow{
		margin-top: 40px;
	}
</style>
