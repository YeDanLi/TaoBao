<template>
    <div>

	 <nav>
      <a class="nav-zuo" href="">
        <i class="fa fa-angle-left" ></i>
      </a>
     通知
    </nav>

	<div class="top">

		<div class="message" v-for="(message,index) in messages">
			{{message._id}}
			<span class="who">{{message.reply_author}}</span>
				评论了你的
			<b class="name">{{message.shop_id}}</b>这个商品
			<a @click.prevent="remove(index)" href="">删除</a>
		</div>
	</div>
    </div>
</template>
<script>
	import axios from 'axios';
    export default {
        data: function () {
            return {
            	messages:'',
            	id:''
            }
        },
        mounted:function(){
        	this.message()
        },
        methods:{
        	message:function(){
				let that = this;
				axios.get('/goods/message').then((resData) =>{
					if(resData.data.error ==0){
						console.log('==========')
						console.log(resData.data.message)
						this.messages = resData.data.message
//						that.id = resData.data.message._id;
//						console.log(that.id)
					}else{
						console.log('消息获取失败')
					}
				}).catch((err) =>{
					console.log(err)
				})
			
			},
			remove:function(index){
				console.log(index)
				let nums = this.messages[index]._id
				let inidex = index;
//					let that = this;
//					let id = that.id;
					console.log(nums)
					axios.post('/goods/removeP',{id:nums,index:index}).then((data) =>{
						if(data.data.error ==0 ){
							
						}
						console.log(data.data)
					}).catch((err) =>{
						console.log(err);
					})
				}
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
.top{
	margin-top: 55px;
	padding: 5px 10px;
}
.message{
	background: paleturquoise;
	padding: 10px 30px;
	margin-bottom: 10px;
}
.message a{
	display: block;
	text-align: right;
	text-decoration: none;
	color: #FF6700;
	margin-top: 10px;
}
.who{
	color: red;
}
.name{
	color: #00B7FF;
}

</style>
