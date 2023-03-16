"use strict";
var http = new XMLHttpRequest();
//Shows new project form
function newProjectFrame() {
  var iframe = document.getElementById("constructorIFrame");
  iframe.src = "newProject.html";
  iframe.hidden = false;
}

//Implement the communication with client-server
function addNewProject() {
  var formData = $("#newProjectID");
  var json = {};
  $.each(formData, function () {
    json[this.name] = this.value;
  });

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
  http.send(JSON.stringify(json));
}
