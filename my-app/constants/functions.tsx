import {Dimensions} from "react-native";
import {Answer, Participants} from "../app/types/types";

let windowWidth = Dimensions.get('window').width;
let scrollBoxWidth = (windowWidth - 20) / 33.5
let scrollBoxPercentage = scrollBoxWidth / 4 * 33.5

export const transitionHandler = (num: number) => {
    return scrollBoxPercentage + ((num - Math.trunc(scrollBoxWidth - 2)) * 35)
}

export const countMistakes = (answers: any[]) => {
    let ans = 0
    answers.forEach(el => !el.is_correct || !el.card_answ_is_correct ? ans++ : '')
    return ans
}


export const deleteElFromArray = (str: string, entArr: Participants[]) => {
    let arr = entArr.map(el => el.name)
    return arr.indexOf(str)
}

export const getAbbreName = (fullName: string) => {
    let name = fullName.split(" ");
    return `${name[0]} ${name[1][0]}. ${name[2][0]}.`;
};