import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import {Login, SelectedLogin} from "../../types/types";

interface UserNameItem {
  account: SelectedLogin
}

const initialState: UserNameItem = {
  account: {
    email: '',
    access_token: "",
    password: '',
    id_reg: 0,
    username: '',
    role_id: 1,
    user_id: 0,
    dr_school_id: 0,
    idx: 0
  }
};

export const authSlice = createSlice({
  name: "pickedAccount",
  initialState,
  reducers: {
    setPickedAccount(state, action) {
      state.account = action.payload
    }
  }
});

export const { setPickedAccount } = authSlice.actions;

export const selectPickedAccount = (state: RootState) => state.pickedAccount.account;

export default authSlice.reducer;