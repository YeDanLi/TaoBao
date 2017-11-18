<template>
  <div class="hello">
    <nav>
      <a class="nav-zuo" href="#/">
        <i class="fa fa-angle-left"></i>
      </a>
      提交订单页面
    </nav>
    <!--<flow class="flow">-->
      <!--<flow-line :process-span="100" :is-done="true"></flow-line>-->
      <!--<flow-state :is-done="true" title="确认信息"></flow-state>-->

      <!--<flow-line></flow-line>-->

      <!--<flow-state title="订单详情"></flow-state>-->

      <!--<flow-line></flow-line>-->

      <!--<flow-state title="支付"></flow-state>-->
      <!--<flow-line ></flow-line>-->

      <!--<flow-state title="完成"></flow-state>-->

    <!--</flow>-->
    <div class="dizhi">
      <a href="#/address" class="a">
        <span><i class="fa fa-map-marker"></i></span>
        <div class="di" v-for="address in addresses">
          <h3>收货人: {{address.userName}}</h3>
          <p>
            收货地址: {{address.address}}
            <span class="pori">联系电话：{{address.tele}}</span>
          </p>
          <span class="mian">(收获不便时,可选择免费代收货服务哦)</span>
        </div>
        <i class="fa fa-angle-right"></i>
      </a>
      <img src="../assets/tiao.jpg" alt="">
    </div>
    <section>
      <ul>
        <li class="li" v-for="data in datas">
          <!--{{data}}-->{{data.salePrice}}
          <img :src="'http://localhost:3333/uploads/'+data.productImage " alt="">
          <div>
            <p class="ming">商品名称:{{data.productName}}</p><b></b>
            <p class="fah">发货时间: 卖家承诺7天内</p>
            <p class="jisuan">¥ {{data.salePrice * data.productNum}}<span>
              <strong @click="editCart('minu',data)">-</strong>
              x{{data.productNum}}
              <strong  @click="editCart('add',data)">+</strong>
            </span></p>
          </div>
        </li>
      </ul>
    </section>
    <div class="xiang">
      <div>购买数量
        <span>
          <b >{{nums}}</b>
          <i class="fa fa-angle-right"></i>
        </span>
      </div>
      <div>配送方式 <span>快递 免运<i class="fa fa-angle-right"></i></span></div>
      <div>运费险 <span><i class="fa fa-angle-right"></i></span></div>
    </div>
    <footer>
      合计: <span> ¥ {{total}}</span>
      <a href="" @click="mai($event)">提交订单</a>
    </footer>
  </div>
</template>
<script>
  import axios from 'axios'
  import addressBar from './address.vue';
  import { Flow,FlowState,FlowLine } from 'vux';
  export default{
    components: {
      addressBar,
      Flow,
      FlowState,
      FlowLine
    },
    data:function(){
      return {
//        loading: false,
//        post: null,
//        error: null,
        datas:'',
        user:'',
        addresses:'',
      }
    },
    created () {
//      this.fetchData()
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
//      '$route': 'fetchData'
    },
    methods:{
      fetchData () {
//        this.error = this.post = null;
//        this.loading = true;
//        var id = this.$route.params.id;
//        axios.get('/goods/good/'+ id ).then((resData)=>{
//          if(resData.data.data.admin){
//            this.admin = resData.data.data.admin;
//          }
//          if(resData.data.data.user){
//            this.user = resData.data.data.user;
//          }
//          this.datas = resData.data.data.data;
//        }).catch((error)=>{
//          console.log(error);
//        })
      },
      editCart(flag,item){
//          console.log('编辑进来')
        if(flag=='add'){
          item.productNum++;
        }else if(flag=='minu'){
          if(item.productNum<=1){
            return;
          }
          item.productNum--;
        }else{
          item.checked = item.checked=="1"?'0':'1';
        }
        axios.post("/goods/cartEdit",{
          productId:item.productId,
          productNum:item.productNum,
          checked:item.checked
        }).then((response)=>{
          let res = response.data;
          if(res.status=="0"){
//            this.$store.commit("updateCartCount",flag=="add"?1:-1);
          }
        })
      },
      mai:function(ev){
          ev.preventDefault();
          console.log(111);
          let params = {
              datas:this.datas,
              addresses:this.addresses
          };
          axios.post('/goods/mai',params).then((resData) =>{
              console.log(resData);
              location.href = '/#/submits'
          })
      }
    },
    mounted:function(){
      axios.get('/goods/huo').then((data) =>{
          console.log(data.data)
        this.datas = data.data.shops;
//        console.log(this.datas);
        let nums = 0;
        this.user = data.data.user;
      }),
        axios.get('/goods/huoAddress').then((resData) =>{
          this.addresses = resData.data.address;
        })
    },
    computed:{
        nums :function(){
            let nums= 0;
            for(var i = 0;i <this.datas.length ;i++){
                nums += this.datas[i].productNum * 1
            }
            return nums;
        },
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
  footer > span{
    color: #FF8C00;
  }
  .flow{
    margin-top: 34px;
    /*position: fixed;*/
    /*top:100px;*/
    /*z-in*/
  }

  .vux-header{
    background:linear-gradient(left,#ff9000,#ff5000);
    position: fixed;
    top:0;
    width: 100%;
  }
  footer{
    line-height: 45px;
    border-top: 1px solid #ccc;
    position: fixed;
    left: 0;
    bottom: 0;
    right: 0;
    text-align: right;
    background: #fff;
  }
  footer > a{
    display: inline-block;
    background:linear-gradient(left,#ff9000,#ff5000);
    text-decoration: none;
    color: #fff;
    height: 100%;
    padding: 0 15px;
    margin-left: 10px;
  }
  .xiang{
    padding-left: 10px;
    margin-bottom: 50px;
  }
  .xiang > div{
    line-height: 50px;
    border-bottom: 1px #ddd solid;
    padding-right: 10px;
  }
  .xiang > div > span{
    float: right;
    font-size: 14px
  }
  strong{
    display: inline-block;
    width: 30px;
    background: #ddd;
    height: 25px;
    text-align: center;
    line-height: 25px;
    margin: 0 5px;
  }
  .xiang > div > span i{
    font-size: 26px;
    margin-left: 10px;
    position: relative;
    top: 3px;
  }
  .jisuan{
    color: #cc0000;
    margin-top: 10px;
  }
  .jisuan > span{
    float: right;
    margin-right: 10px;
  }
  .ming{
    font-size: 14px;
    margin: 10px 0;
  }
  .fah{
    color: #FF8C00;
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
    margin-top: 45px;
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

</style>
