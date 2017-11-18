
<template>
  <div class="bg">
  <div class="all">
   <nav>
			<a class="nav-zuo" href="">
				<i class="fa fa-angle-left"></i>
			</a>
			我的收货地址
		</nav>
  <div class="content">

    <div v-if="show">
    <form action="">
      <form action="" class="contact">
        <!--收货人：<input type="text" placeholder="收货人" v-model="people" required> <br>-->
         <x-input title="姓名" name="username" placeholder="收货人"
         	 v-model="people" required is-type="china-name"></x-input>
        <!--联系电话：<input type="text" placeholder="联系电话" 
        v-model="tele"  required>-->
      
      
		<x-input title="手机号码" name="mobile" v-model="tele" 
      	required  placeholder="请输入联系方式" keyboard="number" is-type="china-mobile"></x-input>
    	
    	
      </form>
      <div class="city">
        你所在的省份：<select v-model="currentP">
        <option v-for="(item,ins) in provinces" :value="ins" v-model="privence"> {{item.title}} </option>
      </select>
      </div>
      <div class="city">
        你所在的市区：<select v-model="currentC">
        <option :value="ins" v-for="(item,ins) in provinces[currentP].citys" v-model="title">
          {{item.title}}
        </option>
      </select>
      </div>
      <div class="city">
        你所在的地方：<select v-model="currentX">
        <option :value="ins" v-for="(item,ins) in provinces[currentP].citys[currentC].countrys" v-model="country">
          {{ item }}
        </option>
      </select><br><br>
        <textarea name="" id="" cols="30" rows="2" placeholder="你的详细住址:" v-model="street"></textarea>
      </div>
    </form>

    <p>你要添加的地址是：<b ref="addresses"> {{provinces[currentP].title}}
      {{provinces[currentP].citys[currentC].title}}
      {{provinces[currentP].citys[currentC].countrys[currentX]}}</b></p>
    <button @click="address" class="sure">确认我的信息</button>
    </div>
  </div>
    <div v-if="datas" class="addressList">
      <p v-for="(address,index) in datas"  @click="xuan(index)">
        <!--<a   class="address">-->
        <span class="person">
          收货人：{{address.userName}}<br>
          联系方式：{{address.tele}}</span><br>
        收获地址：{{address.address}}-<strong>{{address.streetName}}</strong><br>
          <b @click="delAddress(index)">
            <i class="fa fa-trash-o"></i>
          </b>
        <!--</a>-->
      </p>
    </div>
    <div v-else>
      <h2>还没有收获地址</h2>
    </div>
  </div>
    <p class="pleace" @click="show=!show">添加收获地址！</p>
    <!--<footer-bar></footer-bar>-->
  </div>
</template>
<script>

import { XInput, Group, XButton, Cell, XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem } from 'vux'
  import FooterBar from  '../components/FooterBar'
  import axios from "axios";
  export default {

directives: {

   TransferDom

  },

 components: {
    FooterBar,
  XHeader,
Actionsheet,
 ButtonTab, ButtonTabItem,
 XInput,
    XButton,
    Group,
    Cell
},
    data: function() {
      return {
          b:'',
        show:false,
        currentP:0,
        currentC:0,
        currentX:0,
        provinces:[
          {
            title:'河南省',
            citys:[
              {
                title:'郑州市',
                countrys:['新郑','新密','登封','上街','巩义']
              },
              {
                title:'洛阳市',
                countrys:['关林','孟津','新安','汝阳','宜阳','洛宁','伊川']
              },
              {
                title:'安阳市',
                countrys:['博川','安阳','税治','内黄','林州','滑县']
              },
              {
                title:'新乡市',
                countrys:['原阳','延津','封丘','卫辉','辉县']
              },
              {
                title:'焦作市',
                countrys:['修武','博爱','温县','沁阳','孟州','济源']
              },
              {
                title:'濮阳市',
                countrys:['南乐','濮阳','范县','台县','清丰']
              },
              {
                title:'三门峡',
                countrys:['绳池','陕县','卢氏','义马','灵宝']
              },
              {
                title:'周口市',
                countrys:['项城','扶沟','西华','鹿邑','太康','郸城']
              },

            ]
          },
          {
            title:'河北省',
            citys:[
              {
                title:'石家庄市',
                countrys:['辛集市','晋州市','新乐市','鹿泉市','唐山市','秦皇岛市']
              },
              {
                title:'张家口市',
                countrys:['承德市','沧州市','邢台市','南宫市','保定市','定州市','安国市']
              },
              {
                title:'廊坊市',
                countrys:['衡水市','霸州市','任丘市','河间市']
              },
            ]
          },
          {
            title:'湖北省',
            citys:[
              {
                title:'武汉市',
                countrys:['江岸区','江汉区','武昌区','洪山区','东西湖','汉南区','江夏区']
              },
              {
                title:'黄石市',
                countrys:['西塞山','下陆区','铁山区','大治区','阳新县','黄山港']
              },
              {
                title:'荆州市',
                countrys:['沙市区','石首市','洪湖市','松滋市','公安县','江陵县']
              },
              {
                title:'黄冈市',
                countrys:['黄州区','麻城市','武穴市','团风县','红安县','罗团县','浠水县']
              },

            ]
          },
          {
            title:'湖南省',
            citys:[
              {
                title:'长沙市',
                countrys:['芙蓉区','天心区','开福区','雨花区','岳麓区']
              },
              {
                title:'浏阳市',
                countrys:['星沙县','望城县']
              },
              {
                title:'株洲市',
                countrys:['天元区','荷塘区','芦淞区','石峰区']
              },
              {
                title:'常宁市',
                countrys:['衡阳县','衡东县','衡山县','衡南县','祁东县']
              },

            ]
          }
        ],
        privence:'',
        title:'',
        country:'',
        people:'',
        tele:'',
        street:'',
        datas:'',
        loading: false,
        post: null,
        error: null,
        addressId:'',
        user:'',
      };
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
//    确认我的地址信息
      address:function(){
          var b= this.$refs.addresses.innerHTML;
          this.b = b;
//          console.log(b);
        for(var i = 0; i < this.provinces.length;i++ ){
          this.privence = this.provinces[i].title;
        }
        for(var j = 0 ;j < this.provinces.length;j++){
          for(var a = 0; a < this.provinces[j].citys.length; a++){
            this.title = this.provinces[j].citys[a].title;
            for(var b = 0; b < this.provinces[j].citys[a].countrys.length; b++) {
              this.country = this.provinces[j].citys[a].countrys[b]
            }
          }
        }
        var params = {
//          privence : this.privence,
//          title:this.title,
//          country:this.country,
          people:this.people,
          tele:this.tele,
          street:this.street,
          b:this.b,
        };
        axios.post('/goods/address',params).then((resData) =>{
            if(resData.data.error == 0 ){
                location.reload()
            }
        }).catch((err) =>{
            console.log(err)
        });
      },
      fetchData (){
          this.error = this.post = null;
          this.loading = true;
          var id = this.$route.params.id;
          axios.get('/goods/showAddress').then((resData) => {
//                  this.admin = resData.data.admin;
            this.addressId = resData.data.user.addressList;
            this.datas = resData.data.message;
            this.user = resData.data.user;
//            console.log(resData.data.user.addressList)
          }).catch((error) => {
            console.log(error);
          })
      },
//      删除地址
      delAddress(index){
        var item = this.datas[index];
        this.datas.splice(index,1);
        console.log(item);
        axios.post("/goods/delAddress",{
          addressId:this.addressId,
          index:index,
        }).then((response)=>{
          var res = response.data;
          console.log(res);
          if(res.error == 0){
            console.log(res.message);
            location.href = '/#/address';
          }
        }).catch((err) =>{
            console.log(err);
        })
      },
//      买东西的时候选择地址
      xuan:function (index) {
        var address = this.datas[index];
         console.log(address);
         console.log(11111111111)
        let arr = [];
        let num = index;
        var user = this.user;
//        console.log(user.addressList);
//        if(user.addressList == ''){
//            console.log(22222222222222);
//            user.addressList.checked = true;
////            arr.push(this.user.addressList);
//          alert('重新选择')
//            console.log(arr);
//        }else{
//        console.log(333333333333);
          user.addressList[num].checked = true;
          arr.push(this.user.addressList[num]);
          console.log(arr);
//        }
        axios.post('/goods/sureAddress',{arr:arr}).then((resData) =>{
//            console.log(resData.data.message);
          window.history.go(-1);
        }).catch((err) =>{
          console.log(err);
        })
      },

    }
  };
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
  h2{
    margin-top: 50px;
  }
  .all{
    margin-top: 50px;
  }
  .vux-header{
    background:linear-gradient(left,#ff9000,#ff5000);
    position: fixed;
    top:0;
    width: 100%;
  }
  .person{
    font-size: 16px;
    /* padding: 15px 0; */
  }
  .pleace{
    position: fixed;
    bottom: 0;
    width: 100%;
    font-size:18px;
    color: #fff;
    padding: 10px;
    background: #ff6700;
    text-align: center;
  }
  .contact{
    margin-top: 50px;
  }
  .contact input{
    margin: 5px;
  }
  .content {
    margin-left: 20px;
    width: 100%;
  }
  .content .city{
    margin: 10px;
  }
  .sure{
    margin-top: 40px;
    width: 90%;
    border: none;
    background:linear-gradient(left,#ff6700,#ff5000);
    color: #fff;
    padding: 5px 0;
  }
  .addressList{
    padding: 0 10px;
  }
  .addressList p{
    height: 100px;
    border-bottom: solid 1px #eee;
    padding:  15px 10px;
    position: relative;
    font-size: 14px;
    margin: 10px 0;
    background: papayawhip;
  }
  .addressList p a{
    color: #666;
    text-decoration: none;
  }
  .addressList p b{
    position: absolute;
    right: 15px;
    bottom: 0;
  }

</style>
