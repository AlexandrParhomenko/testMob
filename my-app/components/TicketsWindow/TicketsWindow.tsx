import React, {FC, useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import data from '../../Categories/A_B/ticketsSlice'
import {Entypo, Feather, Ionicons} from '@expo/vector-icons';
import {Answer, Ticket} from "../../app/types/types";
import {useSelector} from "react-redux";
import {selectColor} from "../../app/store/reducers/themeSlice";
import themeStyles from "../../styles/styles";
import BackLink from "../BackLink/BackLink";
import GradientButton from "../GradientButton/GradientButton";
import Question from "../Question/Question";
import CloseLink from "../BackLink/CloseLink";
import {countMistakes} from "../../constants/functions";
import {SafeAreaView} from "react-native-safe-area-context";

interface ITickets {
    onClose: Function
}

const TicketsWindow: FC<ITickets> = ({onClose}) => {
    const [ticket, setTicket] = useState<Ticket[]>([])
    const [answers, setAnswers] = useState<Answer[]>([])
    const [ticketNumber, setTicketNumber] = useState<number>(0)
    const [ticketWindow, setTicketWindow] = useState<boolean>(false)
    const [showTip, setShowTip] = useState<boolean>(false)
    const [endGame, setEndGame] = useState<boolean>(false)
    const [mistakes, setMistakes] = useState<number>(0)
    let themeColor = useSelector(selectColor)

    return (
        <SafeAreaView
            style={[styles.container, themeColor === 'light' ? themeStyles.backgroundLight : themeStyles.backgroundDark]}>
            {!ticketWindow ? <>
                    <CloseLink label={"Билеты"} onClose={onClose}/>
                    <ScrollView overScrollMode={'never'} style={styles.scroll}>
                        <View style={styles.ticketsWrapper}>
                            {data.map((el, idx) => <TouchableOpacity key={idx} onPress={() => {
                                setTicketWindow(true)
                                setTicket(el)
                            }} style={styles.ticket}><Text
                                style={{fontSize: 20, fontFamily: 'BebasNeue'}}>Билет {idx + 1}</Text></TouchableOpacity>)}
                        </View>
                    </ScrollView>
                </>
                : !endGame ? <Question setTicketNumber={setTicketNumber} ticketNumber={ticketNumber} ticket={ticket}
                                       setEndGame={setEndGame} setTicketWindow={setTicketWindow} answers={answers}
                                       setAnswers={setAnswers} setMistakes={setMistakes} setShowTip={setShowTip}
                                       showTip={showTip}/>
                    : <View style={styles.winWrapper}>
                        <View style={styles.winTicket}>
                            {mistakes <= 4 ? <Feather name="check-circle" size={24} color="#34c201"/> :
                                <Entypo name="cross" size={24} color='#c20101'/>}
                            <Text
                                style={[themeStyles.regularFont, {color: themeColor === 'light' ? 'black' : 'white'}]}>{mistakes <= 4 ? `${ticket[0].ticket_number} сдан` : `${ticket[0].ticket_number} не сдан`}</Text>
                        </View>
                        <View style={styles.answersContainer}>
                            <View style={styles.mistakeAmountWrapper}>
                                <Text style={{fontSize: 25, color: '#c20101'}}>{countMistakes(answers)}</Text>
                                <Text style={[themeStyles.regularFont, {
                                    color: themeColor === 'light' ? 'black' : 'white',
                                    textAlign: 'center'
                                }]}>ошибок допущено</Text>
                            </View>
                            <View style={styles.mistakeAmountWrapper}>
                                <Text style={{fontSize: 25, color: '#34c201'}}>{20 - countMistakes(answers)}</Text>
                                <Text style={[themeStyles.regularFont, {
                                    color: themeColor === 'light' ? 'black' : 'white',
                                    textAlign: 'center'
                                }]}>правильных ответов</Text>
                            </View>
                        </View>
                        <View style={styles.winWindow}>
                            {answers.map((el, idx) => <View
                                style={el.is_correct
                                    ? [styles.endNumberBox, styles.green]
                                    : [styles.endNumberBox, styles.red]} key={idx}>
                                <Text
                                    style={[themeStyles.regularFont, {color: themeColor === 'light' ? 'black' : 'white'}]}>{idx + 1}</Text>
                            </View>)}
                        </View>
                        <TouchableOpacity onPress={() => {
                            setEndGame(false)
                            setAnswers([])
                            setMistakes(0)
                            setTicketNumber(0)
                            setTicketWindow(false)
                        }} style={styles.questionWrapperBtn}>
                            <GradientButton colors={['#7a1818', '#771b1b', 'red']} text={'Выйти'}/>
                        </TouchableOpacity>
                    </View>}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    navSectionTitle: {
        color: 'white',
        fontSize: 18,
        fontFamily: 'BebasNeue'
    },
    regularFont: {
        textAlign: 'center',
        fontFamily: 'BebasNeue',
        fontSize: 20
    },
    backgroundLight: {
        backgroundColor: 'white'
    },
    backgroundGrey: {
        backgroundColor: '#cbcbcb'
    },
    backgroundDark: {
        backgroundColor: '#212121FF'
    },
    textLight: {
        color: 'black'
    },
    textDark: {
        color: 'white'
    },
    ticketActive: {
        borderColor: '#595959',
        borderWidth: 2
    },
    green: {
        borderColor: '#34c201'
    },
    red: {
        borderColor: '#c20101'
    },
    answersContainer: {
        flexDirection: 'row',
    },
    mistakeAmountWrapper: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '30%',
        textAlign: 'center'
    },
    winWindow: {
        alignItems: 'center',
        width: '100%',
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingTop: 100,
        paddingHorizontal: 20,
        gap: 10
    },
    winWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        flexWrap: 'wrap',
        paddingTop: 100,
        gap: 10
    },
    winTicket: {
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 10
    },
    backBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
        backgroundColor: '#e0dcdc',
        height: 60,
        paddingTop: 30,
        marginBottom: 20,
        paddingLeft: 20,
        columnGap: 10
    },
    scroll: {
        marginBottom: 30,
    },
    menu: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    numberBox: {
        borderWidth: 1,
        borderColor: '#bdb7b7',
        padding: 5,
        borderRadius: 5,
        width: 30,
        alignItems: 'center',
    },
    endNumberBox: {
        borderWidth: 3,
        borderColor: '#bdb7b7',
        padding: 5,
        borderRadius: 5,
        width: 35,
        alignItems: 'center'
    },
    ticketsWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        paddingTop: 20
    },
    ticket: {
        height: 70,
        backgroundColor: '#e8e8e8',
        borderRadius: 10,
        width: 150,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#c2c2c2'
    },
    questionWrapperBtn: {
        marginVertical: 20,
        width: '60%',
        borderRadius: 40,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
});

export default TicketsWindow;