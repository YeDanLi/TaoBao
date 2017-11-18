<template>
	<div>
		<nav>
			<a class="nav-zuo" href="">
				<i class="fa fa-angle-left"></i>
			</a>
			完成订单
		</nav>
		<flow class="flow">
			<flow-line :process-span="100" :is-done="true"></flow-line>
			<flow-state :is-done="true" title="确认信息"></flow-state>

			<flow-line :process-span="100" :is-done="true"></flow-line>
			<flow-state :is-done="true" title="订单详情"></flow-state>

			<flow-line :process-span="100" :is-done="true"></flow-line>
			<flow-state :is-done="true" title="支付"></flow-state>

			<flow-line :process-span="100" :is-done="true"></flow-line>
			<flow-state title="完成" :is-done="true"></flow-state>

			<flow-line :process-span="100" :is-done="true"></flow-line>
		</flow>

		<!--<div class="infos">{{dataes}}
			<div>
				<h3>
            <i class="fa fa-check-circle"></i>
            		您已成功支付 
            		<b>{{datas.salePrice}}</b> 元！
            		共 <b>{{datas.productNum}}&nbsp;</b>件商品
          </h3>-->
				<!--<p v-for="addre in address"><b>货物将送至：</b>
            {{addre.address}}--{{addre.streetName}} </p>-->
			<!--</div>
			<section>
				<a href="/#/daifu">待付款宝贝列表</a>|&#X3000
				<a href="/#/submits">订单详情</a>
				<p>宝贝享受：7天无理由退换货</p>
			</section>
		</div>-->
		<div class="infos">
			<div>
				<h3>
            <i class="fa fa-check-circle"></i>
            		您已成功支付 
            		<!--<b>{{datas.salePrice}}</b> 元！-->
            		<!--共 <b>{{datas.productNum}}&nbsp;</b>件商品-->
         </h3>
			</div>
			<section>
				<a href="/#/daifu">待付款宝贝列表</a>|&#X3000
				<a href="/#/submits">订单详情</a>
				<p>宝贝享受：7天无理由退换货</p>
			</section>
		</div>

	</div>
</template>
<script>
	import axios from 'axios';
	import { XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem, Flow, FlowState, FlowLine } from 'vux'

	export default {
		components: {
			XHeader,
			Actionsheet,
			ButtonTab,
			ButtonTabItem,
			Flow,
			FlowState,
			FlowLine
		},
		data: function() {
			return {
				datas: '',
				address: '',
				dataes:''
			}
		},
		mounted: function() {
//			axios.get('/goods/shou').then((data) => {
//				console.log(data.data.message)
//				let resData = data.data.message;
////				console.log(resData)
//				resData.forEach((data) =>{
////				    console.log(data)
//				    this.datas = data
//				})
//				this.dataes = resData;
//			}).catch((err) => {
////				console.log(err);
//			})
		},
		
	}
</script>
<style scoped>
	.vux-header {
		background: linear-gradient(left, #ff9000, #ff5000);
		position: fixed;
		top: 0;
		width: 100%;
		z-index: 999;
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
	
	.flow {
		margin-top: 40px;
		padding: 30px;
	}
	
	.infos {
		background: #EFFFE4;
		padding: 20px 30px;
	}
	
	.infos>div h3 i {
		font-size: 45px;
		color: #88D525;
	}
	
	.infos>div h3 {
		line-height: 50px;
		font-size: 23px;
	}
	
	.infos>div h3 b {
		color: #ff6700;
	}
	
	.infos>div p {
		margin-left: 45px;
		margin-bottom: 20px;
	}
	
	.infos section {
		margin-left: 45px;
		font-size: 14px;
	}
	
	.infos section a {
		text-decoration: none;
		padding-right: 10px;
		color: #596C7D;
		margin: 10px 0;
	}
</style>