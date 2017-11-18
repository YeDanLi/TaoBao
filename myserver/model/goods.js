/**
 * Created by Administrator on 2017/11/2.
 */
const dbSet = require('./db');
const mongoose = require('mongoose');
const shortid = require('shortid');
const GoodsSchema = new mongoose.Schema({

    _id:{
        type:String,
        default:shortid.generate,
        unique:true
    },
    //商品的管理员
    admin:{
      	type:String,
        ref:'Admin'
    },
    //商品名称
    productName:{
        type:String,
        default:'淘宝商品'
    },
    //商品价格
    salePrice:{
        type:Number,
        default:0
    },
    //商品图片
    productImage:{
        type:String,
        default:'../public/images.1.png'
    },
    //是否被选中
    checked:{
        type:Boolean,
        default:false
    },
    //商品已卖数量
    productNum:{
        type:Number,
        default:1
    },
    //商品的描述
    describe:{
        type:String,
        default:'这是一件很好的商品'
    },
    //商品是否被删除
    deleted:{
        type:Boolean,
        default:false
    },
// 评论次数
    reply_num:{
        type:Number,
        default:0
    },
});

GoodsSchema.statics = {
//    获取所有的商品
    getFullGoods:(query,callback) =>{
        Goods.find(query,{deleted:false}).then((goods) =>{
            callback(null,goods)
        }).catch((err) =>{
            callback(err);
        })
    },
    getGoodsById:(id,callback) =>{
        Goods.findOne({'_id':id , deleted:false}).then((goods) =>{
            // console.log('商品找到')
            callback(null,goods)
        }).catch((err) =>{
            callback(err);
            // console.log('商品找错')
        })
    },
    goodRemove:(id,callback) =>{
        Goods.findOneAndRemove({'_id':id}).then((goods) =>{
            callback(null,goods)
        }).catch((err) =>{
            callback(err);
        })
    },
    goodUpdate:(id,callback) =>{
        Goods.findOneAndUpdate({'_id':id,deleted:false}).then((goods) =>{
            callback(null,goods)
        }).catch((err) =>{
            callback(err);
        })
    }
};
GoodsSchema.methods.timeGoods = function(){
    console.log('时间计算中。。。。。');
    var now = new Date();
    var times = {
        date:now,
        year:now.getFullYear(),
        month:now.getFullYear() + '-' + (( now.getMonth()+1 ) < 10 ? '0':'')
        +( now.getMonth()+1 ),

        day:now.getFullYear() + '-' + (( now.getMonth()+1 ) < 10 ? '0':'')
        +( now.getMonth()+1 )+'-'+(now.getDate() < 10 ?'0':'')+now.getDate(),

        hours:now.getFullYear() + '-' + (( now.getMonth()+1 ) < 10 ? '0':'')
        +( now.getMonth()+1 )+'-'+(now.getDate() < 10 ?'0':'')+now.getDate()
        +'  '+(now.getHours()<10?'0':'')+now.getHours(),

        minutes:now.getFullYear() + '-' + (( now.getMonth()+1 ) < 10 ? '0':'')
        +( now.getMonth()+1 )+'-'+(now.getDate() < 10 ?'0':'')+now.getDate()
        +'  '+(now.getHours()< 10 ? '0':'')+now.getHours()+':'+
        (now.getMinutes()<10?'0':'')+now.getMinutes(),

        seconds:now.getFullYear() + '-' + (( now.getMonth()+1 ) < 10 ? '0':'')
        +( now.getMonth()+1 )+'-'+(now.getDate() < 10 ?'0':'')+now.getDate()
        +'  '+(now.getHours()<10?'0':'')+now.getHours()+':'+
        (now.getMinutes()<10?'0':'')+now.getMinutes()+':'+
        (now.getSeconds()<10?'0':'')+now.getSeconds(),

    };
    return times;
};



const Goods = mongoose.model('Goods',GoodsSchema);
module.exports = Goods;
