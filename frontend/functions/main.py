# Welcome to Cloud Functions for Firebase for Python!
# To get started, simply uncomment the below code or create your own.
# Deploy with `firebase deploy`
import pandas as pd
import requests
from typing import Any
import tempfile

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