import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface ThemeItem {
    color: string
}

const initialState: ThemeItem = {
    color: 'light'
};

export const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        setColor(state, action) {
            state.color = action.payload
        }
    }
});

export const { setColor } = themeSlice.actions;

export const selectColor = (state: RootState) => state.theme.color;

export default themeSlice.reducer;