var http = new XMLHttpRequest;

function addNewPartScript() {
    var formData = $('#newPartID').serializeArray();
    var json = {};
    $.each(formData, function () {
        json[this.name] = this.value;
    });

    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 201) {
            alert('Az új alkatrész hozzáadva');
        }
        if (this.readyState == 4 && this.status == 400) {
            alert('Valmi hiba történt kérjük próbálja újra!');
        }
    }

    http.open("POST", "http://localhost:3000/addPart");
    http.setRequestHeader("Content-Type", "application/json");
    http.send(JSON.stringify(json));
}

function setNewPrice() {
    var json = {};
    json["price"] = $("#partNewPrice").val();

    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            alert("Az ár sikeresen módosítva!")
        }
        else if (this.readyState == 4 && this.status == 400) {
            alert("Az ár rögzítése nem sikerült!")
        }
    }
    http.open("PATCH", "http://localhost:3000/modifyPartPrice/" + $("#partSelect option:selected").attr("id"));
    http.setRequestHeader("Content-Type", "application/json");
    http.send(JSON.stringify(json));
}