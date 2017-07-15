var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

var index = require('./routes/index');
var users = require('./routes/users');

var config = require('./util/config');
var login = require('./routes/login');
//console.log("my edit");
var connectionString = config.connectionString;

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.engine('html',require('ejs').renderFile);
app.set('view engine', 'html');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req, res, next){
    if(mongoose.connection.readyState != 1){
       mongoose.connect(connectionString, function(err){
           if(err){
               console.log('Error occurred while connecting to db');
               throw err;
           }
           else{
               console.log('Connection is ready...');
           }
           next();
       });
    }
    else{
        next();
    }



});

app.use(session({
    secret: 'this is a secret',
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

app.use('components/home/', function(req, res, next){
    if(!req.session.userName){
      res.render('error');
      return;
    }

});
app.use('/', login);
app.get('/*', function(req, res){
        res.render('index.html') ;
});


// catch 404 and forward to error handler


// error handler
/*app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});*/

app.set('port', process.env.PORT || 4050);



app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


module.exports = app;
