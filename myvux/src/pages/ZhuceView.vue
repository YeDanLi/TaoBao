<template>
  <div class="view">
    <x-header>注册页面</x-header>
    <div class="content">
      <img src="../assets/login.png" alt="">
      <form action="">
        <input type="text" placeholder="用户名" v-model="name">
        <input type="text" placeholder="邮箱" v-model="email">
        <input type="password" placeholder="请输入密码" v-model="password">
        <input type="password" placeholder="请确认密码" v-model="repass">
      </form>
      <p class="error">{{message}}</p>
      <div class="msg">
        <p>
          <a href="#/login" class="zhuce">我去登录</a>
          <a class="forget">忘记密码</a>
        </p>
        <button class="login" @click="zhuce">注册</button>
      </div>
    </div>
  </div>
</template>
<script>
import { XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem } from 'vux'
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
        name:'',
        email:'',
        password:'',
        repass:'',
        message:'',
      }
    },
    methods:{
      zhuce:function(){
          console.log('点击注册了');
          const params = {
              name:this.name,
              email:this.email,
              password:this.password,
              repass:this.repass
          };
          axios.post('/goods/zhuce',params).then((resData) =>{
            console.log(resData.data);
            let message = resData.data.message;
            this.message = message;
            let error = resData.data.error;
            if(error == 0){
//                alert('注册成功');
              location.href= '/#/login';
            }else{
//                alert(message);
            }
          }).catch((err)=>{
            console.log(err);
          })
      }
    }
  }

</script>
<style scoped>

.vux-header{
    background:linear-gradient(left,#ff9000,#ff5000);
  }
  div.view .content{
    width: 90%;
    margin: 50px auto;
    text-align: center;
  }
  div.view .content img{
    width: 90px;
    height: 90px;
  }
  div.view .content input{
    width: 100%;
    border: none;
    border-bottom: solid 1px #ff6700;
    padding: 8px;
    margin: 10px 0;
    font-size: 16px;
  }
  div.view .content .error{
    color: red;
    font-size: 20px;
  }
  div.view .content .msg p{
    overflow: hidden;
    font-size: 14px;
    margin-bottom: 20px;
    color: #666;
  }
  div.view .content .msg p .zhuce{
    float: left;
    color: #666;
  }
  div.view .content .msg p .forget{
    float: right;
  }
  div.view .content .msg button.login{
    background:linear-gradient(left,#ff9000,#ff5000);
  }
  div.view .content .msg button{
    font-size: 18px;
    color: #fff;
    width: 100%;
    margin: 10px 0;
    height: 40px;
    border-radius: 20px;
    border: none;
  }
</style>
