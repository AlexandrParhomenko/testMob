import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ScrollView} from "react-native";
import {Searchbar} from "react-native-paper";
import {Link} from "expo-router";
import {LinearGradient} from "expo-linear-gradient";
import {useSelector} from "react-redux";
import {selectColor} from "../../store/reducers/themeSlice";
import themeStyles from "../../../styles/styles";
import ListPagesLoader from "../../../components/CustomLoaders/ListPagesLoader";
import {StatusBar} from "expo-status-bar";
import {useGetGlobalSearchResultsQuery} from "../../services/authEndpoints";
import {SafeAreaView} from "react-native-safe-area-context";

const Index = () => {
    const [value, setValue] = useState<string>('')
    let themeColor = useSelector(selectColor)
    const [query, setQuery] = useState<string>("")
    const {data: searchRes} = useGetGlobalSearchResultsQuery(query)

    useEffect(() => {
        setQuery(`${value}&search_in=leads`)
    }, [value])

    if (!searchRes) {
        return  <ListPagesLoader/>
    }

    return (
        <SafeAreaView style={[styles.container, themeColor === 'light' ? themeStyles.backgroundLight : themeStyles.backgroundDark]}>
            <Searchbar
                placeholder="Поиск"
                style={[{width: '80%', borderRadius: 5}, themeColor === 'light' ? {alignSelf: 'center'} : {backgroundColor: '#656565'}]}
                iconColor={themeColor === 'light' ? 'black' : '#bebebe'}
                onChangeText={(e) => setValue(e)}
                value={value}
                placeholderTextColor={themeColor === 'light' ? 'black' : '#bebebe'}
                theme={{colors: {onSurfaceVariant: themeColor === 'light' ? 'black' : '#bebebe'}}}
            />
            <ScrollView overScrollMode={'never'} style={{rowGap: 5, width: '100%', flex: 2}}>
                {searchRes.data.leads.map(el => <Link asChild key={el.lead_id} href={`/leads/${el.lead_id}`}>
                    <TouchableOpacity style={{width: '80%', alignSelf: 'center'}}>
                        <LinearGradient colors={["#e7e7e7", "#b2b2b2", "#a9a9a9"]} style={styles.driveStoryBox}>
                            <Text>{`${el.sur_name} ${el.name[0]}.${el.middle_name[0]}.`}, </Text>
                            <Text style={styles.branchWrapper}>{el.branch_name}, </Text>
                            <Text numberOfLines={1} style={{flex: 1}}>{el.lead_status}</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </Link>)}
            </ScrollView>
        </SafeAreaView>

    );
};

const styles = StyleSheet.create({
    leadBarWrapper: {
        flexDirection: 'row',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'black',
        justifyContent: 'center',
        padding: 10
    },
    container: {
        alignItems: 'center',
        paddingTop: 40,
        rowGap: 20,
        flex: 1
    },
    branchWrapper: {
        color: '#e34d4d'
    },
    driveStoryBox: {
        width: '100%',
        borderRadius: 15,
        backgroundColor: 'lightgrey',
        alignSelf: 'center',
        marginVertical: 5,
        alignItems: 'center',
        padding: 20,
        flexDirection: 'row',
    }
});

export default Index;