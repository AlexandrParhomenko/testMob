import React, {FC, useEffect, useState} from 'react';
import themeStyles from "../../styles/styles";
import {ActivityIndicator, AppState, Dimensions, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useSelector} from "react-redux";
import {selectColor} from "../../app/store/reducers/themeSlice";
import Question from "../Question/Question";
import {Entypo, Feather} from "@expo/vector-icons";
import GradientButton from "../GradientButton/GradientButton";
import {Answer, Attempt, ContractControlPoint, ExamAnswer, PostAttempt, Ticket} from "../../app/types/types";
import {countMistakes} from "../../constants/functions";
import {
    useGetFilteredAttemptsQuery,
    useGetTestingMethodQuery, useLazyGetExamQuestionsQuery,
} from "../../app/services/examEndpoints";
import ExamQuestion from "./ExamQuestion";
import {router} from "expo-router";
import moment from "moment";
import {selectPickedAccount} from "../../app/store/reducers/authSlice";

interface IExam {
    onClose: Function
    type: "new" | "repeat"
    postAttemptData: Attempt | undefined
    currentAttempt: Attempt
    startExam: boolean
    pickedPoint: ContractControlPoint
}

const CurrentExam: FC<IExam> = ({onClose, postAttemptData, pickedPoint, type, currentAttempt, startExam}) => {
    let themeColor = useSelector(selectColor)
    const account = useSelector(selectPickedAccount)
    const [answers, setAnswers] = useState<ExamAnswer[]>([])
    const [ticketNumber, setTicketNumber] = useState<number>(0)
    const [endGame, setEndGame] = useState<boolean>(false)
    const [mistakes, setMistakes] = useState<number>(0)
    const {data: method, isLoading: isMethodLoading} = useGetTestingMethodQuery(pickedPoint.test_met_id)
    const [getQuestions, {data: questions}] = useLazyGetExamQuestionsQuery()
    const [timeLeft, setTimeLeft] = useState<string>("")

    useEffect(() => {
        if (method && method.data.test_pack_id) {
            getQuestions({pack_id: method.data.test_pack_id, limit: 20})
            // type === "new" ? setTimeLeft(method.data.time_limit_min * 60) : setTimeLeft(countTime())
        }
    }, [method])

    useEffect(() => {
        if (startExam) {
            const examInterval = setInterval(() => {
                let startDate = moment()
                let endDate
                type === "new" && postAttemptData ? endDate = moment(postAttemptData.attempt_end_date) : endDate = moment(currentAttempt.attempt_end_date)
                const duration = moment.duration(endDate.diff(startDate));
                const hours = duration.hours();
                const minutes = duration.minutes();
                const seconds = duration.seconds();
                setTimeLeft(`${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`)
                if (hours < 1 && minutes < 1 && seconds < 1) {
                    clearInterval(examInterval)
                }
            }, 1000)
        }
    }, [startExam])

    if (!method || !questions) return <ActivityIndicator color={'#e34d4d'} style={{paddingTop: '50%'}} size="large"/>

    return (
        <View
            style={[styles.container, themeColor === 'light' ? themeStyles.backgroundLight : themeStyles.backgroundDark]}>
            {!endGame ? <View style={{position: "absolute", width: "100%", height: "100%", zIndex: 100, flex: 1}}>
                    <ExamQuestion examTitle={method.data.test_met_name} pickedPoint={pickedPoint}
                                  timeLeft={timeLeft}
                                  pickedAttempt={currentAttempt}
                                  postAttemptData={postAttemptData}
                                  setTicketNumber={setTicketNumber}
                                  ticketNumber={ticketNumber} questions={questions}
                                  onExamClose={onClose}
                                  setEndGame={setEndGame} answers={answers}
                                  tipAllowed={false}
                                  setAnswers={setAnswers} setMistakes={setMistakes} enterType={type}/>
                </View>
                : <View style={styles.winWrapper}>
                    <View style={styles.winTicket}>
                        {mistakes <= 4 ? <Feather name="check-circle" size={24} color="#34c201"/> :
                            <Entypo name="cross" size={24} color='#c20101'/>}
                        <Text
                            style={[themeStyles.regularFont, {color: themeColor === 'light' ? 'black' : 'white'}]}>{mistakes <= 4 ? `${method.data.test_met_name} сдан` : `${method.data.test_met_name} не сдан`}</Text>
                    </View>
                    <View style={styles.answersContainer}>
                        <View style={styles.mistakeAmountWrapper}>
                            <Text style={{fontSize: 25, color: '#c20101'}}>{mistakes + 1}</Text>
                            <Text style={[themeStyles.regularFont, {
                                color: themeColor === 'light' ? 'black' : 'white',
                                textAlign: 'center'
                            }]}>ошибок допущено</Text>
                        </View>
                        <View style={styles.mistakeAmountWrapper}>
                            <Text style={{fontSize: 25, color: '#34c201'}}>{20 - mistakes - 1}</Text>
                            <Text style={[themeStyles.regularFont, {
                                color: themeColor === 'light' ? 'black' : 'white',
                                textAlign: 'center'
                            }]}>правильных ответов</Text>
                        </View>
                    </View>
                    <View style={styles.winWindow}>
                        {answers.map((el, idx) => <View
                            style={el.card_answ_is_correct
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
                        router.replace("/theory")
                    }} style={styles.questionWrapperBtn}>
                        <GradientButton colors={['#7a1818', '#771b1b', 'red']} text={'Выйти'}/>
                    </TouchableOpacity>
                </View>}
        </View>
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
        zIndex: 200,
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

export default CurrentExam;