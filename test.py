import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense
from tensorflow.keras.preprocessing.image import ImageDataGenerator
import json

# 데이터 전처리
train_datagen = ImageDataGenerator(rescale=1./255)
train_generator = train_datagen.flow_from_directory(
    './train', # 학습 데이터셋 경로
    target_size=(150, 150),
    batch_size=32,
    class_mode='categorical')

# 모델 구성
model = Sequential([
    Conv2D(32, (3, 3), activation='relu', input_shape=(150, 150, 3)),
    MaxPooling2D(2, 2),
    Conv2D(64, (3, 3), activation='relu'),
    MaxPooling2D(2, 2),
    Flatten(),
    Dense(128, activation='relu'),
    Dense(train_generator.num_classes, activation='softmax') # 클래스 수에 따른 출력 유닛
])

# 모델 컴파일
model.compile(loss='categorical_crossentropy',
              optimizer='adam',
              metrics=['accuracy'])

# 모델 학습
model.fit(train_generator, epochs=5)

# 학습된 모델을 파일로 저장
model.save('trained_model.h5')

# 클래스 정보 저장
with open('class_indices.json', 'w') as f:
    json.dump(train_generator.class_indices, f)