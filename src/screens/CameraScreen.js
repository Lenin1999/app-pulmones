// En screens/CameraScreen.js
import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';

const CameraScreen = ({ navigation, route }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const { pacienteId, medicoId } = route.params;


  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef) {
      const photo = await cameraRef.takePictureAsync();
      const { fromScreen } = route.params || {};
      
      if (fromScreen === 'CrearPaciente') {
        navigation.navigate('CrearPaciente', { capturedImage: photo.uri });
       
      } else {
        navigation.navigate('Escaner', { capturedImage: photo.uri , pacienteId: pacienteId, medicoId: medicoId });
      }
    }
  };

  return (
    <View style={styles.container}>
      {hasPermission ? (
        <>
          {/* Vista de la cámara */}
          <Camera
            style={styles.camera}
            type={Camera.Constants.Type.back}
            ref={(ref) => setCameraRef(ref)}
          />
          
          {/* Botón de captura debajo de la vista de la cámara */}
          <View style={styles.captureButtonContainer}>
            <TouchableOpacity
              style={styles.captureButton}
              onPress={takePicture}
            >
              <Text style={styles.captureButtonText}>Capturar</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <Text>No se ha concedido el permiso para acceder a la cámara</Text>
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    width: '100%',
    height: '70%',  // Ajusta según tus necesidades
  },
  captureButtonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  captureButton: {
    backgroundColor: '#0C9CB6', // Color verde
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 40,
    elevation: 3, // Sombra en Android
  },
  captureButtonText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default CameraScreen;