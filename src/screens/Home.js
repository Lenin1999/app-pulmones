// /src/screens/Home.js
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

  const handleIniciarPress = () => {
    // Navegar a la pantalla "Login"
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lung Lens</Text>

      <Image
  source={require('../../assets/inicio.jpg')}
  style={styles.imagen}
/>

      <TouchableOpacity style={styles.button} onPress={handleIniciarPress}>
        <Text style={styles.buttonText}>Inicio</Text>
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
  },
  title: {
    fontSize: 50,
    marginBottom: 80,
    fontWeight: 'bold',
    marginTop: -100,
  },
  imagen: {
    width: 200,
    height: 200,
    marginBottom: 80,
  
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

export default HomeScreen;
