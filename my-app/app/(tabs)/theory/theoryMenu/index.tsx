import React from 'react';
import {TouchableOpacity, View, Text} from "react-native";
import themeStyles from "../../../../styles/styles";
import {useSelector} from "react-redux";
import {selectColor} from "../../../store/reducers/themeSlice";
import GradientButton from "../../../../components/GradientButton/GradientButton";
import BackLink from "../../../../components/BackLink/BackLink";
import {Link} from "expo-router";
import {SafeAreaView} from "react-native-safe-area-context";

const Index = () => {
    let themeColor = useSelector(selectColor)

    return (
        <SafeAreaView style={[{
            flex: 1
        }, themeColor === 'light' ? themeStyles.backgroundLight : themeStyles.backgroundDark]}>
            <BackLink link={'/theory'} label={'Тренировка по билетам'}/>
            <View style={{width:'100%', alignSelf: 'center', rowGap: 20, paddingTop: 10, alignItems: 'center'}}>
                <Text style={[themeStyles.regularFont, {color: '#949494'}]}>Библиотека</Text>
                <Link asChild href={'/theory/theoryMenu/tickets'}>
                    <TouchableOpacity style={{width: '60%'}}>
                        <GradientButton colors={['#7a1818', '#771b1b', 'red']} text={'Билеты'}/>
                    </TouchableOpacity>
                </Link>
                <Link asChild href={'/theory/theoryMenu/themes'} style={{width: '60%'}}>
                    <TouchableOpacity>
                        <GradientButton colors={['#7a1818', '#771b1b', 'red']} text={'Темы'}/>
                    </TouchableOpacity>
                </Link>
            </View>
        </SafeAreaView>
    );
};


export default Index;