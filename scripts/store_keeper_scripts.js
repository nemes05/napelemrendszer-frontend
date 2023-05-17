import { Box } from "./data_model.js";
var http = new XMLHttpRequest();

export function getPartsScript() {
    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let res = JSON.parse(this.response);
            let boxList = [];
            let tableBoxList = [];
            let table = $("#partTableID")[0];
            let storageFirstRow = $("#storageFirstRowID")[0];
            let storageSecondRow = $("#storageSecondRowID")[0];
            let storageThirdRow = $("#storageThirdRowID")[0];

            res.forEach((element) => {
                if (element.quantity != 0) {
                    let box = new Box(element.row, element.column, element.level);
                    box.name = element.name;
                    box.quantity = element.quantity;
                    boxList.push(structuredClone(box));
                    if (tableBoxList.filter((box) => box.name == element.name && (box.quantity += element.quantity)).length == 0) {
                        tableBoxList.push(box);
                    }
                }
            });

            tableBoxList.forEach((element) => {
                let tr = document.createElement("tr");
                let name = document.createElement("td");
                let quantity = document.createElement("td");

                name.innerHTML = element.name;
                quantity.innerHTML = element.quantity;
                tr.id = element.name;

                tr.appendChild(name);
                tr.appendChild(quantity);
                table.appendChild(tr);
            });

            boxList.forEach((element) => {
                switch (element.row) {
                    case 1:
                        storageFirstRow.rows[5 - element.level].cells[element.column - 1].classList.add("text-bg-success");
                        storageFirstRow.rows[5 - element.level].cells[element.column - 1].innerHTML = element.quantity;
                        break;
                    case 2:
                        storageSecondRow.rows[5 - element.level].cells[element.column - 1].classList.add("text-bg-success");
                        storageSecondRow.rows[5 - element.level].cells[element.column - 1].innerHTML = element.quantity;
                        break;
                    case 3:
                        storageThirdRow.rows[5 - element.level].cells[element.column - 1].classList.add("text-bg-success");
                        storageThirdRow.rows[5 - element.level].cells[element.column - 1].innerHTML = element.quantity;
                        break;
                }
            });

            $("#selectProjectSectionID").attr("hidden", "hidden");
            $("#storageDetailsSectionID").removeAttr("hidden");
        }
    };

    http.open("PATCH", "http://localhost:3000/setProjectToInProgress/" + $("#getPartsProjectSelectID option:selected").attr("id"));
    http.setRequestHeader("Authorization", document.cookie.split("=")[1]);
    http.send();
}
