import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
//import { Icon } from 'react-native-elements';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleIniciarPress = () => {
    // Navegar a la pantalla "Principal"
   
    navigation.navigate('Principal');
    
  };

  const handleValidar = () => {
     // Validar las credenciales aquí (puedes reemplazar este bloque con tu lógica de validación)
  if (username === 'leibarra' && password === '12345') {
    // Credenciales válidas, ejecutar la función Iniciar
    handleIniciarPress();
  } else {
    // Credenciales inválidas, mostrar un mensaje
    alert('Credenciales inválidas. Por favor, inténtelo de nuevo.');
  }
  }

  const handleOlvidasteContraseñaPress = () => {
    // Agrega lógica para manejar el "Olvidaste tu contraseña"
    console.log('¿Olvidaste tu contraseña?');
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/inicio.jpg')}
        style={styles.imagen}
      />

      <Text style={styles.title}>Iniciar Sesión</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Email</Text>
        <View style={styles.subInputContainer}>
          
          <TextInput
            style={styles.input}
            placeholder="✉️ Ingrese su correo electrónico"
            onChangeText={text => setUsername(text)}
          />
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Contraseña</Text>
        <View style={styles.subInputContainer}>
          <TextInput
            style={styles.input}
            placeholder="🔒 Ingrese su contraseña"
            secureTextEntry
            onChangeText={text => setPassword(text)}
          />
        </View>
        <TouchableOpacity onPress={handleOlvidasteContraseñaPress}>
          <Text style={styles.olvidasteContraseña}>¿Olvidaste tu contraseña?</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleIniciarPress}>
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
        
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    paddingTop: 50,
  },
  title: {
    fontSize: 50,
    marginBottom: 20,
  },
  imagen: {
    width: 100,
    height: 100,
    marginBottom: 40,
    marginTop: -100,
  },
  inputContainer: {
    marginBottom: 25,
    width: '100%',
    backgroundColor: 'rgba(188, 206, 206)'
  },
  subInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
    
  },
  iconContainer: {
    marginRight: 1,
   
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 10,
   
    
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 8,
  },
  olvidasteContraseña: {
    color: '#0C9CB6',
    fontSize: 14,
    marginTop: 8,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#0C9CB6',
    padding: 10,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default LoginScreen;
