$(document).on("deviceready", initialize);
$("#btn_conectar_fb").on("click", login);

function registerToDb() {
        // Esto debe salir de FB.api("/me"
        var uid = "uid";
        var first_name = "first_name";
        var last_name = "last_name";
        var email = "email";
        var xmlhttp=new XMLHttpRequest();
        xmlhttp.open("POST",URL+"/login.json",true);
        xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xmlhttp.send("uid="+uid+"&first_name="+first_name+"&last_name="+last_name+"&email="+email);
        xmlhttp.onreadystatechange=function() {
           if (xmlhttp.readyState==4) {
            console.log("Registration response: " + xmlhttp.responseText);
           }
        };
}

function login() {
	$('#btn_conectar_fb').hide();
	FB.login(
        function (response) {
             if (response.authResponse) {
                //removeCache('usuario');
                registerToDb();
                window.location = "main.html";
             } else {
                mostrarConectar();
                alert("Error connecting with facebook.");
             }
        },
        { scope: "email,publish_stream"} // iOS
    );
}

function getLoginStatus() {
    FB.getLoginStatus(function(response) {
        if (response.status == 'connected') {
                //registerToDb();
                window.location = "main.html";
        } else {
                $('#btn_conectar_fb').show();
        }
    });
}

function logout() {
    FB.logout(function(response) {
              alert('logged out');
    });
}

function mostrarSinConexion(){
    alert("sin conexion");
}

function initialize(){
    $('#btn_conectar_fb').hide();
    var networkState = navigator.connection.type;
	if (networkState == Connection.NONE || networkState == Connection.UNKNOWN) {
		mostrarSinConexion();
	} else {
        FB.init({ appId: appId, nativeInterface: CDV.FB, useCachedDialogs: false });
        getLoginStatus();
    }
}