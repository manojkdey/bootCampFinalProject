
# # Loading a Model
# Load the model
from tensorflow.keras.models import load_model
myData_model = load_model("myData_model_trained.h5")


# ## Evaluating the loaded model
model_loss, model_accuracy = myData_model.evaluate(X_test_scaled, y_test_categorical, verbose=2)
print(f"Normal Neural Network - Loss: {model_loss}, Accuracy: {model_accuracy}")

