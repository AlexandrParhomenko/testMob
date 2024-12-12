import React, {FC, useEffect, useRef, useState} from 'react';
import {Attempt, ContractControlPoint, ExamAnswer, ExamQuestionType, PostAttempt} from "../../app/types/types";
import {AppState, Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useSelector} from "react-redux";
import {selectColor} from "../../app/store/reducers/themeSlice";
import {transitionHandler} from "../../constants/functions";
import SwipeHandler from "../SwipeHandler/SwipeHandler";
import GradientButton from "../GradientButton/GradientButton";
import {Ionicons, MaterialCommunityIcons} from "@expo/vector-icons";
import themeStyles from "../../styles/styles";
import {possibleImages} from "../../constants";
import QuitExamDialog from "../AlertDialog/QuitExamDialog";
import {router} from "expo-router";
import {usePutActiveControlPointMutation, usePutAttemptMutation} from "../../app/services/examEndpoints";
import {SafeAreaView} from "react-native-safe-area-context";
import DeleteCustomDialog from "../AlertDialog/DeleteCustomDialog";
import ExamFailScreen from "../AlertDialog/ExamFailScreen";

interface IProps {
    ticketNumber: number,
    setTicketNumber: Function,
    questions: ExamQuestionType[],
    tipAllowed: boolean,
    answers: ExamAnswer[],
    setAnswers: Function,
    setMistakes: Function,
    onExamClose: Function,
    postAttemptData: Attempt | undefined
    setEndGame: Function,
    examTitle: string
    enterType: "new" | "repeat"
    timeLeft: string
    pickedPoint: ContractControlPoint
    pickedAttempt: Attempt
}

const ExamQuestion: FC<IProps> = ({
                                      questions,
                                      answers,
                                      setAnswers,
                                      tipAllowed,
                                      setMistakes,
                                      setEndGame,
                                      postAttemptData,
                                      pickedPoint,
                                      pickedAttempt,
                                      examTitle,
                                      ticketNumber,
                                      onExamClose,
                                      setTicketNumber,
                                      enterType,
                                      timeLeft
                                  }) => {
    let themeColor = useSelector(selectColor)
    const [isQuit, setIsQuit] = useState<boolean>(false)
    const [showTip, setShowTip] = useState<boolean>(false)
    const ref = useRef<ScrollView>(null)
    const [showFailScreen, setShowFailScreen] = useState<boolean>(false)
    const [putCP] = usePutActiveControlPointMutation()
    const [putAttempt] = usePutAttemptMutation()

    const scrollMotion = (number: number) => {
        // @ts-ignore
        ref.current.scrollTo({
            x: transitionHandler(number + 2),
            y: 0,
            animated: true
        })
    }

    const examAnswerFinder = (id: number) => {
        let ans = {} as ExamAnswer
        answers.forEach(el => el.id === id ? ans = el : '')
        return ans
    }

    const renderNumbers = () => {
        let ans = []
        for (let i = 0; i < questions.length; i++) {
            ans.push(i + 1)
        }
        return ans
    }

    const countMistakes = () => {
        let ans = 0
        answers.forEach(el => !el.card_answ_is_correct ? ans++ : '')
        return ans
    }

    const ticketSwitchHandler = async (num: number) => {
        if (answers.length + 1 === questions.length) {
            let mistakes = countMistakes()
            if (mistakes > 2) {
                await putCP({
                    ...pickedPoint,
                    control_points_status: 2,
                    state_reason: 0
                })
                await handleAttempt()
            } else {
                await putCP({...pickedPoint, control_points_status: 1, state_reason: 0})
                await handleAttempt()
            }
            setMistakes(countMistakes)
            setEndGame(true)
        } else {
            for (let i = num + 1; i < questions.length; i++) {
                if (!examAnswerFinder(i).card_answ_text) {
                    setTicketNumber(i)
                    scrollMotion(i - 1)
                    break
                }
            }
        }
    }

    const handleAttempt = async () => {
        await enterType === "new" && postAttemptData ? putAttempt({
            id: postAttemptData.attempt_id, post: {
                ...postAttemptData,
                attempt_status: 2,
            }
        }) : putAttempt({
            id: pickedAttempt.attempt_id, post: {
                ...pickedAttempt,
                attempt_status: 2,
                fk_control_point_id: pickedAttempt.control_point_id,
                fk_contract_id: pickedAttempt.contract_id,
                fk_resp_emp_id: pickedAttempt.resp_emp_id,
                fk_master_id: pickedAttempt.master_id,
                fk_dr_school_id: pickedAttempt.dr_school_id
            }
        })
    }

    useEffect(() => {
        const subscription = AppState.addEventListener("change", async () => {
            await handleAttempt()
            setShowFailScreen(true)
        });

        return () => {
            subscription.remove();
        };
    }, []);

    return (
        <SafeAreaView style={{flex: 1}}>
            <SwipeHandler ticketNumber={ticketNumber} setTicketNumber={setTicketNumber}
                          motion={scrollMotion}>
                <ExamFailScreen isQuit={showFailScreen} onClose={() => {}} onSubmit={() => router.replace('/theory')}/>
                <QuitExamDialog onSubmit={() => {
                    handleAttempt()
                    router.replace('/theory')
                }} isQuit={isQuit} onClose={() => setIsQuit(false)}/>
                <Text style={[themeStyles.regularFont, {
                    color: themeColor === 'light' ? 'black' : 'white',
                    alignSelf: "flex-end",
                    paddingRight: 20
                }]}>{timeLeft}</Text>

                <View style={styles.questionWrapper}>
                    {showTip && <View style={styles.showTipContainer}>
                        <Text style={[styles.regularFont, {
                            textAlign: 'left',
                            lineHeight: 24
                        }]}>{questions[ticketNumber].card_quest_comment}</Text>
                        <TouchableOpacity onPress={() => setShowTip(false)}>
                            <GradientButton colors={['#7a1818', '#771b1b', 'red']} text={'Закрыть'}/>
                        </TouchableOpacity>
                    </View>}
                    <View onTouchEnd={() => {
                        setIsQuit(true)
                    }} style={[styles.backLink]}>
                        <Ionicons name="arrow-back" size={24} color={themeColor === 'light' ? 'black' : 'lightgrey'}/>
                        <Text
                            style={[themeStyles.regularFont, {color: themeColor === 'light' ? 'black' : 'white'}]}
                            numberOfLines={1}>{examTitle}</Text>
                    </View>
                    <View style={{height: 50}}>
                        <ScrollView showsHorizontalScrollIndicator={false} ref={ref} style={{flex: 2}}
                                    overScrollMode={'never'}
                                    contentContainerStyle={styles.slider}
                                    horizontal>{renderNumbers().map(el =>
                            <TouchableOpacity key={el} onPress={() => {
                                ref.current!.scrollTo({x: transitionHandler(el), y: 0, animated: true})
                                setTicketNumber(el - 1)
                            }}
                                              style={examAnswerFinder(el - 1).card_answ_is_correct === true
                                                  ? el - 1 === ticketNumber
                                                      ? [styles.correctAnswerNumber, styles.numberBox, styles.ticketActive]
                                                      : [styles.correctAnswerNumber, styles.numberBox]
                                                  : examAnswerFinder(el - 1).card_answ_is_correct === false
                                                      ? el - 1 === ticketNumber
                                                          ? [styles.wrongAnswerNumber, styles.numberBox, styles.ticketActive]
                                                          : [styles.wrongAnswerNumber, styles.numberBox]
                                                      : el - 1 === ticketNumber
                                                          ? [styles.numberBox, styles.ticketActive]
                                                          : styles.numberBox}>
                                <Text
                                    style={[examAnswerFinder(el - 1).card_answ_text ? styles.checkedAnswerText : {color: themeColor === 'light' ? 'black' : 'white'}]}>{el}</Text></TouchableOpacity>
                        )}</ScrollView>
                    </View>
                    {questions[ticketNumber].card_quest_image &&
                        <Image style={styles.image} source={possibleImages[`1.${ticketNumber + 1}`]}/>}
                    <ScrollView style={{flex: 3}} overScrollMode={'never'}
                                contentContainerStyle={styles.questionScroll}>
                        <Text
                            style={[styles.questionTitle, themeStyles.regularFont, {color: themeColor === 'light' ? 'black' : 'white'}]}>{questions[ticketNumber].card_quest_text}</Text>
                        <View style={styles.question}>
                            {questions[ticketNumber].answers.map((el, idx) =>
                                <TouchableOpacity disabled={!!examAnswerFinder(ticketNumber).card_answ_id} key={idx}
                                                  onPress={() => {
                                                      setAnswers([...answers, {...el, id: ticketNumber}])
                                                      ticketSwitchHandler(ticketNumber)
                                                  }}
                                                  style={examAnswerFinder(ticketNumber).card_answ_text
                                                      ? el.card_answ_is_correct
                                                          ? [styles.answerVariant, styles.correctAnswer]
                                                          : examAnswerFinder(ticketNumber).card_answ_text === el.card_answ_text
                                                              ? [styles.answerVariant, styles.wrongAnswer]
                                                              : styles.answerVariant
                                                      : styles.answerVariant}>
                                    <Text style={{
                                        fontSize: 20,
                                        fontFamily: 'BebasNeue'
                                    }}>{idx + 1}. {el.card_answ_text}</Text>
                                </TouchableOpacity>)}
                            {tipAllowed && <TouchableOpacity onPress={() => setShowTip(true)} style={styles.tip}>
                                <GradientButton text={'Подсказка'} colors={['#7a1818', '#771b1b', 'red']}
                                                icon={<MaterialCommunityIcons name="message-question" size={24}
                                                                              color="white"/>}/>
                            </TouchableOpacity>}
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
        position: "absolute",
        height: "100%",
        zIndex: 100,
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

export default ExamQuestion;