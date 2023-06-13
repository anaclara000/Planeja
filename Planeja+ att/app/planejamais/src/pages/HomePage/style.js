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
        marginLeft: 5,
        marginTop: 25
    },
    cont1: {
        display: 'flex',
        flexDirection: "row",
        alignItems: 'center',
        marginLeft: 10,
        marginTop: 10
    },

    input: {
        backgroundColor: "#1E2630",
        height: 25,
        width: "70%",
        borderRadius: 10
    },
    containerCard: {
      
        padding: 0,
    },

    containerModalUser: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        margin: 20,
        backgroundColor: '#283341',
        borderRadius: 20,
    },
    icon: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 16,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        color: 'white',
    },
    input: {
        width: '100%',
        height: 35,
        
        marginBottom: 10,
        paddingHorizontal: 10,
        backgroundColor: '#1E2630',
        color: 'white',
    },
    confirmButton: {
        backgroundColor: '#3F51B5',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 4,
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',

    },
})

