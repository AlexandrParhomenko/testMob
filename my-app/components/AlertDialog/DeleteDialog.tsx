import React, {FC} from 'react';
import {Text, TouchableOpacity, View} from "react-native";
import {AlertDialog} from "native-base";
import {Link} from "expo-router";

interface IProps {
    isDelete: boolean,
    setIsDelete: Function
}

const DeleteDialog: FC<IProps> = ({isDelete, setIsDelete}) => {
    const cancelRef = React.useRef(null);

    return (
        <AlertDialog leastDestructiveRef={cancelRef} isOpen={isDelete} onClose={() => setIsDelete(false)}>
            <AlertDialog.Content>
                <AlertDialog.CloseButton/>
                <AlertDialog.Body style={{alignItems: 'center', rowGap: 20}}>
                    <Text style={{padding: 10, fontSize: 18}}>Удалить слот?</Text>
                    <View style={{columnGap: 10, alignItems: 'center', flexDirection: 'row'}}>
                        <Link asChild href={'/instructorschedule'}>
                            <TouchableOpacity style={{borderRadius: 4, borderWidth: 1, borderColor: '#e34d4d'}}
                                              onPress={() => setIsDelete(false)}>
                                <Text style={{color: '#e34d4d', fontSize: 16, padding: 5}}
                                      ref={cancelRef}>
                                    Удалить
                                </Text>
                            </TouchableOpacity>
                        </Link>
                        <Text style={{color: '#3a3a3a', fontSize: 16}} onPress={() => setIsDelete(false)}>
                            Отмена
                        </Text>
                    </View>
                </AlertDialog.Body>
            </AlertDialog.Content>
        </AlertDialog>
    );
};

export default DeleteDialog;