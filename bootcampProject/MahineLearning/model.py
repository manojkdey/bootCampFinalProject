from numpy.random import seed
seed(1)

import numpy as np
import pandas as pd
import warnings
warnings.simplefilter('ignore', FutureWarning)


# ## Data Pre-Processing
myData = pd.read_csv('db/myData.csv')
X = myData.drop("label", axis=1)
y = myData["label"]
print(X.shape, y.shape)
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, MinMaxScaler
from tensorflow.keras.utils import to_categorical
X_train, X_test, y_train, y_test = train_test_split(X, y, random_state=1)
X_scaler = MinMaxScaler().fit(X_train)
X_train_scaled = X_scaler.transform(X_train)
X_test_scaled = X_scaler.transform(X_test)

# Step 1: Label-encode data set
label_encoder = LabelEncoder()
label_encoder.fit(y_train)
encoded_y_train = label_encoder.transform(y_train)
encoded_y_test = label_encoder.transform(y_test)
# Step 2: Convert encoded labels to one-hot-encoding
y_train_categorical = to_categorical(encoded_y_train)
y_test_categorical = to_categorical(encoded_y_test)


# # Create a Deep Learning Model
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense
model = Sequential()
model.add(Dense(units=240, activation='relu', input_dim=10))
model.add(Dense(units=30, activation='relu'))
model.add(Dense(units=240, activation='softmax'))

model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])
model.fit(X_train_scaled,y_train_categorical,epochs=60,shuffle=True,verbose=0)


# ## Quantify our Trained Model
model_loss, model_accuracy = model.evaluate(X_test_scaled, y_test_categorical, verbose=2)
print(f"Normal Neural Network - Loss: {model_loss}, Accuracy: {model_accuracy}")


# # Saving a Trained Model
# We can save our trained models using the HDF5 binary format with the extension `.h5`
# Save the model
model.save("myData_model_trained.h5")

