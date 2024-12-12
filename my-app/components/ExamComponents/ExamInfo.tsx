import React, {FC} from 'react';
import CloseLink from "../BackLink/CloseLink";
import {ScrollView, Text, TouchableOpacity, View} from "react-native";
import moment from "moment/moment";
import GradientButton from "../GradientButton/GradientButton";
import {ContractControlPoint} from "../../app/types/types";
import {useGetFilteredAttemptsQuery} from "../../app/services/examEndpoints";
import ListPagesLoader from "../CustomLoaders/ListPagesLoader";
import {useSelector} from "react-redux";
import {selectPickedAccount} from "../../app/store/reducers/authSlice";
import momenttz from "moment-timezone";

interface IExamInfo {
    pickedPoint: ContractControlPoint
    onClose: Function
    onSubmit: Function
    setType: Function
    setStartExam: Function
    setCurrentAttempt: Function
}

const ExamInfo: FC<IExamInfo> = ({pickedPoint, onClose, onSubmit, setType, setCurrentAttempt, setStartExam}) => {
    const account = useSelector(selectPickedAccount)
    const {data: attempts, isLoading} = useGetFilteredAttemptsQuery({contract_id: account.id_reg, at_status: 3})

    if (isLoading) return <ListPagesLoader/>

    return (
        <View>
            <CloseLink label={"Начало тестирования"} onClose={onClose}/>
            <ScrollView contentContainerStyle={{paddingLeft: 20}}>
                <Text>{`Вы выбрали "${pickedPoint.control_point_name}.\nОбратите внимание, что данное тестирование можно пройти до "${moment(pickedPoint.attempt_open_till).format("DD.MM.YYYY HH:mm")}."`}</Text>
                <Text>{pickedPoint.retries__retry_limit[0] === "0" ? `Количество попыток не ограничено.` : `Количество попыток ограничено: максимум - ${pickedPoint.retries__retry_limit.split(" ")[2]}`}</Text>
                <Text>{`Правила проведения тестирования:\n`}</Text>
                <Text>При попытке заблокировать телефон, свернуть или переключить приложение, принять звонок будет
                    выставлена оценка НЕ СДАЛ.</Text>
                <Text
                    style={{
                        color: "#d30505",
                        paddingBottom: 20
                    }}>{`Не сворачивайте, не переключайтесь, не изменяйте размер и размещение приложения на экране. Это приведет к завершению теста с оценкой "Не сдал".`}</Text>
                <TouchableOpacity onPress={() => {
                    if (attempts) {
                        const arr = attempts.data.filter(el => (el.control_point_id === pickedPoint.control_point_id && moment.duration(moment(el.attempt_end_date).diff(moment())).minutes() > 0 && el.attempt_status === 3))
                        if (arr.length > 0) {
                            setCurrentAttempt(arr[0])
                            setType("repeat")
                            setStartExam(true)
                        } else onSubmit()
                    } else onSubmit()
                }}>
                    <GradientButton text={"Начать тест"} colors={['#7a1818', '#771b1b', 'red']}/>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

export default ExamInfo;