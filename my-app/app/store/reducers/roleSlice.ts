import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface RoleItem {
    role: number
}

const initialState: RoleItem = {
    role: 1
};

export const roleSlice = createSlice({
    name: "role",
    initialState,
    reducers: {
        setRole(state, action) {
            state.role = action.payload
        }
    }
});

export const { setRole } = roleSlice.actions;

export const selectRole = (state: RootState) => state.role.role;

export default roleSlice.reducer;