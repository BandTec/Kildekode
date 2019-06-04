const pg = require('pg')

const config = require('../config/config')

const pool = new pg.Pool(config.postgres.poolSettings)

const cadMaquina = async (nmtotem, apelido) => {
    const client = await pool.connect()
    try{
        const res = await client.query(`insert into totem(nmtotem, idendereco) values('${nmtotem}', (select idendereco from endereco where apelido = '${apelido}'))`)
        return null
    } finally{
        client.release()
    }
}

module.exports = {
    cadMaquina
}