function invalidateSessionButton() {

    var url = "api/invalidate_session_servlet";

    $.post(url, null, function (dataFromServer) {
        console.log("Finished calling servlet.");
        console.log(dataFromServer);
    });
}

function getLogin() {

    var url = "api/get_login_servlet";

    $.post(url, null, function (dataFromServer) {
        console.log("Finished calling servlet.");
        console.log(dataFromServer);
        if(dataFromServer.trim() == "null"){
            $('#getSessionResult').html("You are not currently logged in");
        } else {
            $('#getSessionResult').html(dataFromServer);
        }
    });
}

function login() {

    var url = "api/set_login_servlet";

    var sessionKey = "loginId";
    var sessionValue = $("#sessionValue").val();

    var dataToServer = {sessionKey : sessionKey, sessionValue : sessionValue};

    $.post(url, dataToServer, function (dataFromServer) {
        console.log("Finished calling servlet.");
        console.log(dataFromServer);
        $("#sessionValue").val("");
    });
}
button = $('#getSessionJava');
button.on("click", getLogin);

button = $('#setSessionJava');
button.on("click", login);


button = $('#invalidateSession');
button.on("click", invalidateSessionButton);