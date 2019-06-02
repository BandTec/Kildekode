/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mycompany.kildekode;


import org.json.JSONObject;
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
    JSONObject jason;
    Slack slack;

    public Alerta(Processos proc, Memoria mem, Processador processador, Disco di) {
        this.proc = proc;
        this.mem = mem;
        this.processador = processador;
        this.di = di;
        jason = new JSONObject();
        slack = new Slack();
    }

    Thread alertaProcessos = new Thread() {

        @Override
        public void run() {
            while (true) {
                if (proc.getQuantidadeProcessos() > 200) {

                    try {
                        System.out.println("Processos acima do permitido");
                        jason.put("text", "Processos acima do permitido");
                        slack.inserirMenssagem(jason);
                        Thread.sleep(10000);
                    } catch (Exception ex) {
                        jason.put("text", ex.toString());
                        try {
                            slack.inserirMenssagem(jason);
                        } catch (Exception ex1) {

                        }
                    }
                }
            }
        }
    };

    Thread alertaMemoria = new Thread() {

        @Override
        public void run() {
            while (true) {
                if (mem.getMemoriaUsada() > 70) {

                    try {
                        System.out.println("Muita memoria sendo usada");
                        jason.put("text", "Muita memoria sendo usada");
                        slack.inserirMenssagem(jason);
                        Thread.sleep(10000);
                    } catch (Exception ex) {
                        jason.put("text", ex.toString());
                        try {
                            slack.inserirMenssagem(jason);
                        } catch (Exception ex1) {

                        }
                    }
                }
            }
        }
    };

    Thread alertaProcessador = new Thread() {

        @Override
        public void run() {
            while (true) {
                if (processador.getCpuLoad() > 75) {

                    try {
                        System.out.println("Uso da Cpu Acima Do Permitido");
                        jason.put("text", "Uso da Cpu Acima Do Permitido");
                        slack.inserirMenssagem(jason);
                        Thread.sleep(10000);
                    } catch (Exception ex) {
                        jason.put("text", ex.toString());
                        try {
                            slack.inserirMenssagem(jason);
                        } catch (Exception ex1) {
                        }
                    }
                }
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
    public void iniciarAlertas() {
        alertaMemoria.start();
        alertaProcessador.start();
        alertaProcessos.start();
    }
}
