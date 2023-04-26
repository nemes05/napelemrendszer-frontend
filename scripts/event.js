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
            functions.loadItemsDropdown("setPrice");
        } else if ($("#myFrame").attr("src") == "incomingParts.html") {
            functions.loadItemsDropdown("incomigParts");
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

if (document.getElementById("listMissingPartsButtonID")) {
    document.getElementById("listMissingPartsButtonID").addEventListener("click", storage_manager_scripts.listMissingParts);
}

if (document.getElementById("getDemandedPartsButtonID")) {
    document.getElementById("getDemandedPartsButtonID").addEventListener("click", storage_manager_scripts.getDemandedParts);
}

if (document.getElementById("incomingPartButtonID")) {
    document.getElementById("incomingPartButtonID").addEventListener("click", functions.incomingPart);
}

if (document.getElementById("incomingPartSendButtonID")) {
    document.getElementById("incomingPartSendButtonID").addEventListener("click", storage_manager_scripts.incomingPartsScript);
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

if (document.getElementById("listProjectPartsButtonID")) {
    document.getElementById("listProjectPartsButtonID").addEventListener("click", functions.listProjectParts);
}

if (document.getElementById("constructorIFrame")) {
    document.getElementById("constructorIFrame").addEventListener("load", function () {
        if ($("#constructorIFrame").attr("src") == "workingTimeAndLaborFee.html") {
            functions.loadProjectsDropDown("workingTimeAndLaborFee");
        } else if ($("#constructorIFrame").attr("src") == "draft.html") {
            functions.loadItemsDropdown("draft");
        } else if ($("#constructorIFrame").attr("src") == "priceCalculation.html") {
            functions.loadProjectsDropDown("priceCalculation");
        } else if ($("#constructorIFrame").attr("src") == "closeProject.html") {
            functions.loadProjectsDropDown("closeProject");
        } else if ($("#constructorIFrame").attr("src") == "listProjectParts.html") {
            functions.loadProjectsDropDown("listProjectParts");
        }
    });
}
if (document.getElementById("listProjectPartsButtonSend")) {
    document.getElementById("listProjectPartsButtonSend").addEventListener("click", constructor_scripts.listProjectPartsScript);
}

if (document.getElementById("addworkingTimeID")) {
    document.getElementById("addworkingTimeID").addEventListener("click", constructor_scripts.addWorkingTimeAndLaborFee);
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

if (document.getElementById("priceCalculationButtonID")) {
    document.getElementById("priceCalculationButtonID").addEventListener("click", functions.priceCalculation);
}

if (document.getElementById("priceCalculationSendButtonID")) {
    document.getElementById("priceCalculationSendButtonID").addEventListener("click", constructor_scripts.priceCalculationScript);
}

if (document.getElementById("closeProjectButtonID")) {
    document.getElementById("closeProjectButtonID").addEventListener("click", functions.closeProject);
}

if (document.getElementById("closeProjectSendButtonID")) {
    document.getElementById("closeProjectSendButtonID").addEventListener("click", constructor_scripts.closeProjectScript);
}

if (document.getElementById("alertCloseID")) {
    document.getElementById("alertCloseID").addEventListener("click", function () {
        document.getElementById("alertDivID").setAttribute("hidden", "hidden");
    });
}
