
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
 
import oshi.hardware.HardwareAbstractionLayer; 
import oshi.hardware.ComputerSystem;
/**
 *
 * @author lucas
 */
public class KildeKode {

    private static Component JScrollPane;
    
    public static void main(String[] args) {
        //oshi
        oshi.SystemInfo si = new oshi.SystemInfo(); 
        HardwareAbstractionLayer hal = si.getHardware();
        hal.getComputerSystem();
        
        //JFrame
        JFrame Jframe = new JFrame();
        Jframe.setVisible(true);
        Jframe.setSize(800, 600);
        Jframe.setBackground(Color.blue);
        
        
        
        //JoprionPane
        JOptionPane joptionPane = new JOptionPane();
        Jframe.add(joptionPane);
        joptionPane.showMessageDialog(joptionPane,hal.getProcessor());
        
        //JTable
        JTable jtable = new JTable();
        Jframe.add(jtable);
        jtable.setVisible(true);
        jtable.setSize(400,300);
        jtable.setModel(new javax.swing.table.DefaultTableModel()); 
        jtable.setBackground(new java.awt.Color(14 ,98, 214));
        jtable.setFont(new java.awt.Font("Tahoma", 0, 14));
        jtable.setGridColor(new java.awt.Color(10,200,10));
        jtable.setModel (new javax.swing.table.DefaultTableModel(
 
        new Object [][]{
            {hal.getProcessor(), null, null},
            {null, null, null},
            {null, null, null}
        },
        new String []{
            "Código de Máquina", "Status", "Informações"
        }
        ){
           Class[] types = new Class []{
               java.lang.Integer.class, java.lang.Object.class, java.lang.Object.class
           };
           
           public Class getColumnClass(int columnIndex){
               return types [columnIndex];
           }
        }); 
        
        javax.swing.GroupLayout jPanelLayout = new javax.swing.GroupLayout(Jframe);
        Jframe.setLayout(jPanelLayout);
        jPanelLayout.setHorizontalGroup(
                jPanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                .addGroup(jPanelLayout.createSequentialGroup()
                .addGap(46,46,46)
                .addComponent(JScrollPane,javax.swing.GroupLayout.PREFERRED_SIZE,452, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addContainerGap(52,Short.MAX_VALUE))
        );
        
        
        System.out.println("teste: "+hal.getComputerSystem());
        //JOptionPane.showMessageDialog(null,"proc: "+hal.getDiskStores());
        ComputerSystem os = hal.getComputerSystem();
        oshi.hardware.Baseboard bs = os.getBaseboard();
        //JOptionPane.showMessageDialog(null,"Serial: " + bs.getSerialNumber());
    }
    
}
