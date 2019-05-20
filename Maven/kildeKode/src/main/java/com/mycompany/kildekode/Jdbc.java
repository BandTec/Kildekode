package com.mycompany.kildekode;

import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.Map;
import org.apache.commons.dbcp2.BasicDataSource;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;

public class Jdbc {

    private BasicDataSource dataSource = new BasicDataSource();
    private Date data = new Date();
    
    public void inserirDados(double cpu, double memoria, String processos, double disco, int totem) throws IOException{
        
        new ConsoleLog("Conectando no Banco de Dados");
        
        dataSource.setDriverClassName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
        dataSource.setUrl("jdbc:sqlserver://kildekodesql.database.windows.net:1433;database=kildekodeDb;encrypt=true;trustServerCertificate=false;hostNameInCertificate=*.database.windows.net;loginTimeout=30");
        dataSource.setUsername("whoami");
        dataSource.setPassword("P@55w.rd");
        
        JdbcTemplate jdbTemplate = new JdbcTemplate(dataSource);
        
        
        
        List<Totem> totens = jdbTemplate.query("select * from totem where idTotem = ?", new BeanPropertyRowMapper<Totem>(Totem.class),totem);
        
        new ConsoleLog("inserindo dados na tabela");
        
        jdbTemplate.update("insert into registros (idRegistros,disco, processos, ram, conCpu, idTotem, idEndereco) values (?,?,?,?,?,?,?)",0,disco, processos, memoria, cpu, totem, totens.get(0).getEndereco());
        
        new ConsoleLog("Sucesso...");
    }
    
    public void buscarUsuarios(){
        
        dataSource.setDriverClassName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
        dataSource.setUrl("jdbc:sqlserver://kildekodesql.database.windows.net:1433;database=kildekodeDb;encrypt=true;trustServerCertificate=false;hostNameInCertificate=*.database.windows.net;loginTimeout=30");
        dataSource.setUsername("whoami");
        dataSource.setPassword("P@55w.rd");

        JdbcTemplate jdbTemplate = new JdbcTemplate(dataSource);

        List<Map<String, Object>> lista = jdbTemplate.queryForList("select * from usuario");
//        List<usuario> lista2 = jdbTemplate.query("select * from usuario",
//                new BeanPropertyRowMapper<usuario>(usuario.class));

        for (Map linha : lista) {
            System.out.println(linha);
        }

    }
}
