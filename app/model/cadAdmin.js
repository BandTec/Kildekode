const pg = require('pg')

const config = require('../config/config')

const pool = new pg.Pool(config.postgres.poolSettings)

const cadAdmin = async (nome, email, senha, cpf) => {
    const client = await pool.connect()
    try{
        const res = await client.query(`INSERT INTO usuario (cpf, nome, email, senha, usradm) VALUES('${cpf}', '${nome}', '${email}', '${senha}', 't')`)
        return null
    } finally{
        client.release()
    }
}

module.exports = {
    cadAdmin
}