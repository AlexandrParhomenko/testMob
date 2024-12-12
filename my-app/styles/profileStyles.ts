import {StyleSheet} from "react-native";

const profileStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    userNameWindow: {
        width: '65%',
        alignItems: 'flex-start',
    },
    enterButton: {
        width: '90%',
        alignSelf: 'center',
        borderRadius: 40,
        backgroundColor: '#e30000',
        padding: 10,
        alignItems: 'center',
    },
    settingsWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 25
    },
    nav: {
        height: 'auto',
    },
    profileSectionFont: {
        fontFamily: 'BebasNeue',
        fontSize: 20,
        color: 'white'
    },
    idWrapper: {
        flexDirection: "row",
        alignItems: "center",
    },
    userName: {
        fontSize: 28,
        flexWrap: 'wrap',
        fontFamily: 'SpaceMono',
        fontWeight: 'bold',
        letterSpacing: 1
    },
    paymentsSection: {
        flexDirection: 'column',
        paddingTop: 30,
        rowGap: 20,
    },
    paymentsSectionCount: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    count: {
        flexDirection: "row",
    },
    branchWrapper: {
        paddingTop: 30,
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 10
    },
    branchSection: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    branch: {
        borderRadius: 10,
        padding: 5,
        width: 70,
        alignItems: 'center',
        backgroundColor: '#279e91'
    },
    group: {
        borderRadius: 10,
        padding: 5,
        width: 70,
        alignItems: 'center',
        backgroundColor: '#bd092c'
    },
    regularFont: {
        textAlign: 'center',
        fontFamily: 'BebasNeue',
        fontSize: 20
    },
    connectWrapper: {
        alignItems: 'center',
        width: 100,
        rowGap: 5
    },
    notificationWrapper: {
        flexDirection: "column",
        alignItems: 'center',
        rowGap: 5
    },
    mainBarWrapper: {
        alignItems: 'center',
        paddingTop: 20
    },
    greyBack: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        backgroundColor: '#636f7e',
        opacity: 0.5,
        zIndex: 100,
    },
    helpIcon: {
        backgroundColor: '#f39617',
        alignItems: 'center',
        justifyContent: "center",
        borderRadius: 50,
        height: 20,
        width: 20,
    },
    avatar: {
        height: 110,
        width: 110,
        borderWidth: 2,
        borderColor: '#636f7e',
        borderRadius: 100,
        alignItems: "center",
        backgroundColor: 'white',
        justifyContent: 'center',
    },
    picture: {
        objectFit: 'contain'
    },
    mainSection: {
        alignItems: 'center',
        justifyContent: "space-between",
        flexDirection: 'row',
        paddingHorizontal: 20
    },
    mainTitleFont: {
        textAlign: 'center',
        fontSize: 23,
    },
    picker: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between",
        borderRadius: 50,
        backgroundColor: '#a9a8a8',
        width: 60,
        height: 30
    },
    pickerItemText: {
        color: 'white',
        fontSize: 15
    },
    pickerItem: {
        backgroundColor: '#d22020',
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: "center",
        borderRadius: 50
    },
    newItemPicker: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: "center",
        flexDirection: 'row',
        columnGap: 10,
        top: 30,
        left: 20,
        backgroundColor: 'white',
        borderRadius: 50,
        height: 40,
        paddingHorizontal: 10,
        zIndex: 101
    },
    newItemPickerItem: {
        height: 25,
        width: 25,
        borderWidth: 2,
        borderColor: '#b6b6b6',
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: "center",
    },
    newItemPickerItemActive: {
        backgroundColor: '#d22020',
        borderWidth: 0
    },
    pickerArrow: {
        paddingRight: 7
    },
    profileListLogo: {
        backgroundColor: '#e34d4d',
        borderRadius: 50,
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    scheduleContainer: {
        flexDirection: 'row',
        paddingHorizontal: 25,
        justifyContent: 'space-between',
        paddingTop: 20,
        alignItems: 'center'
    },
    appVersionFont: {
        fontSize: 17,
        color: 'darkgrey',
        alignSelf: 'center',
        paddingVertical: 20
    }
})

export default profileStyles