const router = require('express').Router();
const User = require('../model/User')
const pg = require('pg')
const config = require('../config/config')
const pool = new pg.Pool(config.postgres.poolSettings)
const cadEndereco = require('../model/cadEndereco')
const cadMaquina = require('../model/cadMaquina')
const cadAdm = require('../model/cadAdmin')

router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.get('/cadEndereco', (req, res) => {
    res.render('auth/cadEndereco');
})

router.post('/cadEndereco', async (req, res) =>{
    let cep = req.body.cep
    let bairro = req.body.bairro
    let rua = req.body.rua
    let cidade = req.body.cidade
    let numero = req.body.numeroR
    let apelido = req.body.apelidoR

    let endereco = await cadEndereco.cadEndereco(cep, bairro, rua, cidade, numero, apelido)

});

router.get('/cadMaquina', (req, res) => {
    res.render('auth/cadMaquina');
})

router.get('/cadUsuario', (req, res) => {
    res.render('auth/cadUsuario');
})

router.post('/cadUsuario', async (req, res) => {
    let nome = req.body.nome
    let email = req.body.email
    let senha = req.body.senha
    let cpf = req.body.cpf

    let admin = await cadAdm.cadAdmin(nome, email, senha, cpf)
})

router.post('/cadMaquina', async (req, res) =>{
    let apelido = req.body.apelido
    let nmtotem = req.body.nmtotem

    let maquina = await cadMaquina.cadMaquina(nmtotem, apelido)

})

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