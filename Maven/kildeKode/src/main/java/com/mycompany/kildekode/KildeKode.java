package com.mycompany.kildekode;

import java.io.IOException;
import org.json.JSONObject;
import oshi.hardware.HardwareAbstractionLayer;

/**
 *
 * /**
 *
 * @author lucas
 */
public class KildeKode {

    public static void main(String[] args) throws IOException, Exception {
        //oshi
        oshi.SystemInfo si = new oshi.SystemInfo();
        HardwareAbstractionLayer hal = si.getHardware();
        JSONObject jason = new JSONObject();
        hal.getComputerSystem();
        Slack s = new Slack();

        Processos proc = new Processos(si);
        Memoria mem = new Memoria(hal);
        Processador processador = new Processador(hal);
        Disco di = new Disco(si);

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
        System.out.println(di.getDiscoLivre());
        System.out.println(di.getDiscoUsado());
        Jdbc j = new Jdbc();

        while (true) {
            try {
                //j.inserirDados(processador.getCpuLoad(), mem.getMemoriaUsada(), proc.getQuantidadeProcessos(), di.getTamanhoDisco(), 1);
                //jason.put("text", "Novos dados inseridos na tabela registro");
                //s.inserirMenssagem(jason);
                Thread.sleep(10000);
            } catch (InterruptedException ex) {
                new ConsoleLog("Erro: " + ex);
            }
        }

    }

}
