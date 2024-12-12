import React, {FC} from 'react';
import {Text, TouchableOpacity} from "react-native";
import {AlertDialog} from "native-base";

interface IProps {
    isPush: boolean,
    setIsPush: Function
}

const PushDialog: FC<IProps> = ({isPush, setIsPush}) => {
    const cancelRef = React.useRef(null);

    return (
        <AlertDialog leastDestructiveRef={cancelRef} isOpen={isPush} onClose={() => setIsPush(false)}>
            <AlertDialog.Content width={'90%'}>
                <AlertDialog.Body>
                    <Text style={{padding: 10, fontSize: 17, textAlign: 'left'}}>Отправить push-уведомление о свободном
                        времени
                        всем курсантам, которые закреплены за вами. Не использвйте эту опцию часто во избежание эффекта
                        спам-рассылки</Text>
                    <AlertDialog.Footer style={{columnGap: 10, alignItems: 'center', justifyContent: 'space-evenly'}}>
                        <TouchableOpacity
                            style={{backgroundColor: '#268122', borderRadius: 4, width: '60%', alignItems: 'center'}}
                            onPress={() => setIsPush(false)}>
                            <Text style={{color: 'white', fontSize: 16, paddingVertical: 6}}
                                  ref={cancelRef}>
                                Отправить
                            </Text>
                        </TouchableOpacity>
                        <Text style={{color: '#3a3a3a', fontSize: 16}} onPress={() => setIsPush(false)}>
                            Отмена
                        </Text>
                    </AlertDialog.Footer>
                </AlertDialog.Body>
            </AlertDialog.Content>
        </AlertDialog>
    );
};

export default PushDialog;