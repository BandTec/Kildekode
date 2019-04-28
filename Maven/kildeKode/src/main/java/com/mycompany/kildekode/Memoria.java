/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mycompany.kildekode;

import oshi.hardware.GlobalMemory;
import oshi.hardware.HardwareAbstractionLayer;
import oshi.util.FormatUtil;

/**
 *
 * @author lucas
 */
public class Memoria {
     GlobalMemory memoria;
     
     public Memoria(HardwareAbstractionLayer h){
         memoria = h.getMemory();
     }
     
     public void getMemoria(){
         
         System.out.println("Memoria Disponivel: " + FormatUtil.formatBytes(memoria.getAvailable()) + " Memoria Total: "
            + FormatUtil.formatBytes(memoria.getTotal()));
     }
}
