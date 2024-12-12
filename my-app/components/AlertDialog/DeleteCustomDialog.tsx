import React, {FC} from 'react';
import {AlertDialog} from "native-base";
import {Text, TouchableOpacity, View} from "react-native";

interface IProps {
    isOpen: boolean
    onClose: Function
    onDelete: Function
    text: string
}

const DeleteCustomDialog: FC<IProps> = ({isOpen, onDelete, text, onClose}) => {
    const cancelRef = React.useRef(null);

    return (
        <AlertDialog closeOnOverlayClick leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={() => onClose()}>
            <AlertDialog.Content>
                <AlertDialog.CloseButton/>
                <AlertDialog.Body style={{alignItems: 'center', rowGap: 20}}>
                    <Text style={{padding: 10, fontSize: 18}}>{text}</Text>
                    <View style={{columnGap: 10, alignItems: 'center', flexDirection: 'row'}}>
                        <TouchableOpacity style={{borderRadius: 4, borderWidth: 1, borderColor: '#e34d4d'}}
                                          onPress={() => onDelete()}>
                            <Text style={{color: '#e34d4d', fontSize: 16, padding: 5}}
                                  ref={cancelRef}>
                                Выйти
                            </Text>
                        </TouchableOpacity>
                        <Text style={{color: '#3a3a3a', fontSize: 16}} onPress={() => onClose(false)}>
                            Отмена
                        </Text>
                    </View>
                </AlertDialog.Body>
            </AlertDialog.Content>
        </AlertDialog>
    );
};

export default DeleteCustomDialog;