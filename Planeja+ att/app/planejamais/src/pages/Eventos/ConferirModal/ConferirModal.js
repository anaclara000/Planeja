import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ImageProdutor from './assets/imageProdutor.jpg';


const Tabela = () => {
    const navigation = useNavigation();

    const [conferirModalVisible, setConferirModalVisible] = useState(false);
    const [eventoSelecionado, setEventoSelecionado] = useState(null);

    // Dados de exemplo para preencher a tabela
    const dados = [
        { id: 1, nome: 'Evento 1', produtor: 'João', status: 'Aberto', dataInicio: '10/06/2023' },
        { id: 2, nome: 'Evento 2', produtor: 'Maria', status: 'Aberto', dataInicio: '15/06/2023' },
        { id: 3, nome: 'Evento 3', produtor: 'Carlos', status: 'Aberto', dataInicio: '20/06/2023' },
    ];

    // Função para renderizar cada item da tabela
    const renderItem = ({ item }) => (
        <View style={styles.row}>
            <Text style={styles.cell}>{item.nome}</Text>
            <Text style={styles.cell}>{item.produtor}</Text>
            <Text style={styles.cell}>{item.dataInicio}</Text>
            <Text style={styles.cell}>{item.status}</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => handleConferirEvento(item)}
            >
                <Text style={styles.buttonText}>Conferir</Text>
            </TouchableOpacity>
        </View>
    );

    const handleConferirEvento = async (evento) => {
        // Armazenar o ID do evento no AsyncStorage
        try {
            await AsyncStorage.setItem('eventoId', evento.id.toString());
        } catch (error) {
            console.log('Erro ao armazenar o ID do evento:', error);
        }

        // Definir os dados do evento selecionado no estado
        setEventoSelecionado(evento);

        // Abrir o modal de conferir
        setConferirModalVisible(true);
    };

    const handleFecharConferirModal = () => {
        // Fechar o modal de conferir
        setConferirModalVisible(false);
    };

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

            {/* Modal de conferir */}
            <Modal
                visible={conferirModalVisible}
                animationType="slide"
            >
                <View style={styles.conferirModalContainer}>
                    <Image
                        source={ImageProdutor}
                        style={styles.bannerImage}
                    />
                    <Text style={styles.conferirModalTitle}>{eventoSelecionado?.nome}</Text>
                    <Text style={styles.conferirModalText}>Produtor: {eventoSelecionado?.produtor}</Text>
                    <Text style={styles.conferirModalText}>Data de Início: {eventoSelecionado?.dataInicio}</Text>
                    <Text style={styles.conferirModalText}>Data de Fim: {eventoSelecionado?.dataFim}</Text>
                    <TouchableOpacity
                        style={styles.conferirModalButton}
                        onPress={handleFecharConferirModal}
                    >
                        <Text style={styles.conferirModalButtonText}>Fechar</Text>
                    </TouchableOpacity>
                </View>
            </Modal>

        </View>
    );
};

const styles = StyleSheet.create({
    // ...

    conferirModalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    bannerImage: {
        width: '90%',
        height: '90%',
        resizeMode: 'cover',
        marginBottom: 10,
    },
    conferirModalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    conferirModalText: {
        fontSize: 16,
        marginBottom: 5,
    },
    conferirModalButton: {
        backgroundColor: '#3F51B5',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 4,
        marginTop: 10,
    },
    conferirModalButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});


export default Tabela;
