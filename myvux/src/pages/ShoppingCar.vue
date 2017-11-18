<template>
	<div class="shopcar">
		
		<div class="car" v-if="goods.cartList && goods.cartList.length > 0">
		<x-header>我的购物车({{goods.cartList.length}})</x-header>
			<div class="contain">
				
				<ul class="ul">
					<li v-for="(good,index) in goods.cartList">
						<div @click="chooseGood(index)" class="radio">
								<i class="fa fa-check-circle" v-if="good.checked"></i>
								<i class="fa fa-circle-o" v-else></i>
							</div>
						<a class="img" :href="'#/good/'+good.productId">
							<img class="goods" :src="'http://localhost:3333/uploads/'+good.productImage " alt="">
						</a>
						<div class="div">
							<p class="p1">名称：{{good.productName}} <span  @click="removeone(index)">删除</span></p>
							<p  class="p2">
								<span class="span1">价格：{{good.salePrice}}</span>
								<span class="span2">
									<i  @click="editCart('minu',good)">-</i>
									{{good.productNum}} 
									<i @click="editCart('add',good)">+</i>
								</span>
							</p>
						</div>
					</li>
				</ul>
				<br><br>
				<div class="all">
					<div @click="chooseAll">
						<i v-show="isChooseAll" class="fa fa-check-circle"></i>
						<i v-show="!isChooseAll" class="fa fa-circle-o "></i>
						<b>全选</b>
					</div>
					<p>总价：<b>{{total}}</b></p>
					<button class="sub" @click="clear">清空购物车</button>
					<a href="" @click="sure($event)">
						<button class="sub">提交订单</button>
					</a>
				</div>
			</div>
		</div>
		<div v-else class="kong">
			<img src="../assets/kong.jpg" alt="">
			<b>购物车快饿扁了T.T</b>
			<p>主人快给我挑点宝贝吧</p>
			<a href="#/">去逛逛</a>
		</div>
		<footer-bar> </footer-bar>
	</div>
</template>
<script>
	import { XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem } from 'vux'
	import FooterBar from '../components/FooterBar'
	import axios from 'axios';
	import $ from '../assets/jquery';
	export default {
		directives: {
			TransferDom
		},
		data: function() {
			return {
				isShow: false,
				show: false,
				num: '',
				goods: [],
				cartList: [],
				isChooseAll: false,
				page: 1,
			}
		},
		components: {
			FooterBar,
			XHeader,
			Actionsheet,
			ButtonTab,
			ButtonTabItem,

		},
		mounted: function() {
			var that = this;
			axios.get('/goods/showShop').then(function(resdata) {
				that.goods = resdata.data.data;
				console.log('正确')
			}).catch(function(err) {
				console.log(err)
			})

			//    

		},
		methods: {
			//        在购物车中移除一样商品
			removeone: function(num) {
				var item = this.goods.cartList[num];
				this.goods.cartList.splice(num, 1);
				//        console.log(item.productId)
				var good_id = item.productId;
				axios.get("/goods/removeone", {
					//            获取商品的id
					//          params:{ goodId :$(num.target).attr("value")}
					params: { goodId: good_id }
				}).then(num => {
					if(num.data.message == 'success') {
						//            location.reload()
					}
				}).catch((err) => {
					console.log(err);
				})
			},

			//      增加和减少
			editCart(flag, item) {
				//          console.log(item);
				if(flag == 'add') {
					item.productNum++;
				} else if(flag == 'minu') {
					if(item.productNum <= 1) {
						return;
					}
					item.productNum--;
				} else {
					item.checked = item.checked == "1" ? '0' : '1';
				}
				axios.post("/goods/cartEdit", {
					productId: item.productId,
					productNum: item.productNum,
					checked: item.checked
				}).then((response) => {
					let res = response.data;
					if(res.status == "0") {
						
					}
				})

			},

			// 点击进行全选
			chooseAll: function() {
				if(this.isChooseAll == true) {
					this.goods.cartList.forEach((good) => {
						good.checked = false;
					});
					this.isChooseAll = false;
					return;
				}
				if(this.isChooseAll == false) {
					this.goods.cartList.forEach((good) => {
						good.checked = true;
					});
					this.isChooseAll = true;
				}
			},

			// 判断是否被全选的函数
			isCheckAll: function() {
				let checked = false;
				for(let i = 0; i < this.goods.cartList.length; i++) {
					if(this.goods.cartList[i].checked == false) {
						checked = false;
					} else {
						checked = true;
					}
				}
				if(checked) {
					this.isChooseAll = true;
				} else {
					this.isChooseAll = false;
				}
			},

			// 每次选择单个商品，同时需要判断是否全部选中>>>>>
			chooseGood: function(index) {
				this.goods.cartList.forEach((good, ins) => {
					if(index == ins) {
						good.checked = !good.checked
					}
				});
				this.isCheckAll();
			},

			//    确认订单
			sure: function(ev) {
				ev.preventDefault();
				//        console.log('进来了');
				let arr = [];
				this.goods.cartList.forEach((good) => {
					if(good.checked == true) {
						arr.push(good);
					} else {
						//                console.log('没选中');
					}
				});
				axios.post('/goods/sure', { arr: arr }).then((resData) => {
					//          console.log(resData.data.message);
					if(resData.data.message.length == 0) {
						alert('没有选购商品~~~');
					} else {
						location.href = '/#/sure';
					}
				}).catch((err) => {
					console.log(err);
				})
			},

			//      清空购物车
			clear: function() {
				axios.get('/goods/clear').then((resData) => {
					console.log(resData.data);
					if(resData.data.error == 0) {
						location.reload();
					}
				}).catch((err) => {
					console.log(err);
				})
			}
		},
		computed: {
			total: function() {
				let nums = 0;
				this.goods.cartList.forEach((good) => {
					if(good.checked == true) {
						nums += good.salePrice * good.productNum;
					}
				})
				return nums;
			}
		},
	}
</script>
<style scoped>
	.shopcar {
		margin-top: 44px;
		height: 100vh;
	}
	
	.vux-header {
		background: linear-gradient(left, #ff9000, #ff5000);
		position: fixed;
		top: 0;
		width: 100%;
	}
	table{
		margin-top: 20px;
	}
	
	.kong {
		padding: 100px 0;
		width: 60%;
		margin: 0px auto;
		text-align: center;
		color: #333;
	}
	
	.kong img {
		width: 200px;
		display: block;
	}
	
	.kong b {
		display: block;
		padding: 10px;
	}
	
	.kong p {
		color: #e44eb7;
		font-size: 14px;
	}
	
	.kong a {
		display: block;
		text-decoration: none;
		color: red;
		border: solid 1px #888;
		margin: 10px 0;
	}
	
	.car h3 {
		text-align: center;
		color: #333;
		margin: 25px 0;
	}
	
	.car .contain {
		width: 90%;
		margin: 0 auto;
		color: #333;
	}
	
	.car .contain tr {
		height: 40px;
	}
	
	.car .contain .goods {
		width: 80px;
	}

	
	.car .contain td {
		width: 100px;
	}
	

	
	i {
		color: red;
	}
	
	.num span i {
		text-align: center;
		padding: 0 8px;
		background: #ff6700;
		color: #fff;
	}
	
	.all {
		position: fixed;
		bottom: 45px;
		right: 20px;
		color: #ff5568;
		text-align: right;
	}
	
	.sub {
		border: none;
		padding: 5px 35px;
		margin: 10px 0;
		background: #ff6700;
		color: #ffffff;
	}
	table tr{
		border: solid 2px #ddd;
	}
	
	.car{
		margin-top: 60px;
	}
	
	.ul{
		list-style: none;
	}
	.ul li{
		box-shadow: 0 0 5px 1px #ccc;
		overflow: hidden;
		margin-top: 15px;
		padding: 5px;
		font-size: 14px;
	}
	.radio{
		float: left;
		margin-right: 10px;
		position: relative;
		top: 30px;
	}
	.img{
		float: left;
		width: 25%;
		text-align: center;
		padding-right:10px;
	}
	.img > img{
		width: 100%;
	}
	.div{
		float: right;
		width: 60%;
	}
	
	.p1{
		margin-bottom: 30px;
		overflow: hidden;
	}
	.p1 > span{
		float: right;
		padding: 0px 5px;
		color: #fff;
		background: #ff6700;
		border-radius: 5px;
		cursor: pointer;
	}
	.p2{
		overflow: hidden;
	}
	.p2 i{
		display: inline-block;
		text-align: center;
		font-style: normal;
		color: #fff;
		background: #ddd;
		width: 25px;
		cursor: pointer;
	}
	.span2{
		float: right;
	}
</style>