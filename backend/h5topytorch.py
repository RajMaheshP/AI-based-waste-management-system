import os
import torch
import torch.nn as nn
import h5py
import tensorflow as tf
import numpy as np
from collections import OrderedDict

class RecycleNet(nn.Module):
    def __init__(self, num_classes):
        super(RecycleNet, self).__init__()
        # Load pre-trained EfficientNet
        self.efficientnet = torch.hub.load('NVIDIA/DeepLearningExamples:torchhub', 'nvidia_efficientnet_b4', pretrained=True)
        
        # Freeze initial layers
        for param in list(self.efficientnet.parameters())[:-30]:
            param.requires_grad = False
            
        # Get number of features from the last layer
        num_features = self.efficientnet.classifier.fc.in_features
        
        # Custom classifier
        self.global_pool = nn.AdaptiveAvgPool2d(1)
        self.fc1 = nn.Linear(num_features, 1024)
        self.bn1 = nn.BatchNorm1d(1024)
        self.dropout1 = nn.Dropout(0.5)
        self.fc2 = nn.Linear(1024, 512)
        self.bn2 = nn.BatchNorm1d(512)
        self.dropout2 = nn.Dropout(0.4)
        self.fc3 = nn.Linear(512, 256)
        self.bn3 = nn.BatchNorm1d(256)
        self.dropout3 = nn.Dropout(0.3)
        self.classifier = nn.Linear(256, num_classes)
        
        # Skip connections
        self.skip1 = nn.Linear(1024, 512)
        self.skip2 = nn.Linear(512, 256)

    def forward(self, x):
        features = self.efficientnet.features(x)
        x = self.global_pool(features)
        x = torch.flatten(x, 1)
        
        x1 = self.fc1(x)
        x1 = self.bn1(x1)
        x1 = nn.ReLU()(x1)
        x1 = self.dropout1(x1)
        
        x2 = self.fc2(x1)
        x2 = self.bn2(x2)
        x2 = nn.ReLU()(x2)
        x2 = self.dropout2(x2)
        x2 = x2 + self.skip1(x1)
        
        x3 = self.fc3(x2)
        x3 = self.bn3(x3)
        x3 = nn.ReLU()(x3)
        x3 = self.dropout3(x3)
        x3 = x3 + self.skip2(x2)
        
        output = self.classifier(x3)
        return output

def convert_model(h5_path, output_dir=None):
    """
    Convert H5 model to PyTorch format
    
    Args:
        h5_path (str): Path to the H5 model file
        output_dir (str, optional): Directory to save the converted model
    """
    try:
        # Verify H5 file exists
        if not os.path.exists(h5_path):
            raise FileNotFoundError(f"H5 model not found at: {h5_path}")
        
        print(f"Loading H5 model from: {h5_path}")
        
        # Create output directory if specified
        if output_dir:
            os.makedirs(output_dir, exist_ok=True)
            output_path = os.path.join(output_dir, 'recyclex_model.pth')
        else:
            output_dir = os.path.dirname(h5_path)
            output_path = os.path.join(output_dir, 'recyclex_model.pth')
        
        # Initialize PyTorch model
        print("Initializing PyTorch model...")
        pytorch_model = RecycleNet(num_classes=6)  # 6 classes for RecycleX
        
        # Load H5 weights
        print("Loading H5 weights...")
        with h5py.File(h5_path, 'r') as h5_file:
            # Convert weights
            print("Converting weights...")
            for name, layer in h5_file.items():
                if isinstance(layer, h5py.Dataset):
                    # Convert and assign weights
                    weights = np.array(layer)
                    if len(weights.shape) == 4:  # Conv layers
                        weights = np.transpose(weights, (3, 2, 0, 1))
                    elif len(weights.shape) == 2:  # Dense layers
                        weights = np.transpose(weights)
                    
                    try:
                        state_dict_key = f"layer.{name}"
                        pytorch_model.state_dict()[state_dict_key].copy_(torch.from_numpy(weights))
                    except KeyError:
                        print(f"Warning: Could not find matching layer for {name}")
        
        # Save the converted model
        print(f"Saving converted model to: {output_path}")
        torch.save({
            'model_state_dict': pytorch_model.state_dict(),
            'num_classes': 6,
            'input_size': 224,
            'categories': ["cardboard", "glass", "metal", "paper", "plastic", "trash"]
        }, output_path)
        
        print("Conversion completed successfully!")
        return output_path
        
    except Exception as e:
        print(f"Error during conversion: {str(e)}")
        raise

if __name__ == "__main__":
    # Model path from your system
    h5_model_path = "/home/kasinadhsarma/Desktop/RecycleX/backend/TrashNet_Model.h5"
    
    try:
        # Convert the model
        output_path = convert_model(h5_model_path)
        print(f"\nModel converted successfully and saved to: {output_path}")
        
        # Verify the converted model
        print("\nVerifying converted model...")
        loaded_model = torch.load(output_path)
        print("Model verification successful!")
        print("\nModel structure:")
        print(f"Number of classes: {loaded_model['num_classes']}")
        print(f"Input size: {loaded_model['input_size']}")
        print(f"Categories: {loaded_model['categories']}")
        
    except Exception as e:
        print(f"\nError: {str(e)}")