/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mycompany.kildekode;

import java.util.ArrayList;
import java.util.List;
import oshi.hardware.HWDiskStore;
import oshi.hardware.HWPartition;
import oshi.hardware.HardwareAbstractionLayer;
import oshi.software.os.OSFileStore;
import oshi.util.FormatUtil;

/**
 *
 * @author lucas
 */
public class Disco {
    HWDiskStore[] discos;
    oshi.SystemInfo sis;
    
    public Disco(oshi.SystemInfo sistema){
        sis = sistema;
        discos = sis.getHardware().getDiskStores();
    }
    
    public void getDiscos(){
        for (HWDiskStore disk : discos) {
            boolean readwrite = disk.getReads() > 0 || disk.getWrites() > 0;
            System.out.format(" %s: (model: %s - S/N: %s) size: %s, reads: %s (%s), writes: %s (%s), xfer: %s ms%n",
                    disk.getName(), disk.getModel(), disk.getSerial(),
                    disk.getSize() > 0 ? FormatUtil.formatBytesDecimal(disk.getSize()) : "?",
                    readwrite ? disk.getReads() : "?", readwrite ? FormatUtil.formatBytes(disk.getReadBytes()) : "?",
                    readwrite ? disk.getWrites() : "?", readwrite ? FormatUtil.formatBytes(disk.getWriteBytes()) : "?",
                    readwrite ? disk.getTransferTime() : "?");
            HWPartition[] partitions = disk.getPartitions();
            if (partitions == null) {
                // TODO Remove when all OS's implemented
                continue;
            }
            for (HWPartition part : partitions) {
                System.out.format(" |-- %s: %s (%s) Maj:Min=%d:%d, size: %s%s%n", part.getIdentification(),
                        part.getName(), part.getType(), part.getMajor(), part.getMinor(),
                        FormatUtil.formatBytesDecimal(part.getSize()),
                        part.getMountPoint().isEmpty() ? "" : " @ " + part.getMountPoint());
            }
        }
    }
    
    public double getTamanhoDisco(){
        List<Long> tamanhos = new ArrayList<>();
        for(HWDiskStore store: discos){
            tamanhos.add(store.getSize());
            
        }
        
        double tamanho = tamanhos.get(0) / 1000000000;
        return tamanho;
    }
    
    public double getDiscoLivre(){
        OSFileStore[] volume = sis.getOperatingSystem().getFileSystem().getFileStores();
        double divisao = (double)volume[0].getUsableSpace() / (double)volume[0].getTotalSpace();
        return (divisao * 100);
    }
    
    public double getDiscoUsado(){
        return 100 - getDiscoLivre();
    }
}
