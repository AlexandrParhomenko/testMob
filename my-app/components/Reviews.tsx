import React, {FC, useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image, BackHandler} from "react-native";
import {useSelector} from "react-redux";
import {LinearGradient} from "expo-linear-gradient";
import {AntDesign, Ionicons} from "@expo/vector-icons";
import {TextArea} from "native-base";
import {selectColor} from "../app/store/reducers/themeSlice";
import themeStyles from "../styles/styles";
import {GetPracticeByIdResponse} from "../app/types/types";
import {useUpdatePracticeScheduleMutation} from "../app/services/scheduleEndpoints";
import {stars} from "../constants";
import {SafeAreaView} from "react-native-safe-area-context";

interface ReviewsProps {
    setShowReviews: Function
    showReviews: boolean
    slot: GetPracticeByIdResponse
}

const Reviews: FC<ReviewsProps> = ({slot, setShowReviews, showReviews}) => {
    let themeColor = useSelector(selectColor)
    const [starsCount, setStarsCount] = useState<number>(0)
    const [review, setReview] = useState<string>("")
    const [putScheduleLesson] = useUpdatePracticeScheduleMutation()
    // console.log(slot)

    const putSlot = async () => {
        const body = {
            id: slot.data.dr_class_id,
            post: {
                dr_class_create_date: slot.data.dr_class_create_date,
                plan_start_date: slot.data.plan_start_date,
                plan_end_date: slot.data.plan_end_date,
                fact_start_date: slot.data.fact_start_date,
                fact_end_date: slot.data.fact_end_date,
                note_for_student: slot.data.note_for_student,
                note_for_adm: slot.data.note_for_adm,
                fk_emp_id: slot.data.emp_id,
                fk_plan_master_id: slot.data.plan_master_id,
                fk_fact_master_id: slot.data.fact_master_id,
                fk_branch_id: slot.data.branch_id,
                fk_dr_school_id: slot.data.dr_school_id,
                fk_dr_session_id: slot.data.dr_session_id,
                fk_contract_id: slot.data.contract_id,
                status: "1",
                student_feedback: `${review}//${starsCount}`
            }
        }
        if (starsCount !== 0) {
            await putScheduleLesson(body)
            setShowReviews(false)
        }
    }

    useEffect(() => {
            const backAction = () => {
                if (showReviews) {
                    setShowReviews(false)
                    return true;
                }
            }
            const backHandler = BackHandler.addEventListener(
                'hardwareBackPress',
                backAction,
            );
            return () => backHandler.remove();
        }, []
    )

    return (
        <SafeAreaView style={[{
            height: '100%',
            width: "100%",
            flex: 1,
            position: "absolute",
            zIndex: 10
        }, themeColor === 'light' ? themeStyles.backgroundLight : themeStyles.backgroundDark]}>
            <View onTouchEnd={() => setShowReviews(false)}>
                <TouchableOpacity
                    style={{
                        alignItems: 'center',
                        paddingLeft: 20,
                        columnGap: 5,
                        flexDirection: 'row',
                        alignSelf: 'flex-start',
                        paddingTop: 10,
                        paddingBottom: 10,
                        width: '100%'
                    }}>
                    <Ionicons name="arrow-back" size={24} color={themeColor === 'light' ? 'black' : 'lightgrey'}/>
                    <Text
                        style={[themeStyles.regularFont, themeColor === 'light' ? themeStyles.textLight : themeStyles.textDark]}>{"Оценки и заметки по занятию"}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.reviewsWrapper}>
                <View style={{
                    width: '100%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: '#1f1f1f',
                    justifyContent: 'space-between',
                    borderLeftWidth: 5,
                    borderColor: 'red'
                }}>
                    <View style={styles.noticeWrapper}>
                        <Text style={[themeStyles.regularFont, {textAlign: 'center'}]}>Оставьте отзыв и поставьте
                            оценку за занятие.</Text>
                        <Text style={[themeStyles.regularFont, {textAlign: 'center'}]}>Отзыв увидит только
                            руководство автошколы.</Text>
                        <Text style={[themeStyles.regularFont, {textAlign: 'center', color: '#e34d4d'}]}>После
                            сохранения изменить оценку и отзыв будет невозможно.</Text>
                        <Image resizeMode={'contain'} style={styles.vectorImg}
                               source={require('../assets/images/whiteLogoV.png')}/>
                    </View>
                </View>

                <View style={{flexDirection: 'row', columnGap: 5}}>
                    {stars.map(el => el <= starsCount ?
                        <AntDesign onPress={() => setStarsCount(el)} key={el} name="star" size={44}
                                   color="#FDCC0D"/>
                        :
                        <AntDesign onPress={() => setStarsCount(el)} key={el} name="staro" size={44}
                                   color="#FDCC0D"/>)}
                </View>
                <TextArea
                    autoCompleteType={true}
                    backgroundColor={'white'}
                    borderColor={'black'}
                    focusOutlineColor={'black'}
                    placeholder={"Текст отзыва"}
                    width={'90%'}
                    tvParallaxProperties
                    onTextInput={() => console.log(123)}
                    onChangeText={(e) => setReview(e)}
                    placeholderTextColor={'lightgrey'}
                    style={themeColor === 'light' ? themeStyles.textInputLight : themeStyles.textInputDark}/>
                <TouchableOpacity onPress={putSlot} style={{width: '50%'}}>
                    <LinearGradient start={[0.9, -0.5]}
                                    end={[0.8, 1.5]}
                                    style={styles.enterButton}
                                    colors={['#7a1818', '#771b1b', 'red']}
                    >
                        <View style={{flexDirection: 'row', columnGap: 10, alignItems: 'center'}}>
                            <Text style={themeStyles.regularFont}>Сохранить</Text>
                        </View>
                    </LinearGradient>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    reviewsWrapper: {
        paddingTop: 15,
        flexDirection: 'column',
        alignItems: 'center',
        rowGap: 20
    },
    enterButton: {
        width: '90%',
        alignSelf: 'center',
        borderRadius: 40,
        backgroundColor: '#e30000',
        padding: 10,
        alignItems: 'center',
    },
    noticeWrapper: {
        padding: 10,
        alignItems: 'center',
        rowGap: 10
    },
    vectorImg: {
        height: 50,
        width: 50
    }
});

export default Reviews;