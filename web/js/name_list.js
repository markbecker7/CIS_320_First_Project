
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

    // Clear out the values in the form.
    $('#id').val("");
    $('#firstName').val("");
    $('#lastName').val("");
    $('#phone').val("");
    $('#email').val("");
    $('#birthday').val("");
    // Show the hidden dialog
    $('#myModal').modal('show');
}

//Modal Save Button
var saveChangesButton = $('#saveChanges');
saveChangesButton.on("click", saveChanges);

function saveChanges(){
    console.log("save changes button pressed");
    $('#myModal').modal('hide');
}


