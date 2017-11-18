const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const index = require('./routes/index');
const users = require('./routes/users');
const auth = require('./common/auth')
const goods = require('./model/goods');
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('liyedan'));
app.get('/',function(req,res){
    // console.log(req.param)
    // let page = parseInt(req.param("page"));
    // let pageSize = parseInt(req.param("pageSize"));
    // let priceLevel = req.param("priceLevel");
    // let sort = req.param("sort");
    // let skip = (page-1)*pageSize;
    // var priceGt = '';
    // var priceLte = '';
    goods.find().then((good) =>{
        let params = {};
        // console.log(good);
        res.json({error:0,message:good})
    }).catch((err) =>{
        res.json({error:1,message:'获取错了'})
    })
});
app.use(express.static(path.join(__dirname, 'www')));
app.use(session({
    secret:"liyedan",
    store:new MongoStore({
        url:'mongodb://127.0.0.1/Gai'
    }),
    resave:false,
    saveUninitialized:true,
    name:'liyedan',
    cookie:{
        //cookie存在的期限是一月
        maxAge:1000 * 60 * 60 * 24 * 30
    }
}));
app.use('/', index);
app.use(require('./routes/reply'));
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(auth.create_session);

app.use((req,res,next) =>{
    res.locals.msgCount = req.session.msgCount;
    res.locals.user = req.session.user;
    res.locals.admin = req.session.admin;
    // res.locals.isLogin = req.session.isLogin;
    next();
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
app.listen(3333,function(){
  console.log('my mall is running');
})

module.exports = app;
