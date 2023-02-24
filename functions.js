'use strict'
function listMissingParts(){
    alert("Jelenleg ez a funkció még nem elérhető.")
}
function listReservedParts(){
    alert("Jelenleg ez a funkció még nem elérhető.")
}
function addShippedPart(){
    alert("Jelenleg ez a funkció még nem elérhető.")
}
function boxManagement(){
    alert("Jelenleg ez a funkció még nem elérhető.")
}

function addNewPart(){
    var iframe = document.getElementById('myFrame')
    iframe.src="newPart.html"
    iframe.hidden = false;
}

function setPrice(){
    var iframe = document.getElementById('myFrame')
    iframe.src="setPrice.html"
    iframe.hidden = false;
}