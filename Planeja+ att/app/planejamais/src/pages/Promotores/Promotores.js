import { useState, useEffect } from 'react';
import { Text, View, Image, TouchableOpacity, TextInput } from 'react-native';
import * as React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import style from './style';
import ImageProdutor from './assets/imageProdutor.jpg';

const Card = ({ imageSource, name, description, onPress }) => {
  return (
    <View style={style.cardContainer}>
      <Image source={imageSource} style={style.image} />
      <Text style={style.name}>{name}</Text>
      <Text style={style.description}>{description}</Text>
      <TouchableOpacity style={style.button} onPress={onPress}>
        <Text style={style.buttonText}>Ver mais</Text>
      </TouchableOpacity>
    </View>
  );
};

export default function Promotores({ navigation }) {
  const [promoters, setPromoters] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredPromoters, setFilteredPromoters] = useState([]);

  useEffect(() => {
    fetchPromoters();
  }, []);

  const fetchPromoters = async () => {
    try {
      const response = await fetch('http://localhost:3000/usuarios'); // Substitua pela URL correta da sua API
      const data = await response.json();
      setPromoters(data);
      setFilteredPromoters(data.filter((promoter) => promoter.tipo === 'Produtor'));
    } catch (error) {
      console.error('Erro ao obter os promotores:', error);
    }
  };

  useEffect(() => {
    filterPromoters();
  }, [searchText]);

  const filterPromoters = () => {
    const filtered = promoters.filter(
      (promoter) =>
        promoter.tipo === 'Produtor' &&
        promoter.nomeFantasia.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredPromoters(filtered);
  };

  const handleViewMore = async (promoter) => {
    try {
      console.log('asdadad');
      await AsyncStorage.setItem('idPromotor', promoter.id_usuario);
      navigation.navigate("PerfilPromotor");
    } catch (error) {
      console.error('Erro ao salvar o id_usuario:', error);
    }
  };

  return (
    <View style={style.container}>
      <View style={style.containerLogin}>
        <Text style={style.titulo}>PLANEJA+</Text>
        <View style={style.contSearch}>
          <TextInput
            underlineColorAndroid="#283341"
            style={style.input}
            placeholder='Procurar.....'
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
        <View style={style.container}>
          <View style={style.row}>
            {filteredPromoters.map((promoter, i) => {
              return (
                <Card
                  key={i}
                  imageSource={ImageProdutor}
                  name={promoter.nomeFantasia}
                  description={promoter.email}
                  onPress={() => handleViewMore(promoter)}
                />
              );
            })}
          </View>
        </View>
      </View>
    </View>
  );
}
