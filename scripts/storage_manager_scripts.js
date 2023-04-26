import { Box, Part, SelectedBoxes } from "./data_model.js";
import * as functions from "./functions.js";

var http = new XMLHttpRequest();
var boxesNeeded = 0;
var selectedBoxes = new SelectedBoxes();
var responeses = [200, 201, 400, 401, 403];

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
            if (response.length != 0) {
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
            } else {
                $("#myFrame").attr("hidden", "hidden");
                $("#storageTableID").attr("hidden", "hidden");
                functions.errorAlert("Figyelmeztetés", "Jelenleg minden alkatrész van raktáron!");
            }
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
            let response = JSON.parse(this.response);
            if (response.length != 0) {
                let parts = [];
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
            } else {
                $("#myFrame").attr("hidden", "hidden");
                $("#storageTableID").attr("hidden", "hidden");
                functions.errorAlert("Figyelmeztetés", "Jelenleg nincs hiányzó és foglalt alkatrész!");
            }
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
    part.partID = parseInt($("#partSelectForIncoming :selected").attr("id"));
    part.pcs = parseInt($("#numberOfPartID").val());

    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            $("#numberOfPartID").val("");
            functions.errorAlert("Siker!", "Alkatrész sikeresen hozzáadva.");
        }

        //Handles other response
        else if (this.readyState == 4 && this.status == 202) {
            $("#partSelectSectionID").attr("hidden", "hidden");
            $("#storageSectionID").removeAttr("hidden");
            setBox(this.response);
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

export function clickTable(event) {
    let cell = event.target.closest("td");
    if (!cell) return;
    if (boxesNeeded == 0) return;
    if (cell.classList.value == "p-3 table-light") {
        boxesNeeded--;
        document.getElementById("boxesNeededID").innerHTML = boxesNeeded;
        cell.classList.remove("table-light");
        cell.classList.add("table-warning");
        var box = new Box();
        switch (cell.parentElement.parentElement.parentElement.id) {
            case "storageFirstRowID":
                box.row = 1;
                break;
            case "storageSecondRowID":
                box.row = 2;
                break;
            case "storageThirdRowID":
                box.row = 3;
                break;
        }
        box.column = cell.cellIndex + 1;
        box.level = 5 - cell.parentElement.rowIndex;
        selectedBoxes.boxes.push(box);
    }
    if (boxesNeeded == 0) {
        sendBox(selectedBoxes);
    }
}

export function setBox(response) {
    response = JSON.parse(response);
    selectedBoxes.partID = response.partID;
    selectedBoxes.pcs = response.remainingPcs;
    selectedBoxes.needsToBeReservedInSelectedBoxes = response.needsToBeReservedInSelectedBoxes;
    boxesNeeded = response.boxesNeeded;
    document.getElementById("boxesNeededID").innerHTML = boxesNeeded;
    let boxArray = [];
    response.emptyBoxes.forEach((element) => {
        var box = new Box();
        box.row = element.row;
        box.column = element.column;
        box.level = element.level;
        box.partID = element.partID;
        boxArray.push(box);
    });

    var table1 = document.getElementById("storageFirstRowID");
    var table2 = document.getElementById("storageSecondRowID");
    var table3 = document.getElementById("storageThirdRowID");

    table1.addEventListener("click", function (event) {
        clickTable(event);
    });
    table2.addEventListener("click", function (event) {
        clickTable(event);
    });
    table3.addEventListener("click", function (event) {
        clickTable(event);
    });

    boxArray.forEach((box) => {
        if (box.partID != null) {
            switch (box.row) {
                case 1:
                    table1.rows[5 - box.level].cells[box.column - 1].classList.add("table-success");
                    break;
                case 2:
                    table2.rows[5 - box.level].cells[box.column - 1].classList.add("table-success");
                    break;
                case 3:
                    table3.rows[5 - box.level].cells[box.column - 1].classList.add("table-success");
                    break;
                default:
                    break;
            }
        } else if (box.partID == null) {
            switch (box.row) {
                case 1:
                    table1.rows[5 - box.level].cells[box.column - 1].classList.add("table-light");
                    break;
                case 2:
                    table2.rows[5 - box.level].cells[box.column - 1].classList.add("table-light");
                    break;
                case 3:
                    table3.rows[5 - box.level].cells[box.column - 1].classList.add("table-light");
                    break;
                default:
                    break;
            }
        }
    });

    for (var i = 0; i < 5; i++) {
        for (var j = 0; j < 4; j++) {
            if (table1.rows[i].cells[j].classList.length != 2) {
                table1.rows[i].cells[j].classList.add("table-danger");
            }
            if (table2.rows[i].cells[j].classList.length != 2) {
                table2.rows[i].cells[j].classList.add("table-danger");
            }
            if (table3.rows[i].cells[j].classList.length != 2) {
                table3.rows[i].cells[j].classList.add("table-danger");
            }
        }
    }
}

export function sendBox(obj) {
    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            window.parent.document.getElementById("incomingPartButtonID").click();
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
    http.send(JSON.stringify(obj));
}
