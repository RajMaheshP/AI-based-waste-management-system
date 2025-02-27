import cv2
import numpy as np
from typing import List, Dict
import base64
import tempfile
import os
from datetime import datetime

def draw_detection(frame: np.ndarray, class_name: str, confidence: float) -> np.ndarray:
    """Draw detection box and label on frame"""
    height, width = frame.shape[:2]
    
    # Calculate coordinates for centered box (80% of image size)
    box_size = min(width, height) * 0.8
    x1 = int((width - box_size) / 2)
    y1 = int((height - box_size) / 2)
    x2 = int(x1 + box_size)
    y2 = int(y1 + box_size)

    # Draw green rectangle
    cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 3)

    # Prepare label text
    label = f"{class_name}: {confidence:.1%}"
    
    # Get text size
    font = cv2.FONT_HERSHEY_SIMPLEX
    font_scale = 1.0
    thickness = 2
    (label_width, label_height), baseline = cv2.getTextSize(
        label, font, font_scale, thickness
    )

    # Draw filled background for text
    cv2.rectangle(
        frame,
        (x1, y1 - label_height - 10),
        (x1 + label_width + 10, y1),
        (0, 255, 0),
        -1
    )

    # Draw white text
    cv2.putText(
        frame,
        label,
        (x1 + 5, y1 - 5),
        font,
        font_scale,
        (255, 255, 255),
        thickness,
        cv2.LINE_AA
    )

    return frame

def process_video(video_path: str, model, preprocess_func, categories: List[str]) -> Dict:
    """Process video file and return detection results"""
    cap = cv2.VideoCapture(video_path)
    if not cap.isOpened():
        raise ValueError("Could not open video file")

    frame_count = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    fps = int(cap.get(cv2.CAP_PROP_FPS))
    sample_interval = max(1, frame_count // 10)  # Process 10 frames evenly distributed

    processed_frames = []
    class_counts = {}
    total_confidence = 0
    processed_count = 0

    # Create temporary directory for processed frames
    with tempfile.TemporaryDirectory() as temp_dir:
        frame_number = 0
        while cap.isOpened():
            ret, frame = cap.read()
            if not ret:
                break

            if frame_number % sample_interval == 0:
                # Process frame
                processed_frame = frame.copy()
                
                # Preprocess for model
                input_frame = cv2.resize(frame, (224, 224))
                input_frame = cv2.cvtColor(input_frame, cv2.COLOR_BGR2RGB)
                input_frame = preprocess_func(input_frame)
                input_frame = np.expand_dims(input_frame, axis=0)

                # Make prediction
                prediction = model.predict(input_frame, verbose=0)
                predicted_class = categories[np.argmax(prediction[0])]
                confidence = float(np.max(prediction[0]))

                # Update statistics
                class_counts[predicted_class] = class_counts.get(predicted_class, 0) + 1
                total_confidence += confidence
                processed_count += 1

                # Draw detection on frame
                labeled_frame = draw_detection(processed_frame, predicted_class, confidence)

                # Save frame
                frame_path = os.path.join(temp_dir, f"frame_{frame_number}.jpg")
                cv2.imwrite(frame_path, labeled_frame)

                # Convert to base64
                with open(frame_path, "rb") as img_file:
                    img_data = base64.b64encode(img_file.read()).decode('utf-8')

                processed_frames.append({
                    "frame_number": frame_number,
                    "predicted_class": predicted_class,
                    "confidence": confidence,
                    "image": f"data:image/jpeg;base64,{img_data}"
                })

            frame_number += 1
            if frame_number >= frame_count:
                break

        cap.release()

        # Determine dominant class
        dominant_class = max(class_counts.items(), key=lambda x: x[1])[0]
        avg_confidence = total_confidence / processed_count if processed_count > 0 else 0

        # Use the last processed frame as the summary image
        if processed_frames:
            summary_image = processed_frames[-1]["image"]
        else:
            summary_image = None

        return {
            "status": "success",
            "predicted_class": dominant_class,
            "confidence": avg_confidence,
            "processed_frames": processed_frames,
            "frame_count": frame_count,
            "processed_count": processed_count,
            "fps": fps,
            "processed_image": summary_image,
            "timestamp": datetime.now().isoformat()
        }
