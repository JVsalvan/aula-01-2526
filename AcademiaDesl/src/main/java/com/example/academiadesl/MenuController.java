package com.example.academiadesl;

import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Node;
import javafx.scene.Scene;
import javafx.scene.control.Alert;
import javafx.scene.control.TextField;
import javafx.stage.Stage;

public class MenuController {

    @FXML
    private TextField txtCadastrar;

    @FXML
    protected void onCadastrarButtonClick(ActionEvent event) throws  Exception {


        FXMLLoader loader = new FXMLLoader(getClass().getResource("usuario-view.fxml"));
        Scene scene = new Scene(loader.load());

        Stage stage = (Stage) ((Node)event.getSource()).getScene().getWindow();
        stage.setScene(scene);


    }
    @FXML
    protected void onVoltarButtonClick(ActionEvent event)throws  Exception {


        FXMLLoader loader = new FXMLLoader(getClass().getResource("login-view.fxml"));
        Scene scene = new Scene(loader.load());

        Stage stage = (Stage) ((Node)event.getSource()).getScene().getWindow();
        stage.setScene(scene);



    }
}
