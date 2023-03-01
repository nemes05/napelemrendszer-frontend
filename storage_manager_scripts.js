var http = new XMLHttpRequest;

function addNewPartScript(){
    var formData = $('#newPartID').serializeArray();
    var json = {};
    $.each(formData, function () {
        json[this.name] = this.value;
    });

    http.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 201){
            alert('Az új alkatrész hozzáadva');
        }
        if(this.readyState == 4 && this.status == 400){
            alert('Valmi hiba történt kérjük próbálja újra!');
        }
    }

    http1.open("POST", "http://localhost:3000/addPart");
    http1.setRequestHeader("Content-Type", "application/json");
    http1.send(JSON.stringify(json));
}

function setNewPrice(){

}