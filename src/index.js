const express = require('express');
const morgan = require('morgan')
const exphbs = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash')
const session = require('express-session')
const MySQLStore = require('express-mysql-session')(session);
const {database} = require('./keys')
const passport = require('passport')


//inicializacion
const app = express();
require('./lib/passport')


//configuracion
app.set('port', process.env.PORT || 3001);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs');



//funciones de peticiones
app.use(session({
    secret: 'acalderonl1',
    resave: false,
    saveUninitialized: false,
    store: new  MySQLStore(database)
}))

app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(passport.initialize())
app.use(passport.session())


//variables globales
app.use((req, res, next)=>{
    app.locals.success = req.flash('success');
    app.locals.message = req.flash('message');
    next();
});



//rutas
app.use(require('./routes'))
app.use(require('./routes/authentication'))
app.use('/links', require('./routes/links'))


//public
app.use(express.static(path.join(__dirname, 'public')))



//iniciar servidor
app.listen(app.get('port'), ()=>{
    console.log('el servidor esta escuchando por el puerto', app.get('port'));
});