package com.mycompany.kildekode;

import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.Map;
import org.apache.commons.dbcp2.BasicDataSource;
import org.postgresql.util.PSQLException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;

public class Jdbc {

    private BasicDataSource dataSource = new BasicDataSource();
    private Date data = new Date();
    
    public void inserirDados(double cpu, double memoria, int processos, double disco, int totem) throws IOException{
        
        new ConsoleLog("Conectando no Banco de Dados");
        
        dataSource.setDriverClassName("org.postgresql.Driver");
        dataSource.setUrl("jdbc:postgresql://kildekode.postgres.database.azure.com:5432/kildekode?user=whoami@kildekode&password=P@55w.rd&sslmode=require");
        dataSource.setUsername("whoami@kildekode");
        dataSource.setPassword("P@55w.rd");
        
        JdbcTemplate jdbTemplate = new JdbcTemplate(dataSource);
        
        
        new ConsoleLog("inserindo dados na tabela");
        jdbTemplate.update("insert into public.registros (idregistros,disco,processos,ram,cpumaquina,idtotem,idend,data_hora) values (default,?,?,?,?,?,1,localtimestamp)",disco, processos, memoria, cpu, totem);
        
        new ConsoleLog("Sucesso...");
    }
    
    public void buscarUsuarios() throws IOException{
        
        try {
            new ConsoleLog("Conectando no Banco de Dados");
        
            dataSource.setDriverClassName("org.postgresql.Driver");
            dataSource.setUrl("jdbc:postgresql://kildekode.postgres.database.azure.com:5432/kildekode?user=whoami@kildekode&password=P@55w.rd&sslmode=require");
            dataSource.setUsername("whoami@kildekode");
            dataSource.setPassword("P@55w.rd");
        
        } catch (Exception e) {
            new ConsoleLog("Erro: " + e);
        }
        
        
        JdbcTemplate jdbTemplate = new JdbcTemplate(dataSource);

        List<Map<String, Object>> lista = jdbTemplate.queryForList("select * from usuario");
//        List<usuario> lista2 = jdbTemplate.query("select * from usuario",
//                new BeanPropertyRowMapper<usuario>(usuario.class));
        new ConsoleLog("Select feito com sucesso");
        for (Map linha : lista) {
            System.out.println("Linha: " + linha);
        }

    }
}
