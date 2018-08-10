
!pip install -U -q PyDrive


import numpy as np
import matplotlib.pyplot as plt
import pandas as pd

from  pydrive.auth import GoogleAuth
from   pydrive.drive import GoogleDrive
from  google.colab import auth
from  oauth2client.client import  GoogleCredentials


auth.authenticate_user()
gauth = GoogleAuth()
gauth.credentials = GoogleCredentials.get_application_default()
drive =GoogleDrive(gauth)

xDown=drive.CreateFile({'id':'X_data_id'})
xDown.GetContentFile('X.csv')

x_tDown=drive.CreateFile({'id':'X_t_data_id'})
x_tDown.GetContentFile('X_t.csv')

yDown=drive.CreateFile({'id':'y_data_id'})
yDown.GetContentFile('y.csv')

dataset= pd.read_csv('X.csv',header=None)
dataset2= pd.read_csv('y.csv',header=None)
dataset3= pd.read_csv('X_t.csv',header=None)



X = dataset.iloc[:,:].values
y = dataset2.iloc[:,:].values
X_t=dataset3.iloc[:,:].values


from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.2)


from sklearn.preprocessing import StandardScaler
sc = StandardScaler()
X_train = sc.fit_transform(X_train)
X_test = sc.transform(X_test)
my_X_t=  sc.transform(X_t)

import keras
from keras.models import Sequential
from keras.layers import Dense
classifier = Sequential()


classifier.add(Dense(output_dim = 6, init = 'uniform', activation = 'relu', input_dim = 13))
classifier.add(Dense(output_dim = 6, init = 'uniform', activation = 'relu'))
classifier.add(Dense(output_dim = 1, init = 'uniform', activation = 'sigmoid'))
classifier.compile(optimizer = 'adam', loss = 'binary_crossentropy', metrics = ['accuracy'])

classifier.fit(X_train, y_train, batch_size = 10, nb_epoch = 100)

y_pred = classifier.predict(X_test)
y_pred = (y_pred > 0.5)

from sklearn.metrics import confusion_matrix
cm = confusion_matrix(y_test, y_pred)
print(cm)

X_t_pred= classifier.predict(my_X_t)
np.savetxt("myTestResult.csv", X_t_pred, delimiter=",")



