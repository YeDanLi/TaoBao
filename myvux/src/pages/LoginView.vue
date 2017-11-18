<template>
    <div class="view">
      <x-header>登录页面</x-header>
      <div class="content">
        <img src="../assets/login.png" alt="">
        <form action="">
          <input type="text" placeholder="用户名/邮箱" v-model="name">
          <input type="password" placeholder="请输入密码" v-model="password">
          <p class="error">{{message}}</p>
        </form>
        <div class="msg">
          <p>
            <a href="#/zhuces" class="zhuce">免费用户注册</a>
            <a href="#/admin" class="admin">我要当管理员</a>
            <a class="forget">忘记密码</a>
          </p>
          <button class="login" @click="login" >买家登录</button>
          <button>短信验证码登录</button>
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
              password:'',
              message:'',
              user:'',
            }
        },
        methods:{
          login:function(){
              var param = {
                  name:this.name,
                  password:this.password
              };
              var that = this;
              axios.post('/goods/login',param).then(function(resData){

                let message = resData.data.message;
                  that.message = message;
                if(resData.data.error == 0){
//                      alert('登录成功')
                  location.href = '/#/address'
                }
              }).catch(function(err){
                  console.log(err);
              })
          },

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
  margin: 15px 0;
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
div.view .content .msg p .admin{
  color: #666;
}
div.view .content .msg p .forget{
  float: right;
}
div.view .content .msg button{
  background: #ddd;
  font-size: 18px;
  color: #fff;
  width: 100%;
  margin: 10px 0;
  height: 40px;
  border-radius: 20px;
  border: none;
}
div.view .content .msg button.login{
  background:linear-gradient(left,#ff9000,#ff5000);
}
</style>
