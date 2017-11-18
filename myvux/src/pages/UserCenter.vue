<template>
  <div class="all">
    <x-header>我的个人资料</x-header>
    <div class="tops">
      <form action="" ref="myform" class="refs"  v-if="isShow">
          <img v-for="i in files" :src="i" class="images" :key="i">
          <input type="text" v-if="user" name="name" v-model="user.name" class="username" ref="name">
          <input type="text" v-if="admin" name="name" v-model="admin.name" class="username" ref="name">
          <input type="file" name="photo" accept="image/*"
                 @change="chooseImage($event)" multiple><br>
          <button @click="btnClick($event)" class="submit"  type="submit">提交</button>
      </form>
      <div class="message" v-if="user">
        <div class="infos" @click="isShow=!isShow">
          <!--<img src="../assets/default.jpg" alt="">-->
          <img :src="'http://localhost:3333/uploads/'+ user.avatar " alt="">
          <b>{{user.name}}</b> <br>
          <span>会员名：{{user.name}}</span>
        </div>
        <img src="../assets/erweima.jpg" alt="">
      </div>
      <div class="message" v-else-if="admin">
        <div class="infos" @click="isShow=!isShow">
          <img :src="'http://localhost:3333/uploads/'+ admin.avatar " alt="">
          <b>{{admin.name}}</b> <br>
          <span>会员名：{{admin.name}}</span>
        </div>
        <img src="../assets/erweima.jpg" alt="">
      </div>
      <div class="message" v-else>
            <div class="infos" @click="isShow=!isShow">
              <img src="../assets/default.jpg" alt="">
              <b>没有登录！</b> <br>
              <span>会员名：</span>
            </div>
            <img src="../assets/erweima.jpg" alt="">
      </div>

      <div class="car">
        <span class="left" v-if="user || admin">
          <i class="fa fa-arrow-circle-o-right"></i>
          <a href="#/address">我的收获地址</a>
        </span>
        <span class="left" v-else>
          <i class="fa fa-arrow-circle-o-right"></i>
          <a href="">我的收获地址</a>
        </span>
        <span class="right">
          <i class="fa fa-angle-right"></i>
        </span>
      </div>
    </div>

    <div class="car" id="sure">
        <span class="left" >
          <i class="fa fa-hand-o-right"></i>
         账户与安全
        </span>
      <span class="right">
          <i class="fa fa-angle-right"></i>
        </span>
    </div>
    <div class="cart">
      <div class="car">
        <span class="left">
          <i class="fa fa-shopping-cart"></i>
          <a href="#/address">地区设置</a>
        </span>
        <span class="right">
          <i class="fa fa-angle-right"></i>
        </span>
      </div>
      <div class="car">
        <span class="left">
          <i class="fa fa-search"></i>音效与通知
        </span>
        <span class="right">
          <i class="fa fa-angle-right"></i>
        </span>
      </div>
      <div class="car">
        <span class="left">
          <i class="fa fa-weixin"></i>
          <a href="">隐私</a>
        </span>
        <span class="right">
          <i class="fa fa-angle-right"></i>
        </span>
      </div>
      <div class="car">
        <span class="left" >
          <i class="fa fa-rebel"></i>
          <a href="">通用</a>
        </span>
        <span class="right">
          <i class="fa fa-angle-right"></i>
        </span>
      </div>
      <div class="car">
        <span class="left" >
          <i class="fa fa-rebel"></i>
          <a href="">关于手机淘宝</a>
        </span>
        <span class="right">
          <i class="fa fa-angle-right"></i>
        </span>
      </div>
      <div class="car" v-if="admin">
					<span class="left">
          <i class="fa fa-rebel"></i><a href="#/myDian">店铺</a>
        </span>
					<span class="right">
          <i class="fa fa-angle-right"></i>
        </span>
				</div>
    </div>

    <div class="top">
      <!--<div class="zhuce" v-if="!session">-->
        <!--<a href="#/admin">卖家注册</a>-->
        <!--<a href="#/adminlogin">登录</a>-->
        <!--<a href="#/zhuces">买家注册</a>-->
        <!--<a href="#/login">登录</a>-->
      <!--</div>-->
      <div class="zhuce" >
        <div >
          <ul >
            <li >
              <a @click="tuichu" v-if="user" class="tui">
                <i class="fa fa-sign-out" ></i>
                买家退出
              </a>
            </li>
            <li >
              <a @click="admintuichu" v-if="admin" class="tui">
                <i class="fa fa-sign-out"></i>
                卖家退出
              </a>
            </li>
            <li >
              <a href="#/login" v-if="!user && !admin" class="tui">
                先去登录
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem } from 'vux'
  import axios from 'axios'
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
        session:'',
        user:'',
        admin:'',
        isShow:false,
        productImage:[],
        files:[],
      }
    },
    methods:{
      chooseImage(e){
        for(var i = 0;i< e.target.files.length;i++){
          this.productImage.push(e.target.files[i]);
          var url = URL.createObjectURL(e.target.files[i]);
          this.files.push(url);
        }
//        console.log(this.files)
      },
//      模仿添加商品的图片上传====换头像
      btnClick:function(ev){
          ev.preventDefault();
          let photo = this.$refs.myform;
          let data = new FormData(photo);
//          console.log(data);
          let config = {
              headers:{
                  'Content-Type':'multipart/form-data'
              }
          };
          axios.post('/goods/infos',data,config).then((res) =>{
//              console.log(res.data.error);
              if(res.data.error == 0){
                  console.log('成功换头像');
                  location.reload();
              }
          }).catch((err) =>{
              console.log(err)
          });
        axios.post('/goods/infoes',data,config).then((res) =>{
//              console.log(res.data.error);
          if(res.data.error == 0){
          console.log('成功换头像');
          location.reload();
        }
      }).catch((err) =>{
          console.log(err)
      })
      },
      tuichu:function(){
        axios.get('/goods/tuichu').then((resData) =>{
                console.log(resData.data);
          if(resData.data.error == 0){
            this.session = resData.data.user;
              location.href= '/#/my'
          }
        }).catch((err) =>{
          console.log(err)
        })
      },
      admintuichu:function(){
        axios.get('/goods/admintuichu').then((resData) =>{
//          console.log(resData.data)
          if(resData.data.error == 0){
            this.session = resData.data.admin;
//              location.reload()
            location.href= '/#/my'
          }
        }).catch((err) =>{
          console.log(err)
        })
      }
    },
    mounted:function(){
      axios.get('/goods/panduan').then((data) =>{
        if(data.data.error == 0){
          this.session = data.data.message;
//          if(user){
            this.user = data.data.user;
//          }
//          if(admin){
            this.admin = data.data.admin;
//          }
//         console.log(this.session);
        }
      }).catch((err) =>{
        console.log(err);
      })
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
  .all{
     margin-top: 44px;
    background: #eee;
    height: 100vh;
  }

  .message{
    overflow: hidden;
    background: #fff;
    padding: 10px;
    border-bottom: solid 1px #eee;
    /*position: relative;*/
  }
  form.refs{
    position: absolute;
    background: #FFE4C4;
    width: 200px;
    height: 260px;
    border-radius: 30px;
    top:260px;
    left: 80px;
    text-align: center;
    padding: 15px;
  }
  .infos{
    float: left;
    overflow: hidden;
    width: 70%;
  }
  .infos img{
    width: 80px;
    height: 80px;
    border-radius: 50%;
    float: left;
  }
  .images{

    width: 120px;
    height: 120px;
  }
  .infos b{
    display: inline-block;
    margin-top: 15px;
    margin-left: 10px;
  }
  .infos span{
    margin-left: 10px;
    color: #888;
    line-height: 30px;
  }
  .message > img{
    float: right;
    width: 45px;
    height: 45px;
    margin-top: 15px;
    margin-right: 20px;
  }

  div.top .zhuce{
    color: brown;
  }
  div.top > .zhuce div ul li a{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
  }
  div.cart i,div.car i{
    margin: 15px;
  }
  div.car{
    color: #666;
    background: #fff;
    line-height: 50px;
    border-bottom: solid 1px #eee;
  }
  #sure{
    margin: 15px 0;
    border: none;
  }
  div.cart{
    height: 192px;
    width: 100%;
    /* position: absolute;
    top: 290px; */
  }
  .car .left a{
    color: #666;
    text-decoration: none;
  }
  .car .right{
    overflow: hidden;
  }
  .car .right i{
    margin-right: 30px;
    float: right;
  }
  .tui{
    width: 100%;
    /*background:linear-gradient(left,#ff9000,#ff5000);*/
    color: #fff;
    background: #ff6700;
    padding: 10px;
    position: fixed;
    bottom: 55px;
    text-align: center;
  }
  .tui a{
    color: #fff;
    text-decoration: none;
  }
.username{
  margin: 10px;
  border-radius: 20px;
  border: none;
  padding-left: 10px;
}
  .submit{
    width: 90%;
    margin: 10px auto;
    border: none;
    background: #FF69B4;
    color: #fff;
    padding: 5px 0;
  }
</style>
