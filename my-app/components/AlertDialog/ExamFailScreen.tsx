import React, {FC} from 'react';
import {AlertDialog} from "native-base";
import {Text, TouchableOpacity, View} from "react-native";

interface IProps {
    isQuit: boolean,
    onClose: Function
    onSubmit: Function
}


const ExamFailScreen: FC<IProps> = ({isQuit, onClose, onSubmit}) => {
    const cancelRef = React.useRef(null);

    return (
        <AlertDialog leastDestructiveRef={cancelRef} isOpen={isQuit} onClose={() => onClose()}>
            <AlertDialog.Content style={{borderWidth: 2, borderColor: "red"}} width={'90%'}>
                <AlertDialog.Body>
                    <Text style={{padding: 10, fontSize: 17, textAlign: 'center', color: "red"}}>Вы не прошли тестирование, т.к. свернули приложение. Желаем удачи в следующий раз!</Text>
                    <View style={{columnGap: 10, alignItems: 'center', flexDirection: "column", justifyContent: "center", width: "100%"}}>
                        <TouchableOpacity
                            style={{borderRadius: 4, width: '60%', alignItems: 'center'}}
                            onPress={() => onSubmit()}>
                            <Text style={{color: 'black', fontSize: 18, paddingVertical: 6, fontWeight: "bold", textAlign: "center"}}
                                  ref={cancelRef}>
                                Закрыть
                            </Text>
                        </TouchableOpacity>
                    </View>
                </AlertDialog.Body>
            </AlertDialog.Content>
        </AlertDialog>
    );
};

export default ExamFailScreen;