# Welcome to Cloud Functions for Firebase for Python!
# To get started, simply uncomment the below code or create your own.
# Deploy with `firebase deploy`
import pandas as pd
import requests
from typing import Any
import tempfile
from bs4 import BeautifulSoup

from firebase_functions import https_fn
from firebase_admin import initialize_app, storage

initialize_app()


#@https_fn.on_call()
#def on_request_example(data=None, context=None):
#    return "Hello world!"

@https_fn.on_call()
def sendImageToAnalize(req: https_fn.CallableRequest) -> Any:
    # Extract the image reference from the data
    image_ref = req.data['ref']
    
    # Initialize the Cloud Storage client
    
    
    # Retrieve the image from Cloud Storage
    #bucket_name, blob_name = image_ref.split('/', 1)
    bucket = storage.bucket()
    blob = bucket.blob(image_ref)
    image_data = blob.download_as_bytes()
    
    url = 'https://autoderm.ai/v1/query'
    files = {'file': image_data}
    data = {'model': 'autoderm_v2_2', 'language': 'en'}
    headers = {'Api-Key': 'fae5546e-4885-bc74-03fd-df5d0847d4d5'}

    response = requests.post(url, headers=headers, files=files, data=data)
    answer = response.json()
    extracted_data = []
    for prediction in answer['predictions']:
        extracted_data.append({
            'name': prediction['name'],
            'confidence': prediction['confidence'],
            'possibility': prediction['possibility'],
            'icd': prediction['icd']
        })


    

    #response = requests.post(external_api_url, files=files)
    df = pd.DataFrame(extracted_data)
    # Return the response from the external API
    return (df.to_dict())

@https_fn.on_call()
def placeholderAnalysis(req: https_fn.CallableRequest) -> Any:
    placeholderResponse = {
        "confidence": {
            "0": 0.29832575476249396,
            "1": 0.2650293226068412,
            "2": 0.16543214311466295,
            "3": 0.15475950634365035,
            "4": 0.09145327317235143
        },
        "icd": {
            "0": "L70.0",
            "1": "L70.9",
            "2": "L71.9",
            "3": "L70.0",
            "4": "L71.0"
        },
        "name": {
            "0": "Acne Nodulocystica",
            "1": "Acne, Unspecified",
            "2": "Rosacea",
            "3": "Acne Vulgaris",
            "4": "Perioral Dermatitis"
        },
        "possibility": {
            "0": "Possible",
            "1": "Possible",
            "2": "Possible",
            "3": "Possible",
            "4": "Low Possibility"
        }
    }
    return placeholderResponse


def scrape_pharmacy_products(base_url, search_keyword):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }

    # Construct the search URL for Salcobrand
    search_url = f"{base_url}/catalogsearch/result/?q={search_keyword}"
    response = requests.get(search_url, headers=headers)

    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')

        # Find product containers (based on inspecting Salcobrand's HTML)
        products = soup.find_all('li', class_='item product product-item')
        product_data = []

        for product in products:
            # Extract product name and URL
            name = product.find('a', class_='product-item-link').text.strip()
            url = product.find('a', href=True)['href']
            product_data.append({'name': name, 'url': url})

        return product_data
    else:
        return f"Error: Unable to fetch data (Status code: {response.status_code})"