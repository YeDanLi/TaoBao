
<template>
  <div class="root">
    <x-header>商品增加</x-header>
    <form ref="myform">
      <!--管理人员：<input type="text" placeholder="admin" v-model="admin"><br>-->
      商品名称：
      <input type="text" required placeholder="请输入商品名称" name="productName" v-model="productName" required><br>
      商品价格：
      <input type="text" required placeholder="请输入商品价格" name="salePrice" v-model="salePrice" required><br>
      <!-- 商品描述： -->
      <textarea name="describe" placeholder="请输入商品的描述" cols="25" rows="5" v-model="describe" required></textarea><br><br>
      商品图片： <div class="img-list">
      <img v-for="i in files" :src="i" class="images" :key="i">
      <input id="file-selector" type="file" name="photo" accept="image/*"
             @change="chooseImage($event)" multiple class="img">
    </div>
      <button @click="btnClick($event)" class="submit">提交</button>
    </form>

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
        files:[],
        productImage:[],
        productName:'',
        salePrice:'',
        describe:'',
        admin:'',
//        user:'',

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
      btnClick(event){
        event.preventDefault();
        let myform = this.$refs.myform;
        let formData = new FormData(myform);
        let config = {
          headers:{
            "Content-Type": "multipart/form-data"
          }
        };
        axios.post('/goods/photo',formData,config).then((resData) =>{
//          console.log(resData);
          if(resData.data.error == 0){
//                console.log(resData.data.url);
//            this.user = resData.data.user;
            this.admin = resData.data.admin;
//              console.log(this.admin)
            location.href = '#/good/'+ resData.data.url;
//            location.href = '#/myDian'
          }
        }).catch((err) =>{
            consoel.log(err);
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
  div.root{
    margin-top: 44px;
    padding-bottom: 20px;
    height:100vh;
    background-color: white;
    background: url("../assets/bg.jpg") 100vh 100vh;
  }
  .images{
    width: 150px;
    height: 150px;
  }
  form{
  	padding: 10px;
  }
  input{
    border: none;
    border-bottom: solid 1px #999;
    padding: 0 10px;
    background: none;
    margin: 10px 0;
  }
  textarea{
  	margin-top: 20px;
    padding-bottom: 10px;
    border: solid 1px #999;
    width: 96%;
    padding: 10px;
    margin-left: 5px;
    background: #FFFFE0;
    border:none;
    box-shadow: 0 0 5px 0px #FF8C69;
  }
  .submit{
    /*margin-bottom:50px;*/
    border: none;
    background:	#FF8C69;
    font-size: 18px;
    color: #fff;
    width: 100%;
    padding: 6px 0;
    border-radius: 5px;
    border:none;
    box-shadow: 0 0 5px 0px #FF8C69;
  }
  .img{
    width: 100%;
    /*background:	#FF8C69;*/
   border:none;
    color: #fff;
    padding: 4px ;
  }
</style>
