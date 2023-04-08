"use strict";
import { Part, Project, Customer } from "./data_model.js";

var http = new XMLHttpRequest();

//Implement the communication with client-server
export function addNewProject() {
  //Clears previous functions' div
  document.getElementById("element").style.display = "none";

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

export function listProject(){
  http.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200){
      var projectArray = []
      var customerArray = []
      var table = document.createElement("table")
      let response = JSON.parse(this.response)
      console.log(response);

      $.each(response, function(){
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
      var tr = document.createElement("tr");
      var th1 = document.createElement("th");
      var th2 = document.createElement("th");
      var th3 = document.createElement("th");
      var th4 = document.createElement("th");
      var th5 = document.createElement("th");
      var th6 = document.createElement("th");
      var th7 = document.createElement("th");
      var th8 = document.createElement("th");
      th1.innerHTML="Helyszín";
      tr.appendChild(th1);
      th2.innerHTML="Leírás";
      tr.appendChild(th2);
      th3.innerHTML="Megrendelési idő";
      tr.appendChild(th3);
      th4.innerHTML="Munkaidő";
      tr.appendChild(th4);
      th5.innerHTML="Ár";
      tr.appendChild(th5);
      th6.innerHTML="Állapot";
      tr.appendChild(th6);
      th7.innerHTML="Megrendelő";
      tr.appendChild(th7);
      th8.innerHTML="Telefonszám";
      tr.appendChild(th8);

      table.appendChild(tr);
      for(var i = 0; i < projectArray.length; i++) {
        var tr = document.createElement("tr");
        console.log(i)
        $.each(projectArray[i],function(){
          if(this != undefined) {
            var td = document.createElement("td");
            td.innerHTML = this;
            tr.appendChild(td);
          }
        });
        $.each(customerArray[i],function(){
          if(this != undefined) {
            var td = document.createElement("td");
            td.innerHTML = this;
            tr.appendChild(td);
          }
        });
        table.appendChild(tr);
        table.classList.add("table")
      }
      console.log(table)
      $('#constructorIFrame').attr('hidden','hidden');
      $('#showTableID').html(table);
    }
    if(this.readyState == 4 && this.status == 400){
      alert("Valami hiba történt");
    }
  };

  http.open("GET", "http://localhost:3000/getProjects");
  http.setRequestHeader("Content-Type", "application/json");
  http.setRequestHeader("Authorization", document.cookie.split("=")[1]);
  http.send();
}
export function listParts(){
  http.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200){
      var partArray = []
      var table = document.createElement("table")
      let response = JSON.parse(this.response)


      $.each(response, function(){
       var mypart = new Part();
       mypart.partName=this.partName;
       mypart.price=this.price;
       mypart.availablePieces=this.availablePieces;

        partArray.push(mypart);
      });
      var tr = document.createElement("tr");
      var th1 = document.createElement("th");
      var th2 = document.createElement("th");
      var th3 = document.createElement("th");
      th1.innerHTML="Alkatrész neve";
      tr.appendChild(th1);
      th2.innerHTML="Ár";
      tr.appendChild(th2);
      th3.innerHTML="Elérhető darabszám";
      tr.appendChild(th3);
      table.appendChild(tr);


      for(var i = 0; i < partArray.length; i++) {
        var tr = document.createElement("tr");
        console.log(i)
        $.each(partArray[i],function(){
          if(this != undefined) {
            var td = document.createElement("td");
            td.innerHTML = this;
            tr.appendChild(td);
          }
        });
        table.appendChild(tr);
        table.classList.add("table")
      }
      $('#constructorIFrame').attr('hidden','hidden');
      $('#showTableID').html(table);
    }
    if(this.readyState == 4 && this.status == 400){
      alert("Valami hiba történt");
    }
  };

  http.open("GET", "http://localhost:3000/getAllPartsAndAccess");
  http.setRequestHeader("Content-Type", "application/json");
  http.setRequestHeader("Authorization", document.cookie.split("=")[1]);
  http.send();
  
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

