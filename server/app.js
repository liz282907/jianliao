var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const mongooseConnection = require('./models/index').connection
const uuid = require('uuid/v1')
const cors = require('cors')

var router = require('./routes/index');
var users = require('./routes/users');
var config = require('./config')

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors({
    origin: 'http://localhost:3001',
    optionsSuccessStatus: 200,
    credentials: true,
    maxAge: 1000 * 60 * 60 * 24 *10
}))
app.use(session({
  secret: config.session_related.secret,
  name: config.session_related.name,
  genid: ()=> uuid(),
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection:  mongooseConnection})
}))

app.use('/',express.static(config.static_path))
app.get('/*',function (req,res) {
    res.sendFile('index.html',{root: path.join(__dirname,'public/dist')})
})

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser(config.signed_secret));
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', index);
app.use('/users', users);

app.use('/',router);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
