from django.http import JsonResponse
from django.shortcuts import redirect
from django.utils import timezone
from django.views.decorators.csrf import csrf_exempt
from .models import URL
from .utils import generate_code
import json


@csrf_exempt
def shorten_url(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body.decode('utf-8'))
            original = data.get("url")

            if not original:
                return JsonResponse({"error": "URL is required"})

            code = generate_code()

            obj = URL.objects.create(
                original_url=original,
                short_code=code
            )

            return JsonResponse({
                "short_url": f"http://127.0.0.1:8000/{code}"
            })

        except Exception as e:
            return JsonResponse({"error": str(e)})

    return JsonResponse({"error": "Only POST method allowed"})


def redirect_url(request, code):
    try:
        obj = URL.objects.get(short_code=code)

        obj.clicks += 1
        obj.save()

        return redirect(obj.original_url)

    except URL.DoesNotExist:
        return JsonResponse({"error": "Invalid URL"})