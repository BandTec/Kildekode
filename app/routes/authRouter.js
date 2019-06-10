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

router.get('/latLong', async (req,res) => {
    const client = await pool.connect()
    try{
    let resultados =  await client.query(`select lat, lng from endereco where idendereco in(16,17,18,19,20)`);
    resultados = resultados.rows;
    console.log(resultados);

    res.json(resultados);
    }finally{
        client.release();
    }
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
    let limite_linhas = 10;
    let tipo1 = `ram`;
    let tipo2 = `disco`;
    let tipo3 = `processos`;
    let tipo4 = `cpumaquina`;
  
    try {
      let resultados1 = await client.query(
        `select * from get_values('${tipo1}',${limite_linhas});`
      );
      let resultados2 = await client.query(
          `select * from get_values('${tipo2}',${limite_linhas});`
      );
      let resultados3 = await client.query(
          `select * from get_values('${tipo3}',${limite_linhas});`
      );
      let resultados4 = await client.query(
          `select * from get_values('${tipo4}',${limite_linhas});`
      );
      resultados1 = resultados1.rows;
      let label1 = [];
      let data1 = [];
      let titulo1 = "Ram";
      resultados1.map((item, index) => {
        label1.push(
          dayjs(item.data_hora).format("HH:mm").toString()
        );
        data1.push(item.value);
      });
      resultados2 = resultados2.rows;
      let label2 = [];
      let data2 = [];
      let titulo2 = `Disco`;
      resultados2.map((item, index) => {
        label2.push(
          dayjs(item.data_hora).format("HH:mm").toString()
        );
        data2.push(item.value);
      });
      resultados3 = resultados3.rows;
      let label3 = [];
      let data3 = [];
      let titulo3 = `Processos`;
      resultados3.map((item, index) => {
        label3.push(
          dayjs(item.data_hora).format("HH:mm").toString()
        );
        data3.push(item.value);
      });
      resultados4 = resultados4.rows;
      let label4 = [];
      let data4 = [];
      let titulo4 = `Disco`;
      resultados4.map((item, index) => {
        label4.push(
          dayjs(item.data_hora).format("HH:mm").toString()
        );
        data4.push(item.value);
      });
      console.log(resultados1);
      console.log(resultados2);
      console.log(resultados3);
      console.log(resultados4);
      res.render("index", {
        title: `${titulo1}`,
        label: label1,
        data: data1,
        title2: `${titulo2}`,
        label2: label2,
        data2: data2,
        title3: `${titulo3}`,
        label3: label3,
        data3: data3,
        title4: `${titulo4}`,
        label4: label4,
        data4: data4,
      });
    } catch (error) {
      console.error(error);
    } finally {
      client.release();
    }
});

module.exports = router