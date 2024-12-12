import React, {FC, useEffect, useState} from 'react';
import {BackHandler, FlatList, Text, TextInput, TouchableOpacity, View} from "react-native";
import {useSelector} from "react-redux";
import {selectPickedAccount} from "../app/store/reducers/authSlice";
import {selectColor} from "../app/store/reducers/themeSlice";
import firestore from "@react-native-firebase/firestore";
import {Entypo, Ionicons, MaterialCommunityIcons} from "@expo/vector-icons";
import themeStyles from "../styles/styles";
import TextMessage from "./TextMessage";
import moment from "moment/moment";

interface ChatSlugProps {
    currentUserName: string
    chatUser: any
    setIsPickedChatUser: Function
}

const ChatSlug: FC<ChatSlugProps> = ({chatUser, setIsPickedChatUser, currentUserName}) => {
    const account = useSelector(selectPickedAccount)
    const [messages, setMessages] = useState<any[]>();
    let themeColor = useSelector(selectColor)
    const [messageText, setMessageText] = useState<string>("")
    const currentUserDbId = account.role_id === 2 ? `contract_${account.id_reg}` : `employee_${account.id_reg}`
    const chatUserDbId = "contract_id" in chatUser ? `contract_${chatUser.contract_id}` : `employee_${chatUser.emp_id}`
    const chatName = [chatUserDbId, currentUserDbId].sort().join("_")

    useEffect(() => {
            const backAction = () => {
                setIsPickedChatUser(false)
                return true
            }
            const backHandler = BackHandler.addEventListener(
                'hardwareBackPress',
                backAction,
            );
            return () => backHandler.remove();
        }, []
    )

    useEffect(() => {
        const unsubscribe = firestore()
            .collection('chats')
            .doc(chatName)
            .collection('messages')
            .orderBy('createdAt', 'desc')
            .onSnapshot(querySnapshot => {
                const messagesFirestore = querySnapshot.docs.map(doc => {
                    const firebaseData = doc.data() as any;
                    const data: any = {
                        _id: doc.id,
                        text: firebaseData.text,
                        status: firebaseData.status,
                        createdAt: moment(firebaseData.createdAt.seconds * 1000),
                        user: {
                            _id: firebaseData.senderId,
                        },
                    };
                    return data;
                });
                setMessages(messagesFirestore);
                setMessageText("")
            })

        return () => unsubscribe();
    }, [])

    const createNewChat = async () => {
        const createdAt = new Date()

        try {
            const chatRef = firestore().collection('chats').doc(chatName);
            const chatId = chatRef.id;
            const user1ChatData = {
                otherUserId: chatUser.contract_id || chatUser.emp_id,
                chatName: chatUser.resp_manager_name || chatUser.student_name,
                lastMessageText: messageText,
                lastMessageCreatedAt: createdAt,
                unreadCount: 0,
                notifications: true
            };
            const user2ChatData = {
                otherUserId: account.id_reg,
                chatName: currentUserName,
                lastMessageText: messageText,
                lastMessageCreatedAt: createdAt,
                unreadCount: 1,
                notifications: true
            };

            const user1ChatRef = firestore().collection('users').doc(currentUserDbId).collection('chats').doc(chatId);
            const user2ChatRef = firestore().collection('users').doc(chatUserDbId).collection('chats').doc(chatId);
            await user1ChatRef.set(user1ChatData);
            await user2ChatRef.set(user2ChatData);

            await firestore()
                .collection('chats')
                .doc(chatName)
                .collection('messages')
                .add({
                    text: messageText,
                    createdAt: createdAt,
                    status: "sent",
                    senderId: account.id_reg,
                });
        } catch (error) {
            console.error('Error creating new chat: ', error);
            throw new Error('Failed to create new chat');
        }
    };

    return (
        <View style={{height: "100%"}}>
            <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                <TouchableOpacity
                    onPress={() => setIsPickedChatUser(false)}
                    style={{
                        alignItems: 'center',
                        paddingLeft: 20,
                        columnGap: 5,
                        flexDirection: 'row',
                        alignSelf: 'flex-start',
                        paddingBottom: 10,
                    }}>
                    <Ionicons name="arrow-back" size={24} color={themeColor === 'light' ? 'black' : 'lightgrey'}/>
                    <Text
                        style={[themeStyles.regularFont, themeColor === 'light' ? themeStyles.textLight : themeStyles.textDark]}>{chatUser.student_name || chatUser.resp_manager_name}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{width: 50}}>
                    <Entypo name="dots-three-vertical" size={24} color="black"/>
                </TouchableOpacity>
            </View>
            <FlatList
                showsVerticalScrollIndicator={false}
                overScrollMode={'never'}
                style={{paddingHorizontal: 10, marginBottom: 5}}
                data={messages}
                contentContainerStyle={{rowGap: 10, justifyContent: "flex-end"}}
                renderItem={({item, index}) => (
                    <TextMessage message={item} key={index}
                                 type={item.user._id === account.id_reg ? "self" : "else"}/>
                )}
                inverted
            />
            <View style={{
                flexDirection: "row",
                alignItems: "center",
                width: "100%",
                borderTopWidth: 1,
                borderTopColor: "#3b3b3b"
            }}>
                <TextInput value={messageText} onChangeText={(e) => setMessageText(e)} placeholder={"Сообщение"}
                           style={{
                               padding: 15, width: "90%"
                           }}/>
                {messageText.trim().length > 0 && <TouchableOpacity onPress={() => {
                    createNewChat()
                }}>
                    <MaterialCommunityIcons name="send" size={24} color="#2894ef"/>
                </TouchableOpacity>}
            </View>
        </View>
    );
};

export default ChatSlug;