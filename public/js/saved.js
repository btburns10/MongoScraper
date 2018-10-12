$(function() {

$(document).on("click", "#noteBtn", function() {
  
  $("#notes").empty();

  var thisId = $(this).attr("data-id");
 
  $.ajax({
    method: "GET",
    url: "/articles/saved/" + thisId
  })
    // With that done, add the note information to the page
    .then(function(data) {

      const card = $("<div>").addClass("card");
      const content = $("<div>").addClass("card-content");
      const action = $("<div>").addClass("card-action");

      content.append("<span class='card-title'>" + data.title + "</span>");
      content.append("<input id='titleinput' name='title' placeholder='title'>");
      content.append("<textarea id='bodyinput' name='body'></textarea>");
      action.append("<button data-id='" + data._id + "' id='saveNote' class='btn waves-effect'>Save Note</button>");
      card.append(content);
      card.append(action);
      $("#notes").append(card);

      if (data.note) {
        $("#titleinput").val(data.note.title);
        $("#bodyinput").val(data.note.body);
      }

    });

});

$(document).on("click", "#saveNote", function() {
 
  var thisId = $(this).attr("data-id");
  var titleInput = $("#titleinput").val()
  var bodyInput = $("#bodyinput").val()

  if(titleInput === "" || bodyInput === "") {
    alert("Please enter in both title and body area");
    return;
  }

  $.ajax({
    method: "POST",
    url: "/articles/saved/" + thisId,
    data: {
      title: titleInput,
      body: bodyInput
    }
  })
    .then(function(data) {
      console.log(data);
      $("#notes").empty();
    });

  $("#titleinput").val("");
  $("#bodyinput").val("");
});

$(document).on("click", "#deleteBtn", function() {
  
  var thisId = $(this).attr("data-id");
  
  $.ajax({
    method: "DELETE",
    url: "/articles/saved/" + thisId
    })
    .then(function(data) {
      location.reload();
      $("#notes").empty();
    });

  $("#titleinput").val("");
  $("#bodyinput").val("");
});


});