package com.mycompany.kildekode;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class ConsoleLog {

    File arquivo;
    FileReader fileReader;
    BufferedReader bufferedReader;
    FileWriter fileWriter;
    BufferedWriter bufferedWriter;

    public ConsoleLog(String erros) throws IOException {
        escreverLog(erros);
    }

    private void escreverLog(String erros) throws IOException {
        try {
            DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
            Date date = new Date();
            
            arquivo = new File("Log.txt");
            fileReader = new FileReader(arquivo);
            bufferedReader = new BufferedReader(fileReader);
            List<String> texto = new ArrayList();
            while (bufferedReader.ready()) {
                texto.add(bufferedReader.readLine());
            }
            fileWriter = new FileWriter(arquivo);
            bufferedWriter = new BufferedWriter(fileWriter);
            for (int i = 0; i < texto.size(); i++) {
                bufferedWriter.write(texto.get(i).toString());
                bufferedWriter.newLine();
            }

            bufferedWriter.write(dateFormat.format(date) + " | " + erros);
            bufferedReader.close();
            bufferedWriter.close();
        } catch (FileNotFoundException ex) {

            try {
                arquivo.createNewFile();
                escreverLog(erros);
            } catch (IOException ex1) {
                System.exit(0);

            }
        }

    }
}
