const express = require('express');
const router = express.Router();
const User = require('../model/User');
const Admin = require('../model/admin');
const dbSet = require('../model/db');
const crypto = require('crypto');
const md5 = require('md5');
const auth = require('../common/auth');
const validator = require('validator');
const multer = require('multer');
const Goods = require('../model/goods');
const _ = require('lodash');
// const reply = require('./reply');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});

// 处理用户注册数据
router.post('/zhuce', function(req, res, next) {
	// console.log(req.body);
	let name = req.body.name;
	let password = req.body.password;
	let repass = req.body.repass;
	let email = req.body.email;
	// let error = '';
	if(password !== repass) {
		return res.json({ error: 1, message: '两次密码不一致，请重新输入' })
	}
	if(!validator.matches(name, /^[a-zA-Z][a-zA-Z0-9_]{4,11}$/, 'g')) {
		return res.json({ error: 1, message: '用户名长度不合法' })
	}
	if(!validator.matches(password, /(?!^\\d+$)(?!^[a-zA-Z]+$)(?!^[_#@]+$).{5}/)) {
		return res.json({ error: 1, message: '密码不合法' })
	}
	if(!validator.isEmail(email, /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/)) {
		return res.json({ error: 1, message: '邮箱不合法' })
	}
	User.findOne().or([{ name: name }, { email: email }]).then((user) => {
		if(user) {
			return res.json({ error: 1, message: '用户名/邮箱已存在' })
		}
		//  密码加密
		//     let md5 = crypto.createHash('md5');
		//     let password = md5.update(req.body.password).digest('hex');
		console.log(user);
		//保存到数据库中
		var user = new User(req.body);
		user.save(function(err) {
			if(err) {
				return res.json({ error: 1, message: '注册失败' });
			}
			res.json({ error: 0, message: '注册成功' });
		})
		console.log(111);
	})

});

//处理用户登录数据
router.post('/login', function(req, res, next) {
	// console.log(req.body);
	//邮箱或用户名
	let name = req.body.name;
	let password = req.body.password;
	let getName;
	let getEmail;
	let getUser;
	name.includes('@') ? getEmail = name : getName = name;
	if(!validator.matches(password, /(?!^\\d+$)(?!^[a-zA-Z]+$)(?!^[_#@]+$).{5}/)) {
		return res.json({ error: 1, message: '密码不合法' })
	}
	if(getEmail) {
		if(!validator.isEmail(email)) {
			return res.json({ error: 1, message: '邮箱不合法' })
		}
		getUser = User.getUserByEmail
	}
	if(getName) {
		if(!validator.matches(name, /^[a-zA-Z][a-zA-Z0-9_]{4,11}$/, 'g')) {
			return res.json({ error: 1, message: '用户名长度不合法' })
		}
		getUser = User.getUserByName
	}
	getUser(name, (err, user) => {
		if(err) {
			return res.json({ error: 1, message: err })
		}
		if(!user) {
			return res.json({ error: 1, message: '用户名或邮箱未注册' })
		}
		if(password !== user.password) {
			return res.json({ error: 1, message: '密码输入错误' })
		}
		// auth.create_cookie(user,res);

		// console.log(res.cookie);
		req.session.user = user;
		// console.log(req.session.user);
		res.json({ error: 0, message: '登录成功', user: req.session.user })
	})
});

//增加地址
router.post('/address', function(req, res, next) {
	// console.log(req.body);
	var user_id = req.session.user._id;
	// console.log(req.session.user.name)
	User.getUserById(user_id, (err, user) => {
		if(err) {
			return res.json({ error: 1, message: 'error' })
		}
		if(!user) {
			return res.json({ error: 1, message: '该用户不存在' })
		}
		// if(!validator.matches(req.body.tele,/^((133)|(149)|(153)|(17[3,7])|(18[0,1,9]))\\d{8}|(170[0-2])\\d{7}$/)){
		//     return res.json({error:1,message:'请输入正确的手机号'})
		// }
		var obj = {
			userName: req.body.people,
			streetName: req.body.street,
			// userPrivence : req.body.privence,
			// userCountry:req.body.country,
			// userTitle : req.body.title,
			// country : req.body.country,
			tele: req.body.tele,
			address: req.body.b,
		};
		// console.log(obj);
		user.addressList.push(obj);
		// user.addressList = _.uniq(user.addressList);
		user.save();
		// console.log('==================测试')
		// console.log(user);
		// console.log(user.addressList.length)
		res.json({ error: 0, message: 'success' })
	});

});

//把你的地址显示在你的收获地址页面上
router.get('/showAddress', function(req, res, next) {
	var user_id = req.session.user._id;
	User.getUserById(user_id, (err, user) => {
		if(err) {
			return res.json({ error: 1, message: err })
		}
		// console.log(user.addressList)
		let data = user.addressList;
		res.json({ error: 0, message: data, user: req.session.user })
	})
});

//选择地址
router.post('/dizhi', function(req, res, next) {
	console.log('地址');
	var user = req.session.user._id;
	var address = req.body.address;

})

//删除地址
router.post("/delAddress", function(req, res, next) {
	// console.log(req.body)
	var userId = req.session.user._id;
	// var address = req.body.addressId;
	var index = req.body.index;
	// console.log(address.length );
	// console.log(index)
	User.getUserById(userId, (err, user) => {
		if(err) {
			return res.json({ error: 1, message: err })
		}
		// console.log(user);
		user.addressList.splice(index, 1);
		user.save();
		res.json({ error: 0, message: 'success' })
	})
	// console.log(address.length );
});

//卖家的注册处理
router.post('/adminzhuce', function(req, res, next) {
	// console.log(req.body);
	let name = req.body.name;
	let password = req.body.password;
	let repass = req.body.repass;
	let email = req.body.email;
	// let error = '';
	if(password !== repass) {
		return res.json({ error: 1, message: '两次密码不一致，请重新输入' })
	}
	if(!validator.matches(name, /^[a-zA-Z][a-zA-Z0-9_]{4,11}$/, 'g')) {
		return res.json({ error: 1, message: '用户名长度不合法' })
	}
	if(!validator.matches(password, /(?!^\\d+$)(?!^[a-zA-Z]+$)(?!^[_#@]+$).{5}/)) {
		return res.json({ error: 1, message: '密码不合法' })
	}
	if(!validator.isEmail(email, /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/)) {
		return res.json({ error: 1, message: '邮箱不合法' })
	}

	Admin.findOne().or([{ name: name }, { email: email }]).then((admin) => {
		if(admin) {
			return res.json({ error: 1, message: '管理员/邮箱已存在' })
		}
		//  密码加密
		// let md5 = crypto.createHash('md5');
		// let password = md5.update(req.body.password).digest('hex');

		//保存到数据库中
		var admin = new Admin(req.body);
		admin.save(function(err) {
			if(err) {
				return res.json({ error: 1, message: '注册失败' });
			}
			res.json({ error: 0, message: '注册成功' });
		});
		console.log(111);
	})

});

//卖家的登录处理
router.post('/adminlogin', function(req, res, next) {
	// console.log(req.body);
	//邮箱或用户名
	let name = req.body.name;
	let password = req.body.password;
	let getName;
	let getEmail;
	let getAdmin;
	name.includes('@') ? getEmail = name : getName = name;
	if(!validator.matches(password, /(?!^\\d+$)(?!^[a-zA-Z]+$)(?!^[_#@]+$).{5}/)) {
		return res.json({ error: 1, message: '密码不合法' })
	}
	if(getEmail) {
		if(!validator.isEmail(email)) {
			return res.json({ error: 1, message: '邮箱不合法' })
		}
		getAdmin = Admin.getAdminByEmail
	}
	if(getName) {
		if(!validator.matches(name, /^[a-zA-Z][a-zA-Z0-9_]{4,11}$/, 'g')) {
			return res.json({ error: 1, message: '用户名长度不合法' })
		}
		getAdmin = Admin.getAdminByName
	}
	getAdmin(name, (err, admin) => {
		if(err) {
			// return  res.json({error:1,message:err})
		}
		if(!admin) {
			return res.json({ error: 1, message: '管理员或邮箱未注册' })
		}
		if(password !== admin.password) {
			return res.json({ error: 1, message: '密码输入错误' })
		}
		// auth.create_cookie(admin,res);
		req.session.admin = admin;
		// console.log(req.session.admin);
		res.json({ error: 0, message: '登录成功', admin: req.session.admin })
	})
});

//买家退出
router.get('/tuichu', function(req, res, next) {
	res.clearCookie('liyedan');
	req.session.user = null;
	res.json({ error: 0, message: '退出成功', user: req.session.user })
});

//卖家退出
router.get('/admintuichu', function(req, res, next) {
	res.clearCookie('liyedan');
	req.session.admin = null;
	res.json({ error: 0, message: '退出成功', admin: req.session.admin })
});

//判断是否有用户登录
router.get('/panduan', function(req, res, next) {
	let cookie = req.session.cookie;
	// console.log(cookie);
	let que = '';
	if(cookie) {
		que = 'success';
	} else {
		que = ''
	}
	res.json({ error: 0, message: que, users: cookie, user: req.session.user, admin: req.session.admin })
});

//商品增加     =======    上传图片
var storage = multer.diskStorage({
	destination: 'www/uploads',
	filename: function(req, file, cb) {
		var times = Date.now();
		cb(null, times + '.jpg');
		req.body.picture = times + ".jpg"
	}
});
var upload = multer({ storage: storage });
router.post('/photo', upload.array('photo', 6), function(req, res) {
	// console.log(req.body)
	// console.log(req.session.admin)
	var arr = [];
	for(var i = 0; i < req.files.length; i++) {
		arr.push(req.files[i].filename);
	}
	req.body.productImage = arr;
	req.body.productName = req.body.productName;
	req.body.salePrice = req.body.salePrice;
	req.body.describe = req.body.describe;
	req.body.admin = req.session.admin.name;
	req.body.time = new Date();
	// console.log(req.body);
	var goods = new Goods(req.body);
	goods.save(function(err) {
		if(err) {
			return res.json({ error: 1, message: '发布商品失败' })
		}
		res.json({ error: 0, message: '添加成功', url: `${goods._id}`, user: req.session.user, admin: req.session.admin });
	})
	//    url:`${goods._id}`,
})

//把添加的商品显示在首页上
router.get('/index', function(req, res) {
//	let query = {};
	var num = req.query.limit * 1;
//	Goods.getFullGoods(query, (err, goods) => {
//		if(err) {
//			return res.json({ error: 1, message: err })
//		}
//		res.json({ error: 0, message: goods })
//	})
	Goods.find().sort({'salePrice':-1}).limit(2*num).exec(function(err,goods){
		if(err){
			return res.json({error:1,message:err})
		}
		res.json({error: 0, message: goods })
	})
});
//加载更多
router.get('/indexs',function(req,res,next){
//	console.log(req.query);
	var num = req.query.limit * 1;
	var page = req.query.offset * 1;
	Goods.find().sort({'salePrice':-1}).limit(num).exec(function(err,goods){
		if(err){
			return res.json({error:1,message:err})
		}
		res.json({error: 0, message: goods })
	})
})

//动态商品的显示
router.get('/good/:id', function(req, res) {
	var id = req.params.id;
	// console.log(id);
	Goods.getGoodsById(id, (err, goods) => {
		if(err) {
			return res.json({ error: 1, message: err })
		}
		// console.log(goods)
		var obj = {};
		obj.data = goods;
		obj.user = req.session.user;
		obj.admin = req.session.admin;
		res.json({ error: 0, message: '成功获取', data: obj })
	})
});

//动态修改先=====获取=====商品数据
router.get('/update/:id', function(req, res) {
	// console.log(req.query);
	var id = req.params.id;
	// console.log(id);
	Goods.getGoodsById(id, (err, goods) => {
		if(err) {
			return res.json({ error: 1, message: err })
		}
		// console.log('==========')
		// console.log(goods);
		var obj = {};
		obj.data = goods;
		obj.user = req.session.user;
		obj.admin = req.session.admin;
		goods.save();
		res.json({ error: 0, message: '成功修改', data: obj, url: `${goods._id}` })
	})
});
//然后动态修改商品数据
router.post('/updates/:id', function(req, res) {
	console.log(req.body);
	var productName = req.body.productName;
	var salePrice = req.body.salePrice;
	var describe = req.body.describe;
	// var photo = req.body.photo;
	var id = req.params.id;
	// console.log(id);
	Goods.getGoodsById(id, (err, goods) => {
		if(err) {
			return res.json({ error: 1, message: err })
		}
		goods.describe = describe;
		goods.salePrice = salePrice;
		goods.productName = productName;
		// goods.productImage = photo;
		goods.save();
		var obj = {};
		obj.data = goods;
		obj.user = req.session.user;
		obj.admin = req.session.admin;

		res.json({ error: 0, message: '成功修改', data: obj, url: `${goods._id}` })
	})
});

//我的店铺
router.get('/shop', function(req, res) {
	Goods.find().exec(function(err, goods) {
		if(err) {
			return res.json({ error: 1, message: err })
		}
		res.json({ error: 0, message: '成功获取', data: goods, user: req.session.user, admin: req.session.admin })
	})
});

//加入购物车
router.post('/addcar', function(req, res) {
	//商品的id
	var productId = req.body.shop_id;
	var user_id = req.session.user._id;
	// var admin_id = req.session.admin._id;
	// console.log(productId);
	Goods.getGoodsById(productId, (err, good) => {
		if(err) {
			return res.json({ error: 1, message: 'cuowu' })
		}
		User.getUserById(user_id, (err, user) => {
			if(err) {
				return res.json({ error: 1, message: 'cuola' })
			}
			// console.log(user);
			var isCun = false;
			if(user.cartList.length > 0) {
				console.log(1);
				console.log(isCun);
				user.cartList.forEach(function(item, index) {
					if(item.productId == productId) {
						user.cartList[index].productNum += 1;
						user.save();
						user.buy_num += 1;
						user.score += 5;
						user.likes += 1;
						req.session.user = user;
						isCun = true;
					}
				});
			}
			//如果该商品不存在，直接push购物车里
			if(!isCun) {
				console.log(2);
				console.log(isCun);
				user.cartList.push({
					"productId": good._id,
					"productName": good.productName,
					"salePrice": good.salePrice,
					"productImage": good.productImage,
					"checked": good.checked,
					"describe": good.describe,
					"productNum": 1
				});
				// console.log(user);
				user.buy_num += 1;
				user.score += 5;
				user.likes += 1;
				user.save();
				req.session.user = user;
			}
			good.productNum++;
			good.save();
			res.json({ error: 0, message: '添加成功' });
		})
	})
});

//购物车中显示商品
router.get('/showShop', function(req, res) {
	console.log(req.session);
	var num = req.query.limit * 1;
	if(req.session.admin) {
		var user_id = req.session.admin._id;
		Admin.getAdminById(user_id, (err, data) => {
			if(err) {
				return res.json({ error: 1, message: '购物车失败' })
			}

			res.json({ error: 0, data: data, message: '购物车成功' })
		})
	}
	if(req.session.user) {
		var user_id = req.session.user._id;
		User.getUserById(user_id, (err, data) => {
			if(err) {
				return res.json({ error: 1, message: '购物车失败' })
			}

			res.json({ error: 0, data: data, message: '购物车成功' })
		})

	}

});



//卖家删除自己的商品
router.get('/deleted', function(req, res, next) {
	// console.log(req.query);
	let shop_id = req.query.shop_id;
	let adminId = req.session.admin._id;
	User.getUserById(adminId, (err, admin) => {
		if(err) {
			return res.json({ error: 1, message: err })
		}
		Goods.goodRemove(shop_id, (err, shops) => {
			if(err) {
				return res.json({ error: 1, message: err })
			}
			shops.deleted = true;
			shops.save();
			// console.log(shops)
			res.json({ error: 0, message: 'success' })
		})
	})
});

//移除商品
router.get('/removeone', function(req, res) {
	console.log(req.query);
	var user_id = req.session.user._id;
	var id = req.query.goodId;
	User.getUserById(user_id, (err, data) => {
		if(err) {
			return res.end(err)
		}
		data.cartList.forEach(function(item, index) {
			if(item.productId == id) {
				data.cartList.splice(index, 1);
				data.save();
			}
		});
		res.json({ error: 0, message: 'success' })
	})
});

//查询当前用户的购物车数据
router.get("/cartList", function(req, res, next) {
	var userId = req.session.user._id;
	User.findOne({ userId: userId }, function(err, user) {
		if(err) {
			return res.json({ status: '1', msg: err.message, result: '' });
		}
		if(user) {
			res.json({ status: '0', msg: '', result: user.cartList });
		}
	});
});

//修改商品数量(增加减少商品数量)
router.post("/cartEdit", function(req, res, next) {
	// console.log(req.body);
	var userId = req.session.user._id,
		productId = req.body.productId,
		productNum = req.body.productNum,
		checked = req.body.checked;
	User.update({ "_id": userId, "cartList.productId": productId }, {
		"cartList.$.productNum": productNum,
		"cartList.$.checked": checked,
	}, function(err, doc) {
		if(err) {
			res.json({ status: '1', msg: err, });
		} else {
			res.json({ status: '0', result: 'suc' });
		}
	})
});

//更改用户的信息 ====== 换头像
router.post('/infos', upload.single('photo'), function(req, res, next) {
	// console.log('进来了');
	if(req.session.user._id) {
		var user_id = req.session.user._id;
		User.getUserById(user_id, (err, user) => {
			if(err) {
				return res.json({ error: 1, message: err })
			}
			user.name = req.body.name;
			user.avatar = req.file.filename;
			req.session.user = user;
			user.save();
			res.json({ error: 0, message: '修改成功' });
		})
	}
});

//更改管理员信息 ====== 换头像
router.post('/infoes', upload.single('photo'), function(req, res, next) {
	if(req.session.admin._id) {
		var admin_id = req.session.admin._id
		Admin.getAdminById(admin_id, (err, admin) => {
			if(err) {
				return res.json({ error: 1, message: err })
			}
			admin.name = req.body.name;
			admin.avatar = req.file.filename;
			req.session.admin = admin;
			admin.save();
			res.json({ error: 0, message: '修改成功' });
		})
	}
})

//搜索
router.post('/search', function(req, res, next) {
	 console.log(req.body);
	 console.log('测试搜索');
	var content = validator.trim(req.body.content);
	var str = RegExp(content, 'i');
//	Goods.find({ 'productName': str }).exec(function(err, result) {
	Goods.find({ 'productName': str }).exec(function(err, result) {
		if(err) {
			return res.json({ error: 1, message: '没有该商品哦。。。。' })
		}
		res.json({ error: 0, message: result });
	});
});

//清空购物车
router.get('/clear', function(req, res, next) {
	// console.log(req.query);
	var user_id = req.session.user._id;
	User.getUserById(user_id, (err, user) => {
		if(err) {
			return res.json({ error: 1, message: err })
		}
		// console.log(user.likes);
		User.findOneAndUpdate({ '_id': user_id }, { cartList: [] }).exec((err) => {
			if(err) {
				return res.json({ error: 1, message: err })
			}
			res.json({ error: 0, message: '清空购物车成功' })
		})
	})
});

//立即购买
router.post('/liji', function(req, res, next) {
	//	console.log(req.body)
	//	console.log('req.body');
	var shop = req.body.arr;
	req.session.user.panduan = shop;
	res.json({ error: 0, message: shop });
})

//提交商品
router.post('/sure', function(req, res, next) {
	// console.log('sure')
	var shops = req.body.arr;
	req.session.user.panduan = shops;
	res.json({ error: 0, message: shops });
});
//提交页面获取从购物车选择的商品
router.get('/huo', function(req, res, next) {
	res.json({
		error: 0,
		shops: req.session.user.panduan,
		user: req.session.user
	});
});
//提交地址
router.post('/sureAddress', function(req, res, next) {
	// console.log(req.body)
	var shops = req.body.arr;
	req.session.user.address = shops;
	res.json({ error: 0, message: shops });
});
//提交页面获取你选择的地址
router.get('/huoAddress', function(req, res, next) {
	//	console.log(req.session.user.address);
	res.json({
		error: 0,
		address: req.session.user.address,
		user: req.session.user
	});
})

router.post('/mai', function(req, res, next) {
	//	console.log('买');
	//  console.log(req.body);
	var datas = req.body;
	req.session.user.mai = datas;
	res.json({ error: 0, message: datas })
})
router.get('/data', function(req, res, next) {
	res.json({ error: 0, message: req.session.user.mai })
})

//从支付页面返回去的====待支付fuList
router.post('/zhifu', function(req, res, next) {
	let shops = req.body.shop; //1个
	let id = req.session.user._id;
	User.getUserById(id, (err, user) => {
		if(err) {
			return res.json({ error: 1, message: err })
		}
		if(shops.length != 0) {
			shops.forEach((shop) =>{
				user.fuList.push(shop);
			})
			shops.forEach((shop) =>{
				user.sureList.fuList.push(shop);
			})
			user.save();
			req.session.user = user;
			res.json({ error: 0, message: 'success' })
		}
	})
})

//待付款的传值
router.get('/daizhifu', function(req, res, next) {
	let id = req.session.user._id;
	User.getUserById(id, (err, user) => {
		if(err) {
			return res.json({ error: 1, message: err })
		}
		res.json({ error: 0, message: user.sureList.fuList })
	})
})

//支付过了的
router.post('/surezhifu', function(req, res, next) {
	//	console.log(req.body)
	let shops = req.body.shops;
	let address = req.body.addressed;
	req.session.user.fu = req.body;
	res.json({ error: 0, message: req.body })
})
//支付页面获取的值
router.get('/fukuan', function(req, res, next) {
	let fu = req.session.user.fu;
	res.json({ error: 0, message: fu })
})

//付款到成功页面
router.post('/ok', function(req, res, next) {
	//	console.log(req.body);
	let shops = req.body.shops;
	let address = req.body.addressed;
	let id = req.session.user._id;

	User.getUserById(id, (err, user) => {
		if(err) {
			return res.json({ error: 1, message: err })
		}
		console.log('=============user');
		if(shops.length != 0) {
			shops.forEach((shop) =>{
				user.shouList.push(shop);
			})
			shops.forEach((shop) =>{
				user.sureList.shouList.push(shop);
			})
			user.buy_num += 1;
			user.score += 5;
			user.save();
			req.session.user = user;
			res.json({ error: 0, message: req.body })
		}
	})
})

//付款到成功页面
router.post('/oks', function(req, res, next) {
	let shops = req.body.shop;
	let shop_id = req.body.shop.productId;
	let id = req.session.user._id;
	User.getUserById(id, (err, user) => {
		if(err) {
			return res.json({ error: 1, message: err })
		}
		//把待付款中的那个给删了
		user.fuList.forEach((fu,index) =>{
			if(fu.productId == shop_id){
				user.fuList.splice(index,1);
			}
		})
		//把所有订单中的也给删了
		user.sureList.fuList.forEach((fu,index) =>{
			if(fu.productId == shop_id){
				user.fuList.splice(index,1);
			}
		})
		user.buy_num += 1;
		user.score += 5;
		user.save();
		req.session.user = user;
		res.json({ error: 0, message: req.body })

	})
})

//就变成待收货了
router.get('/shou', function(req, res, next) {
	let id = req.session.user._id;
	User.getUserById(id, (err, user) => {
		if(err) {
			return res.json({ error: 1, message: err })
		}
		res.json({ error: 0, message: user.sureList.shouList })
	})
})
//待收货就变成全部订单了
router.get('/all', function(req, res, next) {
	let id = req.session.user._id;
	User.getUserById(id, (err, user) => {
		if(err) {
			return res.json({ error: 1, message: err })
		}
//		console.log(user);
		res.json({ error: 0, message: user.sureList })
	})
})

//从全部订单中确认收货--删一个当前的
router.get('/sureshou',function(req,res,next){
//	console.log('在哪')
//	console.log(req.query.shopId)
	let id = req.query.shopId;
	let user_id = req.session.user._id;
	User.getUserById(user_id,(err,user) =>{
		if(err){
			res.json({error:1,message:err})
		}
		user.sureList.shouList.forEach(function(item,index){
			if(item.productId == id){
				user.sureList.shouList.splice(index,1);
				user.pingList.push(item);
				user.shouList.splice(index,1);
				user.save();
			}
		})
		
		res.json({error:0,message:'success'})
	})
})
//
router.get('/surefu',function(req,res,next){
	console.log(req.query);
	let id = req.query.shopId;
	let user_id = req.session.user._id;
	User.getUserById(user_id,(err,user) =>{
		if(err){
			res.json({error:1,message:err})
		}
		user.sureList.fuList.forEach(function(item,index){
			if(item.productId == id){
				user.sureList.fuList.splice(index,1);
				user.fuList.splice(index,1);
				user.save();
			}
		})
		res.json({error:0,message:'success'})
	})
})

//待付款===付款
router.post('/money',function(req,res,next){
//	console.log('00000')
//	console.log(req.body);
	req.session.user.money = req.body;
	res.json({error:0,message:'success'})	
})
//到付款页面
router.get('/moneys',function(req,res,next){
//	console.log('00000')
//	console.log(req.body);
	let money = req.session.user.money;
	res.json({error:0,message:money})	
})
//待收货
router.get('/daishou',function(req,res,next){
	let id = req.session.user._id;
	User.getUserById(id,(err,user)=>{
		if(err){
			return res,json({error:1,message:err})
		}
		res.json({error:0,message:user.sureList.shouList})
	})
})
//待评价
router.get('/daiping',function(req,res,next){
	let id = req.session.user._id;
	User.getUserById(id,(err,user)=>{
		if(err){
			return res,json({error:1,message:err})
		}
		res.json({error:0,message:user.pingList})
	})
})








module.exports = router;