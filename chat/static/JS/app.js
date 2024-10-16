$(document).ready(function () {
    $("#user-input").attr("placeholder", "Ask your question here?");
    $("#chat-form").submit(function (event) {
        event.preventDefault();
        
        var userImage = $("<img>").attr("src", "static/IM/user.png").addClass("user-image");
        var userLabel = $("<p>").append(userImage).append($("<strong>").text("User:"));
        $("#chat-history").append(userLabel);
        var userInput = $("#user-input").val();
        $("#user-input").val("");
        var userResponseElement = $("<p>").text(userInput);
        $("#chat-history").append(userResponseElement);
        

        var aiResponseElement = $("<p>");
        var aiImage = $("<img>")
            .attr("src", "static/IM/algo.png")
            .addClass("logo_chatbot");
        var aiLabel = $("<p>").append(aiImage).append($("<strong>").text("Algo-ml:"));
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

  