$(function() {

$(document).on("click", "#saveBtn", function() {
    var targetArticle = $(this);
    var title = $(this).parent().parent().find("span").text();
    var summary = $(this).parent().parent().find("p").text();
    var link = $(this).parent().find("a").attr("href");

    $.ajax({
        method: "POST",
        url: "/articles/saved",
        data: {
            title: title,
            summary: summary,
            link: link
        }
    })
    .then(function(data) {
        console.log(data);
        targetArticle.html("Saved");
    });
});

});