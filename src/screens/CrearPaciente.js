import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, Image, TextInput, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';

const CrearPaciente = ({ navigation, route }) => {
  const { capturedImage: initialImage } = route.params || {};
  const [nombreCompleto, setNombreCompleto] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [capturedImage, setCapturedImage] = useState(initialImage);

  useEffect(() => {
    if (initialImage) {
      setCapturedImage(initialImage);
    }
  }, [initialImage]);

  const takePicture = () => {
    navigation.navigate('CameraScreen', { fromScreen: 'CrearPaciente' });
  };

  const takePictureAgain = () => {
    navigation.navigate('CameraScreen', { fromScreen: 'CrearPaciente' });
  };

  return (
    <View style={styles.container}>
      {/* Sección de la ficha médica con la foto */}
      <View style={styles.medicalCard}>
        <View style={styles.imageContainer}>
          {capturedImage ? (
            <Image
              source={{ uri: capturedImage }}
              style={styles.patientImage}
            />
          ) : (
            <Text style={styles.placeholderText}>Foto del paciente</Text>
          )}
        </View>

        {/* Sección para el botón de tomar foto */}
        <View style={styles.cameraButtonContainer}>
          {!capturedImage && (
            <TouchableOpacity
              style={styles.takePhotoButton}
              onPress={takePicture}
            >
              <Text style={styles.takePhotoButtonText}>Tomar Foto</Text>
            </TouchableOpacity>
          )}
        </View>
        {/* Botón para tomar foto de nuevo */}
        {capturedImage && (
          <TouchableOpacity style={styles.takePhotoAgainButton} onPress={takePictureAgain}>
            <Text style={styles.takePhotoAgainButtonText}>Tomar Foto de Nuevo</Text>
          </TouchableOpacity>
        )}
      </View>
          


      {/* Sección para ingresar datos del paciente */}
      <View style={styles.inputSection}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Nombre Completo</Text>
          <TextInput
            style={styles.input}
            placeholder='Ingrese el nombre completo'
            value={nombreCompleto}
            onChangeText={setNombreCompleto}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Teléfono</Text>
          <TextInput
            style={styles.input}
            placeholder='Ingrese el teléfono'
            value={telefono}
            onChangeText={setTelefono}
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder='Ingrese el email'
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>

        {/* Botón de guardar */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Guardar</Text>
        </TouchableOpacity>

        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 16,
    paddingTop: 50,
  },
  medicalCard: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  imageContainer: {
    width: '80%',
    height: 200,
    backgroundColor: '#ddd',
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  patientImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  placeholderText: {
    fontSize: 16,
    color: '#666',
  },
  cameraButtonContainer: {
    marginBottom: 20,
  },
  takePhotoButton: {
    backgroundColor: '#0C9CB6',
    padding: 15,
    borderRadius: 10,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  takePhotoButtonText: {
    fontSize: 18,
    color: 'white',
  },
  takePhotoAgainButton: {
    backgroundColor: 'orange',
    padding: 15,
    borderRadius: 10,
    alignSelf: 'stretch',
    alignItems: 'center',
    marginTop: 10,
  },
  takePhotoAgainButtonText: {
    fontSize: 18,
    color: 'white',
  },
  camera: {
    width: '100%',
    height: 200,
  },
  cameraButtonsContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  captureButton: {
    backgroundColor: '#0C9CB6',
    borderRadius: 5,
    padding: 15,
  },
  captureButtonText: {
    fontSize: 18,
    color: 'white',
  },
  inputSection: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 8,
  },
  button: {
    backgroundColor: '#0C9CB6',
    padding: 15,
    borderRadius: 10,
    alignSelf: 'stretch',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default CrearPaciente;
