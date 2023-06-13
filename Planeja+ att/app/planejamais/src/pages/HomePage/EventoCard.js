import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import ImageProdutor from './assets/imageProdutor.jpg';


const HomePage = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        // Função para buscar os eventos do usuário
        const fetchUserEvents = async () => {
            try {
                const userId = await AsyncStorage.getItem('userId');
                // const response = await axios.get(`https://api.example.com/events?userId=${userId}`);
                const response = await axios.get(`http://localhost:3000/eventos`);
                setEvents(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchUserEvents();
    }, []);

    return (
        <View style={styles.container}>
            <ScrollView horizontal style={styles.scroll}>
                {events.map((event, i) => (
                    <View key={i} style={styles.card}>
                        <ImageBackground source={ImageProdutor} style={styles.image}>
                            <View style={styles.overlay}>
                                <Text style={styles.title}>{event.nome_evento}</Text>
                                <Text style={styles.dateTime}>{event.data_hora_inicio}</Text>
                            </View>
                        </ImageBackground>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    card: {
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 10,
        marginLeft: 10,
        width: "85%"
    },
    image: {
        width: '100%',
        aspectRatio: 16 / 9,
    },
    overlay: {
        flex: 1,
        justifyContent: 'flex-end',
        padding: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 5,
    },
    dateTime: {
        fontSize: 16,
        color: 'white',
    },
    scroll: {

    }

});

export default HomePage;
