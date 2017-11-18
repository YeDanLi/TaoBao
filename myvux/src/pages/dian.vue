<template>
  <div class="all">
    <nav>
			<a class="nav-zuo" href="">
				<i class="fa fa-angle-left"></i>
			</a>
			我的店铺
		</nav>
  <a href="#/add" class="add">添加商品</a>
  <div class="root" v-if="datas">

    <ul class="shops">
        <li class="shop" v-for="data in datas"  v-if="data.admin == admin.name">
          <a :href="'#/good/'+data._id" >
            <!--<img :src="'/static/photo/'+data.productImage " alt="">-->
            <img :src="'http://localhost:3333/uploads/'+data.productImage " alt="">
          <p class="desc"> <b>双11</b>
            {{data.describe}}
          </p>
          <p class="price">
            <span> <small>￥</small>{{ data.salePrice }}</span>&#X3000;{{data.productNum}}人付款
          </p>
          <span class="activ">
              <span class="jin">购物津贴</span>
              <span class="jian">每满400减50</span>
          </span>
          </a>
        </li>
    </ul>
  </div>
  <div class="no" v-else>
    <h2>我还没有上市的商品.....</h2>
  </div>
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
        admin:''
      }
    },
    created () {
      // 组件创建完后获取数据，
      // 此时 data 已经被 observed 了
      this.fetchData()
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route': 'fetchData'
    },
      methods: {
        fetchData () {
          this.error = this.post = null;
          this.loading = true;
          var id = this.$route.params.id;
          axios.get('/goods/shop').then((resData) => {
            this.admin = resData.data.admin;
            this.user = resData.data.user;
            this.datas = resData.data.data;
            console.log(this.datas)
          }).catch((error) => {
            console.log(error);
          })
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
.all{
  margin-top: 44px;
}
  .no{
    margin-top: 80px;
  }
  a{
    color: #333;
    text-decoration: none;
  }
.add{
    text-decoration: none;
    padding: 10px 0;
    display: inline-block;
    width: 100%;
    text-align: center;
    color: #ff8642;
    background: #fffbc0;
    font-size: 20px;
  }
  .root .shops{
    overflow: hidden;
  }
  .root .shops .shop{
    list-style: none;
    float: left;
    border:solid 2px #ffcce6;
    width: 50%;
    font-size: 12px;
    color: #333;
    height: 265px;
  }
  .root .shops .shop p{
    padding: 5px;
  }
  .root .shops .shop img{
    width: 100%;
    height: 140px;
  }
  .root .shops .shop .desc b{
    color: #fff;
    background: red;
    padding: 1px 3px;
    border-radius: 8px;
  }
  .root .shops .shop .price{
    font-size: 10px;
  }
  .root .shops .shop .price span{
    color: red;
    font-size: 14px;
  }
  .root .shops .shop .activ{
    margin-left: 15px;
    margin-bottom: 30px;
    font-size: 9px;
    color: red;
    border:solid 1px red;
    background: #ffd6eb;
  }
  .root .shops .shop .activ .jin{
    padding:0 5px;
    border-right: solid 1px #ff5d6a;
  }
  .root .shops .shop .activ .jian{
    padding:0 5px;
  }




</style>
