
function updateTable(){
    var url = "api/name_list_get";

    $.getJSON(url, null, function (jsonResult) {
        for (var i = 0; i < jsonResult.length; i++ ){
            $("#dataTable tbody:last").append('<tr><td>' + jsonResult[i].id + '</td><td>' + jsonResult[i].first +
                '</td><td>' + jsonResult[i].last + '</td><td>' + jsonResult[i].phone + '</td><td>' + jsonResult[i].email +
                '</td><td>' + jsonResult[i].birthday + '</td></tr>');
        }
    });
}

updateTable();



