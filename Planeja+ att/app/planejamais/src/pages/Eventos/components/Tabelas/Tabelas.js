import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView, Modal, Image, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ImageProdutor from './assets/imageProdutor.jpg';
import Icon from './assets/convidadosWhite.png';
import Local from './assets/local_icon.png';


var eventoId = AsyncStorage.getItem('eventoId');

var nomeEvento
var ProdutorEvento
const Tabela = () => {
  const navigation = useNavigation();

  const [conferirModalVisible, setConferirModalVisible] = useState(false);
  const [eventoSelecionado, setEventoSelecionado] = useState(null);
  const [informacoesVisiveis, setInformacoesVisiveis] = useState(true);
  const [locacoesVisiveis, setLocacoesVisiveis] = useState(false);
  const [convidadosVisiveis, setConvidadosVisiveis] = useState(false);
  const [albumFotosVisivel, setAlbumFotosVisivel] = useState(false);
  const [eventos, setEventos] = useState([]);
  const [locacoes, setLocacoes] = useState([]);
  const [convidados, setConvidados] = useState([]);
  const [usuarios, setUsuarios] = useState([]);

  const [eventCode, setEventCode] = useState('');

  const handleSearch = () => {
    if (eventCode.trim() === '') {

      Alert.alert(
        'Título do Alerta',
        'Mensagem do Alerta',
        [
          { text: 'OK', onPress: () => console.log('Botão OK pressionado') }
        ],
        { cancelable: false }
      );

      // alert('Por favor, digite um código de evento válido');
      return;
    }

    var achouEvento = false
    eventos.forEach(e => {

      if (e.codigo == eventCode) {

        var nomeProdutor
        usuarios.forEach(u => {

          if (u.cnpj = e.cnpjProdutor) {

            nomeProdutor = u.nomeFantasia
          }

        })

        console.log(nomeProdutor);
        achouEvento = true
        handleConferirEvento(e, nomeProdutor)


      }

    })

    if (achouEvento == false) {
      alert('Código Inválido');
    }

    // setEventCode('');
  };

  // Dados de exemplo para preencher a tabela

  useEffect(() => {
    const fetchSessoes1 = async () => {
      try {
        const response = await fetch(`http://localhost:3000/eventos`);
        const data = await response.json();
        setEventos(data);
      } catch (error) {
        console.log('Erro ao buscar as sessões:', error);
      }
    };

    fetchSessoes1();
  }, []);


  useEffect(() => {
    const fetchSessoes2 = async () => {
      try {
        const response = await fetch(`http://localhost:3000/locacoesEvento`);
        const data = await response.json();
        setLocacoes(data);
      } catch (error) {
        console.log('Erro ao buscar as sessões:', error);
      }
    };
    fetchSessoes2();

  }, []);

  useEffect(() => {
    const fetchSessoes3 = async () => {
      try {
        const response = await fetch(`http://localhost:3000/convidados`);
        const data = await response.json();
        setConvidados(data);
      } catch (error) {
        console.log('Erro ao buscar as sessões:', error);
      }
    };
    fetchSessoes3();

  }, []);

  useEffect(() => {
    const fetchSessoes4 = async () => {
      try {
        const response = await fetch(`http://localhost:3000/usuarios`);
        const data = await response.json();
        setUsuarios(data);
      } catch (error) {
        console.log('Erro ao buscar as sessões:', error);
      }
    };
    fetchSessoes4();

  }, []);


  // Função para renderizar cada item da tabela
  // const renderItem = ({ item }) => (


  // )

  const handleConferirEvento = async (evento, nomeProdutor) => {

    eventoId = evento.id_eventos.toString()

    nomeEvento = evento.nome_evento
    ProdutorEvento = nomeProdutor

    setEventoSelecionado(evento);
    setConferirModalVisible(true);

  };

  const handleFecharEvento = async () => {
    setConferirModalVisible(false);
  }

  return (

    <View style={styles.container}>

      <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: "space-around", marginBottom: 0, marginTop: -15 }}>
        <TextInput
          style={{ borderRadius: 10, color: 'white', paddingLeft: 10, backgroundColor: "#283341", height: 40, marginTop: 20, marginBottom: 20, width: "70%" }}
          placeholder="Insira o código do evento"
          onChangeText={text => setEventCode(text)}
          value={eventCode}
        />
        <TouchableOpacity onPress={handleSearch} style={{ padding: 10, width: "20%", backgroundColor: "#3F51B5", borderRadius: 10 }} >
          <Text style={{ color: 'white', textAlign: 'center' }}>
            Buscar
          </Text>
        </TouchableOpacity>
        {/* <Button style={{}} title="Buscar"  */}
      </View>

      <View style={styles.header}>
        <Text style={styles.headerText}>Nome</Text>
        <Text style={styles.headerText}>Produtor</Text>
        <Text style={styles.headerText}>Data</Text>
        <Text style={styles.headerText}>Status</Text>
        <Text style={styles.headerText}>Ações</Text>
      </View>

      <ScrollView style={styles.listTable}>

        {/* <FlatList
          renderItem={renderItem}
          style={styles.table}
        /> */}

        {
          eventos.map((item, index) => {

            var produtor
            usuarios.map((u => {

              if (item.cnpjProdutor == u.cnpj) {
                produtor = u.nomeFantasia
              }

            }))

            return (
              <View style={styles.row} key={index}>
                <Text style={styles.cell}>{item.nome_evento}</Text>
                <Text style={styles.cell}>{produtor}</Text>
                <Text style={styles.cell}>{item.data_hora_inicio}</Text>
                <Text style={styles.cell}>{item.status}</Text>

                <TouchableOpacity
                  style={styles.button}
                  onPress={() => handleConferirEvento(item, produtor)}>

                  <Text style={styles.buttonText}>Conferir</Text>

                </TouchableOpacity>

              </View>
            )
          })
        }

      </ScrollView>

      {/* Modal de Conferir Evento */}
      <Modal
        visible={conferirModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setConferirModalVisible(false)}
        style={styles.modal}
      >
        <View style={styles.modalContainer}>
          <ScrollView style={styles.modalContent}>
            {eventoSelecionado && (
              <>

                <View style={styles.header2}>
                  <Image source={ImageProdutor} style={styles.image} />
                  <View style={styles.headerTextContainer}>
                    <Text style={styles.eventoNome}>{nomeEvento}</Text>
                    <Text style={styles.eventoProdutor}>Produtor: {ProdutorEvento}</Text>
                  </View>
                </View>


                <ScrollView horizontal>

                  <View style={styles.tabsContainer}>
                    <TouchableOpacity
                      style={[styles.tabButton, informacoesVisiveis && styles.tabButtonActive]}
                      onPress={() => {
                        setInformacoesVisiveis(true);
                        setLocacoesVisiveis(false);
                        setConvidadosVisiveis(false);
                        setAlbumFotosVisivel(false);
                      }}
                    >
                      <Text style={[styles.tabButtonText, informacoesVisiveis && styles.tabButtonTextActive]}>Informações</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[styles.tabButton, locacoesVisiveis && styles.tabButtonActive]}
                      onPress={() => {
                        setInformacoesVisiveis(false);
                        setLocacoesVisiveis(!locacoesVisiveis);
                        setConvidadosVisiveis(false);
                        setAlbumFotosVisivel(false);
                      }}
                    >
                      <Text style={[styles.tabButtonText, locacoesVisiveis && styles.tabButtonTextActive]}>Locações</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[styles.tabButton, convidadosVisiveis && styles.tabButtonActive]}
                      onPress={() => {
                        setInformacoesVisiveis(false);
                        setLocacoesVisiveis(false);
                        setConvidadosVisiveis(!convidadosVisiveis);
                        setAlbumFotosVisivel(false);
                      }}
                    >
                      <Text style={[styles.tabButtonText, convidadosVisiveis && styles.tabButtonTextActive]}>Convidados</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[styles.tabButton, albumFotosVisivel && styles.tabButtonActive]}
                      onPress={() => {
                        setInformacoesVisiveis(false);
                        setLocacoesVisiveis(false);
                        setConvidadosVisiveis(!convidadosVisiveis);
                        setAlbumFotosVisivel(false);
                      }}
                    >
                      <Text style={[styles.tabButtonText, albumFotosVisivel && styles.tabButtonTextActive]}>Álbum de Fotos</Text>
                    </TouchableOpacity>
                  </View>

                </ScrollView>
                {/* Conteúdo das abas */}
                {informacoesVisiveis && (
                  <View style={styles.tabContent}>
                    {eventos.map((evento, i) => {

                      console.log(evento.id_eventos, eventoId);
                      if (evento.id_eventos == eventoId) {

                        const dataHoraString1 = evento.data_hora_inicio;
                        const dataHora = new Date(dataHoraString1);

                        const dia = dataHora.getDate().toString().padStart(2, '0');
                        const mes = (dataHora.getMonth() + 1).toString().padStart(2, '0');
                        const ano = dataHora.getFullYear();
                        const horas = dataHora.getHours().toString().padStart(2, '0');
                        const minutos = dataHora.getMinutes().toString().padStart(2, '0');

                        const dataHoraFormatada1 = `${dia}/${mes}/${ano} ${horas}:${minutos}`;

                        const dataHoraString2 = evento.data_hora_fim;
                        const dataHora2 = new Date(dataHoraString2);

                        const dia2 = dataHora2.getDate().toString().padStart(2, '0');
                        const mes2 = (dataHora2.getMonth() + 1).toString().padStart(2, '0');
                        const ano2 = dataHora2.getFullYear();
                        const horas2 = dataHora2.getHours().toString().padStart(2, '0');
                        const minutos2 = dataHora2.getMinutes().toString().padStart(2, '0');

                        const dataHoraFormatada2 = `${dia2}/${mes2}/${ano2} ${horas2}:${minutos2}`;
                        return (
                          <View key={i}>

                            <View style={styles.contDisplay}>
                              <Image source={Local} style={styles.iconLocal} />
                              <Text style={styles.tabText}>{evento.endereco_evento}</Text>
                              <Image source={Local} style={styles.iconLocal} />

                            </View>

                            <View style={styles.contDisplay3}>
                              <Text style={styles.tabText2}>Data e Hora Inicio: {dataHoraFormatada1}</Text>
                              <Text style={styles.tabText3}>Data e Hora Fim: {dataHoraFormatada2}</Text>
                            </View>

                          </View>
                        );
                      }

                    })}

                    <TouchableOpacity style={styles.btnFecharEvento} onPress={handleFecharEvento}>
                      <Text style={styles.textBtnFecharEvento}>Fechar Evento</Text>
                    </TouchableOpacity>
                  </View>
                )}


                {locacoesVisiveis && (
                  <View style={styles.tabContent}>
                    {locacoes.map((locacao, i) => {
                      if (locacoes.id_evento == eventoId) {
                        return (
                          <View key={i} style={styles.locacaoItem}>
                            <Text style={styles.locacaoNome}>{locacao.nome}</Text>
                            <Text style={styles.locacaoValor}>Valor: R${locacao.valor}</Text>
                          </View>
                        );
                      }
                      return null;
                    })}

                    <TouchableOpacity style={styles.btnFecharEvento} onPress={handleFecharEvento}>
                      <Text style={styles.textBtnFecharEvento}>Fechar Evento</Text>
                    </TouchableOpacity>

                  </View>
                )}


                {convidadosVisiveis && (
                  <View style={styles.tabContent}>
                    {convidados.map((convidado, i) => {
                      if (convidado.idEvento == eventoId) {
                        return (
                          <View key={i} style={styles.convidadoItem}>
                            <Text style={styles.convidadoNome}>{convidado.nome}</Text>
                            <Text style={styles.convidadoEmail}>{convidado.telefone}</Text>
                          </View>
                        );
                      }

                    })}
                    <TouchableOpacity style={styles.btnFecharEvento} onPress={handleFecharEvento}>
                      <Text style={styles.textBtnFecharEvento}>Fechar Evento</Text>
                    </TouchableOpacity>

                  </View>
                )}


                {albumFotosVisivel && (
                  <View style={styles.tabContent}>
                    {eventoSelecionado.fotos.map((foto) => (
                      <Image key={foto.id} source={{ uri: foto.url }} style={styles.foto} />
                    ))}
                  </View>
                )}



              </>
            )}
          </ScrollView>
        </View>

      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  button: {
    backgroundColor: "#3F51B5",
    padding: 6,
    borderRadius: 5

  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 13
  },
  table: {
    flex: 1,
    marginBottom: 16,
  },
  row: {
    width: "100%",
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: 'white',
    textAlign: 'center',
  },
  cell: {
    flex: 1,
    marginHorizontal: 0,
  },
  cellText: {
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: 'flex-end',
    marginTop: "5%"
  },
  modalContent: {
    width: '95%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    alignSelf: 'center',
    flex: 1,
  },
  header2: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  image: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16,
  },
  headerTextContainer: {
    flex: 1,
  },
  eventoNome: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  eventoProdutor: {
    fontSize: 16,
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  tabButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  tabButtonActive: {
    backgroundColor: '#ccc',
  },
  tabButtonText: {
    fontSize: 16,
  },
  tabButtonTextActive: {
    fontWeight: 'bold',
  },
  tabContent: {
    marginTop: 16,
  },
  tabText: {
    fontSize: 16,
    marginBottom: 0,
    margin: 2,
    textAlign: 'center'
  },

  tabText2: {
    fontSize: 16,
    marginBottom: 8,
    margin: 2,
    marginTop: 6,
    marginBottom: 10,
    textAlign: 'center',
    backgroundColor: "#1E2630",
    padding: 10,
    borderRadius: 10,
    color: 'white'
  },

  tabText3: {
    fontSize: 16,
    marginBottom: 8,
    margin: 2,
    marginTop: 12,
    marginBottom: 30,
    textAlign: 'center',
    backgroundColor: "#1E2630",
    padding: 10,
    borderRadius: 10,
    color: 'white'
  },
  locacaoItem: {
    marginBottom: 8,
  },
  locacaoNome: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  locacaoValor: {
    fontSize: 14,
  },
  convidadoItem: {
    marginBottom: 8,
    width: "50%",
    alignSelf: 'center',
    backgroundColor: "#1E2630",
    padding: 10,
    borderRadius: 10
  },
  convidadoNome: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white'
  },
  convidadoEmail: {
    fontSize: 14,
    textAlign: 'center',
    color: 'white'


  },
  foto: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    marginBottom: 16,
  },

  contDisplay: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: "100%",
    marginTop: 0

  },

  contDisplay3: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    width: "100%",
    marginTop: 25,

  },
  contDisplay2: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    width: "100%",
    marginTop: 10
  }
  ,
  iconLocal: {
    width: '12%',
    height: "100%",
    resizeMode: 'contain'
  },
  modal: {
    height: "20vh"
  },
  btnFecharEvento: {
    width: "70%",
    alignSelf: 'center',
    textAlign: 'center',
    backgroundColor: "#3F51B5",
    padding: 10,
    borderRadius: 10,
    marginTop: 35
  },
  textBtnFecharEvento: {
    color: "white",
    fontSize: 14
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    padding: 10,
    marginBottom: 0,
    textAlign: 'center'
  },
  headerText: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  listTable: {
    height: "80%",
    backgroundColor: 'white'
  }

});

export default Tabela;

