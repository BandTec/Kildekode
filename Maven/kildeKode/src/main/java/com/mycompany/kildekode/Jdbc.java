package com.mycompany.kildekode;

import java.util.List;
import java.util.Map;
import org.apache.commons.dbcp2.BasicDataSource;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;

public class Jdbc {

    public static void main(String[] args) {

        BasicDataSource dataSource = new BasicDataSource();
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
