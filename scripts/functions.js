"use strict";
var http = new XMLHttpRequest();
var errors = [400, 401, 403];

//Storage manager iframe functions
export function addNewPart() {
    var iframe = document.getElementById("myFrame");
    iframe.src = "newPart.html";
    iframe.hidden = false;
}

export function setPrice() {
    $("#myFrame").attr("src", "setPrice.html");
    $("#myFrame").attr("hidden", "hidden");
}

export function loadItemsDropdown() {
    http.onreadystatechange = function () {
        //Creates the dropdown and puts it in the div
        if (this.readyState == 4 && this.status == 200) {
            let response = JSON.parse(this.response);
            var select = $("#myFrame").contents().find("#partSelect")[0];

            $.each(response.result, function () {
                var opt = document.createElement("option");
                opt.value = this.price;
                opt.id = this.partID;
                opt.text = this.partName;
                select.appendChild(opt);
            });

            $("#myFrame").contents().find("#previousPrice").html(response.result[0].price);
            $("#myFrame").removeAttr("hidden");
        }

        //Handles permission
        else if (this.readyState == 4 && this.status == 403) {
            alert("Nincs jogosultsága ehhez a művelethez!");
        }

        //Handles timeout
        else if (this.readyState == 4 && this.status == 401) {
            timeOut();
        }

        //Handles database error
        else if (this.readyState == 4 && this.status == 400) {
            alert("Nem tudtunk csatlakozni az adatbázishoz!");
        }

        //Handles general error
        else if (this.readyState == 4 && !errors.includes(this.status)) {
            alert("Valami hiba történt, kérjük próbálja újra!");
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

//Load the projects for set working time and labor fee
export function loadProjectsDropDown() {
    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let response = JSON.parse(this.response);
            var select = $("#constructorIFrame").contents().find("#projectSelect")[0];
            //Creates the list
            $.each(response, function () {
                if (this.stateName == "New" || this.stateName == "Draft") {
                    var opt = document.createElement("option");
                    opt.value = this.projectID;
                    opt.id = this.projectID;
                    opt.text = this.address;
                    select.appendChild(opt);
                }
            });
            //Shows the iframe
            $("#constructorIFrame").removeAttr("hidden");
        }

        //Handles permission
        else if (this.readyState == 4 && this.status == 403) {
            alert("Nincs jogosultsága ehhez a művelethez!");
        }

        //Handles timeout
        else if (this.readyState == 4 && this.status == 401) {
            timeOut();
        }

        //Handles database error
        else if (this.readyState == 4 && this.status == 400) {
            alert("Nem tudtunk csatlakozni az adatbázishoz!");
        }

        //Handles general error
        else if (this.readyState == 4 && !errors.includes(this.status)) {
            alert("Valami hiba történt, kérjük próbálja újra!");
        }
    };
    http.open("GET", "http://localhost:3000/getProjects");
    http.setRequestHeader("Authorization", document.cookie.split("=")[1]);
    http.send();
}

export function dropdowns() {
    http.onreadystatechange = function () {
        //Creates the dropdown and puts it in the div
        if (this.readyState == 4 && this.status == 200) {
            let response = JSON.parse(this.response);
            var select = $("#constructorIFrame").contents().find("#partSelect")[0];

            $.each(response.result, function () {
                var opt = document.createElement("option");
                opt.value = this.price;
                opt.id = this.partID;
                opt.text = this.partName;
                select.appendChild(opt);
            });
            //Creates Projects list
            loadProjectsDropDown();
        }

        //Handles permission
        else if (this.readyState == 4 && this.status == 403) {
            alert("Nincs jogosultsága ehhez a művelethez!");
        }

        //Handles timeout
        else if (this.readyState == 4 && this.status == 401) {
            timeOut();
        }

        //Handles database error
        else if (this.readyState == 4 && this.status == 400) {
            alert("Nem tudtunk csatlakozni az adatbázishoz!");
        }

        //Handles general error
        else if (this.readyState == 4 && !errors.includes(this.status)) {
            alert("Valami hiba történt, kérjük próbálja újra!");
        }
    };

    http.open("GET", "http://localhost:3000/getAllParts");
    http.setRequestHeader("Authorization", document.cookie.split("=")[1]);
    http.send();
}

export function timeOut() {
    var count = 5;
    var div = document.createElement("div");
    var div2 = document.createElement("div");
    div.classList.add("d-flex", "justify-content-center", "mt-5");
    div2.classList.add("alert", "alert-warning", "w-50", "text-center");
    div.appendChild(div2);
    var arr = Array.from(window.parent.document.body.children);
    console.log(arr);
    arr.forEach((element) => {
        console.log(element);
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
