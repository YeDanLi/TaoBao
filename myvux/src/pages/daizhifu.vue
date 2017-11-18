<template>
    <div>
    <x-header>待付款商品</x-header>
      <div class="all" v-for="(data,index) in datas">
      	
          <img :src="'http://localhost:3333/uploads/'+data.productImage " alt="">
          <div class="div1">
            <p class="ming">商品名称:{{data.productName}}</p>
            <p class="ming">商品描述:{{data.describe}}</p>
            <p class="ming">商品件数:{{data.productNum}}</p>
            <p class="fah">卖家承诺: 卖家承诺7天内</p>
            <a href="" @click.prevent="money(index)" class="footer">买吗{{index}}?去支付</a>
          </div>
      </div>
    </div>
</template>
<script>
  import axios from 'axios'
  import { XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem } from 'vux'
    export default {
      directives: {
        TransferDom
      },
      components:{
        XHeader,
        Actionsheet,
        ButtonTab,
        ButtonTabItem,
      },
        data: function () {
            return {
                datas:''
            }
        },
      mounted:function(){
          axios.get('/goods/daizhifu').then((resData) =>{
              if(resData.data.error == 0){
              	console.log('待支付页面')
                console.log(resData.data.message)
//              let message = resData.data.message;
//              message.forEach((data) =>{
                this.datas = resData.data.message
//              	this.datas = data;
//              })
              }
          }).catch((err) =>{
              console.log(err);
          })
      },

      methods:{
      	money:function(index){
      		var num = this.datas[index];
      		axios.post('/goods/money',num).then((data) =>{
//    			console.log(data.data)
      			if(data.data.error ==0 ){
      				location.href = '/#/zhifu'
      			}
      		}).catch((err) =>{
      			console.log(err);
      		})
      		console.log(num);
      		
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
    z-index: 999;
  }
  .all{
    margin-top: 45px;
  }
  .footer{
    display: inline-block;
    border:solid 1px #ff5000;
    text-decoration: none;
    color: #ff5000;
    border-radius: 30px;
    height: 100%;
    padding: 0 15px;
  }
  .li{
    height: 120px;
    border: 1px solid #eee;
    margin-top: 10px;
    background: #efefef;
    list-style: none;
    font-size: 14px;
    overflow: hidden;
  }
.div1{
    float: left;
    margin-top: 10px;
    /*height: 190px;*/
  }
img{
    display: block;
    float: left;
    width: 20%;
    margin: 10px;
  }
  .jisuan{
    color: #111;
    margin: 10px 30px;
    float: right;
  }
  .jisuan span{
    text-align: right;
    color: #666;
    display: block;
  }

</style>
