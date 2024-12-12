import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  prepareHeaders: async headers => {
    const user = await AsyncStorage.getItem('currentUser').then(res => JSON.parse(res || ''));
    if (user) {
      headers.set('Authorization', `Bearer ${user.access_token}`);
    }
    return headers;
  }
});

export const baseApi = createApi({
  baseQuery,
  endpoints: () => ({}),
  tagTypes: [
    "Contracts",
    "Users",
    "Employees",
    "TrainingPrograms",
    "ControlPoints",
    "TrainingVehicles",
    "HoursTypes",
    "TrainingPlaces",
    "Positions",
    "Branches",
    "FilteredAttempts",
    "VideoProgress",
    "Products",
    "Schools",
    "TrainingGroups",
    "Vassals",
    "Payments",
    "Sales",
    "drivingСlasses",
    "Avatar",
    "Auth",
    "UserMessages",
    "drivingSessions",
    "TrainingStage",
    "TrainingMethodLibItems",
    "Attempts",
    "ActiveCP",
    "Slots"
  ]
});


