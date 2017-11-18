<template>
    <div>
    	 <nav>
      <a class="nav-zuo" href="">
        <i class="fa fa-angle-left" ></i>
      </a>
     待收货
    </nav>
		<div class="all shou" v-for="(dat,index) in datas">
				<img :src="'http://localhost:3333/uploads/'+dat.productImage " alt="">
				<div class="div1">
					<p class="ming">商品名称:{{dat.productName}}</p>
					<p class="ming">商品描述:{{dat.describe}}</p>
					<p class="fah">卖家承诺: 卖家承诺7天内</p>
					<a href="" class="aa" @click.prevent="shous(index)">确认收货</a>
				</div>
		</div>

    </div>
</template>
<script>
	import axios from 'axios';
    export default {
        data: function () {
            return {
            	datas:'',
            }
        },
        mounted:function(){
        	axios.get('/goods/daishou').then((data) =>{
        		this.datas = data.data.message
        	}).catch((err) =>{
        		console.log(err)
        	})
        },
        methods:{
        	shous: function(index) {
//				var item = this.shou[index];
//				this.shou.splice(index,1);
				let shop_id;
				this.shou.forEach((shou) =>{
					shop_id = shou.productId;
				})
				axios.get('/goods/sureshou',{params:{shopId:shop_id}}).then((data) => {
//					console.log(data.data)
					if(data.data.error == 0){
						
					}
				}).catch((err) => {
					console.log(err);
				})
			},
        }
    }

</script>
<style scoped>
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
.all {
		overflow: hidden;
		height: 150px;
		width: 360px;
	}
	.shou{
		margin-top: 44px;
	}
	
	.li {
		height: 120px;
		border: 1px solid #eee;
		margin-top: 10px;
		background: #efefef;
		list-style: none;
		font-size: 14px;
		overflow: hidden;
	}
	
	.div1 {
		float: left;
		margin-top: 10px;
		width: 140px;
		position: relative;
	}
	.aa{
		text-decoration: none;
		background: #00B7FF;
		color: #fff;
		padding: 3px 5px;
		position: absolute;
		right: -90px;
		top: 60px;
	}
	
	img {
		display: block;
		float: left;
		width: 20%;
		margin: 10px;
	}
</style>
