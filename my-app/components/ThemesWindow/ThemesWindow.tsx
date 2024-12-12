import React, {FC, useState} from 'react';
import {Answer} from "../../app/types/types";
import {useSelector} from "react-redux";
import {selectColor} from "../../app/store/reducers/themeSlice";
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import themeStyles from "../../styles/styles";
import CloseLink from "../BackLink/CloseLink";
import data from "../../Categories/A_B/topicsSlice";
import Question from "../Question/Question";
import {Entypo, Feather, FontAwesome6, Ionicons} from "@expo/vector-icons";
import GradientButton from "../GradientButton/GradientButton";
import {SafeAreaView} from "react-native-safe-area-context";

interface IThemes {
    onClose: Function
}

const ThemesWindow:FC<IThemes> = ({onClose}) => {
    const [ticket, setTicket] = useState<any>({})
    const [answers, setAnswers] = useState<Answer[]>([])
    const [ticketNumber, setTicketNumber] = useState<number>(0)
    const [ticketWindow, setTicketWindow] = useState<boolean>(false)
    const [showTip, setShowTip] = useState<boolean>(false)
    const [endGame, setEndGame] = useState<boolean>(false)
    const [mistakes, setMistakes] = useState<number>(0)
    let themeColor = useSelector(selectColor)

    const countMistakes = () => {
        let ans = 0
        answers.forEach(el => !el.is_correct ? ans++ : '')
        return ans
    }

    const formatWord = (number: number) => {
        return number % 10 === 1 ? `${number} вопрос` : number % 10 <= 4 ? `${number} вопроса` : `${number} вопросов`
    }

    return (
        <SafeAreaView style={[{
            flex: 1
        }, themeColor === 'light' ? themeStyles.backgroundLight : themeStyles.backgroundDark]}>
            {!ticketWindow ? <>
                    {/*<BackLink link={'/theory'} label={'Вопросы по темам'}/>*/}
                    <TouchableOpacity
                        onPress={() => onClose()}
                        style={{
                            alignItems: 'center',
                            paddingLeft: 20,
                            columnGap: 5,
                            flexDirection: 'row',
                            alignSelf: 'flex-start',
                            paddingBottom: 10,
                            width: '100%'
                        }}>
                        <Ionicons name="arrow-back" size={24} color={themeColor === 'light' ? 'black' : 'white'}/>
                        <Text
                            style={[themeStyles.regularFont, themeColor === 'light' ? themeStyles.textLight : themeStyles.textDark]}>Вопросы по темам</Text>
                    </TouchableOpacity>
                    <ScrollView overScrollMode={'never'} style={styles.scroll}>
                        <View style={styles.ticketsWrapper}>
                            {data.map((el, idx) => <TouchableOpacity onPress={() => {
                                setTicketWindow(true)
                                setTicket(el)
                            }} style={styles.ticket} key={idx}>
                                <Text
                                    style={[themeStyles.regularFont, {color: themeColor === 'light' ? 'black' : 'white'}]}>{el.name}</Text>
                                <Text style={[themeStyles.regularFont, {color: themeColor === 'light' ? 'black' : 'white', fontSize: 15}]}>{formatWord(el.content.length)}</Text>
                            </TouchableOpacity>)}
                        </View>
                    </ScrollView>
                </>
                : !endGame ? <Question showTip={showTip} setShowTip={setShowTip} setEndGame={setEndGame} ticket={ticket.content}
                                       setMistakes={setMistakes} setAnswers={setAnswers} answers={answers}
                                       setTicketWindow={setTicketWindow} ticketNumber={ticketNumber}
                                       setTicketNumber={setTicketNumber} themeTitle={ticket.name}/>
                    : <View style={styles.winWrapper}>
                        <View style={styles.winTicket}>
                            <Text style={[themeStyles.regularFont, {color: themeColor === 'light' ? 'black' : 'white'}]}>{ticket.name}</Text>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                {mistakes <= 1 ? <Feather name="check-circle" size={24} color="#34c201"/> :
                                    <Entypo name="cross" size={24} color='#c20101'/>}
                                <Text style={[themeStyles.regularFont, {color: themeColor === 'light' ? 'black' : 'white'}]}>{mistakes <= 1 ? `тема сдана` : `тема не сдана`}</Text>
                            </View>
                        </View>
                        <View style={styles.answersContainer}>
                            <View style={styles.mistakeAmountWrapper}>
                                <Text style={{fontSize: 25, color: '#c20101'}}>{countMistakes()}</Text>
                                <Text style={[themeStyles.regularFont, {color: themeColor === 'light' ? 'black' : 'white', textAlign: 'center'}]}>ошибок допущено</Text>
                            </View>
                            <View style={styles.mistakeAmountWrapper}>
                                <Text style={{fontSize: 25, color: '#34c201'}}>{ticket.content.length - countMistakes()}</Text>
                                <Text style={[themeStyles.regularFont, {color: themeColor === 'light' ? 'black' : 'white', textAlign: 'center'}]}>правильных ответов</Text>
                            </View>
                        </View>
                        <View style={styles.winWindow}>
                            {answers.map((el, idx) => <View
                                style={el.is_correct
                                    ? [styles.endNumberBox, styles.green]
                                    : [styles.endNumberBox, styles.red]} key={idx}>
                                <Text style={[themeStyles.regularFont, {color: themeColor === 'light' ? 'black' : 'white'}]}>{idx + 1}</Text>
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
        flexDirection: 'column',
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
        width: '90%',
        borderBottomWidth: 1,
        borderColor: '#c4c4c4',
        paddingBottom: 10
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

export default ThemesWindow;