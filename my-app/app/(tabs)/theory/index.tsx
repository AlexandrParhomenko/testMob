import React from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity, ScrollView} from "react-native";
import NotificationHeader from "../../../components/NotificationHeader/NotificationHeader";
import {Feather, Ionicons} from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {Avatar} from 'react-native-paper';
import {Link} from "expo-router";
import themeStyles from "../../../styles/styles";
import {useSelector} from "react-redux";
import {selectColor} from "../../store/reducers/themeSlice";
import {LinearGradient} from "expo-linear-gradient";
import {SafeAreaView} from "react-native-safe-area-context";

const Index = () => {
    let themeColor = useSelector(selectColor)

    return (
        <SafeAreaView style={[{
            flex: 1
        }, themeColor === 'light' ? themeStyles.backgroundLight : themeStyles.backgroundDark]}>
            <NotificationHeader/>
            <ScrollView showsVerticalScrollIndicator={false} style={{flex: 2}}>
                <Link style={[styles.section, styles.theorySection]} href={'/commonmaterials'} asChild>
                    <TouchableOpacity>
                        <LinearGradient start={[0.9, -0.5]}
                                        end={[0.8, 1.5]}
                                        style={styles.enterButton}
                                        colors={['#7a1818', '#771b1b', 'red']}
                        >
                            <View style={{width: '80%'}}>
                                <Text style={{color: 'white', fontSize: 20}}>Общие материалы</Text>
                                <Text style={{color: 'white'}}>Полезная информация по вашему обучению в школе</Text>
                            </View>
                            <Feather style={{paddingRight: 15}} name="paperclip" size={34} color="white" />
                            {/*<Image style={styles.image} tintColor={'white'}*/}
                            {/*       source={require('../../../assets/images/carlogo.png')}/>*/}
                        </LinearGradient>
                    </TouchableOpacity>
                </Link>
                {/*<Link style={[styles.section, styles.theorySection]} href={'/transport'} asChild>*/}
                {/*    <TouchableOpacity>*/}
                {/*        <LinearGradient start={[0.9, -0.5]}*/}
                {/*                        end={[0.8, 1.5]}*/}
                {/*                        style={styles.enterButton}*/}
                {/*                        colors={['#7a1818', '#771b1b', 'red']}*/}
                {/*        >*/}
                {/*            <View style={{width: '80%'}}>*/}
                {/*                <Text style={{color: 'white', fontSize: 20}}>Транспортные средства</Text>*/}
                {/*                <Text style={{color: 'white'}}>Ввод информации о пробегах и техническом обслуживании</Text>*/}
                {/*            </View>*/}
                {/*            <Image style={styles.image} tintColor={'white'}*/}
                {/*                   source={require('../../../assets/images/carlogo.png')}/>*/}
                {/*        </LinearGradient>*/}
                {/*    </TouchableOpacity>*/}
                {/*</Link>*/}
                <Link href={'/theory/exams'} style={[styles.section, styles.theorySection]} asChild>
                    <TouchableOpacity>
                        <LinearGradient start={[0.9, -0.5]}
                                        end={[0.8, 1.5]}
                                        style={styles.enterButton}
                                        colors={['#7a1818', '#771b1b', 'red']}
                        >
                            <View style={{width: '80%'}}>
                                <Text style={{color: 'white', fontSize: 20}}>Тестирование</Text>
                                <Text style={{color: 'white'}}>Промежуточные зачеты и внутренние экзамены, открытые для
                                    вас</Text>
                            </View>
                            <Feather style={{marginRight: 15}} name="target" size={40} color="white"/>
                        </LinearGradient>
                    </TouchableOpacity>
                </Link>
                <Link href={'/theory/theoryMenu'} style={[styles.section, styles.theorySection]} asChild>
                    <TouchableOpacity>
                        <LinearGradient start={[0.9, -0.5]}
                                        end={[0.8, 1.5]}
                                        style={styles.enterButton}
                                        colors={['#7a1818', '#771b1b', 'red']}
                        >
                            <View style={{width: '80%'}}>
                                <Text style={{color: 'white', fontSize: 20}}>Тренировка по билетам</Text>
                                <Text style={{color: 'white'}}>Подготовьтесь к экзаменам по официальным
                                    экзаменационным
                                    билетам</Text>
                            </View>
                            <FontAwesome style={{marginRight: 20}} name="list-ol" size={30} color="white"/>

                        </LinearGradient>
                    </TouchableOpacity>
                </Link>
                <Link href={'/theory/pdd'} style={[styles.section, styles.theorySection]} asChild>
                    <TouchableOpacity>
                        <LinearGradient start={[0.9, -0.5]}
                                        end={[0.8, 1.5]}
                                        style={styles.enterButton}
                                        colors={['#7a1818', '#771b1b', 'red']}>
                            <View style={{width: '80%'}}>
                                <Text style={{color: 'white', fontSize: 20}}>Правила дорожного движения</Text>
                                <Text style={{color: 'white'}}>Подготовьтесь к экзаменам по официальным экзаменационным
                                    билетам</Text>
                            </View>
                            <Avatar.Image theme={{colors: {primary: 'transparent'}}}
                                          style={{borderColor: 'red', marginRight: 10}} size={50}
                                          source={require('../../../assets/images/pddlogo.png')}/>
                        </LinearGradient>
                    </TouchableOpacity>
                </Link>
                <Link href={'/theory/schoolLib'} style={[styles.section, styles.theorySection]} asChild>
                    <TouchableOpacity>
                        <LinearGradient start={[0.9, -0.5]}
                                        end={[0.8, 1.5]}
                                        style={styles.enterButton}
                                        colors={['#7a1818', '#771b1b', 'red']}>
                            <View style={{width: '80%'}}>
                                <Text style={{color: 'white', fontSize: 20}}>Видео-уроки</Text>
                                <Text style={{color: 'white'}}>Материалы для интерактивного изучения правил дорожного движения</Text>
                            </View>
                            <Ionicons style={{paddingRight: 10}} name="videocam" size={45} color="white" />
                        </LinearGradient>
                    </TouchableOpacity>
                </Link>
            </ScrollView>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    section: {
        width: '95%',
        borderRadius: 5,
        alignSelf: 'center',
        margin: 10
    },
    image: {
        height: 50,
        width: 70,
    },
    theorySection: {
        rowGap: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    enterButton: {
        width: '100%',
        alignSelf: 'center',
        borderRadius: 10,
        backgroundColor: '#e30000',
        paddingHorizontal: 10,
        paddingVertical: 15,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
});

export default Index;