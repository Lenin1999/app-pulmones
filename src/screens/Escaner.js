import React, { useState, useEffect, useRoute } from 'react';
import { View, TouchableOpacity, Text, Image, TextInput, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';



const Escaner = ({ navigation, route }) => {

 
  
  
  const { pacienteId, medicoId } = route.params;

  console.log(pacienteId);

  const { capturedImage: initialImage } = route.params || {};
  const [capturedImage, setCapturedImage] = useState(initialImage);

  const handleIniciarPress = () => {
    
    navigation.navigate('Resultados', {pacienteId: pacienteId, medicoId: medicoId});
  };

  

  useEffect(() => {
    if (initialImage) {
      setCapturedImage(initialImage);
    }
  }, [initialImage]);

  const takePictureAgain = () => {
    navigation.navigate('CameraScreen');
  };


  const CargarImagen = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Se necesita permiso para acceder a la galería de imágenes.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setCapturedImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error al cargar la imagen desde la galería:', error);
    }
  };


 

       // Función para enviar la solicitud POST
       enviarImagen = async () => {
        if (!capturedImage) {
          console.log('Faltan datos necesarios');
          return;
        }
      
        const formData = new FormData();
        formData.append('id_paciente', pacienteId);
        formData.append('id_medico', medicoId);
        formData.append('image', {
          uri: capturedImage,
          name: 'imagen_seleccionada.jpg',
      type: 'image/jpg',
        });
      
        const opciones = {
          method: 'POST',
          body: formData,
        };

        try {
          const response = await fetch('http://192.168.1.8:8000/api/resultados/add', opciones 
            
          );
      
          const data = await response.json();
          console.log('Respuesta del servidor:', data);
        } catch (error) {
          console.log(capturedImage.type);
          console.error('Error al enviar la imagen:', error);
        }
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
            <Text style={styles.placeholderText}>Foto a Escanear</Text>
          )}
        </View>

        {/* Sección para el botón de tomar foto */}
        <View style={styles.cameraButtonContainer}>
          {!capturedImage && (
            <TouchableOpacity
              style={styles.takePhotoButton}
              onPress={() => navigation.navigate('CameraScreen')}
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
          


      {/* Sección para elegir alguna accion */}
      <View style={styles.inputSection}>
        

      <TouchableOpacity style={styles.button} onPress={CargarImagen}>
          <Text style={styles.buttonText}>Cargar Imagen</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={enviarImagen}>
          <Text style={styles.buttonText}>Escanear</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleIniciarPress} >
          <Text style={styles.buttonText}>Resultados</Text>
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
    marginTop: 10,
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

export default Escaner;
