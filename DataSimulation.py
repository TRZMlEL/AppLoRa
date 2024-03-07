import json
import time
import random

while True:
    # Generowanie losowej temperatury
    temperatura = round(random.uniform(-30, 30), 2)
    
    # Zapisywanie temperatury do pliku JSON
    with open('dane.json', 'w') as plik:
        json.dump({'temperatura': temperatura}, plik)
    
    # Oczekiwanie 5 minut
    time.sleep(1)