var categories = [
    "NFL",
    "NASCAR Crashes",
    "Drag Racing",
    "Monster Trucks",
    "Hockey"
];

renderButtons();

function renderButtons() {
    $(".buttons-list").empty();
    for (var i = 0; i < categories.length; i++) {
        a = $("<button type='button' class='btn btn-primary sport'>")
        a.attr("data-sport", categories[i]);
        a.text(categories[i]);
        $(".buttons-list").append(a);
    };
};

$(document).on("click", ".sport", function () {
    $(".gifs-here").empty();
    var sport = $(this).attr("data-sport");
    console.log(sport);
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + sport + "&api_key=FEj11nhsLnqCILfQ3ejV1S7kZa2Vcr1W&limit=10";
    console.log(queryURL);
    $.ajax({
        url: queryURL,
        method: "GET"
    })

        .then(function (response) {
            var results = response.data;
            for (var i = 0; i < results.length; i++) {
                var gifDiv = $("<div class='gif-images'>");
                var rating = results[i].rating;
                var p = $("<p>").text("Rating: " + rating);
                var img = $("<img>");

                img.attr("src", results[i].images.fixed_height_still.url);
                img.attr("data-still", results[i].images.fixed_height_still.url);
                img.attr("data-animate", results[i].images.fixed_height.url);
                img.attr("data-state", "still");
                img.addClass("gif");

                gifDiv.prepend(p);
                gifDiv.prepend(img);

                $(".gifs-here").prepend(gifDiv);
            };

            $(".gif").on("click", function () {
                var state = $(this).attr("data-state");

                if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                } else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still")
                };
            });

        });
});

$(document).on("click", "#add-sport", function () {
    event.preventDefault();
    var newSport = $("#user-input").val().trim();
    console.log(newSport);
    categories.push(newSport);
    console.log(categories);
    $("#user-input").val("");
    renderButtons();
});