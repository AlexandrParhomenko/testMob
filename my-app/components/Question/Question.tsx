import React, {FC, useRef} from 'react';
import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import GradientButton from "../GradientButton/GradientButton";
import {Answer, Ticket} from "../../app/types/types";
import {Ionicons, MaterialCommunityIcons} from "@expo/vector-icons";
import {transitionHandler} from "../../constants/functions";
import {possibleImages} from "../../constants";
import SwipeHandler from "../SwipeHandler/SwipeHandler";
import {useSelector} from "react-redux";
import {selectColor} from "../../app/store/reducers/themeSlice";
import themeStyles from "../../styles/styles";
import {SafeAreaView} from "react-native-safe-area-context";

interface IProps {
    ticketNumber: number,
    setTicketNumber: Function,
    ticket: Ticket[],
    showTip: boolean,
    setShowTip: Function,
    answers: Answer[],
    setAnswers: Function,
    setTicketWindow: Function,
    setMistakes: Function,
    setEndGame: Function,
    themeTitle?: string
}

const Question: FC<IProps> = ({
                                  ticketNumber,
                                  setTicketNumber,
                                  ticket,
                                  showTip,
                                  setShowTip,
                                  answers,
                                  setAnswers,
                                  setTicketWindow,
                                  setMistakes,
                                  setEndGame,
                                  themeTitle
                              }) => {
    let themeColor = useSelector(selectColor)
    const ref = useRef<ScrollView>(null)


    const scrollMotion = (number: number) => {
        // @ts-ignore
        ref.current.scrollTo({
            x: transitionHandler(number + 2),
            y: 0,
            animated: true
        })
    }

    const answerFinder = (id: number) => {
        let ans = {} as Answer
        answers.forEach(el => el.id === id ? ans = el : '')
        return ans
    }

    const renderNumbers = () => {
        let ans = []
        for (let i = 0; i < ticket.length; i++) {
            ans.push(i + 1)
        }
        return ans
    }

    const countMistakes = () => {
        let ans = 0
        answers.forEach(el => !el.is_correct ? ans++ : '')
        return ans
    }

    const ticketSwitchHandler = (num: number) => {
        if (answers.length + 1 === ticket.length) {
            setMistakes(countMistakes)
            setEndGame(true)
        } else {
            for (let i = num + 1; i < ticket.length; i++) {
                if (!answerFinder(i).answer_text) {
                    setTicketNumber(i)
                    scrollMotion(i - 1)
                    break
                }
            }
        }
    }

    return (
        <SafeAreaView style={{flex: 1}}>
            <SwipeHandler ticketNumber={ticketNumber} setTicketNumber={setTicketNumber}
                          motion={scrollMotion}><View style={styles.questionWrapper}>
                {showTip && <View style={styles.showTipContainer}>
                    <Text style={[styles.regularFont, {textAlign: 'left', lineHeight: 24}]}>{ticket[ticketNumber].answer_tip}</Text>
                    <TouchableOpacity onPress={() => setShowTip(false)}>
                        <GradientButton colors={['#7a1818', '#771b1b', 'red']} text={'Закрыть'}/>
                    </TouchableOpacity>
                </View>}
                <View onTouchEnd={() => {
                    setTicketNumber(0)
                    setAnswers([])
                    setTicketWindow(false)
                }} style={[styles.backLink, {paddingTop: 10}]}>
                    <Ionicons name="arrow-back" size={24} color={themeColor === 'light' ? 'black' : 'lightgrey'}/>
                    <Text
                        style={[themeStyles.regularFont, {color: themeColor === 'light' ? 'black' : 'white'}]} numberOfLines={1}>{ticket[ticketNumber].ticket_number || themeTitle}</Text>
                </View>
                <View style={{height: 50}}>
                    <ScrollView showsHorizontalScrollIndicator={false} ref={ref} style={{flex: 2}} overScrollMode={'never'}
                                contentContainerStyle={styles.slider}
                                horizontal>{renderNumbers().map(el =>
                        <TouchableOpacity key={el} onPress={() => {
                            ref.current!.scrollTo({x: transitionHandler(el), y: 0, animated: true})
                            setTicketNumber(el - 1)}}
                                          style={answerFinder(el - 1).is_correct === true
                                              ? el - 1 === ticketNumber
                                                  ? [styles.correctAnswerNumber, styles.numberBox, styles.ticketActive]
                                                  : [styles.correctAnswerNumber, styles.numberBox]
                                              : answerFinder(el - 1).is_correct === false
                                                  ? el - 1 === ticketNumber
                                                      ? [styles.wrongAnswerNumber, styles.numberBox, styles.ticketActive]
                                                      : [styles.wrongAnswerNumber, styles.numberBox]
                                                  : el - 1 === ticketNumber
                                                      ? [styles.numberBox, styles.ticketActive]
                                                      : styles.numberBox}>
                            <Text
                                style={[answerFinder(el - 1).answer_text ? styles.checkedAnswerText : {color: themeColor === 'light' ? 'black' : 'white'}]}>{el}</Text></TouchableOpacity>
                    )}</ScrollView>
                </View>
                {ticket[ticketNumber].image !== './images/no_image.jpg' ?
                    <Image style={styles.image} source={possibleImages[ticket[ticketNumber].image]}/> : ''}
                <ScrollView style={{flex: 3}} overScrollMode={'never'}
                            contentContainerStyle={styles.questionScroll}>
                    <Text style={[styles.questionTitle, themeStyles.regularFont, {color: themeColor === 'light' ? 'black' : 'white'}]}>{ticket[ticketNumber].question}</Text>
                    <View style={styles.question}>
                        {ticket[ticketNumber].answers.map((el, idx) =>
                            <TouchableOpacity disabled={!!answerFinder(ticketNumber).answer_text} key={idx}
                                              onPress={() => {
                                                  setAnswers([...answers, {...el, id: ticketNumber}])
                                                  ticketSwitchHandler(ticketNumber)
                                              }}
                                              style={answerFinder(ticketNumber).answer_text
                                                  ? el.is_correct
                                                      ? [styles.answerVariant, styles.correctAnswer]
                                                      : answerFinder(ticketNumber).answer_text === el.answer_text
                                                          ? [styles.answerVariant, styles.wrongAnswer]
                                                          : styles.answerVariant
                                                  : styles.answerVariant}>
                                <Text style={{
                                    fontSize: 20,
                                    fontFamily: 'BebasNeue'
                                }}>{idx + 1}. {el.answer_text}</Text>
                            </TouchableOpacity>)}
                        <TouchableOpacity onPress={() => setShowTip(true)} style={styles.tip}>
                            <GradientButton text={'Подсказка'} colors={['#7a1818', '#771b1b', 'red']}
                                            icon={<MaterialCommunityIcons name="message-question" size={24}
                                                                          color="white"/>}/>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
            </SwipeHandler>
        </SafeAreaView>

    );
};

const styles = StyleSheet.create({
    regularFont: {
        textAlign: 'center',
        fontFamily: 'BebasNeue',
        fontSize: 20
    },
    questionWrapper: {
        width: '100%',
        alignItems: 'center',
        flex: 1
    },
    answerVariant: {
        backgroundColor: 'white',
        borderColor: '#c4c4c4',
        borderWidth: 3,
        borderRadius: 10,
        padding: 20,
        margin: 10
    },
    correctAnswer: {
        borderColor: '#04ea08',
        borderWidth: 3
    },
    wrongAnswer: {
        borderColor: '#de0000',
        borderWidth: 3
    },
    slider: {
        columnGap: 5,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        height: 50
    },
    correctAnswerNumber: {
        backgroundColor: '#4bd052',
    },
    checkedAnswerText: {
        color: 'white',
    },
    wrongAnswerNumber: {
        backgroundColor: '#d73f3f',
    },
    numberBox: {
        borderWidth: 1,
        borderColor: '#bdb7b7',
        padding: 5,
        borderRadius: 5,
        width: 30,
        alignItems: 'center',
    },
    ticketActive: {
        borderColor: '#595959',
        borderWidth: 2
    },
    questionScroll: {
        alignItems: 'center',
    },
    questionTitle: {
        paddingHorizontal: 15,
        paddingVertical: 15,
    },
    question: {
        width: '100%',
        height: 'auto',
    },
    image: {
        width: '80%',
        height: 120,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        resizeMode: 'contain'
    },
    tip: {
        paddingTop: 10,
        width: '40%',
        alignSelf: 'flex-end',
        alignItems: 'center'
    },
    showTipContainer: {
        height: '90%',
        width: '95%',
        position: 'absolute',
        backgroundColor: 'white',
        zIndex: 10,
        top: '5%',
        borderRadius: 6,
        borderWidth: 1,
        borderColor: 'black',
        padding: 20,
        justifyContent: 'space-between'
    },
    backLink: {
        alignItems: 'center',
        paddingLeft: 20,
        columnGap: 5,
        flexDirection: 'row',
        alignSelf: 'flex-start',
        paddingBottom: 10,
        width: '100%'
    }
});

export default Question;