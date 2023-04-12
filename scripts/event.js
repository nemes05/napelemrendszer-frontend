import * as functions from "./functions.js";
import * as storage_manager_scripts from "./storage_manager_scripts.js";
import * as constructor_scripts from "./constructor_scripts.js";

if (document.getElementById("addNewPartButtonID")) {
    document.getElementById("addNewPartButtonID").addEventListener("click", functions.addNewPart);
}

if (document.getElementById("setPriceButtonID")) {
    document.getElementById("setPriceButtonID").addEventListener("click", functions.setPrice);
}

if (document.getElementById("myFrame")) {
    document.getElementById("myFrame").addEventListener("load", function () {
        if ($("#myFrame").attr("src") == "setPrice.html") {
            functions.loadItemsDropdown();
        }
    });
}

if (document.getElementById("setNewPriceButtonID")) {
    document.getElementById("setNewPriceButtonID").addEventListener("click", storage_manager_scripts.setNewPrice);
}
if (document.getElementById("partSelect")) {
    document.getElementById("partSelect").addEventListener("change", functions.changeCurrentPriceValue);
}

if (document.getElementById("addNewPartScriptButtonID")) {
    document.getElementById("addNewPartScriptButtonID").addEventListener("click", storage_manager_scripts.addNewPartScript);
}

//Contstructors' event listeners
if (document.getElementById("addNewProjectSriptButtonID")) {
    document.getElementById("addNewProjectSriptButtonID").addEventListener("click", constructor_scripts.addNewProject);
}

if (document.getElementById("newProjectButtonID")) {
    document.getElementById("newProjectButtonID").addEventListener("click", functions.newProject);
}

if (document.getElementById("listAllProjectButtonID")) {
    document.getElementById("listAllProjectButtonID").addEventListener("click", constructor_scripts.listProject);
}

if (document.getElementById("listAllPartsButtonID")) {
    document.getElementById("listAllPartsButtonID").addEventListener("click", constructor_scripts.listParts);
}

if (document.getElementById("addWorkingTimeButtonID")) {
    document.getElementById("addWorkingTimeButtonID").addEventListener("click", functions.addWorkingTime);
}

if (document.getElementById("constructorIFrame")) {
    document.getElementById("constructorIFrame").addEventListener("load", function () {
        if ($("#constructorIFrame").attr("src") == "workingTimeAndLaborFee.html") {
            functions.loadProjectsDropDown();
        }
    });
}

if (document.getElementById("addworkingTimeID")) {
    document.getElementById("addworkingTimeID").addEventListener("click", constructor_scripts.addWorkingTimeAndLaborFee);
}

if (document.getElementById("constructorIFrame")) {
    document.getElementById("constructorIFrame").addEventListener("load", function () {
        if ($("#constructorIFrame").attr("src") == "draft.html") {
            functions.dropdowns();
        }
    });
}

if (document.getElementById("draftButtonID")) {
    document.getElementById("draftButtonID").addEventListener("click", functions.draft);
}

if (document.getElementById("draftID")) {
    document.getElementById("draftID").addEventListener("click", function () {
        if ($("#piecesID").val() != "") {
            constructor_scripts.draft();
        } else {
            alert("Kérjük adjon meg egy darabszámot!");
        }
    });
}
