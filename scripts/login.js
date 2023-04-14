var http1 = new XMLHttpRequest();

function login() {
    //formats Login data to JSON
    var formData = $("#loginForm").serializeArray();
    var json = {};
    $.each(formData, function () {
        json[this.name] = this.value;
    });

    //Handels server response
    http1.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            $("#username").addClass("is-valid");
            $("#password").addClass("is-valid");
            $("#authAlertID").attr("hidden", "hidden");

            let response = JSON.parse(this.response);
            document.cookie = "token=" + response.token;

            if (response.permission == "Raktarvezeto") {
                location.replace("storage.html");
            }
            if (response.permission == "Szakember") {
                location.replace("constructor.html");
            }
            if (response.permission == "Raktaros") {
                location.replace("storekeeper.html");
            }
        }
        //Handles incorrect creditentials
        else if (this.readyState == 4 && this.status == 401) {
            $("#username").addClass("is-invalid");
            $("#password").addClass("is-invalid");
            $("#authAlertID").removeAttr("hidden");
        }
    };

    //Opens communication with server
    http1.open("POST", "http://localhost:3000/login");
    http1.setRequestHeader("Content-Type", "application/json");
    http1.send(JSON.stringify(json));
}

function logout() {
    document.cookie = "token=; expires= Thu, 21 Aug 2014 20:00:00 UTC";
    location.replace("index.html");
}
