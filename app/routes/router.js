const router = require('express').Router();

const authRouter = require('./authRouter')

const middleware = require('../middleware')


router.get('/',middleware.islogged, (req, res) => {
    res.render('dashboard');
});

router.use('/auth',authRouter)

router.get('/logout',(req,res) =>{
    res.redirect('/auth/logout')
})
router.get('/login',(req,res) =>{
    res.redirect('/auth/login')
})
router.get('/register',(req,res) =>{
    res.redirect('/auth/register')
})

router.get('/dados', (req, res) => {
    res.send('/auth/dados')
})

module.exports = router