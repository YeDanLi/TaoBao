<template>
	<div class="myTao">
		<div class="top">
			<img class="bg" src="../assets/taobg.jpg" alt="">
			<a class="shezhi" href="#/user">设置</a>
			<a href="" v-if="admins">
				<img class="touxiang" v-if="admins.avatar" :src="'http://localhost:3333/uploads/'+ admins.avatar" alt="">
				<img class="touxiang" v-if="!admins.avatar" src="../assets/default.jpg" alt="">
			</a>
			<a href="" v-if="user">
				<img class="touxiang" v-if="user.avatar" :src="'http://localhost:3333/uploads/'+ user.avatar " alt="">
				<img class="touxiang" v-if="!user.avatar" src="../assets/default.jpg" alt="">
			</a>
			<a href="" v-else>
				<img class="touxiang" src="../assets/default.jpg" alt="">
			</a>
			<div class="name" v-if="user">{{user.name}}</div>
			<div class="name" v-if="admins">{{admins.name}}</div>
			<div class="name" v-if="!user && !admins">
				<a href="#/login">请登录{{admins}}</a>
			</div>
			<ul class="like" v-if="user">
				<li>
					<b>{{user.score}}</b>
					<span>我的积分</span>
				</li>
				<li class="second">
					<b>{{user.buy_num}}</b>
					<span>我的购买</span>
				</li>
				<li>
					<b>{{user.cartList.length}}</b>
					<span>收藏的宝贝</span>
				</li>
			</ul>
			<ul class="like" v-if="admins">
				<li>
					<b>{{admins.score}}</b>
					<span>我的积分</span>
				</li>
				<li class="second">
					<b>{{admins.mai_num}}</b>
					<span>我的购买</span>
				</li>
				<li>
					<b>{{admins.goodsList.length}}</b>
					<span>收藏的宝贝</span>
				</li>
			</ul>
			<ul class="like" v-if="!user && !admins">
				<li>
					<b>0</b>
					<span>我的积分</span>
				</li>
				<li class="second">
					<b>0</b>
					<span>我的购买</span>
				</li>
				<li>
					<b>0</b>
					<span>收藏的宝贝</span>
				</li>
			</ul>

		</div>

		<div class="info">
			<tabbar>
				<tabbar-item link="/daizhifu">
					<i slot="icon" class="fa fa-credit-card"></i>
					<span slot="label">待付款</span>
				</tabbar-item>

				<tabbar-item link="/daishou">
					<i slot="icon" class="fa fa-truck"></i>
					<span slot="label">待收货</span>
				</tabbar-item>

				<tabbar-item link="/daiping">
					<i slot="icon" class="fa fa-star"></i>
					<span slot="label">待评价</span>
				</tabbar-item>
				<tabbar-item link="">
					<i slot="icon" class="fa fa-yen"></i>
					<span slot="label">退款/售后</span>
				</tabbar-item>
			</tabbar>
			<div class="order">
				<a href="#/all">
					<span class="left">
          		<i class="fa fa-file-text-o"></i>全部订单
        	</span>
					<span class="right">查看全部订单
           		<i class="fa fa-angle-right"></i>
        	</span>
				</a>
			</div>
		</div>
		<div class="cart">
			<div class="car">
				<span class="left">
          <i class="fa fa-shopping-cart"></i>
          <a href="#/car">购物车</a>
        </span>
				<span class="right">
          <i class="fa fa-angle-right"></i>
        </span>
			</div>
			<div class="car">
				<span class="left">
          <i class="fa fa-search"></i>搜索
        </span>
				<span class="right">
          <i class="fa fa-angle-right"></i>
        </span>
			</div>
			<div class="car">
				<span class="left">
          <i class="fa fa-weixin"></i><a href="https://wx.qq.com/">微信</a>
        </span>
				<span class="right">
          <i class="fa fa-angle-right"></i>
        </span>
			</div>
			<div class="car">
				<div v-if="user">
					<span class="left">
          <i class="fa fa-rebel"></i>
          <a href="">旺旺</a>
        </span>
					<span class="right">
          <i class="fa fa-angle-right"></i>
        </span>
				</div>
				<div v-if="admins">
					<span class="left">
          <i class="fa fa-rebel"></i><a href="#/myDian">店铺</a>
        </span>
					<span class="right">
          <i class="fa fa-angle-right"></i>
        </span>
				</div>
			</div>
		</div>
		<footer-bar></footer-bar>

	</div>
</template>
<script>
	//  import {  Tabbar,TabbarItem} from "vux";
	import { Tabbar, TabbarItem, Cell, CellBox, CellFormPreview, Group } from 'vux';
	import axios from 'axios'
	import FooterBar from '../components/FooterBar'
	export default {
		data: function() {
			return {
				isShow: false,
				session: '',
				user: '',
				admins: '',
				goods: [],
				length: 0
			}
		},

		components: {
			FooterBar,
			Group,
			Cell,
			CellFormPreview,
			CellBox,
			Tabbar,
			TabbarItem
		},
		mounted: function() {
			this.panduan();
			this.showShop();

		},
		methods: {
			panduan: function() {
				var that = this
				axios.get('/goods/panduan').then((data) => {
					if(data.data.error == 0) {
						this.session = data.data.message;
						this.admins = data.data.admin;
						this.user = data.data.user;
					}
				}).catch((err) => {
					console.log(err);
				});
			},
			showShop: function() {
				axios.get('/goods/showShop').then((resdata) => {
					this.goods = resdata.data.data;
					this.length = this.goods.cartList.length;
					//					console.log(this.length)
				}).catch((err) => {
					console.log(err)
				})
			}
		}
	}
</script>
<style scoped>
	div.myTao {
		background: #eee;
		height: 100vh;
		position: relative;
	}
	
	div.top {
		height: 110px;
		position: relative;
	}
	
	.shezhi {
		padding: 5px 10px;
		border-radius: 20px;
		background-color: #dcdcdc;
		position: relative;
		bottom: 120px;
		margin-left: 290px;
		color: #666;
		text-decoration: none;
	}
	
	div.top .bg {
		height: 140px;
		width: 100%;
	}
	
	div.top .touxiang {
		position: absolute;
		width: 70px;
		height: 70px;
		border-radius: 50%;
		left: 20px;
		top: 70px;
		z-index: 666;
	}
	
	div.top .name {
		position: absolute;
		left: 100px;
		top: 80px;
		color: #fef85d;
	}
	
	div.top .name a {
		color: #63ff1e;
		font-size: 18px;
		text-decoration: none;
	}
	
	div.top .like {
		position: relative;
		bottom: 22px;
		z-index: 0;
		overflow: hidden;
		list-style: none;
		font-size: 12px;
		color: #444;
		text-align: center;
		background: #fff;
		margin: -25px 0;
		padding: 0;
	}
	
	div.top .like li {
		float: right;
		width: 25%;
		padding: 0 8px;
		margin: 5px 0;
	}
	
	div.top .like li.second {
		border-left: solid 1px #eee;
		border-right: solid 1px #eee;
	}
	
	div.top .like li b {
		display: block;
	}
	
	div.info {
		position: relative;
		height: 120px;
		top: 10px;
	}
	
	div.info div.weui-tabbar {
		height: 60px;
		background: #fff;
		position: absolute;
		top: 56px;
		border-bottom: solid 1px #eee;
	}
	
	div.info span {
		font-size: 12px;
	}
	
	div.info i {
		font-size: 18px;
		padding: 5px 0;
	}
	
	div.order {
		position: absolute;
		width: 100%;
		top: 115px;
		color: #666;
		background: #fff;
	}
	
	div span.left {
		font-size: 16px;
	}
	
	div span.right {
		font-size: 14px;
		color: #aaa;
	}
	
	div span.left i {
		padding: 5px;
	}
	
	.left {
		margin-left: 10px;
	}
	
	.left i {
		background: #00B7FF;
		color: #fff;
		padding: 5px;
	}
	
	.right {
		margin-left: 100px;
	}
	
	.order a {
		color: #666;
		text-decoration: none;
	}
	
	div.order i,
	div.cart i {
		margin: 10px;
	}
	
	div.car {
		color: #666;
		background: #fff;
	}
	
	div.cart {
		height: 192px;
		width: 100%;
		position: absolute;
		top: 300px;
	}
	
	div.cart .car .left a {
		color: #666;
		text-decoration: none;
	}
	
	div.cart .car .right {
		overflow: hidden;
	}
	
	div.cart .car .right i {
		margin-right: 30px;
		float: right;
	}
</style>