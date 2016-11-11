var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');

var session = require('express-session');
var flash = require('express-flash');
var passport = require('passport');

var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

//var app = require('express')();
var server = require('http').Server(app);

var io = require('socket.io')(server);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  next();
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
  secret: 'blog.fens.me', cookie: {maxAge: 60000}
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash())

//app.use('/',express.static(path.join(__dirname, 'public')));

//app.use('/', routes);
app.use('/users', users);


app.get('/', function(req, res){
    res.sendfile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
    var a = []
    setInterval(function(){
        //socket.on('cityName', function(city){
           // if(city == city){
                var data = JSON.stringify(Math.round(100 * Math.random()));
                var time = new Date();
                a.push(data)
                if(a.length == 12){
                    io.emit('new', a);
                    a = [];
                }
           // }
        //});

    },500)
});


server.listen(3000);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
