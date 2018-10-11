$(function() {

$(document).on("click", "#noteBtn", function() {
  
  $("#notes").empty();

  var thisId = $(this).parent().parent().parent().find(".card-content").attr("data-id");
  
  $.ajax({
    method: "GET",
    url: "/articles/saved/" + thisId
  })
    // With that done, add the note information to the page
    .then(function(data) {
      console.log(data);
      $("#notes").append("<h2>" + data.title + "</h2>");
      $("#notes").append("<input id='titleinput' name='title' placeholder='title'>");
      $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
      $("#notes").append("<button data-id='" + data._id + "' id='saveNote'>Save Note</button>");

      if (data.note) {
        $("#titleinput").val(data.note.title);
        $("#bodyinput").val(data.note.body);
      }
    });

});

$(document).on("click", "#saveNote", function() {
  
  var thisId = $(this).attr("data-id");

  $.ajax({
    method: "POST",
    url: "/articles/saved/" + thisId,
    data: {
      title: $("#titleinput").val(),
      body: $("#bodyinput").val()
    }
  })
    .then(function(data) {
      console.log(data);
      $("#notes").empty();
    });

  $("#titleinput").val("");
  $("#bodyinput").val("");
});


});