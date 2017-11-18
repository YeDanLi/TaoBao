const User = require('../model/User');
const Message = require('../model/Message')
const auth = {
    create_cookie:(user,res)=>{
        let auth_token = `${user._id}$$$$`;
        res.cookie('liyedan',auth_token,{
            signed:true,
            maxAge:1000*60*60*24*30,
            path:'/'
        });
    },

    create_session:(req,res,next) =>{
        console.log('检测session');
        // console.log(req.session);
        if(req.session.user){
            Message.getNoReadCounts(req.session.user._id,(err,count) =>{
                if(err){
                    return next();
                }
                req.session.isLogin = true;
                req.session.msgCount = count;
                next()
            })

        }else{
            let auth_token = req.signedCookies['liyedan'];
            // console.log(auth_token);
            if( !auth_token ){
                return next();
            }
            let auth = auth_token.split('$$$$');
            // console.log(auth);
            let user_id = auth[0];
            User.getUserById(user_id,(err,user) =>{
                if(err){
                    res.json({error:0,message:err})
                }else{
                    Message.getNoReadMessage(user._id,(err,count) =>{
                        if(err){
                            return next();
                        }
                        req.session.msgCount = count;
                        req.session.user = user;
                        req.session.isLogin = true;
                        next();
                    })

                }
            })
        }
    }
};
module.exports = auth;