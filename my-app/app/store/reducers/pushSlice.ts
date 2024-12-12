import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface PushItem {
    push: string
}

const initialState: PushItem = {
    push: ""
};

export const pushSlice = createSlice({
    name: "push",
    initialState,
    reducers: {
        setPush(state, action) {
            state.push = action.payload
        }
    }
});

export const { setPush } = pushSlice.actions;

export const selectPush = (state: RootState) => state.push.push;

export default pushSlice.reducer;