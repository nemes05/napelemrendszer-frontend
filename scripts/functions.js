"use strict";
var http = new XMLHttpRequest();
var responeses = [200, 201, 400, 401, 403];

//Storage manager iframe functions
export function addNewPart() {
    $("#storageTableID").attr("hidden", "hidden");
    var iframe = document.getElementById("myFrame");
    iframe.src = "newPart.html";
    iframe.hidden = false;
}

export function setPrice() {
    $("#storageTableID").attr("hidden", "hidden");
    $("#myFrame").attr("src", "setPrice.html");
    $("#myFrame").attr("hidden", "hidden");
}

export function incomingPart() {
    $("#storageTableID").attr("hidden", "hidden");
    $("#myFrame").attr("src", "incomingParts.html");
    $("#myFrame").attr("hidden", "hidden");
}

export function loadItemsDropdown(caller) {
    http.onreadystatechange = function () {
        //Creates the dropdown and puts it in the div
        if (this.readyState == 4 && this.status == 200) {
            let response = JSON.parse(this.response);
            var select = null;
            switch (caller) {
                case "setPrice":
                    select = $("#myFrame").contents().find("#partSelect")[0];
                    break;
                case "draft":
                    select = $("#constructorIFrame").contents().find("#partSelect")[0];
                    break;
                case "incomigParts":
                    select = $("#myFrame").contents().find("#partSelectForIncoming")[0];
                    break;
            }

            $.each(response.result, function () {
                var opt = document.createElement("option");
                opt.value = this.price;
                opt.id = this.partID;
                opt.text = this.partName;
                select.appendChild(opt);
            });

            switch (caller) {
                case "setPrice":
                    $("#myFrame").contents().find("#previousPrice").html(response.result[0].price);
                    $("#myFrame").removeAttr("hidden");
                    break;
                case "draft":
                    loadProjectsDropDown("draft");
                    break;
                case "incomigParts":
                    $("#myFrame").contents().find("#partSelectSectionID").removeAttr("hidden");
                    $("#myFrame").removeAttr("hidden");
                    break;
            }
        }

        //Handles permission
        else if (this.readyState == 4 && this.status == 403) {
            errorAlert("Error", "Nincs jogosultsága ehhez a művelethez!");
        }

        //Handles timeout
        else if (this.readyState == 4 && this.status == 401) {
            timeOut();
        }

        //Handles database error
        else if (this.readyState == 4 && this.status == 400) {
            errorAlert("Figyelem", "Nem tudtunk csatlakozni az adatbázishoz!");
        }

        //Handles general error
        else if (this.readyState == 4 && !responeses.includes(this.status)) {
            errorAlert("Error", "Valami hiba történt, kérjük próbálja újra!");
        }
    };

    http.open("GET", "http://localhost:3000/getAllParts");
    http.setRequestHeader("Authorization", document.cookie.split("=")[1]);
    http.send();
}

export function changeCurrentPriceValue() {
    //Changes the 'Régi ár' dynamically
    $("#previousPrice").text($("#partSelect").val());
}

//Constructor iframe functions
//Shows new project form
export function newProject() {
    $("#constructorIFrame").attr("src", "newProject.html");
    $("#showTableID").attr("hidden", "hidden");
    $("#constructorIFrame").removeAttr("hidden");
}

//Shows working time iframe
export function addWorkingTime() {
    $("#constructorIFrame").attr("src", "workingTimeAndLaborFee.html");
    $("#showTableID").attr("hidden", "hidden");
    $("#constructorIFrame").attr("hidden", "hidden");
}

//Shows draft iframe
export function draft() {
    $("#constructorIFrame").attr("src", "draft.html");
    $("#showTableID").attr("hidden", "hidden");
    $("#constructorIFrame").attr("hidden", "hidden");
}

export function listProjectParts() {
    $("#constructorIFrame").attr("src", "listProjectParts.html");
    $("#showTableID").attr("hidden", "hidden");
    $("#constructorIFrame").attr("hidden", "hidden");
}

//Load the projects for set working time and labor fee
export function loadProjectsDropDown(caller) {
    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let response = JSON.parse(this.response);
            var select = null;
            switch (caller) {
                case "draft":
                    select = $("#constructorIFrame").contents().find("#projectSelect")[0];
                    break;
                case "priceCalculation":
                    select = $("#constructorIFrame").contents().find("#priceCalculationProjectSelectID")[0];
                    break;
                case "workingTimeAndLaborFee":
                    select = $("#constructorIFrame").contents().find("#projectSelect")[0];
                    break;
                case "closeProject":
                    select = $("#constructorIFrame").contents().find("#closeProjectProjectSelectID")[0];
                    break;
                case "listProjectParts":
                    select = $("#constructorIFrame").contents().find("#projectSelectForList")[0];
                case "getParts":
                    select = $("#storeKeeperFrame").contents().find("#getPartsProjectSelectID")[0];
            }
            //Creates the list
            if (caller == "draft") {
                $.each(response, function () {
                    if (this.stateName == "New" || this.stateName == "Draft") {
                        var opt = document.createElement("option");
                        opt.value = this.projectID;
                        opt.id = this.projectID;
                        opt.text = this.address;
                        select.appendChild(opt);
                    }
                });
            } else if (caller == "priceCalculation") {
                $.each(response, function () {
                    if (this.stateName == "Draft") {
                        var opt = document.createElement("option");
                        opt.value = this.projectID;
                        opt.id = this.projectID;
                        opt.text = this.address;
                        select.appendChild(opt);
                    }
                });
            } else if (caller == "workingTimeAndLaborFee") {
                $.each(response, function () {
                    if (this.stateName != "Completed" && this.stateName != "Failed") {
                        var opt = document.createElement("option");
                        opt.value = this.projectID;
                        opt.id = this.projectID;
                        opt.text = this.address;
                        select.appendChild(opt);
                    }
                });
            } else if (caller == "listProjectParts") {
                select = $("#constructorIFrame").contents().find("#projectSelectForList")[0];
                $.each(response, function () {
                    if (this.stateName != "Completed" && this.stateName != "Failed") {
                        var opt = document.createElement("option");
                        opt.value = this.projectID;
                        opt.id = this.projectID;
                        opt.text = this.address;
                        select.appendChild(opt);
                    }
                });
            } else if (caller == "closeProject") {
                $.each(response, function () {
                    if (this.stateName != "Completed" && this.stateName != "Failed") {
                        var opt = document.createElement("option");
                        opt.value = this.projectID;
                        opt.id = this.projectID;
                        opt.text = this.address;
                        select.appendChild(opt);
                    }
                });
            } else if (caller == "getParts") {
                $.each(response, function () {
                    if (this.stateName == "Scheduled") {
                        var opt = document.createElement("option");
                        opt.value = this.projectID;
                        opt.id = this.projectID;
                        opt.text = this.address;
                        select.appendChild(opt);
                    }
                });
            } else {
                $.each(response, function () {
                    var opt = document.createElement("option");
                    opt.value = this.projectID;
                    opt.id = this.projectID;
                    opt.text = this.address;
                    select.appendChild(opt);
                });
            }
            //Shows the iframe
            if (select.children.length == 0) {
                errorAlert("Figyelem!", "Nincs projekt amire el lehet végezni a funkciót.");
            } else if (caller != "getParts") {
                $("#constructorIFrame").removeAttr("hidden");
            } else {
                $("#storeKeeperFrame").removeAttr("hidden");
            }
        }

        //Handles permission
        else if (this.readyState == 4 && this.status == 403) {
            errorAlert("Error", "Nincs jogosultsága ehhez a művelethez!");
        }

        //Handles timeout
        else if (this.readyState == 4 && this.status == 401) {
            timeOut();
        }

        //Handles database error
        else if (this.readyState == 4 && this.status == 400) {
            errorAlert("Error", "Nem tudtunk csatlakozni az adatbázishoz!");
        }

        //Handles general error
        else if (this.readyState == 4 && !responeses.includes(this.status)) {
            errorAlert("Error", "Valami hiba történt, kérjük próbálja újra!");
        }
    };
    http.open("GET", "http://localhost:3000/getProjects");
    http.setRequestHeader("Authorization", document.cookie.split("=")[1]);
    http.send();
}

export function priceCalculation() {
    $("#constructorIFrame").attr("src", "priceCalculation.html");
    $("#showTableID").attr("hidden", "hidden");
    $("#constructorIFrame").attr("hidden", "hidden");
}

export function closeProject() {
    $("#constructorIFrame").attr("src", "closeProject.html");
    $("#showTableID").attr("hidden", "hidden");
    $("#constructorIFrame").attr("hidden", "hidden");
}

export function getParts() {
    $("#storeKeeperFrame").attr("src", "getParts.html");
    $("#storeKeeperFrame").attr("hidden", "hidden");
}

export function timeOut() {
    var count = 5;
    var div = document.createElement("div");
    var div2 = document.createElement("div");
    div.classList.add("d-flex", "justify-content-center", "mt-5");
    div2.classList.add("alert", "alert-warning", "w-50", "text-center");
    div.appendChild(div2);
    var arr = Array.from(window.parent.document.body.children);
    arr.forEach((element) => {
        element.setAttribute("hidden", "hidden");
    });
    var countdown = setInterval(function () {
        if (count <= 1) {
            clearInterval(countdown);
        }
        div2.innerHTML = "Felhasználási idő lejárt <br> Kilépés: " + count;
        window.parent.document.body.appendChild(div);
        count = count - 1;
    }, 1000);
    setTimeout(function () {
        window.parent.location.replace("index.html");
    }, 6000);
}

export function errorAlert(title, body) {
    var $head = $(window.parent.document.getElementById("errorHead"));
    var $body = $(window.parent.document.getElementById("errorBody"));
    $head.html(title);
    $body.html(body);
    window.parent.document.getElementById("alertDivID").removeAttribute("hidden");
    window.parent.document.getElementById("alertCloseID").focus();
}
