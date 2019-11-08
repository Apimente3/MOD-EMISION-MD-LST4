const env = require('./serverConfig/environment');
//const http2=require('http2'); 

var express = require('express');
var app = express();
var router = express.Router();
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var morgan = require('morgan');

const session = require('express-session');

var server = env === 'production' ? require('https').Server(app) : require('http').Server(app);

//var users = require('./routes/users');


app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Access-Control-Allow-Origin");
    res.header("Access-Control-Allow-Headers", "Origin, Authorization,Access-Control-Allow-Request-Method,X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", true);
    next();
});

app.use(bodyParser.json({
    limit: '20mb',
    parameterLimit: 1000
}));
app.use(bodyParser.urlencoded({
    limit: '20mb',
    extended: true,
    parameterLimit: 1000000
}));

/*Uso de las sessiones*/
app.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: false,
    saveUninitialized: true
}));

app.use(cookieParser())

/*Para tener el estado de servidor*/
app.use(require('express-status-monitor')({
    title: 'API GESTION DE PREDIOS - Direccion de Disponibilidad de Predios',
    path: '/estado-servidor',
   
}));
 // app.use(assignId);
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url :status" [:date[clf]] :user-agent :response-time ms :referrer'));

const io = require('socket.io')(server, {
    path: '/api/socket.io'
});

const models = require('./models');

const routesControllers = require('./controlador')({ router, app, io }); //inicializa las rutas de los controladoes

require('./swagger')({ router, models, routesControllers });

server.timeout = 1728000000;
console.log('---------------------------------------------')
console.log(8000);
server.listen(8000);





module.exports = app;
