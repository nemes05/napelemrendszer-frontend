var http1 = new XMLHttpRequest();
function login(){
    var username = Document.getElementById("username").value;
    var password = Document.getElementById("password").value;
    /*http1.onreadystatechange() = function(){
        if(this.readyState == 4 && this.status == 400){
            console.log();
        }
    };*/

    console.log(username);
    console.log(password);
    
    /*http1.open("POST","",true);
    http1.setRequestHeader("Content-Type", "application/json");
    http1.send(JSON.stringify({ "username": username, "password": password}));*/
}