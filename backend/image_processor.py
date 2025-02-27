import cv2
import numpy as np
import base64
from typing import Dict
import tensorflow as tf
from datetime import datetime

def draw_detection_box(image: np.ndarray, class_name: str, confidence: float) -> np.ndarray:
    """Draw detection box and label on image with improved visibility"""
    height, width = image.shape[:2]
    
    # Calculate box size (80% of smaller dimension)
    box_size = min(width, height) * 0.8
    x1 = int((width - box_size) / 2)
    y1 = int((height - box_size) / 2)
    x2 = int(x1 + box_size)
    y2 = int(y1 + box_size)

    # Make a copy to avoid modifying original
    output_image = image.copy()

    # Draw green rectangle with increased thickness
    cv2.rectangle(output_image, (x1, y1), (x2, y2), (0, 255, 0), 3)

    # Prepare label text
    label = f"{class_name}: {confidence:.1%}"
    
    # Use larger font for better visibility
    font = cv2.FONT_HERSHEY_SIMPLEX
    font_scale = 1.2
    thickness = 2
    
    # Get text size for background
    (label_width, label_height), baseline = cv2.getTextSize(
        label, font, font_scale, thickness
    )

    # Draw semi-transparent background for text
    overlay = output_image.copy()
    cv2.rectangle(
        overlay,
        (x1, y1 - label_height - 10),
        (x1 + label_width + 10, y1),
        (0, 255, 0),
        -1
    )
    
    # Apply overlay with transparency
    alpha = 0.7
    cv2.addWeighted(overlay, alpha, output_image, 1 - alpha, 0, output_image)

    # Draw white text
    cv2.putText(
        output_image,
        label,
        (x1 + 5, y1 - 5),
        font,
        font_scale,
        (255, 255, 255),
        thickness,
        cv2.LINE_AA
    )

    return output_image

def process_single_image(
    image: np.ndarray,
    model: tf.keras.Model,
    categories: list,
) -> Dict:
    """Process a single image and return detection results with labeled image"""
    try:
        # Keep original image for drawing
        original_image = image.copy()

        # Preprocess image for model
        processed_image = cv2.resize(image, (224, 224))
        if len(processed_image.shape) == 2:
            processed_image = cv2.cvtColor(processed_image, cv2.COLOR_GRAY2RGB)
        elif processed_image.shape[2] == 4:
            processed_image = cv2.cvtColor(processed_image, cv2.COLOR_RGBA2RGB)
        
        processed_image = cv2.cvtColor(processed_image, cv2.COLOR_BGR2RGB)
        processed_image = tf.keras.applications.efficientnet.preprocess_input(processed_image)
        processed_image = np.expand_dims(processed_image, axis=0)

        # Make prediction
        prediction = model.predict(processed_image, verbose=0)
        predicted_class = categories[np.argmax(prediction[0])]
        confidence = float(np.max(prediction[0]))

        # Draw detection box on original image
        result_image = draw_detection_box(original_image, predicted_class, confidence)

        # Convert to base64
        _, buffer = cv2.imencode('.jpg', result_image, [cv2.IMWRITE_JPEG_QUALITY, 95])
        image_base64 = base64.b64encode(buffer).decode('utf-8')

        # Create result dictionary
        result = {
            "status": "success",
            "predicted_class": predicted_class,
            "confidence": confidence,
            "processed_image": f"data:image/jpeg;base64,{image_base64}",
            "timestamp": datetime.now().isoformat()
        }

        return result

    except Exception as e:
        raise Exception(f"Error processing image: {str(e)}")

def process_frame(
    frame: np.ndarray,
    model: tf.keras.Model,
    categories: list,
) -> Dict:
    """Process a video frame and return detection results"""
    return process_single_image(frame, model, categories)
