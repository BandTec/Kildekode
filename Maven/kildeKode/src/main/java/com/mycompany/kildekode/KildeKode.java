package com.mycompany.kildekode;


import java.awt.Component;
import oshi.hardware.HardwareAbstractionLayer;

/**

/**
 *
 * @author lucas
 */
public class KildeKode {//implements VirtualMemory
                        

    private static Component JScrollPane;

    public static void main(String[] args) {
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
        
    }
    
}