package com.mycompany.kildekode;


import java.awt.Component;
import java.io.IOException;
import java.util.logging.Level;
import java.util.logging.Logger;
import oshi.hardware.HardwareAbstractionLayer;

/**

/**
 *
 * @author lucas
 */
public class KildeKode {//implements VirtualMemory
                        

    public static void main(String[] args) throws IOException {
        //oshi
        oshi.SystemInfo si = new oshi.SystemInfo();
        HardwareAbstractionLayer hal = si.getHardware();
        double cpuTicks;
        hal.getComputerSystem();
        
        
        Processos proc = new Processos(si);
        Memoria mem = new Memoria(hal);
        Processador processador = new Processador(hal);
        Disco di = new Disco(hal);
        
        Alerta alerta = new Alerta(proc, mem, processador, di);
        
        alerta.iniciarAlertas();
        
        System.out.println("Quantidade de Processos: " + proc.getQuantidadeProcessos());
        proc.getProcessos(10);
       
        mem.getMemoria();
        String porcentagemLivre = String.format("%.2f", mem.getMemoriaLivre());
        String porcentagemUsada = String.format("%.2f", mem.getMemoriaUsada());
        
        System.out.println("Porcentagem de memória Livre " + porcentagemLivre + "%");
        System.out.println("Porcentagem de memória Usada " + porcentagemUsada + "%");
        
         
        processador.getProcessador();
        
        di.getDiscos();
        
        Jdbc j = new Jdbc();
        
        j.buscarUsuarios();
        
        while(true){
            try {
                j.inserirDados(processador.getCpuLoad(), mem.getMemoriaUsada(), proc.getQuantidadeProcessos(), di.getTamanhoDisco(),1);
                Thread.sleep(10000);
            } catch (InterruptedException ex) {
                new ConsoleLog("Erro: " + ex);
            }
        }
        
    }
    
}