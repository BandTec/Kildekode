
package com.mycompany.kildekode;


import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import org.json.JSONObject;


/**
 *
 * @author Aluno
 */
public class Slack {
    private String url = "Coloque aqui sua URL do slack (webhook)";
    
    public void inserirMenssagem(JSONObject menssagem) throws Exception{
        
        new ConsoleLog("Iniciando envio de menssagem para o Slack");
        
        URL obj = new URL(this.url);
        
        HttpURLConnection con = (HttpURLConnection) obj.openConnection();
        
        con.setRequestMethod("POST");
        con.setDoOutput(true);
        
        DataOutputStream stream = new DataOutputStream(con.getOutputStream());
        stream.writeBytes(menssagem.toString());
        
        stream.flush();
        stream.close();
        
        int codigoResposta = con.getResponseCode();
        
        new ConsoleLog("Mandando 'POST' para a Url: " + this.url);
        new ConsoleLog("Parametros do POST: " + menssagem.toString());
        new ConsoleLog("Código de Resposta: " + codigoResposta);
        
        BufferedReader leitor = new BufferedReader(new InputStreamReader(con.getInputStream()));
        
        String linha;
        
        StringBuffer resposta = new StringBuffer();
        
        while((linha = leitor.readLine()) != null){
            resposta.append(linha);
        }
        
        leitor.close();
        
        new ConsoleLog("Sucesso...");
    }
}
