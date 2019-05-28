const pg = require('pg')

const config = require('../config/config')

const pool = new pg.Pool(config.postgres.poolSettings)

const find = async (login,pass) => {
    console.log('login',login)
    console.log('password',pass)
    const client = await pool.connect()
    try {
      const res = await client.query(`SELECT nome, senha FROM usuario WHERE nome = '${login}' LIMIT 1`)
     
      if(res.rows.length==0){
        //   Usuário não encontrado
        return {completed:0,error:'Usuário não encontrado'}
      }else{
          let user = res.rows[0]
          console.log(res.rows[0])
          if(user.senha === pass){
            return {completed:1,user:user}
          }else{
            return {completed:0,error:'Senha incorreta'}
          }
      }
    } finally {
      client.release()
    }
} 

const register = async (username, email, password, cpf, adm) => {
    const client = await pool.connect()
    try {
        const res = await client.query(`INSERT INTO usuario (cpf,nome,email, senha) VALUES('${cpf}','${username}','${email}', '${password}')`)
       return null
      } finally {
        client.release()
      }
}

module.exports = {
    find,register
}