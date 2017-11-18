<template>
    <div class="head">
      <div>
        <i class="fa fa-minus-square-o"></i>
        <p><a href="#/">扫一扫</a></p>
      </div>
      <div class="middle">
        <!--<i class="fa fa-search"></i>-->
        <form action="">
          <a href="#/searchs">
            <input type="search" name="search" placeholder="搜索你想找的商品" >
          </a>
        </form>
        <!--<i class="fa fa-camera"></i>-->
      </div>
      <div>
        <i class="fa fa-qrcode"></i>
        <!--<p @click="isShow = ! isShow">会员码</p>-->
          <!--<img v-if="isShow" src="../assets/erweima.png" alt="">-->
        <p>
          <a href="#/user">会员码</a>
        </p>
      </div>
    </div>
</template>
<script>
  import axios from 'axios';
    export default {
        data: function () {
            return {
                isShow:false
            }
        },
      methods:{
        search:function(){
          axios.get('/goods/search').then(function(resData){
            console.log(resData)
          }).catch(function(err){
            console.log(err);
          })
        }
      }
    }

</script>
<style scoped>
  div.head{
    position: fixed;
    top:0;
    width: 100%;
    height:44px;
    background:linear-gradient(left,#ff9000,#ff5000);
    display:flex;
    padding:7px;
    color:white;
    justify-content:space-between;
    z-index: 999;
  }
  div.head div{
    text-align:center;
    /*position: relative;*/
  }
  div.head div>i{
    font-size:20px;
  }
  div.head div form{
    /*position: relative;*/
  }
  div.head div form input{
    position: absolute;
    margin-left: -85px;
    padding-left: 10px;
    border:none;
    border-radius:12px;
    width:170px;
    height:28px;
  }
  p{
    margin:0;
    font-size:10px;
  }
  a{
    color: #fff;
    text-decoration: none;
  }
  img{
    /*position: absolute;*/
    float: left;
    width: 100vh;
    height: 100vh;
  }

</style>
