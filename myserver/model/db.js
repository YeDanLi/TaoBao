/**
 * Created by Administrator on 2017/11/2.
 */

var mongoose = require('mongoose');
const crypto = require('crypto');
const User = require('./User')
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1/Gai');
var db = mongoose.connection;

db.on('open',function(){
    console.log('淘宝数据库连接成功')
})
db.on('error',function(){
    console.log('淘宝数据库连接失败');
});

const Dbset = {

//    封装加密
    encrypt : (data,key)=>{ // 密码加密
        var cipher = crypto.createCipher("bf",key);
        var newPsd = "";
        newPsd += cipher.update(data,"utf8","hex");
        newPsd += cipher.final("hex");
        return newPsd;
    },
}




module.exports = Dbset;
