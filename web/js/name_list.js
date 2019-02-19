
//Updating Table based on what's in database
function updateTable(){
    var url = "api/name_list_get";

    $.getJSON(url, null, function (jsonResult) {
        for (var i = 0; i < jsonResult.length; i++ ){
            var phoneString = jsonResult[i].phone.substring(0, 3) + "-" + jsonResult[i].phone.substring(3, 6) +
                "-" + jsonResult[i].phone.substring(6, 10);
            $("#dataTable tbody:last").append('<tr><td>' + jsonResult[i].id + '</td><td>' + jsonResult[i].first +
                '</td><td>' + jsonResult[i].last + '</td><td>' + phoneString + '</td><td>' + jsonResult[i].email +
                '</td><td>' + jsonResult[i].birthday + '</td></tr>');
        }
    });
}

updateTable();

//Showing Modal, clearing form fields
var addItemButton = $('#addItem');
addItemButton.on("click", showDialogAdd);

function showDialogAdd() {

    // Print that we got here
    console.log("Opening add item dialog");

    var firstNameField = $('#firstName');
    var lastNameField = $('#lastName');
    var phoneField = $('#phone');
    var emailField = $('#email');
    var birthdayField = $('#birthday');

    // Clear out the values and Styles in the form.
    firstNameField.val("");
    lastNameField.val("");
    phoneField.val("");
    emailField.val("");
    birthdayField.val("");

    firstNameField.removeClass("is-invalid");
    firstNameField.removeClass("is-valid");

    lastNameField.removeClass("is-invalid");
    lastNameField.removeClass("is-valid");

    phoneField.removeClass("is-invalid");
    phoneField.removeClass("is-valid");

    emailField.removeClass("is-invalid");
    emailField.removeClass("is-valid");

    birthdayField.removeClass("is-invalid");
    birthdayField.removeClass("is-valid");

    // Show the hidden dialog
    $('#myModal').modal('show');
}

//Modal Save Button
var saveChangesButton = $('#saveChanges');
saveChangesButton.on("click", saveChanges);

function saveChanges(){
    console.log("save changes button pressed");
    validateFields();
}

//Regular Expression Validation
function validateFields() {

    var validFields = true;
    var firstNameField = $('#firstName');
    var lastNameField = $('#lastName');
    var phoneField = $('#phone');
    var emailField = $('#email');
    var birthdayField = $('#birthday');

    var nameReg = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{1,30}$/u;
    var phoneReg = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/i;
    var emailReg = /^\S+@\S+\.\S+$/i;
    var birthdayReg = /^[0-2][0-9]{3}-[0-1][0-9]-[0-3][0-9]$/i;

    if (nameReg.test(firstNameField.val())) {
        firstNameField.removeClass("is-invalid");
        firstNameField.addClass("is-valid");
    } else {
        firstNameField.removeClass("is-valid");
        firstNameField.addClass("is-invalid");
        validFields = false;
    }

    if (nameReg.test(lastNameField.val())) {
        lastNameField.removeClass("is-invalid");
        lastNameField.addClass("is-valid");
    } else {
        lastNameField.removeClass("is-valid");
        lastNameField.addClass("is-invalid");
        validFields = false;
    }

    if (phoneReg.test(phoneField.val())) {
        phoneField.removeClass("is-invalid");
        phoneField.addClass("is-valid");
    } else {
        phoneField.removeClass("is-valid");
        phoneField.addClass("is-invalid");
        validFields = false;
    }

    if (emailReg.test(emailField.val())) {
        emailField.removeClass("is-invalid");
        emailField.addClass("is-valid");
    } else {
        emailField.removeClass("is-valid");
        emailField.addClass("is-invalid");
        validFields = false;
    }

    if (birthdayReg.test(birthdayField.val())) {
        birthdayField.removeClass("is-invalid");
        birthdayField.addClass("is-valid");
    } else {
        birthdayField.removeClass("is-valid");
        birthdayField.addClass("is-invalid");
        validFields = false;
    }

    if(validFields){
        var jsonData = {
            "first":firstNameField.val(),
            "last":lastNameField.val(),
            "phone":phoneField.val(),
            "email":emailField.val(),
            "birthday":birthdayField.val()
        };
        console.log(jsonData);
        jqueryPostJSONAction(jsonData);
    }
}

function jqueryPostJSONAction(jsonData) {

    var url = "api/name_list_edit";

    $.ajax({
        type: 'POST',
        url: url,
        data: JSON.stringify(jsonData),
        success: function(dataFromServer) {
            console.log(dataFromServer);
        },
        contentType: "application/json",
        dataType: 'text' // Could be JSON or whatever too
    });
    updateTable();
}



