var http1 = new XMLHttpRequest();

function login() {
    //Kiszedi az adatokat a Login formból és JSON-be rendezi
    var formData = $('#loginForm').serializeArray();
    var json = {};
    $.each(formData, function () {
        json[this.name] = this.value;
    });

    //Szerver válaszát kezeli
    http1.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let response=JSON.parse(this.response);
            
            if(response.permission == "Raktarvezeto"){
                location.replace('storage.html');
            }
            if(response.permission == "Szakember"){
                location.replace('constructor.html');
            }
            if(response.permission == "Raktaros"){
                alert('This user is not set yet!')
            }
        }
        else if(this.readyState == 4 && this.status == 401){
            console.log("a");
            alert('Hibás felhasználónév vagy jelszó');
        }
    };

    //Megnyitja a kommunikációt a szerverrel
    http1.open("POST", "http://localhost:3000/login");
    http1.setRequestHeader("Content-Type", "application/json");
    http1.send(JSON.stringify(json));
}
