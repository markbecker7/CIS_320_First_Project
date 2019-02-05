
function updateTable(){
    var url = "api/name_list_get";

    $.getJSON(url, null, function (jsonResult) {
        for (var i = 0; i < jsonResult.length; i++ ){
            $("#dataTable tr:last").after('<tr><td>jsonResult[i].first</td><td>jsonResult[i].last</td></tr>');
        }
        console.log(jsonResult);
    });
    // $("#dataTable tr:last").after('<tr><td>Hi</td><td>there</td></tr>');
}

updateTable();



