import React, {useEffect, useState} from 'react';
import {
    ActivityIndicator,
    BackHandler,
    Image,
    Linking, RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import {AntDesign, Feather, MaterialIcons} from "@expo/vector-icons";
import {useSelector} from "react-redux";
import {selectColor} from "../../store/reducers/themeSlice";
import BackLink from "../../../components/BackLink/BackLink";
import themeStyles from "../../../styles/styles";
import {v4 as uuidv4} from "uuid";
import moment from "moment/moment";
import CloseLink from "../../../components/BackLink/CloseLink";
import GradientButton from "../../../components/GradientButton/GradientButton";
import {QrCodeResponse} from "../../types/types";
import * as FileSystem from 'expo-file-system';
import {shareAsync} from "expo-sharing";
import {useLazyGetProductsQuery} from "../../services/modalDataEndpoints";
import {SafeAreaView} from "react-native-safe-area-context";

const Services = () => {
    let themeColor = useSelector(selectColor)
    const [amount, setAmount] = useState<number>(1)
    const [cost, setCost] = useState<number>(1400)
    const [qrCodeData, setQrCodeData] = useState<QrCodeResponse>({} as QrCodeResponse)
    const [showPaymentWindow, setShowPaymentWindow] = useState<boolean>(false)
    const [showQrCodeWindow, setShowQrCodeWindow] = useState<boolean>(false)
    let uuid = uuidv4()
    const [getProducts, {data: products, isLoading}] = useLazyGetProductsQuery()
    let curTime = moment().add(1, 'h')
    const body = {
        "additionalInfo": "Доп. информация",
        "amount": cost,
        "currency": "RUB",
        "order": uuid,
        "paymentDetails": "Назначение платежа",
        "qrType": "QRDynamic",
        "extra": {
            "apiClient": "Your SBP Software",
            "apiClientVersion": "1.0.0"
        },
        "qrExpirationDate": curTime,
        "sbpMerchantId": "MA0000000552",
        "redirectUrl": "https://bfkh.ru/",
        "qrDescription": "QR для оплаты заказа"
    }

    const downloadQrCode = async () => {
        const fileName = "QR-code.png"
        const result = await FileSystem.downloadAsync(
            qrCodeData.qrUrl,
            FileSystem.documentDirectory + fileName,
        );
        saveFile(result.uri);
    }

    const saveFile = (uri: string) => {
        shareAsync(uri)
    }

    const verifyQrPayment = () => {
        // console.log(qrCodeData.qrId)
        // fetch(`https://pay-test.raif.ru/api/sbp/v2/qrs/${qrCodeData.qrId}`, {
        //     method: 'GET',
        //     headers: {
        //         'Authorization': 'Bearer eyJ0eXA***'
        //     },
        // }).then(res => res.json()).then(res => {
        //     console.log(res)
        //     // Linking.openURL('whatsapp://app')
        //     // setQrCodeData(res)
        // }).catch(err => console.log(err))
    }

    const postQrCode = () => {
        setShowQrCodeWindow(true)
        fetch('https://pay-test.raif.ru/api/sbp/v2/qrs', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then(res => res.json()).then(res => {
            Linking.openURL(res.payload)
            setQrCodeData(res)
        })
    }

    const refresh = async () => {
        await getProducts();
    }

    useEffect(() => {
        getProducts()
        const backAction = () => {
            setShowPaymentWindow(false)
            return true
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );

        return () => backHandler.remove();
    }, []);

    if (!products) return <ActivityIndicator color={'#e34d4d'} style={{paddingTop: '50%'}} size="large"/>

    return (
        <SafeAreaView style={[{flex: 1}, themeColor === 'light' ? themeStyles.backgroundLight : themeStyles.backgroundDark]}>
            <BackLink link={'/payment'} label={'Покупка услуг'}/>
            <ScrollView refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refresh}/>} style={{marginBottom: 20}}>
                {products.data.map((el, idx) => !el.is_main && <View key={idx} style={styles.servicesWrapper}>
                    <View style={styles.servicesBox}>
                        <View>
                            <Text style={{fontSize: 22}}>{el.product_name}</Text>
                            <Text style={{color: '#606060'}}>{el.description}</Text>
                            <View style={{flexDirection: 'row', columnGap: 30, marginTop: 20}}>
                                <View style={{rowGap: 5}}>
                                    <Text style={{color: '#606060'}}>Стоимость</Text>
                                    <Text style={{fontSize: 25}}>{el.price * amount} руб.</Text>
                                </View>
                                <View style={{rowGap: 5}}>
                                    <Text style={{color: '#606060'}}>Количество</Text>
                                    <View style={{flexDirection: 'row', alignItems: 'center', columnGap: 10}}>
                                        <TouchableOpacity onPress={() => setAmount(amount - 1)} disabled={amount === 1}>
                                            <Feather name="minus-circle" size={35}
                                                     color={amount === 1 ? 'darkgrey' : '#0c772b'}/>
                                        </TouchableOpacity>
                                        <Text style={{fontSize: 25}}>{amount}</Text>
                                        <TouchableOpacity onPress={() => setAmount(amount + 1)}>
                                            <AntDesign name="pluscircleo" size={35} color="#0c772b"/>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => setShowPaymentWindow(true)} style={styles.paymentBrnWrapper}>
                        <Text style={{color: 'white', fontSize: 20}}>Перейти к оплате</Text>
                        <MaterialIcons name="keyboard-arrow-down" size={30} color="white"/>
                    </TouchableOpacity>
                </View>)}

            </ScrollView>
            {showPaymentWindow && <View
                style={styles.windowWrapper}>
                <CloseLink label={'Оплата через СБП'} onClose={setShowPaymentWindow}/>
                <View style={{paddingHorizontal: 20, rowGap: 10}}>
                    <Text style={{fontSize: 16}}>Вы можете оплатить полную стоимость, или изменить её по своему
                        усмотрению. Оплата производится
                        в приложении вашего банка.
                    </Text>
                    <Text style={[themeStyles.regularFont, {color: '#6b6b6b'}]}>Оплачиваемая услуга:</Text>
                    <Text style={[themeStyles.regularFont, {color: themeColor === 'dark' ? 'white' : 'black'}]}>Доп.занятие
                        по вождению</Text>
                    <Text style={[themeStyles.regularFont, {color: '#6b6b6b'}]}>Сумма к оплате (₽):</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center', columnGap: 30}}>
                        <TextInput defaultValue={cost.toString()} placeholder={'Сумма'} style={styles.priceInput}
                                   onChangeText={(e) => {
                                       setCost(parseInt(e))
                                   }} keyboardType='numeric'/>
                        <Image style={{height: 70, width: 140}} resizeMode={'cover'}
                               source={require('../../../assets/images/sbp.png')}/>
                    </View>
                    <TouchableOpacity style={{paddingTop: 20}} onPress={postQrCode}>
                        <GradientButton text={'К оплате'} colors={['#58ff7a', '#15e50c', '#009112']}/>
                    </TouchableOpacity>
                </View>
            </View>}
            {showQrCodeWindow && qrCodeData.qrUrl && <View
                style={styles.windowWrapper}>
                <CloseLink label={'Оплата через СБП'} onClose={() => {
                    setQrCodeData({} as QrCodeResponse)
                    setShowQrCodeWindow(false)
                }}/>
                <View style={{padding: 10, rowGap: 10, alignItems: 'center'}}>
                    <Image style={{height: 70, width: 140}} resizeMode={'cover'}
                           source={require('../../../assets/images/sbp.png')}/>
                    <Text>QR-код действителен в течение одного часа. После оплаты в приложении нажмите кнопку
                        "Подтвердить"</Text>
                    <TouchableOpacity onPress={verifyQrPayment} style={styles.approveBtn}>
                        <Text style={themeStyles.regularFont}>Подтвердить</Text>
                    </TouchableOpacity>
                    <View style={{alignItems: 'center', justifyContent: 'center', columnGap: 30, paddingTop: 10}}>
                        <TouchableOpacity onPress={downloadQrCode} style={styles.qrWrapper}>
                            <AntDesign style={{paddingTop: 10}} name="download" size={24} color="black"/>
                            <Image style={{height: 200, width: 200}} resizeMode={'cover'}
                                   source={{uri: qrCodeData.qrUrl}}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    servicesWrapper: {
        borderRadius: 7,
        borderWidth: 1,
        borderColor: '#0c772b',
        overflow: 'hidden',
        marginTop: 10,
        alignSelf: 'center',
        width: '90%'
    },
    servicesBox: {
        flexDirection: 'row',
        columnGap: 20,
        padding: 10,
        flexWrap: 'wrap',
        backgroundColor: 'white'
    },
    paymentBrnWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#34a454',
        height: 40
    },
    windowWrapper: {
        position: 'absolute',
        backgroundColor: 'white',
        zIndex: 22,
        height: '100%',
        width: '100%'
    },
    priceInput: {
        borderWidth: 1,
        borderColor: '#7c7c7c',
        width: '35%',
        borderRadius: 6,
        padding: 5,
        fontSize: 20
    },
    approveBtn: {
        width: '50%',
        backgroundColor: '#ff9b28',
        alignItems: 'center',
        borderRadius: 10,
        padding: 10
    },
    qrWrapper: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'black',
        alignItems: 'center',
        padding: 5
    }
});

export default Services;