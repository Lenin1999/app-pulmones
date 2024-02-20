import React, { useState, useEffect, useRoute } from 'react';
import { View, TouchableOpacity, Text, Image, TextInput, StyleSheet, Modal } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';



const Escaner = ({ navigation, route }) => {

 
  
  
  const { pacienteId, medicoId } = route.params;

  const [showModal, setShowModal] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);
  const [showModalResponse, setShowModalResponse] = useState(false);

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


  const handleScanPress = () => {
    setShowModal(true);
  };

  const handleAcceptScan = () => {
    setShowModal(false);
    // Aquí puedes llamar a la función para enviar la imagen
    enviarImagen();
  };

  const handleCancelScan = () => {
    setShowModal(false);
    // Si se cancela, puedes regresar a la pantalla de escáner o tomar otras acciones
  };

  const handleCloseModal = () => {
    setShowModalResponse(false);
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

          setApiResponse(data);
      setShowModalResponse(true);
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
            <Text style={styles.placeholderText}>🔗</Text>
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

        <TouchableOpacity style={styles.button} onPress={handleScanPress}>
          <Text style={styles.buttonText}>Escanear</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleIniciarPress} >
          <Text style={styles.buttonText}>Resultados</Text>
        </TouchableOpacity>

        
      </View>


      <Modal visible={showModal} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>¿Está seguro de escanear?</Text>
            <View style={styles.modalButtonsContainer}>
              <TouchableOpacity style={[styles.modalButton, { backgroundColor: '#0C9CB6' }]} onPress={handleAcceptScan}>
                <Text style={styles.modalButtonText}>Aceptar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalButton, { backgroundColor: '#FF6666' }]} onPress={handleCancelScan}>
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>


      <Modal visible={showModalResponse} animationType="slide" transparent={true}>
        <View style={styles.modalContainerResponse}>
          <View style={styles.modalContentResponse}>
            <Text style={styles.modalTitle}>Resultados:</Text>
            <View style={styles.imageContainerResponse}>
                  <Image source={{ uri: capturedImage }} style={styles.patientImageResponse} />
                </View>
            {apiResponse && (
              <View>
                
                <Text style={styles.modalText}>Tuberculosis: {parseFloat(apiResponse.result_tb * 100).toFixed(2)} %</Text>
                <Text style={styles.modalText}>No Tuberculosis: {parseFloat(apiResponse.result_no_tb * 100).toFixed(2)} %</Text>
                <Text style={styles.modalText}>Normal: {parseFloat(apiResponse.result_normal * 100).toFixed(2)} %</Text>

              </View>
            )}
            <TouchableOpacity style={[styles.modalButtonResponse, { backgroundColor: '#0C9CB6' }]} onPress={handleCloseModal}>
              <Text style={styles.modalButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    fontSize: 300,
    color: '#fff',
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  modalButtonsContainer: {
    flexDirection: 'row',
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
  },
  modalContainerResponse: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContentResponse: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  imageContainerResponse: {
    width: '100%',
    height: 200,
    backgroundColor: '#ddd',
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  patientImageResponse: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  placeholderText: {
    fontSize: 70,
    color: '#555',
  },
  resultText: {
    fontSize: 18,
    marginBottom: 10,
  },
  modalButtonResponse: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Escaner;