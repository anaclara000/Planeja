import { useState } from 'react';
import { styleheet, Text, View, Image, TouchableOpacity, Button, TextInput, ImageBackground, ScrollView } from 'react-native';
import * as React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EventCard from './EventoCard';

import style from './style';

import ImageProdutor from './assets/imageProdutor.jpg';

export default function HomePage({ navigation }) {

    const event = {
        name: 'Evento Exemplo',
        dateTime: '12 de junho, 18:00',
        image: ImageProdutor,
    };

    const [nome, setNome] = useState('John Doe');
    const [email, setEmail] = useState('johndoe@example.com');
    const [cpf, setCpf] = useState('123.456.789-00');
    const [senha, setSenha] = useState('12345');
    const [confirmarSenha, setConfirmarSenha] = useState('12345');

    const handleConfirm = () => {
        // Aqui você pode adicionar a lógica para enviar as alterações para o backend ou realizar outras ações
        console.log('Alterações confirmadas:', { nome, email, cpf });
    };

    return (
        <ScrollView>

            <View style={style.container}>
           
                <Text style={style.titulo}>PLANEJA+</Text>

                <View style={style.containerModalUser}>
                    <Image source={ImageProdutor} style={style.icon} />

                    <Text style={style.label}>Nome:</Text>
                    <TextInput
                        style={style.input}
                        value={nome}
                        onChangeText={setNome}
                    />

                    <Text style={style.label}>Email:</Text>
                    <TextInput
                        style={style.input}
                        value={email}
                        onChangeText={setEmail}
                    />

                    <Text style={style.label}>CPF:</Text>
                    <TextInput
                        style={style.input}
                        value={cpf}
                        onChangeText={setCpf}
                    />

                    <Text style={style.label}>SENHA:</Text>
                    <TextInput
                        style={style.input}
                        value={senha}
                        onChangeText={setSenha}
                    />

                    <Text style={style.label}>CONFIRMAR SENHA:</Text>
                    <TextInput
                        style={style.input}
                        value={confirmarSenha}
                        onChangeText={setConfirmarSenha}
                    />

                    <TouchableOpacity style={style.confirmButton} onPress={handleConfirm}>
                        <Text style={style.buttonText}>Confirmar Alterações</Text>
                    </TouchableOpacity>
                </View>

                <View style={style.containerLogin}>


                    <View style={style.cont1}>
                        <Text style={style.textCont1}>Meus Eventos</Text>
                    </View>

                    <View style={style.containerCard}>
                        <ScrollView horizontal style={style.contsScroll}>
                            <EventCard event={event} />
                        </ScrollView>
                    </View>
                </View>
            </View>
        </ScrollView>

    );

}
