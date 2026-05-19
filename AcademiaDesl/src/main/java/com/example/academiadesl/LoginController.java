package com.example.academiadesl;

import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Node;
import javafx.scene.Scene;
import javafx.scene.control.Alert;
import javafx.scene.control.Label;
import javafx.scene.control.TextField;
import javafx.stage.Stage;

import java.io.IOException;

public class LoginController {
    @FXML
    private TextField txtLogin;

    @FXML
    private TextField txtPassoword;

    @FXML
    protected void onLoginButtonClick(ActionEvent event) throws IOException {

        if (txtLogin.getText().equals("adimin")
                && txtPassoword.getText().equals("1234")){

            showMenssage("Login efetuado com sucesso",Alert.AlertType.INFORMATION);

            FXMLLoader loader = new FXMLLoader(getClass().getResource("menu-view.fxml"));
            Scene scene = new Scene(loader.load());

            Stage stage = (Stage) ((Node)event.getSource()).getScene().getWindow();
            stage.setScene(scene);


        }else {
            showMenssage("email ou senha invalido", Alert.AlertType.ERROR);

        }

    }

    private void showMenssage(String menssagem, Alert.AlertType tipo){

        Alert alert = new Alert(tipo);
        alert.setTitle("login");
        alert.setHeaderText(null);
        alert.setContentText(menssagem);
        alert.showAndWait();
    }
}
