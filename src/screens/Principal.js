import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { SearchBar, ListItem, Avatar } from 'react-native-elements';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

export default function PrincipalScreen() {



const navigation = useNavigation();


      const handleCrearPress = () => {
        navigation.navigate('CrearPaciente');
      };


      const mensaje = () => {
         console.log('Datos de pacientes recibidos');
      }



  //const [patientList, setPatientList] = useState([
   // { id: 1, name: 'Paciente 1', avatar: 'https://example.com/avatar1.jpg' },
    //{ id: 2, name: 'Paciente 2', avatar: 'https://example.com/avatar2.jpg' },
    //{ id: 3, name: 'Paciente 3', avatar: 'https://example.com/avatar3.jpg' },
   // { id: 4, name: 'Paciente 4', avatar: 'https://example.com/avatar3.jpg' },
   // { id: 5, name: 'Paciente 5', avatar: 'https://example.com/avatar3.jpg' },
   // { id: 6, name: 'Paciente 6', avatar: 'https://example.com/avatar3.jpg' },
   // { id: 7, name: 'Paciente 7', avatar: 'https://example.com/avatar3.jpg' },
   // { id: 8, name: 'Paciente 8', avatar: 'https://example.com/avatar3.jpg' },
   // { id: 9, name: 'Paciente 9', avatar: 'https://example.com/avatar3.jpg' },
   // { id: 10, name: 'Paciente 10', avatar: 'https://example.com/avatar3.jpg' },
    // Agrega más pacientes según sea necesario
  //]);

  const [search, setSearch] = useState('');
  const [patientList, setPatientList] = useState([]);

  

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get('http://192.168.1.8:5000/api/pacientes/');
        setPatientList(response.data);
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };
    fetchPatients();
  }, []);



  const handleSearch = (text) => {
  
      const searchText = text.toLowerCase();
      const filteredPatients = patientList.filter(patient =>
        patient.name.toLowerCase().includes(searchText)
      );
  
    setSearch(text);
    
     // Verifica si el campo de búsqueda está vacío
      if (searchText === ' ') {
      //Si está vacío, restablece la lista original
          setPatientList(patientList);
      } else {
     //Si hay un texto de búsqueda, filtra la lista
         setPatientList(filteredPatients);
        }
  };


 const resderUser =({item})=>{
  return(
    <View>
      <Text>{item.nombre}</Text>
    </View>

  )
 }

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Buscar pacientes..."
        onChangeText={handleSearch}
        value={search}
        containerStyle={styles.searchBarContainer}
        inputContainerStyle={styles.searchBarInputContainer}
      />
       <FlatList
        data={patientList}
        keyExtractor={(item) => item.id_paciente.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.listItemContainer}
            onPress={() => {
              // Acción al presionar el elemento de la lista (puedes navegar a otra pantalla, etc.)
              console.log(`Paciente seleccionado: ${item.id_medico}`);

              navigation.navigate('Escaner', {pacienteId: item.id_paciente, medicoId: item.id_medico});
            }}
          >
            <ListItem key={item.id_paciente} containerStyle={styles.touchableOpacityContainer} bottomDivider>
              <Avatar
                rounded
                source={{ uri: item.imagen_uri }}
                size="large"
                containerStyle={styles.avatarContainer}
              />
              <ListItem.Content style={styles.listItemContent}>
                <ListItem.Title>👤 {item.nombre}</ListItem.Title>
                <ListItem.Title>📧 {item.email}</ListItem.Title>
                <ListItem.Title>📞 {item.telefono}</ListItem.Title>
              </ListItem.Content>
            </ListItem>
          </TouchableOpacity>
        )}
      />

      {/* Botón de añadir paciente */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={handleCrearPress}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );





}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchBarContainer: {
    backgroundColor: '#e0e0e0',
    borderColor: '#fff',
    width: 350,
    alignSelf: 'center',
  },
  searchBarInputContainer: {
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
   
  },
  listItemContainer: {
    backgroundColor: 'white',
  
    paddingLeft: 20,
    
    
  },
  avatarContainer: {
    marginRight: 10,
        
  },
  avatar: {
    width: 100,
    height: 100,
  },
  listItemContent: {
    justifyContent: 'center',
  },
  addButton: {
    position: 'absolute',
    bottom: 25,
    right: 30,
    backgroundColor: '#0C9CB6',
    borderRadius: 50,
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 50,
  },
});


