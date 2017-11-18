<template>

      <div class="tabbar">
        <tabbar>
          <tabbar-item link="/"  :selected="$route.path == '/'" >
            <i slot="icon" class="fa fa-home"></i>
            <span slot="label">首页</span>
          </tabbar-item>
          <tabbar-item  link="/weitao" :selected="$route.path == '/weitao'">
            <i slot="icon" class="fa fa-wechat"></i>
            <span slot="label">微淘</span>
          </tabbar-item>
          <tabbar-item v-if="admins" link="/tongzhi" :selected="$route.path == '/tongzhi'">
            <i slot="icon" class="fa fa-bell"></i>
            <span slot="label">通知</span>
          </tabbar-item>
          <tabbar-item  v-if="user" link="/car" :selected="$route.path == '/car'">
            <i slot="icon" class="fa fa-shopping-cart"></i>
            <span slot="label">购物车</span>
          </tabbar-item>
          <tabbar-item link="/my" :selected="$route.path == '/my'">
            <i slot="icon" class="fa fa-user-circle-o"></i>
            <span slot="label">我的淘宝</span>
          </tabbar-item>
        </tabbar>
    </div>
</template>
<script>
  import axios from 'axios';
  import { Tabbar,TabbarItem } from 'vux';
    export default {
      data: function () {
          return {
						admins:'',
						user:'',
          }
      },
      components:{
        Tabbar,
        TabbarItem
      },
      mounted:function(){
      	this.panduan()
//				this.message()
     },
     methods:{
     	panduan: function() {
				axios.get('/goods/panduan').then((data) => {
					if(data.data.error == 0) {
						this.admins = data.data.admin;
						this.user = data.data.user;
					}
				}).catch((err) => {
					console.log(err);
				});
			},
			
     }
    }

</script>
<style scoped>
  body {
    background-color: #fbf9fe;
  }
  div.tabbar{
    /*color: #ff6700;*/
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 999;
  }


</style>
