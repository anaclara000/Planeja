import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';

const Tabela = () => {
  // Dados de exemplo para preencher a tabela
  const dados = [
    { id: 1, nome: 'Evento 1', produtor: 'João',   status: 'Aberto' , dataInicio: '10/06/2023' },
    { id: 2, nome: 'Evento 2', produtor: 'Maria',  status: 'Aberto' , dataInicio: '15/06/2023' },
    { id: 3, nome: 'Evento 3', produtor: 'Carlos', status: 'Aberto' , dataInicio: '20/06/2023' },

  ];

  // Função para renderizar cada item da tabela
  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.nome}</Text>
      <Text style={styles.cell}>{item.produtor}</Text>
      <Text style={styles.cell}>{item.dataInicio}</Text>
      <Text style={styles.cell}>{item.status}</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Conferir</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>

        <Text style={styles.headerText}>Nome</Text>
        <Text style={styles.headerText}>Produtor</Text>
        <Text style={styles.headerText}>Data</Text>
        <Text style={styles.headerText}>Status</Text>
        <Text style={styles.headerText}>Ações</Text>
      </View>
      <ScrollView>
        <FlatList
          data={dados}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </ScrollView>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    margin: 15,
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    padding: 10,
    marginBottom: 10,
    textAlign: 'center'
  },
  headerText: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'c'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    textAlign: 'center'
  },
  cell: {
    flex: 1,
  },
  button: {
    backgroundColor: '#3F51B5',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 4,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Tabela;
