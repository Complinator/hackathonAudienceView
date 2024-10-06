import pandas as pd
from typing import Any
from firebase_functions import https_fn
from firebase_admin import initialize_app

initialize_app()

@https_fn.on_call()
def sendImageToAnalize(req: https_fn.CallableRequest) -> Any:
    # Return the placeholder response
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

# You can keep the placeholderAnalysis function if you plan to use it separately
@https_fn.on_call()
def placeholderAnalysis(req: https_fn.CallableRequest) -> Any:
    # Return the same placeholder response or modify as needed
    return sendImageToAnalize(req)
