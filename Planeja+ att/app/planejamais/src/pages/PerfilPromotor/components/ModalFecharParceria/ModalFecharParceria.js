import React, { useState } from 'react';
import { View, Modal, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const FazerParceriaModal = ({ isVisible, onClose, onConfirm }) => {
  const [tipoEvento, setTipoEvento] = useState('');
  const [detalhes, setDetalhes] = useState('');
  const [dataHoraLocal, setDataHoraLocal] = useState('');

  const handleConfirm = () => {
    // Aqui você pode adicionar a lógica para enviar os dados para o backend ou realizar outras ações com os dados cadastrados
    onConfirm({ tipoEvento, detalhes, dataHoraLocal });

    
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Modal visible={isVisible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Fazer Parceria</Text>

          <TextInput
            style={styles.input}
            placeholder="Data e Hora Local"
            value={dataHoraLocal}
            onChangeText={setDataHoraLocal}
          />

          <TextInput
            style={styles.input}
            placeholder="Tipo de Evento"
            value={tipoEvento}
            onChangeText={setTipoEvento}
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
              <Text style={styles.buttonText}>Confirmar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  contentContainer: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 10,
    paddingLeft: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 15,
  },
  cancelButton: {
    flex: 1,
    marginRight: 5,
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 4,
    alignItems: 'center',
  },
  confirmButton: {
    flex: 1,
    marginLeft: 5,
    backgroundColor: '#3F51B5',
    padding: 10,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default FazerParceriaModal;
