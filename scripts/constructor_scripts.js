"use strict";
import { Project, Customer } from "./data_model.js";

var http = new XMLHttpRequest();

//Implement the communication with client-server
export function addNewProject() {
  var project = new Project();
  project.project_address = $('#projectAddressID').val();
  project.description = $('#projectDescriptionID').val();

  var customer = new Customer();
  customer.name = $('#customerNameID').val();
  customer.customerSSN = $('#customerSSNID').val();
  customer.address = $('#customerAddressID').val();
  customer.phone = $('#customerPhoneID').val();
  customer.email = $('#customerEmailID').val();

  http.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 201) {
      $('#newProjectID :input').each(function(){
        $(this).val("");
      });
      alert("Új projekt hozzáadva!");
    }
    if (this.readyState == 4 && this.status == 400) {
      alert("Valmi hiba történt kérjük próbálja újra!");
    }
  };
  http.open("POST", "http://localhost:3000/newProject");
  http.setRequestHeader("Content-Type", "application/json");
  http.setRequestHeader("Authorization", document.cookie.split("=")[1]);
  http.send(JSON.stringify(Object.assign({},customer,project)));
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

