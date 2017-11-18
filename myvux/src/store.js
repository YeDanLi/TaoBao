import Vue from 'vue';
import Vuex from 'vuex';
//使用vuex
Vue.use(Vuex);
//创建仓库对象
const store = new Vuex.Store({
//    state:存储仓库中的数据以及初始值，当前的数据所有的组件都可以调用
  state:{
    showModels:false,
    addressArr:[
      {
        name:'华北地区',
        sub:['北京','天津','河北','山西','内蒙古']
      },
      {
        name:'华南地区',
        sub:['广东','广西','河南','湖北','湖南','海南']
      }
    ],
    defaultAddress:'河南',
  },
  mutations:{
    changeModels:function (state,data) {
      state.showModels = data.value;
    },
    changeDefaultAddress:function (state,data){
      state.defaultAddress = data.value;
    }
  }
})
export default  store;
