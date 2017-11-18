/**
 * Created by Administrator on 2017/11/2.
 */
const dbSet = require('./db');
const mongoose = require('mongoose');
const shortid = require('shortid');
const AdminSchema = new mongoose.Schema({
    //用户的ID
    _id:{
        type:String,
        default:shortid.generate,
        unique:true
    },
    //用户名
    name:{
        type:String,
        require:true
    },
    //密码
    password:{
        type:String,
        require:true
    },
    //个人头像
    avatar:{
        type:String,
        default:'/src/assets/default.jpg'
    },
    //邮箱
    email:{
        type:String
    },
//    卖家的商品数量
    mai_num:{
        type:Number,
        default:0
    },
//    积分            ===买一个商品增加5分
    score:{
        type:Number,
        default:0
    },
    //卖家商品
    goodsList:[
        {
            "productId":String,
            "productName":String,
            "salePrice":String,
            "productImage":String,
            "checked":String,
            "productNum":String
        }
    ],
    //卖家地址
    addressList:[
        {
            "addressId": String,
            "userName": String,
            "streetName": String,
            "postCode": Number,
            "tel": Number,
            "isDefault": Boolean
        }
    ]
});

AdminSchema.statics = {
    // 设置通过name查找用户
    getAdminByName: (name, callback) => {
        Admin.findOne({ 'name': name }).then((admin) => {
            callback(null, admin);
        }).catch((err) => {
            callback(err);
        })
    },
    //通过email查找用户
    getAdminByEmail: (email, callback) => {
        Admin.findOne({ 'email': email }).then((admin) => {
            callback(null, admin);
        }).catch((err) => {
            callback(err);
        })
    },
    getAdminById: (id, callback) => {
        Admin.findOne({ '_id': id }).then((admin) => {
            callback(null, admin);
        }).catch((err) => {
            callback(err);
        })
    },
}



const Admin = mongoose.model('Admin',AdminSchema);
module.exports = Admin;
