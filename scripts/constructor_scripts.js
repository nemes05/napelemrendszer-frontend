"use strict";
import { Part, Project, Customer, Draft } from "./data_model.js";
import * as functions from "./functions.js";

var http = new XMLHttpRequest();
var responeses = [200, 201, 400, 401, 403];

//Implement the communication with client-server
export function addNewProject() {
    var project = new Project();
    project.project_address = $("#projectAddressID").val();
    project.description = $("#projectDescriptionID").val();

    var customer = new Customer();
    customer.name = $("#customerNameID").val();
    customer.customerSSN = $("#customerSSNID").val();
    customer.address = $("#customerAddressID").val();
    customer.phone = $("#customerPhoneID").val();
    customer.email = $("#customerEmailID").val();

    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 201) {
            $("#newProjectID :input").each(function () {
                $(this).val("");
            });
            alert("Új projekt hozzáadva!");
        }

        //Handles database error
        else if (this.readyState == 4 && this.status == 400) {
            alert("Nem tudtunk csatlakozni az adatbázishoz!");
        }

        //Handles expired token error
        else if (this.readyState == 4 && this.status == 401) {
            functions.timeOut();
        }

        //Handles permission error
        else if (this.readyState == 4 && this.status == 403) {
            alert("Nincs jogosultsága ehhez a művelethez!");
        }

        //Handles general error
        else if (this.readyState == 4 && !responeses.includes(this.status)) {
            alert("Valami hiba történt, kérjük próbálja újra!");
        }
    };
    http.open("POST", "http://localhost:3000/newProject");
    http.setRequestHeader("Content-Type", "application/json");
    http.setRequestHeader("Authorization", document.cookie.split("=")[1]);
    http.send(JSON.stringify(Object.assign({}, customer, project)));
}

export function listProject() {
    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var projectArray = [];
            var customerArray = [];
            var headTitles = ["Helyszín", "Leírás", "Megrendelési idő", "Munkaidő", "Ár", "Állapot", "Megrendelő", "Telefonszám"];
            var table = document.createElement("table");
            var thead = document.createElement("thead");
            var tbody = document.createElement("tbody");
            var tr = document.createElement("tr");
            tbody.classList.add("table-group-divider");
            table.classList.add("table", "table-striped");
            let response = JSON.parse(this.response);

            $.each(response, function () {
                var project = new Project();
                var customer = new Customer();

                project.description = this.description;
                project.laborFee = this.laborFee;
                project.orderDate = new Date(this.orderDate).toLocaleDateString();
                project.project_address = this.address;
                project.stateName = this.stateName;
                project.workingTime = this.workingTime;

                customer.name = this.name;
                customer.phone = this.phone;

                projectArray.push(project);
                customerArray.push(customer);
            });

            headTitles.forEach((title) => {
                var th = document.createElement("th");
                th.innerHTML = title;
                tr.appendChild(th);
            });

            thead.appendChild(tr);
            table.appendChild(thead);

            for (var i = 0; i < projectArray.length; i++) {
                var tr = document.createElement("tr");
                $.each(projectArray[i], function () {
                    if (this != undefined) {
                        var td = document.createElement("td");
                        td.innerHTML = this;
                        tr.appendChild(td);
                    }
                });
                $.each(customerArray[i], function () {
                    if (this != undefined) {
                        var td = document.createElement("td");
                        td.innerHTML = this;
                        tr.appendChild(td);
                    }
                });
                tbody.appendChild(tr);
            }
            table.appendChild(tbody);
            $("#showTableID").html(table);
            $("#constructorIFrame").attr("hidden", "hidden");
            $("#showTableID").removeAttr("hidden");
        }

        //Handles database error
        else if (this.readyState == 4 && this.status == 400) {
            alert("Nem tudtunk csatlakozni az adatbázishoz!");
        }

        //Handles expired token error
        else if (this.readyState == 4 && this.status == 401) {
            functions.timeOut();
        }

        //Handles permission error
        else if (this.readyState == 4 && this.status == 403) {
            alert("Nincs jogosultsága ehhez a művelethez!");
        }

        //Handles general error
        else if (this.readyState == 4 && !responeses.includes(this.status)) {
            alert("Valami hiba történt, kérjük próbálja újra!");
        }
    };

    http.open("GET", "http://localhost:3000/getProjects");
    http.setRequestHeader("Content-Type", "application/json");
    http.setRequestHeader("Authorization", document.cookie.split("=")[1]);
    http.send();
}

export function listParts() {
    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var partArray = [];
            var headTitles = ["Alkatrész neve", "Ár", "Elérhető darabszám"];
            var tr = document.createElement("tr");
            var thead = document.createElement("thead");
            var tbody = document.createElement("tbody");
            var table = document.createElement("table");
            tbody.classList.add("table-group-divider");
            table.classList.add("table", "table-striped");
            let response = JSON.parse(this.response);

            //Initialize parts
            $.each(response, function () {
                var mypart = new Part();
                mypart.partName = this.partName;
                mypart.price = this.price;
                mypart.availablePieces = this.availablePieces;
                partArray.push(mypart);
            });

            //Creates the headers
            headTitles.forEach((title) => {
                var th = document.createElement("th");
                th.innerHTML = title;
                tr.appendChild(th);
            });

            thead.appendChild(tr);
            table.appendChild(thead);

            //Creates the rows including parts
            for (var i = 0; i < partArray.length; i++) {
                var tr = document.createElement("tr");
                $.each(partArray[i], function () {
                    if (this != undefined) {
                        var td = document.createElement("td");
                        td.innerHTML = this;
                        tr.appendChild(td);
                    }
                });
                tbody.appendChild(tr);
                table.appendChild(tbody);
            }

            //Shows table
            $("#showTableID").html(table);
            $("#constructorIFrame").attr("hidden", "hidden");
            $("#showTableID").removeAttr("hidden");
        }

        //Handles database error
        else if (this.readyState == 4 && this.status == 400) {
            alert("Nem tudtunk csatlakozni az adatbázishoz!");
        }

        //Handles expired token error
        else if (this.readyState == 4 && this.status == 401) {
            functions.timeOut();
        }

        //Handles permission error
        else if (this.readyState == 4 && this.status == 403) {
            alert("Nincs jogosultsága ehhez a művelethez!");
        }

        //Handles general error
        else if (this.readyState == 4 && !responeses.includes(this.status)) {
            alert("Valami hiba történt, kérjük próbálja újra!");
        }
    };

    http.open("GET", "http://localhost:3000/getAllPartsAndAccess");
    http.setRequestHeader("Content-Type", "application/json");
    http.setRequestHeader("Authorization", document.cookie.split("=")[1]);
    http.send();
}

export function addWorkingTimeAndLaborFee() {
    //Creates a project and save working time and labor fee attrib
    var project = new Project();
    project.laborFee = $("#laborFeeID").val();
    project.workingTime = $("#workingTimeID").val();
    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //Cleans the form
            document.getElementById("laborFeeAndWorkingTime").reset();
            alert("A módosítás sikeres!");
        }

        //Handles database error
        else if (this.readyState == 4 && this.status == 400) {
            alert("Nem tudtunk csatlakozni az adatbázishoz!");
        }

        //Handles expired token error
        else if (this.readyState == 4 && this.status == 401) {
            functions.timeOut();
        }

        //Handles permission error
        else if (this.readyState == 4 && this.status == 403) {
            alert("Nincs jogosultsága ehhez a művelethez!");
        }

        //Handles general error
        else if (this.readyState == 4 && !responeses.includes(this.status)) {
            alert("Valami hiba történt, kérjük próbálja újra!");
        }
    };

    //Sends parameter (projectID) and projects' data
    http.open("PATCH", "http://localhost:3000/priceCalculator/" + $("#projectSelect option:selected").attr("id"));
    http.setRequestHeader("Content-Type", "application/json");
    http.setRequestHeader("Authorization", document.cookie.split("=")[1]);
    http.send(JSON.stringify(project));
}

export function draft() {
    var draft = new Draft(new Part(), 0);
    draft.part.partID = $("#partSelect :selected").attr("id");
    draft.reguiredQuantity = $("#piecesID").val();

    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 201) {
            alert("Sikeres hozzárendelés!");
            $.each($(".setPrice input"), function () {
                $(this).val("");
            });
        }

        //Handles database error
        else if (this.readyState == 4 && this.status == 400) {
            alert("Nem tudtunk csatlakozni az adatbázishoz!");
        }

        //Handles expired token error
        else if (this.readyState == 4 && this.status == 401) {
            functions.timeOut();
        }

        //Handles permission error
        else if (this.readyState == 4 && this.status == 403) {
            alert("Nincs jogosultsága ehhez a művelethez!");
        }

        //Handles general error
        else if (this.readyState == 4 && !responeses.includes(this.status)) {
            alert("Valami hiba történt, kérjük próbálja újra!");
        }
    };

    http.open("PATCH", "http://localhost:3000/draftProject/" + $("#projectSelect :selected").attr("id"));
    http.setRequestHeader("Content-Type", "application/json");
    http.setRequestHeader("Authorization", document.cookie.split("=")[1]);
    http.send(JSON.stringify(draft));
}

//nem tesztelt funkció (nincs endpoint)
export function priceCalculationScript() {
    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 201) {
        }
        //Handles database error
        else if (this.readyState == 4 && this.status == 400) {
            alert("Nem tudtunk csatlakozni az adatbázishoz!");
        }

        //Handles expired token error
        else if (this.readyState == 4 && this.status == 401) {
            functions.timeOut();
        }

        //Handles permission error
        else if (this.readyState == 4 && this.status == 403) {
            alert("Nincs jogosultsága ehhez a művelethez!");
        }

        //Handles general error
        else if (this.readyState == 4 && !responeses.includes(this.status)) {
            alert("Valami hiba történt, kérjük próbálja újra!");
        }
    };
    //TODO: endpoint hozzáadása
    http.open("PATCH", "http://localhost:3000//" + $("#priceCalculationProjectSelectID :selected").attr("id"));
    http.setRequestHeader("Content-Type", "application/json");
    http.setRequestHeader("Authorization", document.cookie.split("=")[1]);
    http.send(JSON.stringify(draft));
}
