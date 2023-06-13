import { useState, useEffect } from 'react';
import { styleheet, Text, View, Image, TouchableOpacity, Button, TextInput, ImageBackground, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


import style from './style';

import ImageProdutor from './assets/imageProdutor.jpg';
import ModalFecharParceria from './components/ModalFecharParceria/ModalFecharParceria'
import ModalCadastrarLocacao from './components/ModalLocacao/ModalLocacao'
import ProdutorCard from './components/CardInformacao/CardInformacao'

export default function PerfilPromotor({ navigation }) {
  var idPromotor
  var nomeProdutor

  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    // Função para buscar os eventos do usuário
    const fetchUserEvents = async () => {
      try {
        // const response = await axios.get(`https://api.example.com/events?userId=${userId}`);
        const response = await axios.get(`http://localhost:3000/usuarios`);
        setUsuarios(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserEvents();
  }, []);


  const getItemFromStorage = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        idPromotor = value

        console.log(idPromotor);

        usuarios.forEach(u => {

          if (u.id_usuario == idPromotor) {

            nomeProdutor = u.nomeFantasia

            console.log(nomeProdutor);
          }


        })

        return value;
      } else {
        // O item não foi encontrado
        return null;
      }
    } catch (error) {
      // Ocorreu um erro ao recuperar o item
      console.log('Erro ao recuperar o item:', error.message);
      return null;
    }
  };


  // Chamada da função para recuperar um item específico
  getItemFromStorage('idPromotor')
    .then((promotorID) => {

    })
    .catch((error) => {
      console.log('Erro:', error);
    });


  const [vMostrarModalLocacao, setMostrarModalLocacao] = useState(false);
  const [vMostrarModaFecharParceria, setMostrarModaFecharParceria] = useState(false);

  const handleAbrirModal = () => {
    setMostrarModalLocacao(true);
  };

  const handleAbrirModalParceria = () => {
    setMostrarModaFecharParceria(true);
  };

  const handleFecharModal = () => {
    setMostrarModalLocacao(false);
  };
  const handleFecharModalParceria = () => {
    setMostrarModaFecharParceria(false);
  };

  const eventTypes = [
    { name: 'Casamentos', image: ImageProdutor },
    { name: 'Festas de Aniversário', ImageProdutor },
    { name: 'Eventos Corporativos', ImageProdutor },
    // Adicione outros tipos de eventos aqui
  ];

  const servicosTypes = [
    { name: 'Serviço1', image: ImageProdutor },
    { name: 'Serviço2', image: ImageProdutor },
    { name: 'Serviço3', image: ImageProdutor },
    // Adicione outros tipos de eventos aqui
  ];

  const locacoesTypes = [
    { name: 'Serviço1', image: ImageProdutor },
    { name: 'Serviço2', image: ImageProdutor },
    { name: 'Serviço3', image: ImageProdutor },
    // Adicione outros tipos de eventos aqui
  ];


  const onPressVoltar = () => {

    navigation.goBack() // Navega para a tela de Produtores
  };

  return (
    <ScrollView style={style.container}>

      <View >

        <View style={style.containerLogin}>

          <Text style={style.titulo}>PLANEJA+</Text>

          <TouchableOpacity style={style.button} onPress={onPressVoltar}>
            <Text style={style.buttonText}>Voltar</Text>
          </TouchableOpacity>

          <View style={style.containerInicial}>
            <Image
              source={ImageProdutor}
              style={style.icon}
            />

            <Text style={style.name}>{nomeProdutor}</Text>

          </View>

          {/* 
        <TouchableOpacity style={style.buttonFecharParceria1} onPress={handleAbrirModalParceria}>
          <Text style={style.buttonText2}>Fechar Parceria</Text>
        </TouchableOpacity>
         */}

          <Text style={style.titleSections}>Tipos de Eventos</Text>

          <ScrollView horizontal contentContainerStyle={style.scrollViewContent}>
            {eventTypes.map((eventType, index) => (
              <View key={index} style={style.card}>
                <Text style={style.nameCardLocacao}>{eventType.name}</Text>
              </View>
            ))}
          </ScrollView>

          {/* <View style={style.containerInicial2}>
          <TouchableOpacity style={style.buttonFecharParceria} onPress={handleAbrirModal}>
            <Text style={style.buttonText2}>Adicionar Tipo Evento</Text>
          </TouchableOpacity>
        </View> */}

          <ProdutorCard
            nome="João da Silva"
            telefone="(11) 1234-5678"
            endereco="Rua Exemplo, 123"
          />

          <Text style={style.titleSections2}>Serviços Fornecidos</Text>


          <ScrollView horizontal contentContainerStyle={style.scrollViewContent2}>
            {servicosTypes.map((eventType, index) => (
              <View key={index} style={style.card2}>
                <Text style={style.nameCardLocacao}>{eventType.name}</Text>
              </View>
            ))}
          </ScrollView>



          <Text style={style.titleSections3}>Locações Fornecidas</Text>

          <ScrollView horizontal contentContainerStyle={style.scrollViewContent3}>
            {locacoesTypes.map((eventType, index) => (
              <View key={index} style={style.card3}>
                <Text style={style.nameCardLocacao}>{eventType.name}</Text>
              </View>
            ))}
          </ScrollView>

          <ModalCadastrarLocacao isVisible={vMostrarModalLocacao} onClose={handleFecharModal} />
          <ModalFecharParceria isVisible={vMostrarModaFecharParceria} onClose={handleFecharModalParceria} />
        </View>
      </View>
    </ScrollView>

  );

}
