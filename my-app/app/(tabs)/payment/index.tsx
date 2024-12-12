import React, {useEffect} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    ScrollView,
    RefreshControl
} from "react-native";
import NotificationHeader from "../../../components/NotificationHeader/NotificationHeader";
import {Link} from "expo-router";
import {AntDesign} from "@expo/vector-icons";
import {useSelector} from "react-redux";
import {selectColor} from "../../store/reducers/themeSlice";
import themeStyles from "../../../styles/styles";
import GradientButton from "../../../components/GradientButton/GradientButton";
import 'react-native-get-random-values'
import {useLazyGetSalesByContractIdQuery} from "../../services/paymentEndpoints";
import {selectPickedAccount} from "../../store/reducers/authSlice";
import moment from "moment";
import {SafeAreaView} from "react-native-safe-area-context";

const Index = () => {
    let themeColor = useSelector(selectColor)
    const account = useSelector(selectPickedAccount)
    const [getSales, { data: allSalesList, isLoading }] = useLazyGetSalesByContractIdQuery();

    useEffect(() => {
        getSales(account.id_reg)
    }, [])

    const refresh = async () => {
        await getSales(account.id_reg)
    }

    if (!allSalesList) return <ActivityIndicator color={'#e34d4d'} style={{paddingTop: '50%'}} size="large"/>

    return (
        <SafeAreaView style={[{flex: 1}, themeColor === 'light' ? themeStyles.backgroundLight : themeStyles.backgroundDark]}>
            <NotificationHeader/>
            <Link asChild href={'/payment/services'}>
                <TouchableOpacity>
                    <GradientButton text={'Покупка услуг'}
                                    colors={['#7a1818', '#771b1b', 'red']}
                                    icon={<AntDesign name="pluscircleo" size={30} color="white"/>}/>
                </TouchableOpacity>
            </Link>
            <ScrollView refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refresh}/>}>
                {allSalesList.data.map(el => <View key={el.sale_id} style={styles.paymentStatsWrapper}>
                    <View>
                        <Image style={{height: 100, width: 80}} source={require('../../../assets/images/contract.png')}/>
                        <Text style={{color: '#606060'}}>Дата продажи</Text>
                        <Text style={{color: '#606060'}}>{moment(el.sale_date).format("DD.MM.YYYY")}</Text>
                        <Text style={{color: '#606060'}}>График платежей</Text>
                    </View>
                    <View>
                        <Text style={{fontSize: 22}}>Сумма по договору</Text>
                        <Text style={{fontSize: 20, color: '#606060'}}>Осталось выплатить:</Text>
                        <Text style={{fontSize: 25}}>{el.debt} ₽</Text>
                    </View>
                </View>)}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    paymentStatsWrapper: {
        borderRadius: 7,
        borderWidth: 1,
        borderColor: '#e34d4d',
        padding: 10,
        width: '95%',
        marginTop: 10,
        alignSelf: 'center',
        flexDirection: 'row',
        backgroundColor: 'white'
    },
    getServiceBtn: {
        backgroundColor: '#8d32a4',
        borderRadius: 5,
        padding: 10,
        width: '95%',
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',
        columnGap: 20
    }
});

export default Index;