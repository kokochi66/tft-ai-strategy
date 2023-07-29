from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np
import json

# 모델 로드
loaded_model = load_model('trained_model.h5')

# 이미지 전처리
def preprocess_image(img_path):
    img = image.load_img(img_path, target_size=(150, 150))
    img_tensor = image.img_to_array(img)
    img_tensor = np.expand_dims(img_tensor, axis=0)
    img_tensor /= 255.
    return img_tensor

# 예측 함수
def predict_character(img_path):
    img_tensor = preprocess_image(img_path)
    prediction = loaded_model.predict(img_tensor)
    
    # 클래스 정보 불러오기
    with open('class_indices.json', 'r') as f:
        class_indices = json.load(f)
    
    class_labels = list(class_indices.keys())
    
    # 전체 예측 확률 출력
    for i, label in enumerate(class_labels):
        print(f"{label}: {prediction[0][i] * 100:.2f}%")
    
    # 가장 높은 확률의 클래스 출력
    predicted_class = np.argmax(prediction, axis=1)
    predicted_label = class_labels[predicted_class[0]]
    return f"Most likely: {predicted_label}"

# 예측 수행
img_path = "./test/ir.png"
print(predict_character(img_path))
