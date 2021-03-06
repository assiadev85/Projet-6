var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose=require('mongoose');
const session=require('express-session');
const MongoStore =require('connect-mongo')
require('dotenv').config({path: __dirname + '/.env'})

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
 var adminRouter=require('./routes/admin')
 var loginRouter=require('./routes/login')
 var locationRouter=require('./routes/location')

mongoose.connect(process.env.MONGODB_URI,
{
  useNewUrlParser: true,
 useUnifiedTopology: true,
  //userCreateIndex:true
}).then(function(){
  console.log('connexion a mongodb reussie');
}).catch((err)=>{
  throw err;
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret:'secret',
  resave:false,
  saveUninitialized:false,
  store: MongoStore.create({mongoUrl:process.env.MONGODB_URI,})
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin',adminRouter);
app.use('/login',loginRouter)
app.use('/location',locationRouter)

// catch 404 and forward to error handler
 app.use(function(req, res, next) {
  //next(createError(404));
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

module.exports = app;
