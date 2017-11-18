<template>
	<div class="big">
		<nav>
			<a class="nav-zuo" href="">
				<i class="fa fa-angle-left"></i>
			</a>
			全部订单页面
		</nav>
		<div class="all" v-for="(dat,index) in fu">
				<img :src="'http://localhost:3333/uploads/'+dat.productImage " alt="">
				<div class="div1">
					<p class="ming">商品名称:{{dat.productName}}</p>
					<p class="ming">商品描述:{{dat.describe}}</p>
					<p class="ming">商品件数:{{dat.productNum}}</p>
					<p class="fah">卖家承诺: 卖家承诺7天内</p>
					<a href="" class="aa" @click.prevent="fus(index)">待付款(删除)</a>
				</div>
				<!--<p class="jisuan">¥ {{dat.salePrice * dat.productNum}}
					<span>x{{dat.productNum}}</span>
				</p>-->
			<!--</div>-->
		</div>
		<div class="all shou" v-for="(dat,index) in shou">
				<img :src="'http://localhost:3333/uploads/'+dat.productImage " alt="">
				<div class="div1">
					<p class="ming">商品名称:{{dat.productName}}</p>
					<p class="ming">商品描述:{{dat.describe}}</p>
					<p class="ming">商品件数:{{dat.productNum}}</p>
					<p class="fah">卖家承诺: 卖家承诺7天内</p>
					<a href="" class="aa" @click.prevent="shous(index)">确认收货</a>
				</div>
				<!--<p class="jisuan">¥ {{dat.salePrice * dat.productNum}}
					<span>x{{dat.productNum}}</span>
				</p>-->
		</div>

	</div>
</template>
<script>
	import axios from 'axios'
	export default {
		data: function() {
			return {
				fu: '',
				shou:''
			}
		},
		mounted: function() {
			axios.get('/goods/all').then((data) => {
				console.log(data.data.message);
					console.log('11111111111')
				if(data.data.error == 0) {
					this.fu = data.data.message.fuList;
					this.shou = data.data.message.shouList;
				}
			})
		},
		methods: {
			shous: function(index) {
				var item = this.shou[index];
				this.shou.splice(index,1);
				let shop_id;
				this.shou.forEach((shou) =>{
					shop_id = shou.productId;
				})
				axios.get('/goods/sureshou',{params:{shopId:shop_id}}).then((data) => {
					console.log(data.data)
					if(data.data.error == 0){
						
					}
				}).catch((err) => {
					console.log(err);
				})
			},
			fus:function(index){
				var item = this.fu[index];
				this.fu.splice(index,1);
				let shop_id;
				this.fu.forEach((fu) =>{
					shop_id = fu.productId;
				})
				console.log(shop_id)
				console.log('=======')
				axios.get('/goods/surefu',{params:{shopId:shop_id}}).then((data) => {
					console.log(data.data)
					if(data.data.error == 0){
						
					}
				}).catch((err) => {
					console.log(err);
				})
			}
		}
	}
</script>
<style scoped>
	.big{
		margin-top: 44px;
	}
	nav {
		background: linear-gradient(left, #ff9000, #ff5000);
		text-align: center;
		color: #fff;
		line-height: 45px;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 999;
	}
	
	nav a {
		position: absolute;
		left: 20px;
		font-size: 28px;
		color: #fff;
		top: -3px;
	}
	.all {
		overflow: hidden;
		height: 150px;
		width: 360px;
	}
	.shou{
		margin-top: 30px;
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
		/*border: solid 1px #ff6700;*/
		color: #fff;
		padding: 3px 5px;
		position: absolute;
		right: -110px;
		top: 70px;
	}
	
	img {
		display: block;
		float: left;
		width: 20%;
		margin: 10px;
	}
	
	.jisuan {
		color: #111;
		margin: 10px 30px;
		float: right;
		overflow: hidden;
	}
	
	.jisuan span {
		text-align: right;
		color: #666;
		display: block;
	}
</style>