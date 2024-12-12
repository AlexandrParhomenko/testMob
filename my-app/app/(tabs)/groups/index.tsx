import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import {Modal} from 'react-native-paper';
import {Searchbar} from "react-native-paper";
import {Link} from "expo-router";
import {LinearGradient} from "expo-linear-gradient";
import {useGetGroupsBySearchQuery} from "../../services/groupsEndpoints";
import {AntDesign} from "@expo/vector-icons";
import {useGetBranchesQuery} from "../../services/modalDataEndpoints";
import {useSelector} from "react-redux";
import {selectColor} from "../../store/reducers/themeSlice";
import {Select} from "native-base";
import themeStyles from "../../../styles/styles";
import ListPagesLoader from "../../../components/CustomLoaders/ListPagesLoader";
import {SafeAreaView} from "react-native-safe-area-context";

const Index = () => {
    const [query, setQuery] = useState<string>("")
    const [statusQuery, setStatusQuery] = useState<string>("")
    const [branchQuery, setBranchQuery] = useState<string>("")
    const [searchQuery, setSearchQuery] = useState<string>("")
    const {data, isLoading, refetch, error} = useGetGroupsBySearchQuery(query);
    const {data: branches,} = useGetBranchesQuery();
    const [visible, setVisible] = useState(false);
    let themeColor = useSelector(selectColor)

    useEffect(() => {
        const statusString = `group_status=${statusQuery}&`
        const branchString = `branch_name=${branchQuery}&`
        setQuery(`?${statusQuery && statusString}&group_number=${searchQuery}&${branchQuery && branchString}`)
    }, [statusQuery, searchQuery, branchQuery])

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    if (!data || !branches) {
        return <ListPagesLoader/>
    }

    return (
        <SafeAreaView
            style={[styles.container, themeColor === 'light' ? themeStyles.backgroundLight : themeStyles.backgroundDark]}>
            <Modal visible={visible} style={[{zIndex: 1000, position: 'absolute', alignSelf: 'center'}]}
                   contentContainerStyle={[styles.modalWindow, {backgroundColor: themeColor === 'light' ? 'white' : '#858585'}]}
                   onDismiss={hideModal}>
                <TouchableOpacity onPress={() => {
                    setStatusQuery('')
                    setSearchQuery("")
                    setBranchQuery('')
                    hideModal()
                }}><Text>Убрать фильтры</Text></TouchableOpacity>
                <Select
                    placeholder={'Филиал'}
                    selectedValue={branchQuery}
                    width={'90%'}
                    fontSize={20}
                    onValueChange={(itemValue: string) => setBranchQuery(itemValue)}
                >
                    {branches.data.map(el =>
                        <Select.Item key={el.branch_id} label={el.branch_name}
                                     value={el.branch_name}/>)}
                </Select>
                <Select
                    placeholder={'Статус'}
                    selectedValue={statusQuery}
                    width={'90%'}
                    fontSize={20}
                    onValueChange={(itemValue: string) => setStatusQuery(itemValue)}
                >
                    {['A', 'B', 'C'].map(el =>
                        <Select.Item key={el} label={el}
                                     value={el}/>)}
                </Select>
            </Modal>

            <View style={{flexDirection: 'row', alignItems: 'center', columnGap: 10}}>
                <TouchableOpacity onPress={() => showModal()}>
                    <AntDesign name="filter" size={30} color={themeColor === 'light' ? 'black' : '#b2b2b2'}/>
                </TouchableOpacity>
                <Searchbar
                    placeholder="Поиск"
                    style={[{width: '80%', borderRadius: 5}, themeColor === 'light' ? {alignSelf: 'center'} : {backgroundColor: '#656565'}]}
                    onChangeText={(e) => setSearchQuery(e)}
                    value={searchQuery}
                    placeholderTextColor={themeColor === 'light' ? 'black' : '#bebebe'}
                    theme={{colors: {onSurfaceVariant: themeColor === 'light' ? 'black' : '#bebebe'}}}
                />
            </View>

            {!visible ? <ScrollView style={{rowGap: 5, width: '100%', flex: 2}}>
                {data.data.map(el => <Link asChild key={el.tr_group_id}
                                           href={`/groups/${el.tr_group_id}_${el.tr_group_number}`}>
                    <TouchableOpacity style={{width: '90%', alignSelf: 'center'}}>
                        <LinearGradient colors={["#e7e7e7", "#b2b2b2", "#a9a9a9"]} style={styles.driveStoryBox}>
                            <Text>{el.tr_group_number}</Text>
                            <View style={[styles.branchNameWrapper, {backgroundColor: el.branch_color}]}>
                                <Text numberOfLines={1} style={{color: 'white'}}>{el.branch_name}</Text>
                            </View>
                            <View style={styles.categoryNameWrapper}>
                                <Text>{el.training_direction}</Text>
                            </View>
                            <Text numberOfLines={1} style={{flex: 1}}>{el.tr_group_status}</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </Link>)}
                {/*{!applyFilter ? data.data.map(el => <Link asChild key={el.tr_group_id}*/}
                {/*                                          href={`/groups/${el.tr_group_id}_${el.tr_group_number}`}>*/}
                {/*    <TouchableOpacity style={{width: '90%', alignSelf: 'center'}}>*/}
                {/*        <LinearGradient colors={["#e7e7e7", "#b2b2b2", "#a9a9a9"]} style={styles.driveStoryBox}>*/}
                {/*            <Text>{el.tr_group_number}</Text>*/}
                {/*            <View style={[styles.branchNameWrapper, {backgroundColor: el.branch_color}]}>*/}
                {/*                <Text numberOfLines={1} style={{color: 'white'}}>{el.branch_name}</Text>*/}
                {/*            </View>*/}
                {/*            <View style={styles.categoryNameWrapper}>*/}
                {/*                <Text>{el.training_direction}</Text>*/}
                {/*            </View>*/}
                {/*            <Text numberOfLines={1} style={{flex: 1}}>{el.tr_group_status}</Text>*/}
                {/*        </LinearGradient>*/}
                {/*    </TouchableOpacity>*/}
                {/*</Link>) : data.data.map(el => el.branch_name.includes(branch) && el.training_direction.includes(category) ?*/}
                {/*    <Link asChild key={el.tr_group_id} href={`/groups/${el.tr_group_id}`}>*/}
                {/*        <TouchableOpacity style={{width: '90%', alignSelf: 'center'}}>*/}
                {/*            <LinearGradient colors={["#e7e7e7", "#b2b2b2", "#a9a9a9"]} style={styles.driveStoryBox}>*/}
                {/*                <Text>{el.tr_group_number}</Text>*/}
                {/*                <View style={[styles.branchNameWrapper, {backgroundColor: el.branch_color}]}>*/}
                {/*                    <Text numberOfLines={1} style={{color: 'white'}}>{el.branch_name}</Text>*/}
                {/*                </View>*/}
                {/*                <View style={styles.categoryNameWrapper}>*/}
                {/*                    <Text>{el.training_direction}</Text>*/}
                {/*                </View>*/}
                {/*                <Text numberOfLines={1} style={{flex: 1}}>{el.tr_group_status}</Text>*/}
                {/*            </LinearGradient>*/}
                {/*        </TouchableOpacity>*/}
                {/*    </Link> : '')}*/}
            </ScrollView> : ''}
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
        paddingVertical: 20,
        paddingHorizontal: 10,
        flexDirection: 'row',
        columnGap: 10,
    },
    regularFont: {
        textAlign: 'center',
        fontFamily: 'BebasNeue',
        fontSize: 20
    },
    modalWindow: {
        borderRadius: 10,
        width: '90%',
        alignSelf: 'center',
        alignItems: 'center',
        rowGap: 20,
        zIndex: 1000,
        paddingVertical: 20,
    },
    branchNameWrapper: {
        width: 100,
        alignItems: 'center',
        paddingVertical: 3,
        paddingHorizontal: 5,
        borderRadius: 3
    },
    categoryNameWrapper: {
        backgroundColor: 'lightgray',
        borderRadius: 50,
        height: 20,
        width: 20,
        alignItems: 'center'
    }
});

export default Index;