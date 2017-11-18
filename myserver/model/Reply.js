/**
 * Created by Administrator on 2017/11/11.
 */

const dbSet = require('./db');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shortid = require('shortid');
const _= require('lodash');

//日期格式化
const moment = require('moment');

//设置全局语言 ===
moment.locale('zh-cn');

const ReplySchema = new Schema({
    // 回复id
    _id:{
        type:String,
        default:shortid.generate,
        unique:true
    },
    shop_id:{
        type:String,
        ref:'good'
    },
    admin_id:{
    	type:String,
    	ref:'admin'
    },
    replyImage:{

    },
    // 回复的内容
    content:{
        type:String,
        default:'商品非常好，值得购买'
    },
    //回复时间
    time:{
        type:Date,
        default:Date.now
    },
    //评论的那个人
    replyName:{
        type:String,
        ref:'User'
    },
    //回复是否被删除
    deleted:{
        type:Boolean,
        default:false
    }
});
ReplySchema.statics = {
    //查找当前文章所有的一级回复
    getReplysByShopId:(admin_id, callback) =>{
        Reply.find({admin_id:admin_id, deleted:false}).populate('replyName').then((replys) =>{
            callback(null, replys);
        }).catch( (err) =>{
            callback(err);
        })
    },
     getReplysByShopIds:(shop_id, callback) =>{
        Reply.find({shop_id:shop_id, deleted:false}).populate('replyName').then((replys) =>{
            callback(null, replys);
        }).catch( (err) =>{
            callback(err);
        })
    },

}
// 设置当前实例化对象的方法
ReplySchema.methods.time_ago = function(){
    let time  = moment(this.create_time).fromNow();
    return time;
};

const Reply = mongoose.model('Reply',ReplySchema);
module.exports = Reply;


