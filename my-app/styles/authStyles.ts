import {StyleSheet} from "react-native";

const authStyles = StyleSheet.create({
    container: {
        flex: 1,
        zIndex: 0,
        backgroundColor: '#000',
    },
    backgroundTextBox: {
        height: 250,
        position: 'absolute',
        top: '33%',
    },
    backgroundTextBoxEffect: {
        color: 'darkgrey',
        transform: [{rotate: '90deg'}],
        opacity: 0.2,
    },
    bigFont: {
        textAlign: 'center',
        fontFamily: 'BebasNeue',
        fontSize: 250,
        zIndex: 1,
        width: '100%',
        letterSpacing: 15
    },
    img: {
        flex: 1,
        justifyContent: 'center',
        zIndex: 2
    },
    authWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        width: "100%",
    },
    phoneWrapper: {
        flexDirection: 'row',
    },
    checkBoxWindowWrapper: {
        width: '100%',
        paddingTop: 40,
        alignItems: 'center',
        shadowOpacity: 0.1,
        shadowRadius: 8,
        shadowOffset: {width: 0, height: 4},
        shadowColor: '#000',
    },
    validWrapper: {
        alignItems: 'center',
        width: '100%',
        rowGap: 0,
        margin: 0
    },
    checkboxWrapper: {
        flexDirection: 'row',
        columnGap: 10
    },
    textInput: {
        borderWidth: 1,
        color: 'black',
        backgroundColor: 'white',
        borderColor: 'white',
        borderRadius: 10,
        padding: 8,
        margin: 10,
        width: 200,
        fontSize: 15,
    },
    enterButton: {
        width: '100%',
        borderRadius: 40,
        backgroundColor: '#e30000',
        padding: 10,
        alignItems: 'center',
    },
    buttonText: {
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
    },
    registerButton: {
        width: '100%',
        borderRadius: 40,
        backgroundColor: '#cec7c7',
        padding: 10,
        alignItems: 'center',
    },
    inputBar: {
        width: "90%",
        borderWidth: 1,
        color: 'black',
        backgroundColor: 'white',
        borderColor: 'white',
        borderRadius: 50,
        padding: 8,
        paddingLeft: 15,
        margin: 15,
        fontSize: 20,
        letterSpacing: 1
    },
    phonePrefix: {
        borderWidth: 1,
        backgroundColor: 'white',
        color: 'black',
        fontSize: 15,
        borderColor: 'white',
        borderRadius: 10,
        padding: 12,
        margin: 10,
    },
    form: {
        flexDirection: 'column',
        alignItems: 'center',
        width: 285,
        rowGap: 10,
        backgroundColor: '#8f918a',
        opacity: 0.9,
        borderRadius: 10,
        padding: 20
    },
    logoWrapper: {
        width: 50,
        height: 50,
        backgroundColor: '#c2c2c2',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,

    },
    authTitle: {
        fontSize: 20,
        color: 'white'
    },
    vectorLogo: {}
});

export default authStyles