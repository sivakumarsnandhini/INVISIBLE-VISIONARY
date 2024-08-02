from flask import Flask, app,request
from flask_cors import CORS, cross_origin
from base64 import b64decode
import pickle
from imutils import paths
import imutils
import os
import cv2
import face_recognition
from sklearn.preprocessing import LabelEncoder
from sklearn.svm import SVC
import numpy as np
import threading
from sklearn.metrics import accuracy_score

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/enroll', methods=['GET','POST'])
@cross_origin()
def enroll_face():
	print('URI', len(request.json['uri']))
	print('NAME', request.json['name'])
	data = request.json['uri']
	name = request.json['name']
	if not os.path.exists(f'dataset/{name}'):
		os.mkdir(f'dataset/{name}')
	for index, data_uri in enumerate(data):
		header, encoded = data_uri.split(",",1)
		data = b64decode(encoded)
		f = open(f"dataset/{name}/{index}.png", "wb")
		f.write(data)

	try:
		encode_single_and_train(name)
		return {"success": 'true'}
	except:
		return {"success": 'false'}

@app.route('/login', methods=['GET','POST'])
@cross_origin()
def recognition():
	recognizer = pickle.loads(open('output/recognizer.pickle', "rb").read())
	le = pickle.loads(open('output/le.pickle', "rb").read())
	data_uri = request.json['uri']
	print(data_uri)
	if len(data_uri) > 10:
		data_uri = data_uri
	else:
		data_uri = data_uri[0]
	name = request.json['name']
	header, encoded = data_uri.split(",",1)
	data = b64decode(encoded)
	f = open("image.png", "wb")
	f.write(data)
	frame = cv2.imread("image.png")
	img = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
	img = cv2.resize(img, (640, 480))
	img_mean = np.array([127, 127, 127])
	img = (img - img_mean) / 128
	img = np.transpose(img, [2, 0, 1])
	img = np.expand_dims(img, axis=0)
	rgb= img.astype(np.float32)
	rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
	boxes = face_recognition.face_locations(rgb,
		model='cnn')
	# check if atleast one face has been detected
	if len(boxes) > 0:
		encodings = face_recognition.face_encodings(rgb, boxes)
		preds = recognizer.predict_proba(encodings)[0]
		j = np.argmax(preds)
		curPerson = le.classes_[j]
		if not curPerson in ['98', '99']:
			if name == curPerson:
				return {"success":"true", "id": curPerson}
			else:
				return {"success":"false"}
		else:
			return {"success":"false"}
	else:
		return {"success":"false"}


def encode_and_train():
	if not (os.path.exists('output/encodings.pickle') and os.path.exists('output/le.pickle') and os.path.exists('output/recognizer.pickle')):
		encode_faces()
		train_model()
	return {"success": 'true'}

def encode_single_and_train(name):
	encode_single_face(name)
	train_model()
	return {"success": 'true'}

def encode_faces():
	# grab the paths to the input images in our dataset
	print("[INFO] quantifying faces...")
	imagePaths = list(paths.list_images('dataset'))

	# initialize the list of known encodings and known names
	knownEncodings = []
	knownNames = []

	# loop over the image paths
	for (i, imagePath) in enumerate(imagePaths):
		# extract the person name from the image path
		print("[INFO] processing image {}/{}".format(i + 1,
			len(imagePaths)))
		name = imagePath.split(os.path.sep)[-2]
		# load the input image and convert it from RGB (OpenCV ordering)
		# to dlib ordering (RGB)
		image = cv2.imread(imagePath)
		rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

		# compute the facial embedding for the face
		#face_encodings = face_recognition.face_encodings(rgb, num_jitters=100)
		encodings = face_recognition.face_encodings(rgb)
		# print(encodings)
		# loop over the encodings
		for encoding in encodings:
			# add each encoding + name to our set of known names and
			# encodings
			knownEncodings.append(encoding)
			knownNames.append(name)

	# dump the facial encodings + names to disk
	print("[INFO] serializing encodings...")
	data = {"encodings": knownEncodings, "names": knownNames}
	pickle.dump(data, open('output/encodings.pickle', "wb"))

def encode_single_face(name):
	# grab the paths to the input images in our dataset
	print("[INFO] quantifying faces...")
	imagePaths = list(paths.list_images(f'dataset/{name}'))

	# initialize the list of known encodings and known names
	knownEncodings = []
	knownNames = []

	# loop over the image paths
	for (i, imagePath) in enumerate(imagePaths):
		# extract the person name from the image path
		print("[INFO] processing image {}/{}".format(i + 1,
			len(imagePaths)))
		# load the input image and convert it from RGB (OpenCV ordering)
		# to dlib ordering (RGB)
		image = cv2.imread(imagePath)
		rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

		# compute the facial embedding for the face
		#face_encodings = face_recognition.face_encodings(rgb, num_jitters=100)
		encodings = face_recognition.face_encodings(rgb)
		# print(encodings)
		# loop over the encodings
		for encoding in encodings:
			# add each encoding + name to our set of known names and
			# encodings
			knownEncodings.append(encoding)
			knownNames.append(name)

	existingData = pickle.loads(open('output/encodings.pickle', "rb").read())
	existingData['encodings'].extend(knownEncodings)
	existingData['names'].extend(knownNames)
	# dump the facial encodings + names to disk
	print("[INFO] serializing encodings...")
	pickle.dump(existingData, open('output/encodings.pickle', "wb"))


def train_model():
	# load the face encodings
	print("[INFO] loading face encodings...")
	data = pickle.loads(open('output/encodings.pickle', "rb").read())

	# encode the labels
	print("[INFO] encoding labels...")
	le = LabelEncoder()
	labels = le.fit_transform(data["names"])

	# train the model used to accept the 128-d encodings of the face and
	# then produce the actual face recognition
	print("[INFO] training model...")
	recognizer = SVC(C=1.0, kernel="linear", probability=True)
	print(recognizer)
	recognizer.fit(data["encodings"], labels)

	y_pred = recognizer.predict(data["encodings"])

	accuracy = accuracy_score(labels,y_pred)*100

	# Printing the results
	print("Accuracy for SVM is:",accuracy)

	# write the actual face recognition model to disk
	print("[INFO] writing the model to disk...")
	pickle.dump(recognizer, open('output/recognizer.pickle', "wb"))

	# write the label encoder to disk
	pickle.dump(le, open('output/le.pickle', "wb"))

t1 = threading.Thread(target=encode_and_train)
t1.start()

if __name__ == '__main__':
  app.run(host='0.0.0.0', port=5000)