"use strict";
import { Project, Customer } from "./data_model.js";

var http = new XMLHttpRequest();

//Implement the communication with client-server
export function addNewProject() {
  var project = new Project();
  project.address = $('#projectAddressID').val();
  project.description = $('#projectDescriptionID').val();

  var customer = new Customer();
  customer.name = $('#customerNameID').val();
  customer.SSN = $('#customerSSNID').val();
  customer.home_address = $('#customerAddressID').val();
  customer.phone_number = $('#customerPhoneID').val();
  customer.email = $('#customerEmailID').val();

  http.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 201) {
      alert("Új projekt hozzáadva!");
      iframe.hidden = true;
    }
    if (this.readyState == 4 && this.status == 400) {
      alert("Valmi hiba történt kérjük próbálja újra!");
    }
  };
  http.open("POST", "http://localhost:3000/newProject");
  http.setRequestHeader("Content-Type", "application/json");
  http.setRequestHeader("Authorization", document.cookie.split("=")[1]);
  http.send(JSON.stringify([project, customer]));
}

function listProject(){
  alert("Ez a funkció jelenleg nem elérhető!")
}
function listParts(){
  alert("Ez a funkció jelenleg nem elérhető!")
}
function draft(){
  alert("Ez a funkció jelenleg nem elérhető!")
}
function addWorkingTime(){
  alert("Ez a funkció jelenleg nem elérhető!")
}
function priceCalculation(){
  alert("Ez a funkció jelenleg nem elérhető!")
}
function finishProject(){
  alert("Ez a funkció jelenleg nem elérhető!")
}

