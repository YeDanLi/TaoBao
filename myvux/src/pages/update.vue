
<template>
  <div class="root">
    <x-header>修改页面</x-header>
    <form method="post">
      商品名称：
      <input class="input" type="text" required name="productName" v-model="datas.productName" ref="productName"><br><br>
      商品价格：
      <input class="input" type="text" required name="salePrice" v-model="datas.salePrice" ref="salePrice"><br><br>
      商品描述：
      <textarea name="describe" cols="70" rows="2"   v-model="datas.describe" ref="describe"></textarea><br><br>

      商品图片： <div class="img-list">    {{datas.productImage}}
      <img v-for="i in files" :src="i" class="images" :key="i">
      <input id="file-selector" type="file" accept="image/*" name="photo" ref="photo"
             @change="chooseImage($event)" multiple  class="img">
    </div>
      管理员：<input  class="inpu" type="text" :value="admin.name" ref="admin" disabled><br>
      <button @click="update($event)" class="submit">修改</button>
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
        loading: false,
        post: null,
        error: null,
        datas:'',
        user:'',
        files:[],
        productName:'',
        salePrice:'',
        describe:'',
        admin:'',
        productImage:[]
      }
    },
    created () {
      this.fetchData()
    },
    watch: {
      '$route': 'fetchData'
    },
    methods:{
      chooseImage(e){
//        this.productImage = event.target.files;
//        console.log(event.target.files)
        for(var i = 0;i< e.target.files.length;i++){
          this.productImage.push(e.target.files[i]);
          var url = URL.createObjectURL(e.target.files[i]);
          this.files.push(url);
        }
//        console.log(this.files)
      },
      update(event){
        event.preventDefault();
//        console.log(this.$refs.photo);
        var obj = {};
        obj.productName = this.$refs.productName._value;
        obj.salePrice = this.$refs.salePrice._value;
        obj.describe = this.$refs.describe._value;
//        obj.photo = this.$refs.photo.baseURI;
//        console.log(obj)

//        let formData = new FormData();
//
//        formData.append('productName',this.$refs.productName._value);
//        formData.append('salePrice',this.$refs.salePrice._value);
//        formData.append('describe',this.$refs.describe._value);
//        formData.append('admin',this.$refs.admin._value);
////        没有修改图片
////        formData.append('productImage',this.productImage);
//        let config = {
//          headers:{
//            "Content-Type": "multipart/form-data"
//          }
//        };
//        console.log(formData);
        var id = this.$route.params.id;
        axios.post('/goods/updates/'+ id,obj).then((resData) =>{
            console.log(resData)
          if(resData.data.error == 0){
              location.href = '#/good/'+ resData.data.url;
          }
        }).catch((err) =>{
            console.log(err)
        })
//        axios.post('/goods/photo',formData,config).then((resData) =>{
//          console.log(resData.data);
////          if(resData.data.error == 0){
////            console.log(resData.data.url);
////            this.user = resData.data.user;
////            location.href = '#/good/'+ resData.data.url
////          }
//        }).catch((err) =>{
//            console.log(err);
//        })
      },

      fetchData () {
        this.error = this.post = null;
        this.loading = true;
        var id = this.$route.params.id;
//        console.log(id);
        axios.get('/goods/update/'+ id ).then((resData)=>{
          if(resData.data.data.admin){
            this.admin = resData.data.data.admin;
          }
//          console.log(this.admin)
          if(resData.data.data.user){
            this.user = resData.data.data.user;
          }
          this.datas = resData.data.data.data;
//          console.log(resData.data.data)
        }).catch((error)=>{
          console.log(error);
        })
      },
    },
    mounted:function(){
//        console.log(this.$refs.productName.innerText)
//        console.log(this.$refs.salePrice)
//        console.log(this.$refs.describe_value)
//        console.log(this.$refs.admin.value)
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
    /*padding: 20px 0;*/
    height:100vh;
    background-color: white;
    background: url("../assets/bg.jpg") 100vh 100vh;
  }
  
  .images{
    width: 150px;
    height: 150px;
  }
  .input{
    border: none;
    border-bottom: solid 1px #999;
   /*box-shadow: 0 0 3px 1px #ccc;*/
    padding: 0 10px;
    background: none;
    margin: 10px 0;
  }
  .inpu{
  	margin: 30px 0;
  	padding: 3px;
  	border:none;
  	background: none;
  }
  textarea{
    padding-bottom: 10px;
    /*border: solid 1px #999;*/
    width: 80%; 
    padding: 10px;
    margin-left: 5px;
    background: #FFFFE0;
    border:none;
    box-shadow: 0 0 5px 0px #FF8C69;
  }
  .submit{
    /*margin-bottom:0px;*/
    border: none;
    background: 	#FF8C69;
    font-size: 18px;
    color: #fff;
    width: 100%;
    padding: 6px 0;
    border-radius: 5px;
  }
  
  .img{
    width: 100%;
    /*background:palegreen;*/
    border-radius: 5px;
    color: #fff;
    padding: 4px ;
  }
form{
	margin-top: 45px;
	padding: 10px;
}
</style>
