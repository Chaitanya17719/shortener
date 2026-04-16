import string, random
from .models import URL

def generate_code(length=6):
    chars = string.ascii_letters + string.digits
    while True:
        code = ''.join(random.choice(chars) for _ in range(length))
        if not URL.objects.filter(short_code=code).exists():
            return code