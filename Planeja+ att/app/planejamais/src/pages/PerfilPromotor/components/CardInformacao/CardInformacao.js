import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProdutorCard = ({ nome, telefone, endereco }) => {

    return (
        <View style={styles.cardContainer}>

            <Text style={styles.title}>INFORMAÇÕES DO PROMOTOR</Text>

            <View style={styles.contTexts}>
                <Text style={styles.label}>Nome:</Text>
                <Text style={styles.text}>{nome}</Text>
            </View>

            <View style={styles.contTexts}>

                <Text style={styles.label}>Telefone:</Text>
                <Text style={styles.text}>{telefone}</Text>
            </View>

            <View style={styles.contTexts}>

                <Text style={styles.label}>Endereço:</Text>
                <Text style={styles.text}>{endereco}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        padding: 10,
        marginBottom: 15,
        marginTop: 25,
        backgroundColor: "#283341",
        width: '90%',
        alignSelf: 'center',
        borderRadius: 10

    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 15,
        color: 'white',

    },
    label: {
        fontWeight: 'bold',
        marginBottom: 5,
        color: 'white',
        fontSize: 15,

    },
    text: {
        marginBottom: 10,
        marginLeft: 10,
        fontSize: 15,
        color: 'white',
    },
    contTexts: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        fontSize: 17

    }
});

export default ProdutorCard;
