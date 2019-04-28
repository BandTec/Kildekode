/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mycompany.kildekode;

import javax.swing.JOptionPane;
import oshi.hardware.GlobalMemory;
import oshi.json.software.os.OSProcess;

/**
 *
 * @author lucas
 */
public class Alerta {
      Processos proc;
      Memoria mem;
      Processador processador;
      Disco di;

    public Alerta(Processos proc, Memoria mem, Processador processador, Disco di) {
        this.proc = proc;
        this.mem = mem;
        this.processador = processador;
        this.di = di;
    }
      
    Thread alertaProcessos = new Thread(){

          @Override
          public void run() {
              if(proc.getQuantidadeProcessos() > 50){
                  System.out.println("");
                  JOptionPane.showMessageDialog(null, "Processos acima do permitido");
              }
          }
    };
    
    Thread alertaMemoria = new Thread(){

          @Override
          public void run() {
              if(mem.getMemoriaLivre()> 70){
                  System.out.println("");
                  JOptionPane.showMessageDialog(null, "Muita memoria sendo usada");
              }
          }
    };
    
    Thread alertaProcessador = new Thread(){

          @Override
          public void run() {
              if(processador.getCpuLoad() > 65){
                  System.out.println("");
                  JOptionPane.showMessageDialog(null, "Uso da Cpu Acima Do Permitido");
              }
          }
    };
    
    /*Thread alertaDisco = new Thread(){

          @Override
          public void run() {
              if(proc.getQuantidadeProcessos() > 50){
                  System.out.println("");
                  JOptionPane.showMessageDialog(null, "Processos acima do permitido");
              }
          }
    };*/
    
    public void iniciarAlertas(){
        alertaMemoria.start();
        alertaProcessador.start();
        alertaProcessos.start();
    }
}
