import React, {FC} from 'react';
import {Text, TouchableOpacity, View} from "react-native";
import {AlertDialog} from "native-base";
import {Link} from "expo-router";
import {GetPracticeByIdResponse} from "../../app/types/types";
import moment from "moment";
import {useDeletePracticeScheduleMutation} from "../../app/services/scheduleEndpoints";

interface IProps {
    isCancel: boolean
    setIsCancel: Function
    slot: GetPracticeByIdResponse
}

const CancelStudentSignDialog: FC<IProps> = ({isCancel, setIsCancel, slot}) => {
    const cancelRef = React.useRef(null);
    const [deleteSlot] = useDeletePracticeScheduleMutation()

    return (
        <AlertDialog closeOnOverlayClick leastDestructiveRef={cancelRef} isOpen={isCancel} onClose={() => setIsCancel(false)}>
            <AlertDialog.Content>
                <AlertDialog.CloseButton/>
                <AlertDialog.Body style={{alignItems: 'center', rowGap: 20}}>
                    <Text style={{padding: 10, fontSize: 18}}>Отменить запись на {moment(slot.data.plan_start_date).format('DD.MM.YYYY')} {moment(slot.data.plan_start_date).format('HH:mm')}?</Text>
                    <View style={{columnGap: 10, alignItems: 'center', flexDirection: 'row'}}>
                        <Link asChild href={'/schedule'}>
                            <TouchableOpacity style={{borderRadius: 4, borderWidth: 1, borderColor: '#e34d4d'}}
                                              onPress={async () => {
                                                  await deleteSlot(slot.data.dr_class_id)
                                                  setIsCancel(false)
                                              }}>
                                <Text style={{color: '#e34d4d', fontSize: 16, padding: 5}}
                                      ref={cancelRef}>
                                    Отменить
                                </Text>
                            </TouchableOpacity>
                        </Link>
                        {/*<Text style={{color: '#3a3a3a', fontSize: 16}} onPress={() => setIsCancel(false)}>*/}
                        {/*    Отмена*/}
                        {/*</Text>*/}
                    </View>
                </AlertDialog.Body>
            </AlertDialog.Content>
        </AlertDialog>
    );
};

export default CancelStudentSignDialog;