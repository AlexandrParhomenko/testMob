import React, {useState} from 'react';
import {
    StyleSheet,
    View,
    Text, TouchableOpacity, ScrollView, RefreshControl
} from "react-native";
import {useSelector} from "react-redux";
import {selectColor} from "../../../store/reducers/themeSlice";
import themeStyles from "../../../../styles/styles";
import BackLink from "../../../../components/BackLink/BackLink";
import {
    useGetActiveControlPointsQuery,
    useSetAttemptMutation
} from "../../../services/examEndpoints";
import {selectPickedAccount} from "../../../store/reducers/authSlice";
import ListPagesLoader from "../../../../components/CustomLoaders/ListPagesLoader";
import moment from "moment";
import GradientButton from "../../../../components/GradientButton/GradientButton";
import {Attempt, ContractControlPoint} from "../../../types/types";
import ExamInfo from "../../../../components/ExamComponents/ExamInfo";
import NoExamsBar from "../../../../components/ExamComponents/NoExamsBar";
import CurrentExam from "../../../../components/ExamComponents/CurrentExam";
import {SafeAreaView} from "react-native-safe-area-context";

const Index = () => {
    let themeColor = useSelector(selectColor)
    const account = useSelector(selectPickedAccount)
    const [pickedPoint, setPickedPoint] = useState<ContractControlPoint>({} as ContractControlPoint)
    const [currentAttempt, setCurrentAttempt] = useState<Attempt>({} as Attempt)
    const [showConfirmTestPage, setShowConfirmTestPage] = useState<boolean>(false)
    const [startExam, setStartExam] = useState<boolean>(false)
    const [examType, setExamType] = useState<"new" | "repeat">("new")
    const {data: points, isLoading, refetch} = useGetActiveControlPointsQuery({contract_id: account.id_reg, status: 3})
    const [postAttempt, {data: postAttemptData}] = useSetAttemptMutation()

    const attemptBody = {
        id: 0,
        post: {
            "attempt_date": moment().format("YYYY-MM-DD HH:mm"),
            "attempt_start_date": moment().format("YYYY-MM-DD HH:mm:ss"),
            "attempt_end_date": moment().add(40, "minutes").format("YYYY-MM-DD HH:mm:ss"),
            "retries_limit": parseInt(pickedPoint.retries__retry_limit),
            "attempt_end_validity": moment().add(1, "week").format("YYYY-MM-DD HH:mm"),
            "attempt_num": 1,
            "notes": "",
            "fk_control_point_id": pickedPoint.control_point_id,
            "fk_contract_id": account.id_reg,
            "fk_resp_emp_id": pickedPoint.master_id || 58,
            "fk_master_id": pickedPoint.master_id || 58,
            "fk_dr_school_id": account.dr_school_id,
            "attempt_validity": 1,
            "attempt_status": 3,
            "status": "1"
        }
    }

    if (!points || isLoading) return <ListPagesLoader/>

    return (
        <SafeAreaView
            style={[styles.container, themeColor === 'light' ? themeStyles.backgroundLight : themeStyles.backgroundDark]}>
            {startExam ? <CurrentExam startExam={startExam} type={examType} currentAttempt={currentAttempt} pickedPoint={pickedPoint}
                                      postAttemptData={postAttemptData}
                                      onClose={() => setStartExam(false)}/> :
                <>
                    {showConfirmTestPage ?
                        <ExamInfo setStartExam={setStartExam} setCurrentAttempt={setCurrentAttempt}
                                  setType={setExamType} onClose={() => setShowConfirmTestPage(false)}
                                  pickedPoint={pickedPoint}
                                  onSubmit={async () => {
                                      await postAttempt(attemptBody as any)
                                      setExamType("new")
                                      setStartExam(true)
                                  }}/> : <>
                            <BackLink link={'/theory'} label={'Тестирование'}/>
                            {points.data.length === 0 ? <NoExamsBar themeColor={themeColor}/> : <ScrollView
                                refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refetch}/>}>
                                {points.data.map((el, idx) =>
                                    <View style={{
                                        padding: 20,
                                        rowGap: 5,
                                        borderBottomWidth: 1,
                                        borderBottomColor: "lightgrey"
                                    }}
                                          key={idx}>
                                        <Text style={[themeStyles.regularFont, {
                                            color: themeColor === 'light' ? 'black' : 'white',
                                            fontSize: 22
                                        }]}>{el.control_point_name}</Text>
                                        <Text style={[themeStyles.regularFont, {
                                            color: themeColor === 'light' ? 'black' : 'white',
                                            fontSize: 18
                                        }]}>{`Попытка #${el.attempt_num}`}</Text>
                                        <Text style={[themeStyles.regularFont, {
                                            color: themeColor === 'light' ? 'black' : 'white',
                                            fontSize: 18
                                        }]}>{`Тестирование открыто до ${moment(el.attempt_open_till).format("DD.MM.YYYY")}`}</Text>
                                        <Text style={[themeStyles.regularFont, {
                                            color: themeColor === 'light' ? 'black' : 'white',
                                            fontSize: 18
                                        }]}>{`Использовано подходов ${el.retries__retry_limit}`}</Text>
                                        <TouchableOpacity onPress={() => {
                                            if (el.test_met_id) {
                                                setPickedPoint(el)
                                                setShowConfirmTestPage(true)
                                            }
                                        }} style={{paddingTop: 5}}>
                                            <GradientButton text={"Начать тестирование"}
                                                            colors={['#7a1818', '#771b1b', 'red']}/>
                                        </TouchableOpacity>
                                    </View>
                                )}
                            </ScrollView>}
                        </>}
                </>}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default Index;