import React, {FC} from 'react';
import ThemesWindow from "../../../../components/ThemesWindow/ThemesWindow";

interface IThemes {
    onClose: Function
}

const Themes: FC<IThemes> = ({onClose}) => {

    return (
        <ThemesWindow onClose={onClose}/>
    );
};


export default Themes;