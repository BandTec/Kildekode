const router = require('express').Router();
const User = require('../model/User')

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

module.exports = router