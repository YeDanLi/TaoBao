<template>
	<div class="all">
		<x-header>评论页面</x-header>
		<!--<transition>-->
		<form ref="myform" class="myform">
			<div class="img-list" v-if="isShow">
				<textarea name="content" placeholder="请输入商品的评论" cols="45" rows="5" required></textarea>
				<img v-for="i in files" :src="i" class="images" :key="i">
				<input type="file" name="photo" accept="image/*" @change="chooseImage($event)" multiple class="img">
				<button @click.prevent="reply" class="submit">评论</button>
			</div>
			<p class="b" @click="isShow = !isShow">
				点我评论
			</p>
		</form>
		<!--</transition>-->
		<div class="ping" v-if="replys.length > 0" v-for="data in replys">

			<p class="infos">
				<a href="#/user">
					<img :src="'http://localhost:3333/uploads/'+data.replyName.avatar" class="touxiang" alt="">
					<span class="people">{{data.replyName.name}}</span>
				</a>
				<span class="time">{{data.time | data}}</span>
			</p>
			<p v-if="data.content" class="content" v-model="content">评价内容：{{data.content}}</p>
			<div v-if="data.replyImage.length > 0">
				评论配图：<img :src="'http://localhost:3333/uploads/'+data.replyImage" class="replyIma" alt="">
			</div>
		</div>
		<div v-if="replys.length == 0">
			<h4>还没有评论，快来抢沙发！</h4>
		</div>
	</div>
</template>
<script>
	import { XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem } from 'vux'
	import axios from 'axios'
	export default {
		directives: {
			TransferDom
		},
		components: {
			XHeader,
			Actionsheet,
			ButtonTab,
			ButtonTabItem
		},
		data: function() {
			return {
				isShow: false,
				files: [],
				productImage: [],
				replys: [],
				content: '',
				datas: '',
			}
		},
		mounted: function() {
			var id = this.$route.params.id;
			axios.get('/goods/guoreply/' + id).then((resData) => {
				//         console.log(resData.data.message);
				this.replys = resData.data.message;
				//          console.log(this.datas)
			}).catch((error) => {
				console.log(error);
			})

		},
		methods: {
			chooseImage(e) {
				for(var i = 0; i < e.target.files.length; i++) {
					this.productImage.push(e.target.files[i]);
					var url = URL.createObjectURL(e.target.files[i]);
					this.files.push(url);
				}
			},
			reply: function() {
				//          event.preventDefault();
				let myform = this.$refs.myform;
				let formData = new FormData(myform);
				//          formData.append('content',this.content)
				var id = this.$route.params.id;
				let config = {
					headers: {
						"Content-Type": "multipart/form-data"
					}
				};
				axios.post('/goods/reply/' + id, formData, config).then((resData) => {
					if(resData.data.error == 0) {
						console.log('9999999999999')
						console.log(resData.data.message);
						//                this.replys.push(resData.data.message);
						location.reload();
					}
				}).catch(function(err) {
					console.log(err);
				})
			},

		},
		filters: {
			data: function(input) {
				var d = new Date(input);
				var year = d.getFullYear();
				var month = d.getMonth() + 1;
				var day = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate();
				return year + '-' + month + '-' + day;
			}
		}
	}
</script>
<style scoped>
	.vux-header {
		background: linear-gradient(left, #ff9000, #ff5000);
		position: fixed;
		top: 0;
		width: 100%;
	}
	
	.myform {
		margin-top: 44px;
	}
	
	h4 {
		margin: 30px;
		font-size: 20px;
	}
	
	img {
		width: 60px;
		height: 60px;
	}
	
	.img {
		text-align: right;
	}
	
	.touxiang {
		float: left;
		width: 40px;
		height: 40px;
		border-radius: 50%;
	}
	
	.replyIma {
		width: 50px;
		height: 50px;
	}
	
	.b {
		text-align: center;
		padding: 5px 10px;
		border-radius: 20px;
		background: #7ffb6b;
		color: #fff;
	}
	
	.ping {
		padding: 10px 20px;
		border-bottom: solid 1px #ddd;
		background: #fff0ee;
		margin-bottom: 10px;
	}
	
	.ping .infos {
		line-height: 40px;
		font-size: 14px;
		color: #666;
		overflow: hidden;
	}
	
	.ping .infos .people {
		float: left;
		color: #666;
	}
	
	.ping .infos .time {
		float: right;
	}
	
	.ping .content {
		margin: 10px 0;
	}
	
	.submit {
		border: none;
		background: peru;
		font-size: 18px;
		color: #fff;
		width: 100%;
		padding: 6px 0;
	}
</style>