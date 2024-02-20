import React, { useState, useEffect, useRoute } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const Resultados = ({ route }) => {
  const { pacienteId } = route.params;
  const navigation = useNavigation();
  const [patientResult, setPatientResult] = useState([]);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const response = await axios.get(`http://192.168.1.8:8000/api/resultados/${pacienteId}`);
        setPatientResult(response.data);
      } catch (error) {
        console.error('Error fetching Results:', error);
      }
    };
    fetchResult();
  }, []);

  const renderResultItem = ({ item }) => (
    <TouchableOpacity style={styles.listItemContainer}>
      <ListItem containerStyle={styles.listItem} bottomDivider>
        <ListItem.Content style={styles.listItemContent}>
          <Text style={styles.resultTitle}> 📊 Resultados</Text>
          <Text style={styles.resultItem}>Tuberculosis: {item.result_tb}%</Text>
          <Text style={styles.resultItem}>No tuberculosis: {item.result_no_tb}%</Text>
          <Text style={styles.resultItem}>Normal: {item.result_normal}%</Text>
        </ListItem.Content>
      </ListItem>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={patientResult}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderResultItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  listItemContainer: {
    marginBottom: 10,
  },
  listItem: {
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 2,
  },
  listItemContent: {
    paddingVertical: 15,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  resultItem: {
    fontSize: 16,
    marginBottom: 3,
    color: '#666',
  },
});

export default Resultados;
