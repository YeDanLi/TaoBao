/**
 * Created by Administrator on 2017/11/11.
 */
const express = require('express');
const router = express.Router();
const validator = require('validator');
const Goods = require('../model/goods');
const Reply = require('../model/Reply');
const User = require('../model/User');
const Admin = require('../model/admin');
const multer = require('multer');
const Message = require('../model/Message');
const saveMessage = require('../common/message')

var storage = multer.diskStorage({
	destination: 'www/uploads',
	filename: function(req, file, cb) {
		var times = Date.now();
		cb(null, times + '.jpg');
		req.body.picture = times + ".jpg"
	}
});
var upload = multer({ storage: storage });

router.post('/reply/:id', upload.array('photo', 6), function(req, res, next) {
	var shop_id = req.params.id;
	var arr = [];
	console.log('这是评论的开始');
	// console.log(req.body);
	let content = validator.trim(req.body.content);
	for(var i = 0; i < req.files.length; i++) {
		arr.push(req.files[i].filename);
	}
	// console.log(arr);
//	  if(req.session.user){
	var user = req.session.user;
//	  }
//	  if(req.session.admin){
//	      var user = req.session.admin;
//	  }
	//年==月==日
	// req.body.time = new Date().toLocaleDateString();
	// console.log(req.body);
	Goods.getGoodsById(shop_id, (err, good) => {
		if(err) {
			return res.json({ error: 1, message: err })
		}
		// console.log('测试评论');
		//      console.log(req.body);
		var reply = new Reply(req.body);
		//回复的内容
		reply.content = content;
		// //回复的那个商品
		reply.shop_id = good._id;
		// //回复人
		reply.replyName = user._id;
		//      reply.admin_id = good.
		//当前作者的id;
		//      console.log(reply.replyName);
		reply.replyImage = arr;
		reply.time = new Date().toLocaleDateString();
		reply.save().then((reply) => {
			return reply;
		}).then((reply) => {
			User.getUserById(req.session.user._id, (err, user) => {
				if(err) {
					return res.end(err);
				}
				user.score += 5;
				user.save();
				//更新存储在req.session.user中的数据
				req.session.user = user;
			})
			return reply;
		}).then((reply) => {
			//商品的评论次数加1
			good.reply_num += 1;
			good.save();
			return reply;
		}).then((reply) => {
			//    通知商品的卖家，
			console.log(good.admin);
			Admin.findOne({ name: good.admin }).then((admin) => {
				let admin_id = admin._id
				let admin_name = admin.name;
				saveMessage.saveReplyMessage(req.session.user.name, admin.name, good.productName);
			}).catch((err) => {
				console.log(err);
			})

			return reply;
		}).then((reply) => {
			//      	console.log('===========')
			Message.getNoReadCounts(good._id, (err, count) => {
				if(err) {
					return res.json({ error: 1, message: err })
				}
				//      		console.log('===========')
				req.session.msgCount = count;
				console.log(count);
			})
		}).then((reply) => {
			res.json({ error: 0, message: reply })
		});
	})
});
//获取该商品所有的评论
router.get('/guoreply/:id', function(req, res, next) {
	// console.log('进来')
	var shop_id = req.params.id;
	// console.log(shop_id)
	Reply.getReplysByShopIds(shop_id, (err, reply) => {
		if(err) {
			console.log('err')
			return res.json({ error: 1, message: err })
		}
		// console.log(reply);
		res.json({ error: 0, message: reply })
	})
})
//获取
router.get('/message', function(req, res, next) {
	if(req.session.admin._id) {
		var admin_name = req.session.admin.name;

		Message.find({ shop_admin: admin_name }).then((reply) => {
			console.log(reply);
			//		console.log(reply.shop_id)
			//		let shop;
			//		reply.forEach((replys) =>{
			//			shop = replys.shop_id;
			//		})
			//		Goods.getGoodsById(shop,(err,shopName) =>{
			//			if(err){
			//          	return res.json({error:1,message:err})
			//      	}
			//			console.log(shopName.productName);
			//		})

			res.json({ error: 0, message: reply })
		}).catch((err) => {
			console.log(err);
		})

	}
})

//删评论
router.post('/removeP', function(req, res, next) {
	//	console.log(req.body);
	let id = req.body.id;
	let index = req.body.index;
	//	Message.getMessageById(id, (err,message) =>{
	//		if(err){
	//			return res.json({error:1,message:err})
	//		}
	//		console.log(message);
	//		
	//	})
	Message.findOneAndRemove(id).exec(function(err, message) {
		if(err) {
			return res.json({ error: 1, message: err })
		}
		console.log(message.has_read);
		message.has_read = true;
		message.save();
		res.json({ error: 0, message: 'success' })
	})
})

module.exports = router;