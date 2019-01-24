
function printHello(){
    console.log("Hello");
}

function addNumbers(){
    $("#field3").val(parseInt($("#field1").val()) + parseInt($("#field2").val()));
}

function hideParagraph(){
    var paragraph = $("#paragraphToHide");
    if(paragraph.is(":visible")){
        paragraph.hide();
    } else {
        paragraph.show();
    }
}

function testPhoneNumber(){
    var pattern = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
    if(pattern.test(document.getElementById("phoneField").value)){
        console.log("OK");
    } else {
        console.log("Bad");
    }
}

function formJson(){
    var jsonData = {"firstName": document.getElementById("firstName").value,
    "lastName": document.getElementById("lastName").value,
    "email" : document.getElementById("email").value};
    console.log(jsonData);
}