<template>
	<div>
		<nav>
			<a class="nav-zuo" href="" @click.prevent="zhifu">
				<i class="fa fa-angle-left"></i>
			</a>
			支付订单页面
		</nav>
		<flow class="flow">
			<flow-line :process-span="100" :is-done="true"></flow-line>
			<flow-state :is-done="true" title="确认信息"></flow-state>

			<flow-line :process-span="100" :is-done="true"></flow-line>

			<flow-state :is-done="true" title="订单详情"></flow-state>

			<flow-line :process-span="100" :is-done="true"></flow-line>

			<flow-state :is-done="true" title="支付"></flow-state>
			<flow-line :process-span="50" :is-done="true"></flow-line>

			<flow-state title="完成"></flow-state>
			<flow-line></flow-line>

		</flow>
		<div v-if="datas">
			<div class="dizhi">
			<a class="a">
				<p>确认地址</p>
				<div class="di" v-for="address in addresses">
					<h3>收货人: {{address.userName}}</h3>
					<p> 收货地址: {{address.address}} </p>
					<span class="pori">联系电话：{{address.tele}}</span>
				</div>
			</a>
		</div>
		   <div class="info">
			<p class="yun">商品总价格： <b>￥{{total}}</b></p>
			<p class="yun">运费（快递）：<b>￥{{0}}</b></p>
			<p class="fu">需付款：<b>￥{{total}}</b></p>
		   </div>
		   <footer>
			<a href="" @click.prevent="fu"> 确认付款 </a>
		</footer>
		</div>
		<div v-if="data">
			<div class="info">
			<p class="yun">商品总价格： <b>￥{{data.salePrice}}</b></p>
			<p class="yun">运费（快递）：<b>￥{{0}}</b></p>
			<p class="fu">需付款：<b>￥{{data.salePrice}}</b></p>
		   </div>
		   <footer>
			<a href="" @click.prevent="fus"> 确认付款 </a>
		</footer>
		</div>
		<div class="fus">
			<p>付款方式</p>
			<div @click="xuan1 = !xuan1" class="xuan">
				<p>
					<i class="fa fa-check-circle" v-if="xuan1" v-model="xuan1"></i>
					<i class="fa fa-circle-o" v-else="!xuan1" v-model="xuan1"></i> 支付宝
				</p>
			</div>
			<div @click="xuan2 = !xuan2" class="xuan">
				<p>
					<i class="fa fa-check-circle" v-if="xuan2" v-model="xuan2"></i>
					<i class="fa fa-circle-o" v-else="!xuan2" v-model="xuan2"></i> 微信
				</p>
			</div>
			<div @click="xuan3 = !xuan3" class="xuan">
				<p>
					<i class="fa fa-check-circle" v-if="xuan3" v-model="xuan3"></i>
					<i class="fa fa-circle-o" v-else="!xuan3" v-model="xuan3"></i> 银行卡
				</p>
			</div>
			<div @click="xuan4 = !xuan4" class="xuan">
				<p>
					<i class="fa fa-check-circle" v-if="xuan4" v-model="xuan4"></i>
					<i class="fa fa-circle-o" v-else="!xuan4" v-model="xuan4"></i> 朋友代付
				</p>
			</div>
		</div>

		
	</div>
</template>
<script>
	import axios from 'axios';
	import { Flow, FlowState, FlowLine } from 'vux'

	export default {
		data: function() {
			return {
				xuan1: false,
				xuan2: false,
				xuan3: false,
				xuan4: false,
				datas: '',
				addresses: '',
				data:''
			}
		},
		components: {

			Flow,
			FlowState,
			FlowLine
		},
		mounted: function() {
			this.fukuan();
			this.money();
		},
		methods: {
			fukuan:function(){
				axios.get('/goods/fukuan').then((data) => {
					let resData = data.data.message.shops;
					let addre = data.data.message.addressed;
					this.datas = resData
					this.addresses = addre
				}).catch((err) => {
					console.log(err);
				})
			},
			money:function(){
				axios.get('/goods/moneys').then((data) =>{
//					console.log(data.data.message)
					this.data = data.data.message;
				}).catch((err) =>{
					console.log(err)
				})
			},
			zhifu: function() {
				var params = {
					shop: this.datas
				}
				axios.post('/goods/zhifu', params).then((resData) => {
					if(resData.data.error == 0) {
						location.href = '/#/'
					}
				}).catch((err) => {
					console.log(err);
				})
			},
			//ok
			fu: function() {
				if(this.xuan1 == false && this.xuan2 == false &&
					this.xuan3 == false && this.xuan4 == false) {
					alert('请选择付款方式')
				} else {
					var params = {
						shops: this.datas,
						addressed:this.addresses
					}
					axios.post('/goods/ok', params).then((resData) => {
//						console.log(resData.data)
						if(resData.data.error == 0) {
							location.href = '/#/shou'
							console.log('可以跳了')
						}
					}).catch((err) => {
						console.log(err);
					})
				}
			},
			fus: function() {
				if(this.xuan1 == false && this.xuan2 == false &&
					this.xuan3 == false && this.xuan4 == false) {
					alert('请选择付款方式')
				} else {
					var params = {
						shop: this.data
					}
					axios.post('/goods/oks', params).then((resData) => {
//						console.log(resData.data)
						if(resData.data.error == 0) {
							
							location.href = '/#/shou'
							console.log('可以跳了')
						}
					}).catch((err) => {
						console.log(err);
					})
				}
			}
		},
		computed: {
			total: function() {
				let total = 0;
				for(var i = 0; i < this.datas.length; i++) {
					total += this.datas[i].productNum * this.datas[i].salePrice
				}
				return total;
			},
			nums: function() {
				let nums = 0;
				for(var i = 0; i < this.datas.length; i++) {
					nums += this.datas[i].productNum * 1
				}
				return nums;
			},
			
		}
	}
</script>
<style scoped>
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
	
	.vux-check-icon {
		width: 100%;
		margin: 10px 0;
	}
	
	.fus {
		font-size: 20px;
		padding: 10px 30px;
		margin-bottom: 50px;
	}
	
	.fus>p {
		font-size: 22px;
		color: #ff6700;
	}
	
	.fus .xuan {
		line-height: 35px;
	}
	
	.fus .xuan i {
		color: #00B7FF;
	}
	
	.dizhi {
		padding: 10px 30px;
		border: solid 1px #aaa;
		margin: 20px 0;
	}
	
	.a>p {
		line-height: 35px;
	}
	
	.a .di h3 {
		font-size: 18px;
		font-weight: normal;
		color: #ff6700;
	}
	
	.a .di p,
	.a .di h3,
	.a .di span {
		line-height: 30px;
	}
	
	.info {
		margin: 10px 30px;
		text-align: right;
		color: #333;
		border-bottom: dashed 1px #aaa;
	}
	
	.info .yun {
		line-height: 25px;
	}
	
	.info .yun b {
		font-size: 18px;
	}
	
	.info .fu {
		padding: 10px;
		color: #ff6700;
	}
	
	footer {
		border-top: solid 1px #aaa;
		line-height: 35px;
		padding: 10px;
		position: fixed;
		left: 0;
		bottom: 0;
		right: 0;
		text-align: right;
		background: #fff;
	}
	
	footer>a {
		display: inline-block;
		border: solid 1px #ff5000;
		text-decoration: none;
		color: #ff5000;
		border-radius: 30px;
		height: 100%;
		padding: 0 15px;
	}
	
	.flow {
		margin-top: 40px;
		padding: 30px;
	}
</style>