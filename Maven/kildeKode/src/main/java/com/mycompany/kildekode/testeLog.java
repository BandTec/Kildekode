/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mycompany.kildekode;
import java.io.IOException;
import java.util.logging.Handler;
import java.util.logging.FileHandler;
import java.util.logging.Logger;
import java.util.logging.Level;
import java.util.logging.SimpleFormatter;
/**
 *
 * @author Aluno
 */
public class testeLog {
    
    private static final Logger LOGGER = Logger.getLogger(testeLog.class.getSimpleName());
    
    
    
    public static void main(String[] args) throws IOException {
        Handler fileHandler = null;
        fileHandler = new FileHandler("./testeLog.txt",true);
        SimpleFormatter simple = new SimpleFormatter();
        fileHandler.setFormatter(simple);
        fileHandler.setEncoding("utf-8");
        
        
        LOGGER.setUseParentHandlers(false);
        
        LOGGER.addHandler(fileHandler);
        
        fileHandler.setLevel(Level.ALL);
        LOGGER.setLevel(Level.ALL);
        
        LOGGER.config("Configuracao concluida");
        
        LOGGER.info("Iniciando: " + LOGGER.getName());
        
        LOGGER.warning("Ta dando ruim");
        
        LOGGER.warning("Agora ta dando bom");
    }
}
