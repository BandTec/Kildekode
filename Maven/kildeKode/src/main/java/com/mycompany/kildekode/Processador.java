/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mycompany.kildekode;

import oshi.hardware.CentralProcessor;
import oshi.hardware.HardwareAbstractionLayer;

/**
 *
 * @author lucas
 */
public class Processador {
    CentralProcessor processador;
    
    public Processador(HardwareAbstractionLayer h){
        processador = h.getProcessor();
    }
    
    public void getProcessador(){
        System.out.println(processador);
        System.out.println(" " + processador.getPhysicalPackageCount() + " physical CPU package(s)");
        System.out.println(" " + processador.getPhysicalProcessorCount() + " physical CPU core(s)");
        System.out.println(" " + processador.getLogicalProcessorCount() + " logical CPU(s)");

        System.out.println("Identifier: " + processador.getIdentifier());
        System.out.println("ProcessorID: " + processador.getProcessorID());
    }
}
