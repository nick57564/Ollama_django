from django.shortcuts import render
from django.http import StreamingHttpResponse
from .communication import generate_response
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
def chat_view(request):
    if request.method == "POST":
        user_input = request.POST["user_input"]
        prompt = f"User: {user_input}\nAI:"
        response = generate_response(prompt)
        print(response)
        return StreamingHttpResponse(response, content_type='text/plain')
    return render(request, "chatbot.html")