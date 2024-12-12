import React, {FC} from 'react';
import {useSelector} from "react-redux";
import {selectColor} from "../../app/store/reducers/themeSlice";
import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import themeStyles from "../../styles/styles";
import NotificationHeader from "../NotificationHeader/NotificationHeader";
import {Link} from "expo-router";
import {SafeAreaView} from "react-native-safe-area-context";

interface IAds {
    page: "auth" | "regular"
}

const AdsPage: FC<IAds> = ({page}) => {
    let themeColor = useSelector(selectColor)
    const adsList = [
        {
            img: require('../../assets/images/news1.png')
        },
        {
            img: require('../../assets/images/news2.png')
        },
        {
            img: require('../../assets/images/news3.png')
        },
    ]

    const newsList = [
        {
            img: require('../../assets/images/news6.png')
        },
        {
            img: require('../../assets/images/news4.png')
        },
        {
            img: require('../../assets/images/news5.png')
        },
        {
            img: require('../../assets/images/news7.png')
        },
    ]

    return (
        <SafeAreaView style={[{flex: 1}, themeColor === 'light' ? themeStyles.backgroundLight : themeStyles.backgroundDark]}>
            {page === "regular" && <NotificationHeader/>}
            <Text style={[styles.regularFont, {alignSelf: 'flex-start', paddingLeft: 25}, themeColor === 'light' ? themeStyles.textLight : themeStyles.textDark]}>Главная</Text>
            <ScrollView overScrollMode={'never'} showsHorizontalScrollIndicator={false}
                        style={{flexDirection: 'row', paddingVertical: 10, flex: 2}} horizontal>
                {adsList.map(el => <Link key={el.img} asChild href={"https://avtoschool-vektor.ru/"}><TouchableOpacity style={{paddingHorizontal: 10}}><Image style={styles.image} resizeMode={'cover'}
                                                                                                               source={el.img}/></TouchableOpacity></Link>)}
            </ScrollView>
            <Text style={[styles.regularFont, {
                alignSelf: 'flex-start',
                paddingLeft: 25,
            }, themeColor === 'light' ? themeStyles.textLight : themeStyles.textDark]}>Новости</Text>
            <View style={{paddingBottom: 20, flex: 3, paddingTop: 10}}>
                <ScrollView contentContainerStyle={{rowGap: 10}} overScrollMode={'never'} style={{paddingHorizontal: 20}}
                            showsVerticalScrollIndicator={false}>
                    {newsList.map((el, idx) => <Link key={idx} asChild href={"https://avtoschool-vektor.ru/"}>
                        <TouchableOpacity>
                            <Image style={{resizeMode: 'contain', width: "100%", height: 130}} source={el.img}/>
                        </TouchableOpacity>
                    </Link>)}
                </ScrollView>
            </View>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    regularFont: {
        textAlign: 'center',
        fontFamily: 'BebasNeue',
        fontSize: 20
    },
    image: {
        width: 250,
        height: 120,
        borderRadius: 20
    },
    newsBox: {
        paddingBottom: 10,
        marginTop: 15,
        borderRadius: 20,
    },
});

export default AdsPage;