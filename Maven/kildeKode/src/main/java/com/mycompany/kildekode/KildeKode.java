package com.mycompany.kildekode;

import java.awt.Color;
import java.awt.Component;
import javafx.scene.layout.Background;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.JScrollPane;
import javax.swing.JTable;
import javax.swing.table.TableColumn;
import javax.swing.text.LayoutQueue;

import java.util.Arrays;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import oshi.hardware.Baseboard;
import oshi.hardware.CentralProcessor;
import oshi.hardware.CentralProcessor.TickType;
import oshi.hardware.ComputerSystem;
import oshi.hardware.Display;
import oshi.hardware.Firmware;
import oshi.hardware.GlobalMemory;
import oshi.hardware.HWDiskStore;
import oshi.hardware.HWPartition;
import oshi.hardware.HardwareAbstractionLayer;
import oshi.hardware.NetworkIF;
import oshi.hardware.PowerSource;
import oshi.hardware.Sensors;
import oshi.hardware.SoundCard;
import oshi.hardware.UsbDevice;
import oshi.software.os.FileSystem;
import oshi.software.os.NetworkParams;
import oshi.software.os.OSFileStore;
import oshi.software.os.OSProcess;
import oshi.software.os.OperatingSystem;
import oshi.software.os.OperatingSystem.ProcessSort;
import oshi.util.FormatUtil;
import oshi.util.Util;
import java.io.Serializable;
//import oshi.hardware.VirtualMemory;





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
        hal.getComputerSystem();
        
        Processos proc = new Processos(si);
        proc.getQuantidadeProcessos();
        proc.getProcessos(10);
        
        Memoria mem = new Memoria(hal);
        mem.getMemoria();
        
        Processador processador = new Processador(hal);
        processador.getProcessador();
        
        Disco di = new Disco(hal);
        di.getDiscos();

        

        
       
        
        
    }
    
}


