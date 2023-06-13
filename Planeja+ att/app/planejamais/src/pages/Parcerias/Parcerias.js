import { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Button, TextInput, ImageBackground } from 'react-native';
import * as React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Tabela from './components/Tabelas/Tabelas'

import style from './style';


export default function Eventos({ navigation }) {

    return (
        <View style={style.container}>

            <View style={style.containerLogin}>
                <Text style={style.titulo}>PLANEJA+</Text>
            </View>

            <Tabela />

        </View>
    );

}
