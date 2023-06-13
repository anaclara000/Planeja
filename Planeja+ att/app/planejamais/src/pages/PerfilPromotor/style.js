import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    backgroundColor: '#1E2630',
    height: "100%",
  }
  ,
  titulo: {
    "fontSize": 30,
    "textAlign": "center",
    "marginTop": 10,
    color: "white"

  },
  textCont1: {
    fontSize: 20,
    color: "white",
    fontFamily: "Arial",
    marginLeft: 5
  },

  cont1: {
    display: 'flex',
    flexDirection: "row",
    alignItems: 'center',
    marginLeft: 10,
    marginTop: 30
  },

  button: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 7,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    width: 120, // Defina a largura desejada
    alignSelf: 'center', // Centraliza horizontalmente
  },
  buttonText: {
    color: 'black',
    fontSize: 15,
  },

  containerInicial: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 90
  },
  containerInicial2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0
  },
  icon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: "white"
  },
  buttonFecharParceria: {
    backgroundColor: '#3F51B5',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
  },
  buttonFecharParceria1: {
    marginTop: 40,
    backgroundColor: '#3F51B5',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
    width: "50%",
    alignSelf: 'center'
  },

  buttonText2: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  },

  card: {
    width: 200,
    height: 80,
    marginRight: 16,
    paddingTop: 10,
    backgroundColor: "#283341",
    paddingLeft: 10,
    borderRadius: 10
  },
  card2: {
    width: 200,
    height: 80,
    marginRight: 16,
    paddingTop: 10,
    backgroundColor: "#283341",
    paddingLeft: 10,
    borderRadius: 10
  },
  card3: {
    width: 200,
    height: 80,
    marginRight: 16,
    paddingTop: 10,
    backgroundColor: "#283341",
    paddingLeft: 10,
    borderRadius: 10
  },
  imageCard: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  nameCardLocacao: {

    bottom: 16,
    left: 16,
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  scrollViewContent: {
    paddingLeft: 16,
    paddingRight: 8,
    height: 5,
    marginTop: 10,
    marginBottom: 50,


  },

  scrollViewContent2: {
    paddingLeft: 16,
    paddingRight: 8,
    height: 30,
    marginTop: 0,
    marginBottom: 25
  },
  scrollViewContent3: {
    paddingLeft: 16,
    paddingRight: 8,
    height: 5,
    marginTop: 10,
    marginBottom: 50,



  },
  titleSections: {
    marginTop: 60,
    marginLeft: 20,
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  },
  titleSections2: {
    marginTop: 0,
    marginLeft: 20,
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  },
  titleSections3: {
    marginTop: 15,
    marginLeft: 20,
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  }


})

