import {StatusBar, StyleSheet} from "react-native";

const themeStyles = StyleSheet.create({
    backgroundLight: {
        backgroundColor: 'white'
    },
    backgroundBright: {
        backgroundColor: '#e0e0e0'
    },
    backgroundDark: {
        backgroundColor: '#1a1a1a'
    },
    backgroundGrey: {
        backgroundColor: '#cbcbcb'
    },
    backgroundDarkGrey: {
        backgroundColor: '#4d4d4d'
    },
    selectDark: {
      backgroundColor: '#363636'
    },
    textGrey: {
        color: '#414141'
    },
    textLightGrey: {
        color: '#cbcbcb'
    },
    textLight: {
        color: 'black'
    },
    textDark: {
        color: 'white'
    },
    newsLight: {
        backgroundColor: '#e3e3e3',
    },
    newsDark: {
        backgroundColor: '#525252'
    },
    regularFont: {
        fontFamily: 'BebasNeue',
        fontSize: 20,
        color: 'white'
    },
    borderLight: {
        borderColor: 'black'
    },
    borderDark: {
        borderColor: 'white'
    },
    textInputLight: {

    },
    textInputDark: {
        backgroundColor: '#1a1a1a',
        borderColor: 'white',
    },
    chatBubble: {
        borderRadius: 15,
        padding: 12,
        rowGap: 2
    },
    overlay: {
        backgroundColor: "lightgray",
        height: "100%",
        width: "100%",
        position: "absolute",
        zIndex: 10,
        opacity: 0.5
    },
    safeAreaContainer: {
        flex: 1,
    },
    overlay__box: {
        position: "absolute",
        top: "5%",
        right: "5%",
        backgroundColor: "white",
        paddingVertical: 20,
        zIndex: 20,
        borderRadius: 10,
        rowGap: 20
    },
    chatBackLink: {
        alignItems: 'center',
        paddingLeft: 20,
        columnGap: 5,
        flexDirection: 'row',
        alignSelf: 'flex-start',
        paddingBottom: 10
    },
    chatTextInput: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        borderTopWidth: 1,
        borderTopColor: "#3b3b3b"
    },
    videoBtn: {
        flexDirection: 'row',
        width: '95%',
        borderRadius: 10,
        backgroundColor: '#e30000',
        padding: 10,
        alignItems: 'center',
        minHeight: 100,
        justifyContent: 'space-between'
    }
});

export default themeStyles