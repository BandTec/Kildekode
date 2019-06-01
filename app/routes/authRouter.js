const router = require('express').Router();
const User = require('../model/User')
const pg = require('pg')
const config = require('../config/config')
const pool = new pg.Pool(config.postgres.poolSettings)

router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.post('/login',async (req, res) => {
   let login = req.body.username
   let password = req.body.password
   let user = await User.find(login,password)
   console.log(user)
   if(user.completed==1){
       req.session.user = user.user
       res.redirect('/')
   }else{
    req.session.sessionFlash =  {
        type: 'error',
        message: 'Usuário ou senha incorreta'
    };

    res.redirect('/auth/login');
   }
  

});

router.get('/register', (req, res) => {
    res.render('auth/login');
});

router.post('/register',async (req, res) => {
   let username = req.body.username
   let email = req.body.email
   let password = req.body.password
   let cpf = req.body.cpf
   let user = await User.register(username, email, password, cpf)
   

    res.redirect('/auth/login');
   
  

});

router.get('/logout', (req, res) => {

    req.session.user=null
    req.session.sessionFlash =  {
        type: 'success',
        message: 'Você saiu com sucesso!'
    };

    res.redirect('/auth/login');
});

router.get('/dados', async (req, res, next) => {
    const client = await pool.connect()
    
    var limite_linhas = 10;

    client.query(`SELECT ram FROM registros limit ${limite_linhas}`).then(resultados => {

        res.json(resultados);
        console.log(resultados);
    }).catch(error => {
        console.log(error);
        res.status(400).json({"error": `Erro na consulta junto ao banco de dados ${error}`});
    });
});

module.exports = router