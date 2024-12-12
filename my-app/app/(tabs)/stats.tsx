import React, {useState} from 'react';
import {View, Text, Dimensions, StyleSheet, ScrollView} from "react-native";
import {StackedBarChart} from "react-native-chart-kit";
import {useSelector} from "react-redux";
import {selectColor} from "../store/reducers/themeSlice";
import themeStyles from "../../styles/styles";
import {Select} from "native-base";
import {StatusBar} from "expo-status-bar";
import {SafeAreaView} from "react-native-safe-area-context";

const Stats = () => {
    const [year, setYear] = useState<string>('Выбрать год')
    const [quarter, setQuarter] = useState<string>('Выбрать квартал')
    let themeColor = useSelector(selectColor)
    const data = {
        labels: ["Январь", "Февраль", "Март"],
        legend: ["Гагарина", "Терминал", "Восточная"],
        data: [
            [60, 60, 60],
            [30, 30, 60],
            [30, 30, 60],
        ],
        barColors: ["#0871da", "#0ee864", "#da740d"]
    };
    const quarters = [
        '1 квартал',
        '2 квартал',
        '3 квартал',
        '4 квартал',
    ]

    const years = [
        '2023',
        '2024',
        '2025',
        '2026',
        '2027',
        '2028',
        '2029',
    ]

    return (
        <SafeAreaView
            style={[styles.container, themeColor === 'light' ? themeStyles.backgroundLight : themeStyles.backgroundDark]}>
            <StatusBar style={themeColor === 'light' ? 'dark' : 'light'}/>
            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                <Text
                    style={[styles.regularFont, themeColor === 'light' ? themeStyles.textLight : themeStyles.textDark]}>Статистика</Text>
                    <Select
                        placeholder={'Выбрать год'}
                        selectedValue={year}
                        width={'90%'}
                        fontSize={20}
                        onValueChange={(itemValue: string) => setYear(itemValue)}
                    >
                        {years.map(el =>
                            <Select.Item key={el} label={el}
                                         value={el}/>)}
                    </Select>
                    <Select
                        placeholder={'Выбрать квартал'}
                        selectedValue={quarter}
                        width={'90%'}
                        fontSize={20}
                        onValueChange={(itemValue: string) => setQuarter(itemValue)}
                    >
                        {quarters.map(el =>
                            <Select.Item key={el} label={el}
                                         value={el}/>)}
                    </Select>

                <StackedBarChart
                    data={data}
                    style={{borderRadius: 5}}
                    chartConfig={{
                        backgroundColor: "#e7e7e7",
                        backgroundGradientFrom: "#818181",
                        backgroundGradientTo: "#d9d9d9",
                        propsForVerticalLabels: {fontSize: 17},
                        decimalPlaces: 2, // optional, defaults to 2dp
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        style: {
                            borderRadius: 16,
                        },
                        propsForDots: {
                            r: "6",
                        }
                    }}
                    height={500}
                    barPercentage={10}
                    hideLegend={false}
                    width={Dimensions.get("window").width}/>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        rowGap: 30
    },
    regularFont: {
        textAlign: 'center',
        fontFamily: 'BebasNeue',
        fontSize: 22
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
    dropdownButton: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 8,
        width: '50%'
    },
    scrollViewContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 2,
        width: '90%',
        rowGap: 20,
        paddingTop: 50
    }
});

export default Stats;