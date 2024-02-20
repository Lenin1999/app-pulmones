// /src/navigation/AppNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/Home';
import LoginScreen from '../screens/Login';
import PrincipalScreen from '../screens/Principal';
import EscanerScreen from '../screens/Escaner';
import CrearScreen from '../screens/CrearPaciente';
import CameraScreen from '../screens/CameraScreen';
import ResultadosScreen from '../screens/Resultados';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
         <Stack.Screen name="Principal" component={PrincipalScreen} />
         <Stack.Screen name="CrearPaciente" component={CrearScreen} />
         <Stack.Screen name="CameraScreen" component={CameraScreen} />
        <Stack.Screen name="Escaner" component={EscanerScreen} />
       <Stack.Screen name="Resultados" component={ResultadosScreen} /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
