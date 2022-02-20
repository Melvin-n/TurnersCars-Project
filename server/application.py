from flask import Flask, request, render_template, Response, jsonify
from flask_cors import CORS
import base64
from pyexpat import model
import numpy as np
import io
from PIL import Image
import tensorflow as tf
from tensorflow import keras
from keras.models import Sequential, load_model
from keras.models import load_model
from keras.preprocessing.image import ImageDataGenerator, img_to_array


import chatbot

application = Flask(__name__)
CORS(application)
message_history = []

# requests for chatbot, takes message and passes through chatbot model, returns response
@application.route('/', methods=['GET', 'POST'])
def index():
    print(request.method)
    if request.method == 'GET':
        return 'Turners API'
    elif request.method == 'POST':
        message = request.get_json(force=True)
        message = message['message']
        message_history.append(f'User: {message}')
        ints = chatbot.predict_class(message)
        res = chatbot.get_response(ints, chatbot.intents)
        message_history.append(f'Bot: {res}')
        print(jsonify(res))
        return jsonify(res)

# loads AI model from /models
def get_model():
    global model
    model = load_model('models/car_suv_model.h5')
    print('Model loaded')

# converts b64 image file to np array to pass through NN model
def preprocess_image(image, target_size):
    if image.mode != 'RGB':
        image = image.convert('RGB')
    image = image.resize(target_size)
    image = img_to_array(image)
    image = np.expand_dims(image, axis=0)

    return image

print('Loading Keras Model...')
get_model()

# takes in image base64 image data, decodes and passes through AI model, predicting type and sending back to client
@application.route('/predict', methods=['POST'])
def predict():
    message = request.get_json(force=True)
    encoded = message['image']
    decoded = base64.b64decode(encoded)
    image = Image.open(io.BytesIO(decoded))
    processed_image = preprocess_image(image, target_size=(224, 224))

    prediction = model.predict(processed_image.tolist())
    print(f'car: {float(prediction[0][0])}, suv: {float(prediction[0][1])}' )
    result = ''
    if (prediction[0][0] > prediction[0][1]):
        result = 'car'
    else:
        result = 'suv'
    response = {
            'car': int(prediction[0][0]),
            'suv': int(prediction[0][1]),
            'prediction': result
    }
    return jsonify(response)


if __name__ == "__main__":
    application.run(host='127.0.0.1', port=5000, debug=True)