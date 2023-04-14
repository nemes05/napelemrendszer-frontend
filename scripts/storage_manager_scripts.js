import { Part } from "./data_model.js";
import * as functions from "./functions.js";

var http = new XMLHttpRequest();

export function addNewPartScript() {
    var part = new Part();
    part.partName = $("#partName").val();
    part.price = $("#price").val();
    part.partPerBox = $("#partPerBox").val();

    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 201) {
            document.getElementById("newPartID").reset();
            functions.errorAlert("Siker!", "Az új alkatrész hozzáadva");
        }

        //Handles permission
        else if (this.readyState == 4 && this.status == 403) {
            functions.errorAlert("Error", "Nincs jogosultsága ehhez a művelethez!");
        }

        //Handles timeout
        else if (this.readyState == 4 && this.status == 401) {
            timeOut();
        }

        //Handles database error
        else if (this.readyState == 4 && this.status == 400) {
            functions.errorAlert("Error", "Nem tudtunk csatlakozni az adatbázishoz!");
        }

        //Handles general error
        else if (this.readyState == 4 && !responeses.includes(this.status)) {
            functions.errorAlert("Error", "Valami hiba történt, kérjük próbálja újra!");
        }
    };

    http.open("POST", "http://localhost:3000/addPart");
    http.setRequestHeader("Content-Type", "application/json");
    http.setRequestHeader("Authorization", document.cookie.split("=")[1]);
    http.send(JSON.stringify(part));
}

export function setNewPrice() {
    var part = new Part();
    part.price = $("#partNewPrice").val();

    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("previousPrice").innerHTML = part.price;
            $("#partNewPrice").val("");
            functions.errorAlert("Siker!", "Az ár sikeresen módosítva!");
        }

        //Handles permission
        else if (this.readyState == 4 && this.status == 403) {
            functions.errorAlert("Error", "Nincs jogosultsága ehhez a művelethez!");
        }

        //Handles timeout
        else if (this.readyState == 4 && this.status == 401) {
            timeOut();
        }

        //Handles database error
        else if (this.readyState == 4 && this.status == 400) {
            functions.errorAlert("Error", "Nem tudtunk csatlakozni az adatbázishoz!");
        }

        //Handles general error
        else if (this.readyState == 4 && !responeses.includes(this.status)) {
            functions.errorAlert("Error", "Valami hiba történt, kérjük próbálja újra!");
        }
    };
    http.open("PATCH", "http://localhost:3000/modifyPartPrice/" + $("#partSelect option:selected").attr("id"));
    http.setRequestHeader("Content-Type", "application/json");
    http.setRequestHeader("Authorization", document.cookie.split("=")[1]);
    http.send(JSON.stringify(part));
}
