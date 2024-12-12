import React, {FC} from 'react';
import {Text, TouchableOpacity, View} from "react-native";
import {AlertDialog} from "native-base";
import {Link, router} from "expo-router";
import {Contract, EmptySlot, PracticePostType} from "../../app/types/types";
import moment from "moment";
import {useSetPracticeScheduleMutation} from "../../app/services/scheduleEndpoints";
import {months, weekDays} from "../../app/constants";

interface IProps {
    isConfirmSign: boolean,
    setIsConfirmSign: Function
    pickedContract: Contract
    pickedSlot: EmptySlot
}

const SignStudentDialog: FC<IProps> = ({isConfirmSign, setIsConfirmSign, pickedContract, pickedSlot}) => {
    const cancelRef = React.useRef(null);
    const [signSlot] = useSetPracticeScheduleMutation()
    let startDate = moment(pickedSlot.start_date)

    const signStudentToSlot = async () => {
        const body: PracticePostType = {
            id: 0,
            post: {
                dr_class_create_date: moment().format('YYYY-MM-DD HH:mm'),
                plan_start_date: moment(pickedSlot.start_date).format('YYYY-MM-DD HH:mm'),
                fact_start_date: moment(pickedSlot.start_date).format('YYYY-MM-DD HH:mm'),
                plan_end_date: moment(pickedSlot.end_date).format('YYYY-MM-DD HH:mm'),
                fact_end_date: moment(pickedSlot.end_date).format('YYYY-MM-DD HH:mm'),
                student_feedback: "",
                note_for_student: pickedSlot.notes,
                note_for_adm: "",
                fk_emp_id: pickedSlot.fk_slot_create_emp_id,
                fk_plan_master_id: pickedSlot.plan_master_id,
                fk_fact_master_id: pickedSlot.plan_master_id,
                fk_branch_id: pickedSlot.fk_branch_id || pickedSlot.branch_id,
                fk_dr_school_id: pickedSlot.fk_dr_school_id || pickedSlot.dr_school_id,
                fk_dr_session_id: pickedSlot.dr_session_id,
                fk_contract_id: pickedContract.contract_id,
            }
        };
        await signSlot(body)
        router.replace('/instructorschedule');
    }

    return (
        <AlertDialog closeOnOverlayClick leastDestructiveRef={cancelRef} isOpen={isConfirmSign} onClose={() => setIsConfirmSign(false)}>
            <AlertDialog.Content>
                <AlertDialog.CloseButton/>
                <AlertDialog.Body style={{alignItems: 'center', rowGap: 15}}>
                    <Text style={{padding: 10, fontSize: 18}}>Записать курсанта {pickedContract.student_name_from_leads} на {startDate.format("DD ")}
                        {months[startDate.get('month')]}
                        , {startDate.format("HH:mm")}?</Text>
                    <View style={{
                        columnGap: 10,
                        width: '100%',
                        alignItems: 'center',
                        flexDirection: 'row',
                        justifyContent: 'space-around'
                    }}>
                        <TouchableOpacity onPress={signStudentToSlot}>
                            <Text style={{color: '#3a3a3a', fontSize: 18, fontWeight: 'bold'}}
                                  ref={cancelRef}>
                                Записать
                            </Text>
                        </TouchableOpacity>
                        <Text style={{color: '#3a3a3a', fontSize: 18, fontWeight: 'bold'}}
                              onPress={() => setIsConfirmSign(false)}>
                            Отмена
                        </Text>
                    </View>
                </AlertDialog.Body>
            </AlertDialog.Content>
        </AlertDialog>
    );
};

export default SignStudentDialog;