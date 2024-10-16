$(document).ready(function () {
    $("#user-input").attr("placeholder", "Ask your question here?");
    $("#chat-form").submit(function (event) {
        event.preventDefault();
        var userImage = $("<img>")
        .attr("src", "static/IM/user.png")
        .addClass("user-image");
        $("#chat-history").append(userImage);
        var userInput = $("#user-input").val();
        $("#user-input").val("");
        $("#chat-history").append(
            "<p><strong>User:</strong></p><p>" + userInput + "</p>"
        );

        var aiResponseElement = $("<p>");
        var aiImage = $("<img>")
            .attr("src", "https://avatars.githubusercontent.com/u/147204191?s=280&v=4")
            .addClass("logo_chatbot");
        var aiLabel = $("<p>").append(aiImage).append($("<strong>").text("Ollama:"));
        $("#chat-history").append(aiLabel);
        $("#chat-history").append(aiResponseElement);
        $.ajax({
            type: "POST",
            url: "/",
            data: { user_input: userInput },
            xhrFields: {
                onprogress: function (xhr) {
                    var response = xhr.target.responseText;
                    aiResponseElement.html(function (i, oldHtml) {
                        return response;
                    });
                },
            },
        });
    });
});

  