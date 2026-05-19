module com.example.academiadesl {
    requires javafx.controls;
    requires javafx.fxml;


    opens com.example.academiadesl to javafx.fxml;
    exports com.example.academiadesl;
}