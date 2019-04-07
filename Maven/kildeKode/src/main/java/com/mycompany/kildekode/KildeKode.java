
package com.mycompany.kildekode;

import java.io.File; 
import java.io.IOException; 
import java.nio.file.FileStore; 
import java.nio.file.Files; 
import java.util.Arrays; 
 
 
import org.slf4j.Logger; 
import org.slf4j.LoggerFactory; 
 
import com.sun.jna.Platform; 
import javax.swing.JOptionPane;
 
import oshi.hardware.HardwareAbstractionLayer; 
import oshi.hardware.GlobalMemory; 
import oshi.hardware.PowerSource; 
import oshi.hardware.CentralProcessor; 
import oshi.hardware.ComputerSystem;
import oshi.software.os.OSFileStore; 
import oshi.software.os.OperatingSystem; 
import oshi.software.os.OperatingSystemVersion; 
import oshi.util.FormatUtil; 
import oshi.util.Util; 
/**
 *
 * @author lucas
 */
public class KildeKode {
    
    public void getProcessador(){
       
    }
    
    public static void main(String[] args) {
        oshi.SystemInfo si = new oshi.SystemInfo(); 
        HardwareAbstractionLayer hal = si.getHardware();
        ComputerSystem os = hal.getComputerSystem();
        oshi.hardware.Baseboard bs = os.getBaseboard();
        JOptionPane.showMessageDialog(null,bs.getSerialNumber());
    }
}
