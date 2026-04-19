

# # # """
# # # Secure proxy for Roboflow API.
# # # Handles image processing for currency detection.
# # # """
# # # import os
# # # import json
# # # import base64
# # # import requests
# # # from django.http import JsonResponse
# # # from django.views.decorators.csrf import csrf_exempt
# # # from django.views.decorators.http import require_POST
# # # from django.conf import settings
# # # import logging

# # # logger = logging.getLogger(__name__)

# # # # Single model endpoint (not workflow)
# # # # ROBOFLOW_API_URL = "https://detect.roboflow.com/indian-currency-detection-elfyf-yzoga/1"
# # # # ROBOFLOW_API_URL = "https://serverless.roboflow.com/vision-f4jow/workflows/find-currencies"
# # # # ROBOFLOW_API_URL = "https://serverless.roboflow.com/vision-f4jow/detect-count-and-visualize-2"
# # # ROBOFLOW_API_URL = "https://detect.roboflow.com/indian-currency-detection-elfyf-yzoga/1"

# # # # ROBOFLOW_API_URL = "https://detect.roboflow.com/currency-detection-cgpjn-enfha/1"
# # # ROBOFLOW_TIMEOUT = 30  # seconds

# # # @csrf_exempt
# # # @require_POST
# # # def roboflow_detect(request):
# # #     """
# # #     POST /api/roboflow/detect/
    
# # #     Accepts: { "image": "base64_string" }
    
# # #     Returns: Roboflow JSON response or error message.
# # #     """
# # #     try:
# # #         # 1. Validate API key
# # #         api_key = os.environ.get('ROBOFLOW_API_KEY')
# # #         if not api_key:
# # #             logger.error("ROBOFLOW_API_KEY environment variable not set")
# # #             return JsonResponse(
# # #                 {"error": "Service configuration error"},
# # #                 status=500
# # #             )
        
# # #         # 2. Parse request body
# # #         try:
# # #             data = json.loads(request.body)
# # #         except json.JSONDecodeError:
# # #             return JsonResponse(
# # #                 {"error": "Invalid JSON in request body"},
# # #                 status=400
# # #             )
        
# # #         # 3. Extract image data (base64 only for now)
# # #         image_base64 = data.get('image')
        
# # #         if not image_base64:
# # #             return JsonResponse(
# # #                 {"error": "Must provide 'image' (base64)"},
# # #                 status=400
# # #             )
        
# # #         # 4. Prepare image data
# # #         # Remove data URL prefix if present
# # #         if ',' in image_base64:
# # #             image_base64 = image_base64.split(',', 1)[1]
        
# # #         # Validate base64
# # #         try:
# # #             base64.b64decode(image_base64, validate=True)
# # #         except Exception:
# # #             return JsonResponse(
# # #                 {"error": "Invalid base64 image data"},
# # #                 status=400
# # #             )
        
# # #         # 5. Call Roboflow API
# # #         # params = {
# # #         #     "api_key": api_key,
# # #         #     "format": "json",
# # #         #     "confidence": 40,  # Lower confidence threshold
# # #         #     "overlap": 30
# # #         # }
        
# # #         # # For single model endpoint, we use multipart/form-data
# # #         # files = {
# # #         #     'file': ('image.jpg', base64.b64decode(image_base64), 'image/jpeg')
# # #         # }
# # #         # headers = {
# # #         #     "Content-Type": "application/json"
# # #         #     }

# # #         # payload = {
# # #         #     "api_key": api_key,
# # #         #     "inputs": {
# # #         #     "image": {
# # #         #     "type": "base64",
# # #         #     "value": image_base64
# # #         #         }
# # #         #     }
# # #         # }
# # #         # Decode image
# # #         image_bytes = base64.b64decode(image_base64)

# # #         files = {
# # #             "file": ("image.jpg", image_bytes, "image/jpeg")
# # #         }

# # #         params = {
# # #             "api_key": api_key,
# # #             "confidence": 40,
# # #             "overlap": 30
# # #         }

# # #         logger.info("Sending request to Roboflow detect.roboflow.com")

# # #         response = requests.post(
# # #             ROBOFLOW_API_URL,
# # #             params=params,
# # #             files=files,
# # #             timeout=ROBOFLOW_TIMEOUT
# # #         )
        

# # #         roboflow_data = response.json()
# # #         print("FULL ROBOFLOW RESPONSE:", json.dumps(roboflow_data, indent=2))

# # #         logger.info("Sending request to Roboflow detection API")
# # #         response = requests.post(
# # #             ROBOFLOW_API_URL,
# # #             # json=payload,
# # #             # headers=headers,
# # #             # params=params,
# # #             # files=files,
# # #             timeout=ROBOFLOW_TIMEOUT
# # #         )
        
# # #         # 6. Return Roboflow response
# # #         # if response.status_code == 200:
# # #         #     try:
# # #         #         roboflow_data = response.json()
# # #         #         # Add metadata
# # #         #         roboflow_data['_proxy'] = {
# # #         #             'success': True,
# # #         #             'backend': 'roboflow_detection'
# # #         #         }
# # #         #         return JsonResponse(roboflow_data, status=200)
# # #         #     except json.JSONDecodeError:
# # #         #         logger.error(f"Roboflow returned invalid JSON: {response.text[:200]}")
# # #         #         return JsonResponse(
# # #         #             {"error": "Invalid response from vision service"},
# # #         #             status=502
# # #         #         )
# # #         # else:
# # #         #     logger.error(f"Roboflow error {response.status_code}: {response.text[:200]}")
# # #         #     try:
# # #         #         error_data = response.json()
# # #         #         return JsonResponse(error_data, status=response.status_code)
# # #         #     except:
# # #         #         return JsonResponse(
# # #         #             {"error": f"Vision service error: {response.status_code}"},
# # #         #             status=response.status_code
# # #         #         )
# # #         roboflow_data = response.json()

# # # # Workflow output → detections
# # #         # Handle both dict and list responses safely
# # #         if isinstance(roboflow_data, dict):
# # #             outputs = roboflow_data.get("outputs", [])
# # #         elif isinstance(roboflow_data, list):
# # #             outputs = roboflow_data
# # #         else:
# # #             outputs = []

# # #         raw_preds = []

# # #         # if outputs and "predictions" in outputs[0]:
# # #         #     raw_preds = outputs[0]["predictions"].get("predictions", [])
# # #         raw_preds = []

# # #         if outputs:
# # #             first_output = outputs[0]

# # #     # Workflow format
# # #             if "data" in first_output and "predictions" in first_output["data"]:
# # #                 raw_preds = first_output["data"]["predictions"]

# # #     # Normal detect format fallback
# # #             elif "predictions" in first_output:
# # #                 raw_preds = first_output["predictions"]

# # #         roboflow_data = response.json()
# # #         print("FULL ROBOFLOW RESPONSE:", json.dumps(roboflow_data, indent=2))


# # #         CURRENCY_VALUES = {
# # #             "10": 10, "20": 20, "50": 50, "100": 100,
# # #                 "200": 200, "500": 500, "2000": 2000,
# # #                 "10_rupees": 10, "20_rupees": 20, "50_rupees": 50,
# # #             "100_rupees": 100, "200_rupees": 200,
# # #             "500_rupees": 500, "2000_rupees": 2000
# # #         }

# # #         COLORS = {
# # #             10: "#FF6B6B", 20: "#4ECDC4", 50: "#45B7D1",
# # #             100: "#96CEB4", 200: "#FFEAA7",
# # #             500: "#DDA0DD", 2000: "#98D8C8"
# # #         }

# # #         detections = []

# # #         for i, det in enumerate(raw_preds):
# # #             cls = det.get("class", "")
# # #             value = CURRENCY_VALUES.get(cls, 0)

# # #             detections.append({
# # #                 "id": f"det_{i}",
# # #                 "class": cls,
# # #                 "label": f"{value} Rupees" if value else "Currency",
# # #                 "confidence": det.get("confidence", 0),
# # #                 "value": value,
# # #                 "color": COLORS.get(value, "#00FF00"),
# # #                 "bbox": {
# # #                     "x": det["x"] - det["width"] / 2,
# # #                     "y": det["y"] - det["height"] / 2,
# # #                     "width": det["width"],
# # #                     "height": det["height"]
# # #                 }
# # #             })

# # #         return JsonResponse({
# # #             "detections": detections,
# # #             "count": len(detections)
# # #         }, status=200)

    
# # #     except requests.exceptions.Timeout:
# # #         logger.error("Roboflow API timeout")
# # #         return JsonResponse(
# # #             {"error": "Vision service timeout"},
# # #             status=504
# # #         )
# # #     except requests.exceptions.RequestException as e:
# # #         logger.error(f"Roboflow connection error: {str(e)}")
# # #         return JsonResponse(
# # #             {"error": f"Connection error: {str(e)}"},
# # #             status=503
# # #         )
# # #     except Exception as e:
# # #         logger.exception(f"Unexpected error in roboflow_detect: {str(e)}")
# # #         return JsonResponse(
# # #             {"error": "Internal server error"},
# # #             status=500
# # #         )


# # """
# # Secure proxy for Roboflow API.
# # Handles image processing for currency detection.
# # """
# # import os
# # import json
# # import base64
# # import requests
# # from django.http import JsonResponse
# # from django.views.decorators.csrf import csrf_exempt
# # from django.views.decorators.http import require_POST
# # import logging

# # logger = logging.getLogger(__name__)

# # # Single model endpoint
# # ROBOFLOW_API_URL = "https://detect.roboflow.com/indian-currency-detection-elfyf-yzoga/1"
# # ROBOFLOW_TIMEOUT = 30  # seconds

# # # Currency value mapping
# # CURRENCY_VALUES = {
# #     "10": 10, "20": 20, "50": 50, "100": 100,
# #     "200": 200, "500": 500, "2000": 2000,
# #     "10_rupees": 10, "20_rupees": 20, "50_rupees": 50,
# #     "100_rupees": 100, "200_rupees": 200,
# #     "500_rupees": 500, "2000_rupees": 2000
# # }

# # # Colors for different denominations
# # COLORS = {
# #     10: "#FF6B6B", 20: "#4ECDC4", 50: "#45B7D1",
# #     100: "#96CEB4", 200: "#FFEAA7",
# #     500: "#DDA0DD", 2000: "#98D8C8"
# # }

# # @csrf_exempt
# # @require_POST
# # def roboflow_detect(request):
# #     """
# #     POST /api/roboflow/detect/
    
# #     Accepts: { "image": "base64_string" }
    
# #     Returns: JSON with detections or error message.
# #     """
# #     try:
# #         # 1. Validate API key
# #         api_key = os.environ.get('ROBOFLOW_API_KEY')
# #         if not api_key:
# #             logger.error("ROBOFLOW_API_KEY environment variable not set")
# #             return JsonResponse(
# #                 {"error": "Service configuration error"},
# #                 status=500
# #             )
        
# #         # 2. Parse request body
# #         try:
# #             data = json.loads(request.body)
# #         except json.JSONDecodeError:
# #             return JsonResponse(
# #                 {"error": "Invalid JSON in request body"},
# #                 status=400
# #             )
        
# #         # 3. Extract image data
# #         image_base64 = data.get('image')
        
# #         if not image_base64:
# #             return JsonResponse(
# #                 {"error": "Must provide 'image' (base64)"},
# #                 status=400
# #             )
        
# #         # 4. Prepare image data
# #         # Remove data URL prefix if present
# #         if ',' in image_base64:
# #             image_base64 = image_base64.split(',', 1)[1]
        
# #         # Validate base64
# #         try:
# #             image_bytes = base64.b64decode(image_base64, validate=True)
# #         except Exception as e:
# #             logger.error(f"Invalid base64 image data: {str(e)}")
# #             return JsonResponse(
# #                 {"error": "Invalid base64 image data"},
# #                 status=400
# #             )
        
# #         # 5. Call Roboflow API
# #         files = {
# #             "file": ("image.jpg", image_bytes, "image/jpeg")
# #         }

# #         params = {
# #             "api_key": api_key,
# #             "confidence": 40,  # Lower confidence threshold
# #             "overlap": 30,
# #             "format": "json"
# #         }

# #         logger.info("Sending request to Roboflow detect.roboflow.com")
        
# #         try:
# #             response = requests.post(
# #                 ROBOFLOW_API_URL,
# #                 params=params,
# #                 files=files,
# #                 timeout=ROBOFLOW_TIMEOUT
# #             )
# #         except requests.exceptions.Timeout:
# #             logger.error("Roboflow API timeout")
# #             return JsonResponse(
# #                 {"error": "Vision service timeout"},
# #                 status=504
# #             )
# #         except requests.exceptions.RequestException as e:
# #             logger.error(f"Roboflow connection error: {str(e)}")
# #             return JsonResponse(
# #                 {"error": f"Connection error: {str(e)}"},
# #                 status=503
# #             )
        
# #         # 6. Process response
# #         if response.status_code != 200:
# #             logger.error(f"Roboflow error {response.status_code}: {response.text[:200]}")
# #             try:
# #                 error_data = response.json()
# #                 return JsonResponse(
# #                     {"error": error_data.get("message", f"Vision service error: {response.status_code}")},
# #                     status=response.status_code
# #                 )
# #             except:
# #                 return JsonResponse(
# #                     {"error": f"Vision service error: {response.status_code}"},
# #                     status=response.status_code
# #                 )
        
# #         # 7. Parse and format detections
# #         try:
# #             roboflow_data = response.json()
# #             logger.info(f"Roboflow response: {json.dumps(roboflow_data, indent=2)}")
            
# #             predictions = roboflow_data.get("predictions", [])
            
# #             detections = []
# #             for i, pred in enumerate(predictions):
# #                 cls = pred.get("class", "")
# #                 value = CURRENCY_VALUES.get(cls, 0)
                
# #                 detections.append({
# #                     "id": f"det_{i}",
# #                     "class": cls,
# #                     "label": f"{value} Rupees" if value else "Currency",
# #                     "confidence": pred.get("confidence", 0),
# #                     "value": value,
# #                     "color": COLORS.get(value, "#00FF00"),
# #                     "bbox": {
# #                         "x": pred["x"] - pred["width"] / 2,
# #                         "y": pred["y"] - pred["height"] / 2,
# #                         "width": pred["width"],
# #                         "height": pred["height"]
# #                     }
# #                 })
            
# #             return JsonResponse({
# #                 "detections": detections,
# #                 "count": len(detections),
# #                 "_proxy": {
# #                     "success": True,
# #                     "backend": "roboflow_detection"
# #                 }
# #             }, status=200)
            
# #         except json.JSONDecodeError:
# #             logger.error(f"Roboflow returned invalid JSON: {response.text[:200]}")
# #             return JsonResponse(
# #                 {"error": "Invalid response from vision service"},
# #                 status=502
# #             )
# #         except KeyError as e:
# #             logger.error(f"Unexpected response format from Roboflow: {str(e)}")
# #             return JsonResponse(
# #                 {"error": "Unexpected response format from vision service"},
# #                 status=502
# #             )
    
# #     except Exception as e:
# #         logger.exception(f"Unexpected error in roboflow_detect: {str(e)}")
# #         return JsonResponse(
# #             {"error": "Internal server error"},
# #             status=500
# #         )


# """
# Secure proxy for Roboflow API.
# Handles image processing for currency detection.
# """
# import os
# import json
# import base64
# import requests
# from django.http import JsonResponse
# from django.views.decorators.csrf import csrf_exempt
# from django.views.decorators.http import require_POST
# import logging

# logger = logging.getLogger(__name__)

# # Single model endpoint
# # ROBOFLOW_API_URL = "https://detect.roboflow.com/indian-currency-detection-elfyf-yzoga/1"  #currency-detection-cgpjn-enfha/1
# ROBOFLOW_API_URL = "https://detect.roboflow.com/currency-detection-cgpjn-enfha/1" 
# ROBOFLOW_TIMEOUT = 30  # seconds

# # Currency value mapping
# CURRENCY_VALUES = {
#     "10": 10, "20": 20, "50": 50, "100": 100,
#     "200": 200, "500": 500, "2000": 2000,
#     "10_rupees": 10, "20_rupees": 20, "50_rupees": 50,
#     "100_rupees": 100, "200_rupees": 200,
#     "500_rupees": 500, "2000_rupees": 2000
# }

# # Colors for different denominations
# COLORS = {
#     10: "#FF6B6B", 20: "#4ECDC4", 50: "#45B7D1",
#     100: "#96CEB4", 200: "#FFEAA7",
#     500: "#DDA0DD", 2000: "#98D8C8"
# }

# @csrf_exempt
# @require_POST
# def roboflow_detect(request):
#     """
#     POST /api/roboflow/detect/
    
#     Accepts: { "image": "base64_string" }
    
#     Returns: JSON with detections or error message.
#     """
#     try:
#         # 1. Validate API key
#         api_key = os.environ.get('ROBOFLOW_API_KEY')
#         if not api_key:
#             logger.error("ROBOFLOW_API_KEY environment variable not set")
#             return JsonResponse(
#                 {"error": "Service configuration error"},
#                 status=500
#             )
        
#         # 2. Parse request body
#         try:
#             data = json.loads(request.body)
#         except json.JSONDecodeError:
#             return JsonResponse(
#                 {"error": "Invalid JSON in request body"},
#                 status=400
#             )
        
#         # 3. Extract image data
#         image_base64 = data.get('image')
        
#         if not image_base64:
#             return JsonResponse(
#                 {"error": "Must provide 'image' (base64)"},
#                 status=400
#             )
        
#         # 4. Prepare image data
#         # Remove data URL prefix if present
#         if ',' in image_base64:
#             image_base64 = image_base64.split(',', 1)[1]
        
#         # Validate base64
#         try:
#             image_bytes = base64.b64decode(image_base64, validate=True)
#         except Exception as e:
#             logger.error(f"Invalid base64 image data: {str(e)}")
#             return JsonResponse(
#                 {"error": "Invalid base64 image data"},
#                 status=400
#             )
        
#         # 5. Call Roboflow API
#         files = {
#             "file": ("image.jpg", image_bytes, "image/jpeg")
#         }

#         params = {
#             "api_key": api_key,
#             "confidence": 40,  # Lower confidence threshold
#             "overlap": 30,
#             "format": "json"
#         }

#         logger.info("Sending request to Roboflow detect.roboflow.com")
        
#         try:
#             response = requests.post(
#                 ROBOFLOW_API_URL,
#                 params=params,
#                 files=files,
#                 timeout=ROBOFLOW_TIMEOUT
#             )
#         except requests.exceptions.Timeout:
#             logger.error("Roboflow API timeout")
#             return JsonResponse(
#                 {"error": "Vision service timeout"},
#                 status=504
#             )
#         except requests.exceptions.RequestException as e:
#             logger.error(f"Roboflow connection error: {str(e)}")
#             return JsonResponse(
#                 {"error": f"Connection error: {str(e)}"},
#                 status=503
#             )
        
#         # 6. Process response
#         if response.status_code != 200:
#             logger.error(f"Roboflow error {response.status_code}: {response.text[:200]}")
#             try:
#                 error_data = response.json()
#                 return JsonResponse(
#                     {"error": error_data.get("message", f"Vision service error: {response.status_code}")},
#                     status=response.status_code
#                 )
#             except:
#                 return JsonResponse(
#                     {"error": f"Vision service error: {response.status_code}"},
#                     status=response.status_code
#                 )
        
#         # 7. Parse and format detections
#         try:
#             roboflow_data = response.json()
#             logger.info(f"Roboflow response received with {len(roboflow_data.get('predictions', []))} predictions")
            
#             predictions = roboflow_data.get("predictions", [])
            
#             # Get image dimensions from response or use defaults
#             image_info = roboflow_data.get("image", {})
#             image_width = image_info.get("width", 640)
#             image_height = image_info.get("height", 480)
            
#             detections = []
#             for i, pred in enumerate(predictions):
#                 cls = pred.get("class", "")
#                 value = CURRENCY_VALUES.get(cls, 0)
                
#                 # Get absolute coordinates from Roboflow
#                 x_center = pred.get("x", 0)  # Center x
#                 y_center = pred.get("y", 0)  # Center y
#                 width = pred.get("width", 0)
#                 height = pred.get("height", 0)
                
#                 # Calculate top-left corner from center coordinates
#                 x_tl = x_center - (width / 2)
#                 y_tl = y_center - (height / 2)
                
#                 # Convert to relative coordinates (0-1) for frontend
#                 # This is the KEY FIX - frontend expects relative coordinates
#                 rel_x = x_tl / image_width if image_width > 0 else 0
#                 rel_y = y_tl / image_height if image_height > 0 else 0
#                 rel_width = width / image_width if image_width > 0 else 0
#                 rel_height = height / image_height if image_height > 0 else 0
                
#                 # Ensure coordinates are within 0-1 range
#                 rel_x = max(0, min(1, rel_x))
#                 rel_y = max(0, min(1, rel_y))
#                 rel_width = max(0, min(1, rel_width))
#                 rel_height = max(0, min(1, rel_height))
                
#                 detections.append({
#                     "id": f"det_{i}",
#                     "class": cls,
#                     "label": f"{value} Rupees" if value else "Currency",
#                     "confidence": pred.get("confidence", 0),
#                     "value": value,
#                     "color": COLORS.get(value, "#00FF00"),
#                     "bbox": {
#                         "x": rel_x,        # Relative coordinates (0-1)
#                         "y": rel_y,        # Relative coordinates (0-1)
#                         "width": rel_width,
#                         "height": rel_height,
#                         "absolute": {      # Keep absolute for debugging
#                             "x": x_tl,
#                             "y": y_tl,
#                             "width": width,
#                             "height": height
#                         }
#                     }
#                 })
            
#             logger.info(f"Processed {len(detections)} detections")
            
#             return JsonResponse({
#                 "detections": detections,
#                 "count": len(detections),
#                 "image_info": {
#                     "width": image_width,
#                     "height": image_height
#                 },
#                 "_proxy": {
#                     "success": True,
#                     "backend": "roboflow_detection"
#                 }
#             }, status=200)
            
#         except json.JSONDecodeError:
#             logger.error(f"Roboflow returned invalid JSON: {response.text[:200]}")
#             return JsonResponse(
#                 {"error": "Invalid response from vision service"},
#                 status=502
#             )
#         except KeyError as e:
#             logger.error(f"Unexpected response format from Roboflow: {str(e)}")
#             return JsonResponse(
#                 {"error": "Unexpected response format from vision service"},
#                 status=502
#             )
    
#     except Exception as e:
#         logger.exception(f"Unexpected error in roboflow_detect: {str(e)}")
#         return JsonResponse(
#             {"error": "Internal server error"},
#             status=500
#         )



"""
Secure proxy for Roboflow API.
Handles image processing for currency detection.
"""
import os
import json
import base64
import requests
import re
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
import logging

logger = logging.getLogger(__name__)

# New model endpoint
ROBOFLOW_API_URL = "https://detect.roboflow.com/currency-detection-cgpjn-enfha/1"
ROBOFLOW_TIMEOUT = 30  # seconds

# Colors for different denominations
COLORS = {
    10: "#FF6B6B", 20: "#4ECDC4", 50: "#45B7D1",
    100: "#96CEB4", 200: "#FFEAA7",
    500: "#DDA0DD", 2000: "#98D8C8"
}

def extract_currency_value_from_class(class_name):
    """
    Extract currency value from messy class names like "4- 100 Rupees", "2- 500 Rupees", etc.
    """
    if not class_name:
        return 0
    
    # Log the raw class name for debugging
    logger.debug(f"Processing class name: '{class_name}'")
    
    # Common patterns in the new model
    patterns = [
        (r'(\d+)\s*-\s*(\d+)\s+rupees?', 2),  # "4- 100 rupees"
        (r'(\d+)\s*-\s*(\d+)', 2),             # "4-100"
        (r'(\d+)\s+rupees?', 1),               # "100 rupees"
        (r'₹?\s*(\d+)', 1),                    # "₹100" or "100"
        (r'(\d+)\s*rs', 1),                    # "100rs"
        (r'(\d+)_rupees?', 1),                 # "100_rupees"
        (r'(\d+)_rs', 1),                      # "100_rs"
        (r'ten|10', 10),                       # "ten" or "10"
        (r'twenty|20', 20),                    # "twenty" or "20"
        (r'fifty|50', 50),                     # "fifty" or "50"
        (r'hundred|100', 100),                 # "hundred" or "100"
        (r'two[\s_]*hundred|200', 200),        # "two hundred" or "200"
        (r'five[\s_]*hundred|500', 500),       # "five hundred" or "500"
        (r'two[\s_]*thousand|2000', 2000),     # "two thousand" or "2000"
    ]
    
    # Try each pattern
    for pattern, group in patterns:
        if isinstance(pattern, str):
            match = re.search(pattern, class_name.lower())
            if match:
                if group == 10:  # These are direct value returns
                    return 10
                elif group == 20:
                    return 20
                elif group == 50:
                    return 50
                elif group == 100:
                    return 100
                elif group == 200:
                    return 200
                elif group == 500:
                    return 500
                elif group == 2000:
                    return 2000
                else:
                    try:
                        value = int(match.group(group))
                        # Validate it's a standard Indian currency denomination
                        valid_denominations = [10, 20, 50, 100, 200, 500, 2000]
                        if value in valid_denominations:
                            return value
                    except (IndexError, ValueError):
                        continue
    
    # If no pattern matched, try to extract any number
    numbers = re.findall(r'\d+', class_name)
    if numbers:
        try:
            value = int(numbers[-1])  # Take the last number (usually the denomination)
            valid_denominations = [10, 20, 50, 100, 200, 500, 2000]
            if value in valid_denominations:
                return value
        except:
            pass
    
    return 0

def clean_class_name(class_name):
    """
    Clean up messy class names.
    """
    if not class_name:
        return ""
    
    # Remove leading numbers with dashes (like "4- ")
    class_name = re.sub(r'^\d+\s*-\s*', '', class_name)
    
    # Remove common suffixes
    class_name = re.sub(r'\s+rupees?', '', class_name, flags=re.IGNORECASE)
    class_name = re.sub(r'\s+rs\.?', '', class_name, flags=re.IGNORECASE)
    class_name = re.sub(r'[₹\$]', '', class_name)
    
    # Trim whitespace
    class_name = class_name.strip()
    
    # Convert to lowercase for consistency
    return class_name.lower()

def create_label_from_class_and_value(class_name, value):
    """
    Create a clean label for display.
    """
    if value > 0:
        return f"{value} Rupees"
    else:
        # Try to extract a clean name
        clean_name = clean_class_name(class_name)
        if clean_name and clean_name.isdigit():
            return f"{clean_name} Rupees"
        elif clean_name:
            # Capitalize first letter
            return clean_name.title()
        else:
            return "Currency"

@csrf_exempt
@require_POST
def roboflow_detect(request):
    """
    POST /api/roboflow/detect/
    
    Accepts: { "image": "base64_string" }
    
    Returns: JSON with detections or error message.
    """
    try:
        # 1. Validate API key
        api_key = os.environ.get('ROBOFLOW_API_KEY')
        if not api_key:
            logger.error("ROBOFLOW_API_KEY environment variable not set")
            return JsonResponse(
                {"error": "Service configuration error"},
                status=500
            )
        
        # 2. Parse request body
        try:
            data = json.loads(request.body)
        except json.JSONDecodeError:
            return JsonResponse(
                {"error": "Invalid JSON in request body"},
                status=400
            )
        
        # 3. Extract image data
        image_base64 = data.get('image')
        
        if not image_base64:
            return JsonResponse(
                {"error": "Must provide 'image' (base64)"},
                status=400
            )
        
        # 4. Prepare image data
        # Remove data URL prefix if present
        if ',' in image_base64:
            image_base64 = image_base64.split(',', 1)[1]
        
        # Validate base64
        try:
            image_bytes = base64.b64decode(image_base64, validate=True)
        except Exception as e:
            logger.error(f"Invalid base64 image data: {str(e)}")
            return JsonResponse(
                {"error": "Invalid base64 image data"},
                status=400
            )
        
        # 5. Call Roboflow API
        files = {
            "file": ("image.jpg", image_bytes, "image/jpeg")
        }

        params = {
            "api_key": api_key,
            "confidence": 25,  # Lower confidence for better detection
            "overlap": 30,
            "format": "json"
        }

        logger.info(f"Sending request to Roboflow: {ROBOFLOW_API_URL}")
        
        try:
            response = requests.post(
                ROBOFLOW_API_URL,
                params=params,
                files=files,
                timeout=ROBOFLOW_TIMEOUT
            )
        except requests.exceptions.Timeout:
            logger.error("Roboflow API timeout")
            return JsonResponse(
                {"error": "Vision service timeout"},
                status=504
            )
        except requests.exceptions.RequestException as e:
            logger.error(f"Roboflow connection error: {str(e)}")
            return JsonResponse(
                {"error": f"Connection error: {str(e)}"},
                status=503
            )
        
        # 6. Process response
        if response.status_code != 200:
            logger.error(f"Roboflow error {response.status_code}: {response.text[:200]}")
            try:
                error_data = response.json()
                return JsonResponse(
                    {"error": error_data.get("message", f"Vision service error: {response.status_code}")},
                    status=response.status_code
                )
            except:
                return JsonResponse(
                    {"error": f"Vision service error: {response.status_code}"},
                    status=response.status_code
                )
        
        # 7. Parse and format detections
        try:
            roboflow_data = response.json()
            logger.info(f"Roboflow response: {json.dumps(roboflow_data, indent=2)}")
            
            predictions = roboflow_data.get("predictions", [])
            
            # Get image dimensions from response or use defaults
            image_info = roboflow_data.get("image", {})
            image_width = image_info.get("width", 640)
            image_height = image_info.get("height", 480)
            
            detections = []
            for i, pred in enumerate(predictions):
                raw_class = pred.get("class", "")
                confidence = pred.get("confidence", 0)
                
                # Skip low confidence predictions
                if confidence < 0.25:  # 25% confidence threshold
                    continue
                
                # Extract currency value from messy class name
                value = extract_currency_value_from_class(raw_class)
                
                # Clean the class name for display
                clean_class = clean_class_name(raw_class)
                
                # Get absolute coordinates from Roboflow
                x_center = pred.get("x", 0)  # Center x
                y_center = pred.get("y", 0)  # Center y
                width = pred.get("width", 0)
                height = pred.get("height", 0)
                
                # Calculate top-left corner from center coordinates
                x_tl = x_center - (width / 2)
                y_tl = y_center - (height / 2)
                
                # Convert to relative coordinates (0-1) for frontend
                rel_x = x_tl / image_width if image_width > 0 else 0
                rel_y = y_tl / image_height if image_height > 0 else 0
                rel_width = width / image_width if image_width > 0 else 0
                rel_height = height / image_height if image_height > 0 else 0
                
                # Ensure coordinates are within 0-1 range
                rel_x = max(0, min(1, rel_x))
                rel_y = max(0, min(1, rel_y))
                rel_width = max(0, min(1, rel_width))
                rel_height = max(0, min(1, rel_height))
                
                # Determine color based on value
                color = COLORS.get(value, "#00FF00")
                
                # Create label
                label = create_label_from_class_and_value(raw_class, value)
                
                detections.append({
                    "id": f"det_{i}",
                    "class": clean_class,  # Use cleaned class name
                    "label": label,
                    "confidence": confidence,
                    "value": value,
                    "color": color,
                    "bbox": {
                        "x": rel_x,        # Relative coordinates (0-1)
                        "y": rel_y,        # Relative coordinates (0-1)
                        "width": rel_width,
                        "height": rel_height,
                        "absolute": {      # Keep absolute for debugging
                            "x": x_tl,
                            "y": y_tl,
                            "width": width,
                            "height": height
                        }
                    },
                    "raw_class": raw_class,  # Keep original for debugging
                    "raw_confidence": confidence
                })
            
            logger.info(f"Processed {len(detections)} detections")
            for det in detections:
                logger.info(f"Detection: class='{det['raw_class']}' -> clean='{det['class']}' -> value={det['value']} -> label='{det['label']}'")
            
            return JsonResponse({
                "detections": detections,
                "count": len(detections),
                "image_info": {
                    "width": image_width,
                    "height": image_height
                },
                "_proxy": {
                    "success": True,
                    "backend": "roboflow_detection",
                    "raw_predictions_count": len(predictions),
                    "model": "currency-detection-cgpjn-enfha"
                }
            }, status=200)
            
        except json.JSONDecodeError:
            logger.error(f"Roboflow returned invalid JSON: {response.text[:200]}")
            return JsonResponse(
                {"error": "Invalid response from vision service"},
                status=502
            )
        except KeyError as e:
            logger.error(f"Unexpected response format from Roboflow: {str(e)}")
            return JsonResponse(
                {"error": "Unexpected response format from vision service"},
                status=502
            )
    
    except Exception as e:
        logger.exception(f"Unexpected error in roboflow_detect: {str(e)}")
        return JsonResponse(
            {"error": "Internal server error"},
            status=500
        )