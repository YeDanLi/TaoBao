/**
 * Created by Administrator on 2017/11/2.
 */
const dbSet = require('./db');
const mongoose = require('mongoose');
const shortid = require('shortid');
const UserSchema = new mongoose.Schema({
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
        default:'../public/images/default.jpg'
    },
    //邮箱
    email:{
        type:String
    },
//    已买商品数量
    buy_num:{
        type:Number,
        default:0
    },
//    积分            ===买一个商品增加5分
    score:{
        type:Number,
        default:0
    },
//    收藏量           ===喜欢+1
    likes:{
        type:Number,
        default:0
    },
    //买家购物车的商品
    cartList:[
        {
            "productId":String,
            "productName":String,
            "salePrice":String,
            "productImage":String,
            "checked":String,
            "describe":String,
            "productNum":Number,

        }
    ],
    //买家地址
    addressList:[
        {
            _id:{
                type:String,
                default:shortid.generate,
                unique:true
            },
            userName: {
                type:String,
                // ref:'User'
            },
            userPrivence:{
                type:String,
                default:'河南省'
            },
            tele:{
                type:Number,
                default:15736933525
            },
            userCountry:{
                type:String,
                default:'鹿邑县'
            },
            userTitle:{
                type:String,
                default:'周口市'
            },
            streetName: {
                type:String,
                default:'观堂乡'
            },
            isDefault:{
                type: Boolean,
                default:false
            },
            address:{
                type:String,
                default:'河南省周口市鹿邑县'
            },
            //是否被选中
            checked:{
                type:Boolean,
                default:false
            },
        }
    ],
//    订单信息
    sureList:{
        fuList:[],
        shouList:[]
    },
     //    待付款
    fuList:{
        type:Array
    },
//    待评价
    pingList:{
        type:Array
    },
//    待收获
    shouList:{
        type:Array
    }
});

UserSchema.statics = {
    // 设置通过name查找用户
    getUserByName: (name, callback) => {
        User.findOne({ 'name': name }).then((user) => {

            callback(null, user);
        }).catch((err) => {
            callback(err);
        })
    },
    //通过email查找用户
    getUserByEmail: (email, callback) => {
        User.findOne({ 'email': email }).then((user) => {
            callback(null, user);
        }).catch((err) => {
            callback(err);
        })
    },
    getUserById: (id, callback) => {
        User.findOne({ '_id': id }).then((user) => {
            // console.log('user1');
            callback(null, user);
        }).catch((err) => {
            // console.log('user2');
            callback(err);
        })
    },
}



const User = mongoose.model('User',UserSchema);
module.exports = User;
