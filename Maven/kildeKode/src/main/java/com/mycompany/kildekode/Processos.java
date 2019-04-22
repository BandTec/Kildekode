package com.mycompany.kildekode;
import java.util.List;
import javax.swing.JOptionPane;
import oshi.json.software.os.OSProcess;
import oshi.hardware.CentralProcessor;
import oshi.hardware.HardwareAbstractionLayer;
import oshi.json.software.os.impl.OperatingSystemImpl;
import oshi.software.os.OperatingSystem;

/**
 *
 * @author Aluno
 */
public class Processos {
    public static void main(String[] args) {
        oshi.SystemInfo si = new oshi.SystemInfo();
        OperatingSystemImpl os = new OperatingSystemImpl(si.getOperatingSystem());
        
        OSProcess[] processos = os.getProcesses(0, OperatingSystem.ProcessSort.CPU);
        
        for(int i = 0; i < processos.length; i++){
            System.out.println(processos[i].getName());
        }
        
        
        
    
    
    }
    
}
