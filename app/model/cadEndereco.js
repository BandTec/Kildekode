const pg = require('pg')

const config = require('../config/config')

const pool = new pg.Pool(config.postgres.poolSettings)

const cadEndereco = async (cep, bairro, rua, cidade, numero, apelido) => {
    const client = await pool.connect()
    try{
        const res = await client.query(`INSERT INTO endereco (apelido, nmcidade, nmrua, cep, numero, bairro) VALUES('${apelido}', '${cidade}', '${rua}', '${cep}', '${numero}', '${bairro}')`)
        return null
    } finally{
        client.release()
    }
}

module.exports = {
    cadEndereco
}