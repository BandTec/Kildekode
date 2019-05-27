const islogged = (req,res,next) => {
    if(req.session.user){
        next()
    }else{
        req.session.sessionFlash =  {
            type: 'warning',
            message: 'Você precisa de realizar o login para continuar'
        };
    
        res.redirect('/auth/login');
    }

}

module.exports ={islogged}