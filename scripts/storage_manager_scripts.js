import { Box, Part } from "./data_model.js";
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
            functions.timeOut();
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
            functions.timeOut();
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

export function listMissingParts() {
    let parts = [];
    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let response = JSON.parse(this.response);
            let headTitles = ["Alkatrész neve", "Ár"];
            let thead = document.createElement("thead");
            let tbody = document.createElement("tbody");
            let table = document.createElement("table");
            tbody.classList.add("table-group-divider");
            table.classList.add("table", "table-striped");

            headTitles.forEach((title) => {
                let th = document.createElement("th");
                th.innerHTML = title;
                thead.appendChild(th);
            });

            response.forEach((element) => {
                let part = new Part();
                part.partID = element.partID;
                part.partName = element.partName;
                part.price = element.price;
                parts.push(part);
            });

            parts.forEach((element) => {
                let tr = document.createElement("tr");
                tr.id = element.partID;
                Object.values(element).forEach((details, index) => {
                    if (details != undefined && index != 0) {
                        let td = document.createElement("td");
                        td.innerHTML = details;
                        tr.appendChild(td);
                    }
                });
                tbody.appendChild(tr);
            });

            table.appendChild(thead);
            table.appendChild(tbody);
            $("#storageTableID").html(table);
            $("#myFrame").attr("hidden", "hidden");
            $("#storageTableID").removeAttr("hidden");
        }

        //Handles permission
        else if (this.readyState == 4 && this.status == 403) {
            functions.errorAlert("Error", "Nincs jogosultsága ehhez a művelethez!");
        }

        //Handles timeout
        else if (this.readyState == 4 && this.status == 401) {
            functions.timeOut();
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

    http.open("GET", "http://localhost:3000/getMissingParts");
    http.setRequestHeader("Content-Type", "application/json");
    http.setRequestHeader("Authorization", document.cookie.split("=")[1]);
    http.send();
}

export function getDemandedParts() {
    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let parts = [];
            let response = JSON.parse(this.response);
            let headTitles = ["Alkatrész neve", "Hiányzó darabszám"];
            let thead = document.createElement("thead");
            let tbody = document.createElement("tbody");
            let table = document.createElement("table");
            tbody.classList.add("table-group-divider");
            table.classList.add("table", "table-striped");

            headTitles.forEach((title) => {
                let th = document.createElement("th");
                th.innerHTML = title;
                thead.appendChild(th);
            });

            response.forEach((element) => {
                let part = new Part();
                part.partID = element.partID;
                part.partName = element.partName;
                part.missingQuantity = element.missingQuantity;
                parts.push(part);
            });

            parts.forEach((element) => {
                let tr = document.createElement("tr");
                tr.id = element.partID;
                Object.values(element).forEach((details, index) => {
                    if (details != undefined && index != 0) {
                        let td = document.createElement("td");
                        td.innerHTML = details;
                        tr.appendChild(td);
                    }
                });
                tbody.appendChild(tr);
            });

            table.appendChild(thead);
            table.appendChild(tbody);
            $("#storageTableID").html(table);
            $("#myFrame").attr("hidden", "hidden");
            $("#storageTableID").removeAttr("hidden");
        }

        //Handles permission
        else if (this.readyState == 4 && this.status == 403) {
            functions.errorAlert("Error", "Nincs jogosultsága ehhez a művelethez!");
        }

        //Handles timeout
        else if (this.readyState == 4 && this.status == 401) {
            functions.timeOut();
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

    http.open("GET", "http://localhost:3000/getDemandedParts");
    http.setRequestHeader("Content-Type", "application/json");
    http.setRequestHeader("Authorization", document.cookie.split("=")[1]);
    http.send();
}

export function incomingPartsScript() {
    let part = new Part();
    part.partID = $("#partSelectForIncoming :selected").attr("id");
    part.pcs = $("#numberOfPartID").val();

    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            $("#numberOfPartID").val("");
            if (this.response != "OK") setBox(this.response);
        }

        //Handles permission
        else if (this.readyState == 4 && this.status == 403) {
            functions.errorAlert("Error", "Nincs jogosultsága ehhez a művelethez!");
        }

        //Handles timeout
        else if (this.readyState == 4 && this.status == 401) {
            functions.timeOut();
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

    http.open("PATCH", "http://localhost:3000/incomingParts");
    http.setRequestHeader("Content-Type", "application/json");
    http.setRequestHeader("Authorization", document.cookie.split("=")[1]);
    http.send(JSON.stringify(part));
}

export function setBox(response) {
    console.log("AAAA");
    console.log(window.parent.document.getElementById("myFrame"));
    window.parent.document.getElementById("myFrame").src = "storageSelect.html";
    console.log("BBBBB");
    console.log(window.parent);
    response = JSON.parse(response);
    let boxArray = [];
    var box = new Box();
    response.emptyBoxes.forEach((boxResponse) => {
        box.row = boxResponse.row;
        box.column = boxResponse.column;
        box.level = boxResponse.level;
        box.partID = boxResponse.partID;
        boxArray.push(box);
    });
    //let json = '{"partID": "4","pcs": "4","needsToBeReservedInSelectedBoxes": "4","boxes": [{"row": "2","column": "1","level": "2"},{"row": "2","column": "1","level": "3"}]}';
    var table = window.document;
    // console.log(window.parent.document.getElementById("myFrame"));
    /* boxArray.forEach((box) => {
        switch(box.row){
            case 1:
                if(box.partID==null){

                }
            case 2:

            case 3:

        };


    });*/

    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            functions.errorAlert("Siker!", "Alkatrész sikeresen felvéve.");
        }

        //Handles permission
        else if (this.readyState == 4 && this.status == 403) {
            functions.errorAlert("Error", "Nincs jogosultsága ehhez a művelethez!");
        }

        //Handles timeout
        else if (this.readyState == 4 && this.status == 401) {
            functions.timeOut();
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

    http.open("PUT", "http://localhost:3000/incomingParts");
    http.setRequestHeader("Content-Type", "application/json");
    http.setRequestHeader("Authorization", document.cookie.split("=")[1]);
    http.send();
}
