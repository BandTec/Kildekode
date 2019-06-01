const pg = require('pg')

const config = require('../config/config')

const pool = new pg.Pool(config.postgres.poolSettings)

const selectRam = async () => {
    const client = await pool.connect()
    try{
        var limite_linhas = 10;

        client.query(`SELECT ram FROM registros limit ${limite_linhas}`).then(resultados => {
            return resultados.rows;
        }).catch(error => {
           return `Erro  de conexão ${error}`
        });
    } finally{
        client.release()
    }
}

module.exports = {
    selectRam
}