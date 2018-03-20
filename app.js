var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//routes
var index = require('./routes/index');
var users = require('./routes/users');
var about = require('./routes/about');
var login = require('./routes/login');
var register=require('./routes/register');
var collector_list=require('./routes/collector_list');
var collector_history=require('./routes/collector_history');
var control_panel=require('./routes/control_panel');
var add_collector=require('./routes/add_collector');
var collector_changeStatus=require('./routes/collector_changeStatus');
var collection=require('./routes/collection');
var collector_location=require('./routes/collector_location');

var loginController = require('./loginController');
var collectorController= require('./collectorController');
var userController =require('./userController');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//using routes
app.use('/', login);
app.use('/login', login);
app.use('/users', users);
app.use('/about', about);
app.use('/index', index);
app.use('/register', register);
app.use('/collector_list',collector_list);
app.use('/collector_history',collector_history);
app.use('/control_panel',control_panel);
app.use('/add_collector',add_collector);
app.use('/collector_changeStatus',collector_changeStatus);
app.use('/collection',collection);
app.use('/collector_location',collector_location);


//post controllers
app.post("/tryLogin", loginController.doLogin);
app.post("/addCollector", collectorController.addNewCollector);
app.post("/updateCollectorInfo", collectorController.updateCollectorInfo);


//get controllers collectors
app.get("/getCollector/:id",collectorController.getCollector);
app.get("/locateCollector/:id",collectorController.locateCollector);
app.get("/getCollectorList",collectorController.getCollectorList);
app.get("/singleCollector/:id",collectorController.singleCollectorStatus);

//get controllers users


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
