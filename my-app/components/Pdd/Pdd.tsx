import React, {FC, useRef, useState} from 'react';
import {Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useSelector} from "react-redux";
import {selectColor} from "../../app/store/reducers/themeSlice";
import data from "../../Categories/pravila";
import themeStyles from "../../styles/styles";
import BackLink from "../BackLink/BackLink";
import {Searchbar} from "react-native-paper";
import {Ionicons} from "@expo/vector-icons";

interface PddProps {
    page: "auth" | "regular"
}

const Pdd: FC<PddProps> = ({page}) => {
    let themeColor = useSelector(selectColor)
    const [showContent, setShowContent] = useState<boolean>(false)
    const [value, setValue] = useState<string>('')
    const [pickedChapter, setPickedChapter] = useState<any>({})
    const [suggestedSearch, setSuggestedSearch] = useState<any[]>([])
    const ref = useRef(null)

    const search = (value: string) => {
        let ans: any[] = []
        let lowerCaseValue = value.toLowerCase()
        data.forEach((el, chapter) => el.content.forEach((elem, number) => elem.paragrafs.forEach((element) => {
                const wordsArray = element.search.split(' ').map((e: string) => e.toLowerCase())
                if (element.search.toLowerCase().includes(lowerCaseValue)) {
                    ans.push({chapter: elem.chapter, title: element.title, idx: chapter, number: number})
                } else {
                    for (let i = 0; i < wordsArray.length; i++) {
                        if (wordsArray[i].includes(lowerCaseValue)) {
                            ans.push({chapter: elem.chapter, title: element.title, idx: chapter, number: number})
                            break
                        }
                    }
                }
            })
        ))
        return ans
    }

    const formatLetterEnding = (digit: number) => {
        return digit % 10 === 1 ? `(${digit} статья)` : digit % 10 <= 4 ? `(${digit} статьи)` : `(${digit} статей)`
    }

    return (
        <SafeAreaView
            style={[styles.container, themeColor === 'light' ? themeStyles.backgroundLight : themeStyles.backgroundDark]}>
            {showContent ?
                <TouchableOpacity style={[{
                    paddingTop: page === "auth" ? 0 : 10, alignItems: 'center',
                }, styles.searchVariantsWrapper]} onPress={() => {
                    setShowContent(false)
                }}>
                    <Text style={[themeStyles.regularFont, {color: themeColor === 'light' ? 'black' : 'white'}]}>Назад</Text>
                </TouchableOpacity>
             : page === "auth" && <Text style={[themeStyles.regularFont, {
                color: themeColor === 'light' ? 'black' : 'white',
                fontSize: 22,
                alignSelf: "center"
            }]}>Правила дорожного движения</Text>}
            {!showContent && page === "regular" && <BackLink link={'/theory'} label={'ПДД РФ'}/>}

            <View>
                <Searchbar
                    placeholder="Поиск по тексту Правил"
                    style={[styles.searchWrapper, themeColor === 'light' ? {} : {backgroundColor: '#363636'}]}
                    iconColor={themeColor === 'light' ? 'black' : '#bebebe'}
                    onChangeText={(e) => {
                        setValue(e)
                        e.length >= 3 && setSuggestedSearch(search(e))
                    }}
                    value={value}
                    onClearIconPress={() => setSuggestedSearch([])}
                    onFocus={() => setSuggestedSearch([])}
                    placeholderTextColor={themeColor === 'light' ? 'black' : '#bebebe'}
                    theme={{colors: {onSurfaceVariant: themeColor === 'light' ? 'black' : '#bebebe'}}}
                />
                <ScrollView overScrollMode={'never'} contentContainerStyle={{rowGap: 10}}
                            style={[styles.chapterBoxWrapper, themeColor === 'light' ? themeStyles.backgroundLight : themeStyles.backgroundDark]}>
                    {suggestedSearch.map((el, idx) => <View onTouchEnd={() => {
                        setPickedChapter({...data[el.idx].content[el.number], id: el.title})
                        setShowContent(true)
                        setSuggestedSearch([])
                        setValue('')
                    }} key={idx} style={{width: '100%'}}><Text
                        style={[themeStyles.regularFont, {color: themeColor === 'light' ? 'black' : 'white'}]}>{el.chapter}. {el.title}</Text></View>)}
                </ScrollView>
            </View>
            {!showContent ? <>
                    <ScrollView contentContainerStyle={{alignItems: 'flex-start'}} overScrollMode={'never'}
                                style={{marginBottom: 15}}>
                        <View style={{width: '90%'}}>
                            {data.map((el, idx) => <View style={styles.chapterWrapper} key={idx}>
                                <Text style={[themeStyles.regularFont, {
                                    color: themeColor === 'light' ? 'black' : 'white',
                                    fontSize: 22
                                }]}>{el.title} <Text
                                    style={{color: '#6c6c6c'}}>{formatLetterEnding(el.content.length)}</Text></Text>
                                {el.content.map((elem, id) => <TouchableOpacity
                                    style={{flexDirection: 'row', alignItems: 'center'}}
                                    onPress={() => {
                                        setPickedChapter(elem)
                                        setShowContent(true)
                                    }} key={id}>
                                    <Ionicons name="document-text-outline" size={24}
                                              color={themeColor === 'light' ? 'black' : 'white'}/>
                                    <Text numberOfLines={2}
                                          style={[themeStyles.regularFont, {
                                              color: themeColor === 'light' ? 'black' : 'white',
                                              flexShrink: 1
                                          }]}>{elem.chapter}</Text></TouchableOpacity>)}
                            </View>)}
                        </View>
                    </ScrollView></>
                : <View style={{flex: 1}}>
                    <ScrollView ref={ref} overScrollMode={'never'} style={{flex: 2}}>
                        <View style={styles.chapterContentWrapper}>
                            <Text style={[themeStyles.regularFont, {
                                fontSize: 24,
                                color: themeColor === 'light' ? 'black' : 'white'
                            }]}>{pickedChapter.chapter}</Text>
                            {pickedChapter.paragrafs.map((el: any, idx: number) =>
                                <View onLayout={(e) => {
                                    if (el.title === pickedChapter.id) {
                                        const layout = e.nativeEvent.layout
                                        // @ts-ignore
                                        ref.current.scrollTo({x: 0, y: layout.y, animated: true})
                                    }
                                }} key={idx}>
                                    <View>
                                        <View style={{
                                            flexDirection: 'row',
                                            flexWrap: 'wrap',
                                            gap: 10,
                                            justifyContent: 'center'
                                        }}>
                                            {el.uri && el.uri.map((el: any, num: number) => <View
                                                style={{alignItems: 'center'}} key={num}><Image style={styles.img}
                                                                                                resizeMode={'contain'}
                                                                                                source={el.link}/><Text
                                                style={{color: '#565656'}}>{el.name}</Text></View>)}
                                        </View>
                                        <Text
                                            style={[styles.chapterFont, {color: themeColor === 'light' ? 'black' : 'white'}]}><Text
                                            style={{fontWeight: 'bold'}}>{el.title}</Text> {el.text}</Text>
                                    </View>
                                    {el.list && el.list.map((el: string, id: number) =>
                                        el[el.length - 1] !== ':' ? <View style={{paddingLeft: 20}} key={id}><Text
                                                style={styles.chapterFont}>• {el}</Text></View> :
                                            <Text key={id} style={styles.chapterFont}>{el}</Text>
                                    )}
                                    <Text style={styles.chapterFont}>{el.listLastContent}</Text>
                                    {el.signs}
                                </View>)}
                        </View>
                    </ScrollView></View>}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    searchVariantsWrapper: {
        paddingLeft: 20,
        columnGap: 5,
        flexDirection: 'row',
        width: '100%',
        alignSelf: 'flex-start',
    },
    searchWrapper: {
        borderRadius: 5,
        width: '90%',
        marginVertical: 10,
        alignSelf: 'center'
    },
    chapterBoxWrapper: {
        paddingHorizontal: 10,
        width: '100%',
        zIndex: 1,
        maxHeight: '85%'
    },
    chapterWrapper: {
        rowGap: 20,
        width: '90%',
        alignSelf: 'center',
        paddingTop: 20
    },
    chapterContentWrapper: {
        width: '90%',
        rowGap: 20,
        alignSelf: 'center'
    },
    chapterFont: {
        textAlign: 'left',
        fontSize: 16,
        lineHeight: 25
    },
    img: {
        height: 100,
        width: 100
    }
});

export default Pdd;