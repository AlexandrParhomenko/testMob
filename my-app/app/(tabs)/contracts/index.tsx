import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from "react-native";
import {Searchbar} from "react-native-paper";
import {Link} from "expo-router";
import {LinearGradient} from "expo-linear-gradient";
import {useSelector} from "react-redux";
import {selectColor} from "../../store/reducers/themeSlice";
import ListPagesLoader from "../../../components/CustomLoaders/ListPagesLoader";
import {useGetGlobalSearchResultsQuery} from "../../services/authEndpoints";
import NotificationHeader from "../../../components/NotificationHeader/NotificationHeader";
import {SafeAreaView} from "react-native-safe-area-context";

const Index = () => {
    const [query, setQuery] = useState<string>("")
    const {data: searchRes} = useGetGlobalSearchResultsQuery(query)
    const [value, setValue] = useState<string>('')
    let themeColor = useSelector(selectColor)

    useEffect(() => {
        setQuery(`${value}&search_in=contracts`)
    }, [value])

    if (!searchRes) return <ListPagesLoader/>

    return (
        <SafeAreaView style={[styles.container, themeColor === 'light' ? styles.backgroundLight : styles.backgroundDark]}>
            <NotificationHeader/>
            <Searchbar
                placeholder="Поиск"
                style={[{width: '80%', borderRadius: 5}, themeColor === 'light' ? {alignSelf: 'center'} : {backgroundColor: '#656565'}]}
                onChangeText={(e) => setValue(e)}
                value={value}
                placeholderTextColor={themeColor === 'light' ? 'black' : '#bebebe'}
                theme={{colors: {onSurfaceVariant: themeColor === 'light' ? 'black' : '#bebebe'}}}
            />
            <View style={{rowGap: 5, width: '100%'}}>
                {searchRes.data.contracts.map(el => <Link asChild key={el.contract_id}
                                           href={`/contracts/${el.contract_id}`}>
                    <TouchableOpacity style={{width: '80%', alignSelf: 'center'}}>
                        <LinearGradient colors={["#e7e7e7", "#b2b2b2", "#a9a9a9"]} style={styles.driveStoryBox}>
                            <View style={{
                                borderRadius: 50,
                                height: 35,
                                width: 35,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                            </View>
                            <Text numberOfLines={1} style={{flex: 1}}>{el.student_name}</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </Link>)}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    leadBarWrapper: {
        flexDirection: 'row',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'black',
        alignItems: 'center',
        padding: 10
    },
    backgroundLight: {
        backgroundColor: 'white'
    },
    backgroundDark: {
        backgroundColor: '#212121FF'
    },
    textLight: {
        color: 'black'
    },
    textDark: {
        color: 'white'
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
        columnGap: 10
    }
});

export default Index;