import React from 'react';
import {View, Text, StyleSheet} from "react-native";
import themeStyles from "../../../../../styles/styles";
import BackLink from "../../../../../components/BackLink/BackLink";
import {useSelector} from "react-redux";
import {selectColor} from "../../../../store/reducers/themeSlice";
import {TextInput} from "react-native-paper";
import {SafeAreaView} from "react-native-safe-area-context";

const Reviews = () => {
    let themeColor = useSelector(selectColor)

    return (
        <SafeAreaView style={[{
            height: '100%',
            flex: 1,
        }, themeColor === 'light' ? themeStyles.backgroundLight : themeStyles.backgroundDark]}>
            <BackLink link={'../'} label={'Оценки и заметки по занятию'}/>
            <View style={styles.reviewsWrapper}>
                <TextInput mode="outlined"
                           placeholder={"Примечание к занятию"}
                           placeholderTextColor={'lightgrey'}
                           activeOutlineColor={themeColor === 'light' ? 'black' : 'white'}
                           activeUnderlineColor={themeColor === 'light' ? 'black' : 'white'}
                           textColor={themeColor === 'light' ? 'black' : 'white'}
                           style={[{width: '90%'}, themeColor === 'light' ? themeStyles.textInputLight : themeStyles.textInputDark]}/>
                <Text style={[themeStyles.regularFont, {color: themeColor === 'light' ? 'black' : 'white'}]}>Нет оценок для отображения</Text>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    reviewsWrapper: {
        paddingTop: 15,
        flexDirection: 'column',
        alignItems: 'center',
        rowGap: 20
    }
});

export default Reviews;