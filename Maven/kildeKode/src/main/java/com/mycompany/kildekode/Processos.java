package com.mycompany.kildekode;
import oshi.json.software.os.OSProcess;
import oshi.json.software.os.impl.OperatingSystemImpl;
import oshi.software.os.OperatingSystem;

/**
 *
 * @author Aluno
 */
public class Processos {
    
    OSProcess[] processos;
    OperatingSystemImpl sistemaOperacional;
    
    public Processos(oshi.SystemInfo sistema){
        this.sistemaOperacional = new OperatingSystemImpl(sistema.getOperatingSystem());
       
    }
    
    ///Pega todos processos
    public void getProcessos(){
        processos = sistemaOperacional.getProcesses(0, OperatingSystem.ProcessSort.CPU);
        
        for (OSProcess processo : processos) {
            System.out.println("Processo: " +processo.getName());
        }
    }
    
    ///Pega a quantidade de processos passada como parametro
    public void getProcessos(int qtdProcessos){
        processos = sistemaOperacional.getProcesses(qtdProcessos, OperatingSystem.ProcessSort.MEMORY);
        
        for (OSProcess processo : processos) {
            System.out.println("Processo: " + processo.getName());
        }
    }
    
    public int getQuantidadeProcessos(){
         processos = sistemaOperacional.getProcesses(0, OperatingSystem.ProcessSort.MEMORY);
         
         return processos.length;
    }
    
    
}
