package com.example.academiadesl;

import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Node;
import javafx.scene.Scene;
import javafx.scene.control.Alert;
import javafx.scene.control.TextField;
import javafx.stage.Stage;

import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;

public class UsuarioController {
    @FXML
    private TextField txtNome;

    @FXML
    private TextField txtEmail;

    @FXML
    private TextField txtSenha;

    @FXML
    protected void onSalvarButtonClick(ActionEvent event) throws Exception {


        URL url = new URL("http://localhost:8080/usuario/adm");

        HttpURLConnection conn =(HttpURLConnection) url.openConnection();
        conn.setRequestMethod("POST");
        conn.setRequestProperty("Content-type","application/json");

        conn.setDoOutput(true);


        String json= "{\n" +
                "  \"name\": \""+txtNome.getText()+"\",\n" +
                "  \"email\": \""+txtEmail+"\",\n" +
                "  \"senha\": \""+txtSenha+"\",\n" +
                "}";


        try(OutputStream os = conn.getOutputStream()){
            os.write(json.getBytes());
        }

        var code = conn.getResponseCode();
        if (code == 200){


            showMenssage("Sucesso ao salvar",Alert.AlertType.INFORMATION);

            FXMLLoader loader = new FXMLLoader(getClass().getResource("menu-view.fxml"));
            Scene scene = new Scene(loader.load());

            Stage stage = (Stage) ((Node)event.getSource()).getScene().getWindow();
            stage.setScene(scene);



        }else {
            showMenssage("Usuario e senha invalida",Alert.AlertType.INFORMATION);



        }
        conn.disconnect();





    }
    @FXML
    protected void onVoltarButtonClick(ActionEvent event) throws  Exception {


        FXMLLoader loader = new FXMLLoader(getClass().getResource("menu-view.fxml"));
        Scene scene = new Scene(loader.load());

        Stage stage = (Stage) ((Node)event.getSource()).getScene().getWindow();
        stage.setScene(scene);




    }

    private void showMenssage(String menssagem, Alert.AlertType tipo){

        Alert alert = new Alert(tipo);
        alert.setTitle("login");
        alert.setHeaderText(null);
        alert.setContentText(menssagem);
        alert.showAndWait();
    }
}
