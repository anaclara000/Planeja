import React, { useState } from 'react';
import {
    View,
    Modal,
    Text,
    TextInput,
    Image,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';

const CadastrarLocacaoModal = ({ isVisible, onClose, onConfirm }) => {
    const [nome, setNome] = useState('');
    const [foto, setFoto] = useState('');

    const handleConfirm = () => {
        // Aqui você pode adicionar a lógica para enviar os dados para o backend ou realizar outras ações com os dados cadastrados
        onConfirm({ nome, foto });
        onClose();
    };

    const handleCancel = () => {
        // Aqui você pode adicionar a lógica para enviar os dados para o backend ou realizar outras ações com os dados cadastrados
        onClose();
    };

    return (
        <Modal visible={isVisible} animationType="slide" transparent>
            <View style={styles.modalContainer}>
                <View style={styles.contentContainer}>
                  

                    <Text style={styles.title}>Cadastrar Tipo de Evento</Text>

                    <TouchableOpacity style={styles.adicionarBotao}>
                        <Text style={styles.buttonText}>AdicionarFoto</Text>
                    </TouchableOpacity>

                    <TextInput
                        style={styles.input}
                        placeholder="Nome do Tipo de Evento"
                        value={nome}
                        onChangeText={setNome}
                    />

                    {/* <TextInput
                        style={styles.input}
                        placeholder="URL da Foto"
                        value={foto}
                        onChangeText={setFoto}
                    /> */}

                    <View style={styles.contBtns}>

                        <TouchableOpacity style={styles.confirmButton} onPress={handleCancel}>
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
        alignSelf: 'center'
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
        paddingHorizontal: 10,
    },
    cancelButton: {
        alignSelf: 'flex-end',
        marginBottom: 10,
    },
    confirmButton: {
        backgroundColor: '#3F51B5',
        paddingHorizontal: 25,
        paddingVertical: 10,
        borderRadius: 4,
        marginTop: 10,
        borderRadius: 100
    },
    buttonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
    },
    contBtns: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '95%',
        alignSelf: 'center'
    },
    adicionarBotao: {
        backgroundColor: '#3F51B5',
        paddingHorizontal: 25,
        paddingVertical: 10,
        borderRadius: 4,
        marginTop: 10,
        marginBottom: 25,

    }


});

export default CadastrarLocacaoModal;
