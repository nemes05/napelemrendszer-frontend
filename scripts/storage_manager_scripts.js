import { Part } from "./data_model.js";

var http = new XMLHttpRequest();

export function addNewPartScript() {
    var part = new Part();
    part.partName = $("#partName").val();
    part.price = $("#price").val();
    part.partPerBox = $("#partPerBox").val();

    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 201) {
            document.getElementById("newPartID").reset();
            alert("Az új alkatrész hozzáadva");
        }
        if (this.readyState == 4 && this.status == 400) {
            alert("Valmi hiba történt kérjük próbálja újra!");
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
            alert("Az ár sikeresen módosítva!");
        } else if (this.readyState == 4 && this.status == 400) {
            alert("Az ár rögzítése nem sikerült!");
        }
    };
    http.open("PATCH", "http://localhost:3000/modifyPartPrice/" + $("#partSelect option:selected").attr("id"));
    http.setRequestHeader("Content-Type", "application/json");
    http.setRequestHeader("Authorization", document.cookie.split("=")[1]);
    http.send(JSON.stringify(part));
}
