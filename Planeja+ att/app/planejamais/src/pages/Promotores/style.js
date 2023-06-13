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
        marginTop: 10
    },

    input: {
        backgroundColor: "#283341",
        height: 50,
        borderRadius: 100,
        width: "95%",
        paddingLeft: 10,
        color: "white",
        
        
    },
    contSearch: {
        marginTop: 20,
        borderRadius: 100,
        marginLeft: 30,


    },

    contCardProdutor: {
        backgroundColor: "white",
        width: "38%",
        height: "21vh",
        borderRadius: 10,
    },

    ImageProdutor: {
        width: "100%",
        height: "40%",

    },

    contBtnVerMais: {
        backgroundColor: "#212124",
        color: 'white',
        borderRadius: 20,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 15,
        height: 23,
        display: 'flex',
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'center'
        
    },
    titleBtn: {
        textAlign:'center',
        color: 'white',
        fontSize: 12
        
    },


    containerCards: {
        flex: 1,
        padding: 16,
      },
      row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      cardContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
        flex: 1,
        marginRight: 8,
        maxWidth: '50%', 
        marginTop: '8%'
      },
      image: {
        width: '100%',
        height: 150,
        resizeMode: 'cover',
        marginBottom: 8,
        borderRadius: 8,
      },
      name: {
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 4,
        textAlign: 'center'
      },
      description: {
        fontSize: 14,
        marginBottom: 8,
      },
      button: {
        backgroundColor: '#EAEAEA',
        borderRadius: 4,
        paddingVertical: 6,
        paddingHorizontal: 12,
        alignItems: 'center',
      },
      buttonText: {
        fontSize: 14,
        color: '#333333',
      },


   
    
})

