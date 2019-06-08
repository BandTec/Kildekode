const router = require('express').Router();
const User = require('../model/User')
const pg = require('pg')
const dayjs = require('dayjs')
const config = require('../config/config')
const pool = new pg.Pool(config.postgres.poolSettings)
const cadEndereco = require('../model/cadEndereco')
const cadMaquina = require('../model/cadMaquina')
const cadAdm = require('../model/cadAdmin')

router.get('/getchart', async (req, res) => {
    const client = await pool.connect()
    let limite_linhas = 10;
    try {
        
        let ram = await client.query(
            `select * from get_values('ram',${limite_linhas});`
        );
        ram = ram.rows
        let ram_array_data  = []
        let ram_array_label  = []
        ram.map((item,index)=>{
            ram_array_data.push(item.value)
            ram_array_label.push(dayjs(item.data_hora).format('HH:mm:ss'))
        })
        
        let cpu = await client.query(
            `select * from get_values('cpu',${limite_linhas});`
        );
        cpu = cpu.rows
        let cpu_array_data  = []
        let cpu_array_label  = []
        cpu.map((item,index)=>{
            cpu_array_data.push(item.value)
            cpu_array_label.push(dayjs(item.data_hora).format('HH:mm:ss'))
        })

        let processos = await client.query(
            `select * from get_values('processos',${limite_linhas});`
        );
        processos = processos.rows
        let processos_array_data  = []
        let processos_array_label  = []
        processos.map((item,index)=>{
            processos_array_data.push(item.value)
            processos_array_label.push(dayjs(item.data_hora).format('HH:mm:ss'))
        })

        let disco = await client.query(
            `select * from get_values('disco',${limite_linhas});`
        );
        disco = disco.rows
        let disco_array_data  = []
        let disco_array_label  = []
        disco.map((item,index)=>{
            disco_array_data.push(item.value)
            disco_array_label.push(dayjs(item.data_hora).format('HH:mm:ss'))
        })

        res.json({
            ram: {
                data: ram_array_data,
                label: ram_array_label,
            },
            cpu: {
                data: cpu_array_data,
                label: cpu_array_label,
            },
            processos: {
                data: processos_array_data,
                label: processos_array_label,
            },
            disco: {
                data: disco_array_data,
                label: disco_array_label,
            }
        });
    } finally {
      client.release()
    }
    
    
});


module.exports = router