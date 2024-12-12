import { configureStore, ThunkAction, Action, combineReducers } from "@reduxjs/toolkit";
import { authSlice } from "./reducers/authSlice";
import { baseApi } from "../services/apiService";
import {themeSlice} from "./reducers/themeSlice";
import {roleSlice} from "./reducers/roleSlice";
import {pushSlice} from "./reducers/pushSlice";


const rootReducer = combineReducers({
  [authSlice.name]: authSlice.reducer,
  [pushSlice.name]: pushSlice.reducer,
  [roleSlice.name]: roleSlice.reducer,
  [themeSlice.name]: themeSlice.reducer,
  [baseApi.reducerPath]: baseApi.reducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware)
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
