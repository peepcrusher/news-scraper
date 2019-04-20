//Get the json data
$.getJSON("/articles", function(data){
    for (let i = 0; i < data.length; i++){
        $("#articles").append("<p class='title' data-id='" + data[i]._id + "'>" 
        + data[i].title + "<br> <p>" 
        + data[i].summary + "</p> <br>"
        + data[i].link + "</p>");
    }
});

//on click listener for p tags
$(document).on("click", "p", function(){

    $("#notes").empty();

    var thisId = $(this).attr("data-id");

    $.ajax({
        meshod: "GET",
        url: "/articles/" + thisId
    })
    .then(function(data){

        $("#notes").append("<h2>" + data.title + "</h2>");

        $("#notes").append("<input id='titleinput' name='title'>");

        $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");

        $("#notes").append("<button data-id='" + data._id + "' id='savenote'> Save Note</button>");


            //this button wouldn't show up for some reason
        // $("$notes").append("<button data-id='" + data._id + "' id='deletenote'>Delete Note</button>");

        if(data.note){
            $("#titleinput").val(data.note.title);

            $("#bodyinput").val(data.note.body);
        }

    });
});


//on click for save note button

$(document).on("click", "#savenote", function(){
    var thisId = $(this).attr("data-id")

    $.ajax({
        method: "POST",
        url:"/articles/" + thisId,
        data:{
            title: $("#titleinput").val(),

            body: $("#bodyinput").val()
        }
    })
    .then(function(data){

        console.log(data);
        $("#notes").empty();
    })

    $("#titleinput").val("");
    $("#bodyinput").val("");
})
//My attempt at a delete note function
// $(document).on("click", "#deletenote", function(){
// var thisId = $(this.attr("data-id"))

//     $.ajax({
//         method: "PUT",
//         url:"/articles/" + thisId
//     }).then(function(){
//         $("#titleinput").empty();
//         $("#bodyinput").empty();
//     })
// })