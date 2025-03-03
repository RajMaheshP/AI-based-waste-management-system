# -*- coding: utf-8 -*-
"""Untitled0.ipynb

Automatically generated by Colab.

Original file is located at
    https://colab.research.google.com/drive/1KxO-jgQdT1JPrgpqB_7DmKDh98g2MNQk
"""

! pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118

"""# Step 2: Import Libraries

"""

import torch
import torch.nn as nn
import torch.optim as optim
from torch.optim.lr_scheduler import CosineAnnealingWarmRestarts
from torch.utils.data import DataLoader, Dataset
from torchvision import transforms, models
from torchsummary import summary
from sklearn.model_selection import train_test_split
import numpy as np
import cv2
import os
from tqdm import tqdm
from PIL import Image

"""# Step 3: Mount Google Drive (if dataset is stored there)

"""

from google.colab import drive
drive.mount('/content/drive')

"""# Step 4: Define Dataset Path and Categories

"""

import os
import zipfile

# Define paths
zip_path = "/content/Trashnet Dataset.zip"
extract_path = "/content/"

# Extract dataset
if os.path.exists(zip_path):
    with zipfile.ZipFile(zip_path, 'r') as zip_ref:
        zip_ref.extractall(extract_path)
    print("Dataset extracted successfully.")
else:
    print(f"Error: Zip file '{zip_path}' not found.")
    exit()

# Set dataset path correctly
dataset_path = "/content/dataset-resized"

# Verify the dataset folder exists
if not os.path.exists(dataset_path):
    print(f"Error: Dataset folder '{dataset_path}' not found. Check extraction.")
    exit()

print(f"Dataset path set to: {dataset_path}")

# Define categories
categories = ["cardboard", "glass", "metal", "paper", "plastic", "trash"]

# Check if all category folders exist
missing_categories = [cat for cat in categories if not os.path.exists(os.path.join(dataset_path, cat))]

if missing_categories:
    print(f"Error: Missing category folders: {missing_categories}")
    print("Check manually: ", os.listdir(dataset_path))
else:
    print("Dataset is ready for use!")

"""# Step 5: Load and Preprocess Data

"""

class TrashNetDataset(Dataset):
    def __init__(self, dataset_path, categories, transform=None):
        self.X = []
        self.y = []
        self.transform = transform

        for category in categories:
            category_path = os.path.join(dataset_path, category)
            label = categories.index(category)
            for img_name in os.listdir(category_path):
                img_path = os.path.join(category_path, img_name)
                img = cv2.imread(img_path)
                img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)  # Convert to RGB
                self.X.append(img)
                self.y.append(label)

    def __len__(self):
        return len(self.X)

    def __getitem__(self, idx):
        image = self.X[idx]
        label = self.y[idx]
        if self.transform:
            image = self.transform(image)
        return image, label

transform = transforms.Compose([
    transforms.ToPILImage(),
    transforms.Resize((224, 224)),
    transforms.RandomHorizontalFlip(),
    transforms.RandomVerticalFlip(),
    transforms.RandomRotation(30),
    transforms.ColorJitter(brightness=0.2, contrast=0.2, saturation=0.2, hue=0.1),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
])

dataset = TrashNetDataset(dataset_path, categories, transform=transform)
X = np.array(dataset.X)
y = np.array(dataset.y)
X_train, X_val, y_train, y_val = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)

train_dataset = TrashNetDataset(dataset_path, categories, transform=transform)
val_dataset = TrashNetDataset(dataset_path, categories, transform=transform)

train_loader = DataLoader(train_dataset, batch_size=16, shuffle=True)
val_loader = DataLoader(val_dataset, batch_size=16, shuffle=False)

class EfficientNetB4Custom(nn.Module):
    def __init__(self, num_classes):
        super(EfficientNetB4Custom, self).__init__()
        self.base_model = models.efficientnet_b4(pretrained=True)
        self.base_model.classifier = nn.Sequential(
            nn.Linear(1792, 1024),
            nn.ReLU(),
            nn.BatchNorm1d(1024),
            nn.Dropout(0.5),
            nn.Linear(1024, 512),
            nn.ReLU(),
            nn.BatchNorm1d(512),
            nn.Dropout(0.4),
            nn.Linear(512, 256),
            nn.ReLU(),
            nn.BatchNorm1d(256),
            nn.Dropout(0.3),
            nn.Linear(256, num_classes)
        )

    def forward(self, x):
        return self.base_model(x)

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model = EfficientNetB4Custom(num_classes=len(categories)).to(device)
criterion = nn.CrossEntropyLoss()
optimizer = optim.AdamW(model.parameters(), lr=1e-4)
scheduler = CosineAnnealingWarmRestarts(optimizer, T_0=10, T_mult=1)

def train_model(model, train_loader, val_loader, criterion, optimizer, scheduler, num_epochs=100):
    best_acc = 0.0
    for epoch in range(num_epochs):
        model.train()
        running_loss = 0.0
        correct = 0
        total = 0
        for inputs, labels in tqdm(train_loader):
            inputs, labels = inputs.to(device), labels.to(device)
            optimizer.zero_grad()
            outputs = model(inputs)
            loss = criterion(outputs, labels)
            loss.backward()
            optimizer.step()
            running_loss += loss.item()
            _, predicted = outputs.max(1)
            total += labels.size(0)
            correct += predicted.eq(labels).sum().item()
        train_loss = running_loss / len(train_loader)
        train_acc = 100. * correct / total

        model.eval()
        val_loss = 0.0
        correct = 0
        total = 0
        with torch.no_grad():
            for inputs, labels in val_loader:
                inputs, labels = inputs.to(device), labels.to(device)
                outputs = model(inputs)
                loss = criterion(outputs, labels)
                val_loss += loss.item()
                _, predicted = outputs.max(1)
                total += labels.size(0)
                correct += predicted.eq(labels).sum().item()
        val_loss = val_loss / len(val_loader)
        val_acc = 100. * correct / total

        print(f'Epoch {epoch+1}/{num_epochs}, Train Loss: {train_loss:.4f}, Train Acc: {train_acc:.2f}%, Val Loss: {val_loss:.4f}, Val Acc: {val_acc:.2f}%')

        if val_acc > best_acc:
            best_acc = val_acc
            torch.save(model.state_dict(), 'best_model.pth')

        scheduler.step()

train_model(model, train_loader, val_loader, criterion, optimizer, scheduler)

# Step 11: Evaluate the Model
model.load_state_dict(torch.load('best_model.pth'))
model.eval()
correct = 0
total = 0
with torch.no_grad():
    for inputs, labels in val_loader:
        inputs, labels = inputs.to(device), labels.to(device)
        outputs = model(inputs)
        _, predicted = outputs.max(1)
        total += labels.size(0)
        correct += predicted.eq(labels).sum().item()
print(f'Validation Accuracy: {100. * correct / total:.2f}%')

# Step 12: Save the Model
torch.save(model.state_dict(), 'TrashNet_Model.pth')
print("Model saved at TrashNet_Model.pth")