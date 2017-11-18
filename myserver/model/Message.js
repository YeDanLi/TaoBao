/**
 * Created by Administrator on 2017/11/13.
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

const MessageSchema = new Schema({
    _id:{
        type:String,
        default:shortid.generate,
        unique:true
    },
//    评论的那个商品
    shop_id:{
        type:String,
//      ref:'good'
    },
shop_admin:{
	type:String,
},
    // 被@的人
    //maijai 
//  target_id:{
//      type:String,
//      ref:'User'
//  },
//    评论的那个人
    reply_author:{
        type:String,
//      ref:'User'
    },
    reply_content:{
    	type:String,
    },
    reply_id:{
        type:String,
//      ref:'Reply'
    },
    // 是否已读
    has_read:{
        type:Boolean,
        default:false
    }
});
MessageSchema.statics = {
//    获取消息的个数
    getNoReadCounts:(id,callback) =>{
    	
        Message.find({'shop_id':id,has_read:false}).count((err,count) =>{
            if(err){
                console.log(111)
                callback(err);
            }else{
                console.log(22)
                callback(null,count);
            }
        })
    },
//  //    获取所有的未读消息
//  getNoReadMsgs:(target_id, callback) =>{
//      Message.find({'target_id':target_id, has_read:false}).populate('reply_author shop_id').then( (noReadMsgs)=>{
//          callback(null, noReadMsgs);
//      }).catch( (err) =>{
//          callback(err);
//      })
//  },
////    获取所有的已读消息
//  getReadMsgs:(target_id, callback) =>{
//      Message.find({'target_id':target_id, has_read:true}).populate('reply_author shop_id').then( (readMsgs)=>{
//          callback(null, readMsgs);
//      }).catch( (err) =>{
//          callback(err);
//      })
//  },
//  getMessageById:(message_id,callback) =>{
//      Message.findOne({'_id':message_id,has_read:false}).then((message) =>{
//          callback(null,message)
//      }).catch((err) =>{
//          callback(err);
//      })
//  }
    
}



const Message = mongoose.model('Message',MessageSchema);
module.exports = Message;
