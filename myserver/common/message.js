
const Message = require('../model/Message');
const saveMessage = {

//    谁在某件商品中给你评论了
    saveReplyMessage:(reply_author,shop_admin,shop_id)=>{
        let message = new Message();
//      console.log(shop_id);
//      console.log(shop_admin)
 		message.reply_author = reply_author;
        message.shop_admin = shop_admin;
        message.shop_id = shop_id;
        message.save((msg) =>{
            console.log('评论保存成功');
        })
    }

}

module.exports = saveMessage;