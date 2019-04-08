
package com.mycompany.kildekode;

import javax.swing.JOptionPane;
 
import oshi.hardware.HardwareAbstractionLayer; 
import oshi.hardware.ComputerSystem;
/**
 *
 * @author lucas
 */
public class KildeKode {
    
    public static void main(String[] args) {
        oshi.SystemInfo si = new oshi.SystemInfo(); 
        HardwareAbstractionLayer hal = si.getHardware();
        hal.getComputerSystem();
        System.out.println("teste: "+hal.getComputerSystem());
        JOptionPane.showMessageDialog(null,"proc: "+hal.getDiskStores());
        ComputerSystem os = hal.getComputerSystem();
        oshi.hardware.Baseboard bs = os.getBaseboard();
        JOptionPane.showMessageDialog(null,"Serial: " + bs.getSerialNumber());
    }
    
}
