
/**
 * Module dependencies
 */

var express = require('express'),
  errorhandler = require('errorhandler')
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  errorHandler = require('error-handler'),
  morgan = require('morgan'),
  routes = require('./routes'),
  api = require('./routes/api'),
  http = require('http'),
  path = require('path'),
  nodemailer = require('nodemailer'),
  mysql = require('mysql'),
  pool = mysql.createPool({
    connectionLimit : 100,
    host     : 'localhost',
    user     : 'root',
    password : 'aaabbb3',
    database : 'emailseq',
    debug    :  false
  }),
  transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: '',
        pass: ''
    }
  });

  console.log(transporter.transporter.options.auth.user);

var app = module.exports = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(morgan('dev'));
app.use(bodyParser());
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public')));

var env = process.env.NODE_ENV || 'development';

// development only
if (env === 'development') {
  app.use(errorhandler());
}

// production only
if (env === 'production') {
  // TODO
}


/**
 * Routes
 */

// serve index and view partials
app.get('/', routes.index);
app.get('/partials/:name', routes.partials);

// JSON API
app.get('/api/name', api.name);

app.get('/api/emails', api.emails);
app.get('/api/templates', api.templates);

app.get('/api/email/:id', api.email);

app.post('/api/email', api.addEmail);
app.post('/api/template', api.addTemplate);
app.post('/api/sendemail', api.sendEmail);

app.put('/api/email/:id', api.editEmail);

app.delete('/api/email/:id', api.deleteEmail);

// redirect all others to the index (HTML5 history)
app.get('*', routes.index);


/**
 * Start Server
 */

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
