const pg = require('pg')

const config = require('../config/config')

const pool = new pg.Pool(config.postgres.poolSettings)

const find = async (login,pass) => {
    console.log('login',login)
    console.log('password',pass)
    const client = await pool.connect()
    try {
      const res = await client.query(`SELECT * FROM users WHERE login = '${login}' LIMIT 1`)
     
      if(res.rows.length==0){
        //   Usuário não encontrado
        return {completed:0,error:'Usuário não encontrado'}
      }else{
          let user = res.rows[0]
          if(user.password === pass){
            return {completed:1,user:user}
          }else{
            return {completed:0,error:'Senha incorreta'}
          }
      }
    } finally {
      client.release()
    }
} 

const register = async (login, pass, name) => {
    const client = await pool.connect()
    try {
        const res = await client.query(`INSERT INTO users(name,login,password) VALUES('${name}','${login}','${pass}')`)
       return null
      } finally {
        client.release()
      }
}

module.exports = {
    find,register
}