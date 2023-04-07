import * as functions from './functions.js'
import * as storage_manager_scripts from './storage_manager_scripts.js'

if (document.getElementById('addNewPartButtonID')) {
    document.getElementById('addNewPartButtonID').addEventListener('click', functions.addNewPart);
}

if (document.getElementById('setPriceButtonID')) {
    document.getElementById('setPriceButtonID').addEventListener('click', functions.setPrice);
}

if (document.getElementById('myFrame')) {
    document.getElementById('myFrame').addEventListener('load', function () {
        if ($('#myFrame').attr('src') == 'setPrice.html') {
            functions.loadItemsDropdown()
        }
    })
}

if (document.getElementById('setNewPriceButtonID')) {
    document.getElementById('setNewPriceButtonID').addEventListener('click', storage_manager_scripts.setNewPrice);
}
if (document.getElementById('partSelect')) {
    document.getElementById('partSelect').addEventListener('change', functions.changeCurrentPriceValue);
}

if (document.getElementById('addNewPartScriptButtonID')) {
    document.getElementById('addNewPartScriptButtonID').addEventListener('click', storage_manager_scripts.addNewPartScript);
}