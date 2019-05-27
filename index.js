const express = require('express');
const path = require('path');
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
const app = express();
const pg = require('pg');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);

const config = require('./app/config/config')
let pgPool = new pg.Pool(config.postgres.poolSettings);

app.use(session({
  store: new pgSession({
    pool : pgPool,                // Connection pool
    tableName : 'user_session'   // Use another table-name than the default "session" one
  }),
  secret: config.secret,
  resave: false,
  cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } // 30 days
}));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.disable('x-powered-by')
app.disable('etag')

app.use(express.static(path.resolve(__dirname, 'app/public')));

app.use(function(req, res, next){

 res.locals.sessionFlash = req.session.sessionFlash;
 delete req.session.sessionFlash;
 next();
});
// Configuração de view
app.set('views', path.resolve(__dirname, 'app/views'));
let nunenv = nunjucks.configure(app.get('views'), {
    autoescape: true,
    express: app
});
app.set('view engine', 'njk');

app.use((req,res,next) => {

  if(req.session.user){
    res.locals.username = req.session.user.name+' '+req.session.user.surname
    res.locals.role = req.session.user.role_id
  }
  next()

})

const routes = require('./app/routes/router')
app.use('/',routes)

let port = config.port
app.listen(port, () => {
    console.log(`Kildekode rodando na porta ${port}`);
});

