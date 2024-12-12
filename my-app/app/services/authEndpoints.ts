import { baseApi } from "./apiService";
import {
  AuthPostType,
  ContractPostType,
  GetEmployeeResponse,
  GetPracticeScheduleSlotsQuery,
  GetPracticeScheduleSlotsSearchQueryResponse,
  GetSearchResponse,
  Login,
  LoginResponse
} from "../types/types";
import {FetchBaseQueryError} from "@reduxjs/toolkit/query";

export const authEndpoints = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    setAuth: builder.mutation<LoginResponse | FetchBaseQueryError, FormData>({
      query: (contract) => ({
        url: "api/v1/auth/jwt/login",
        method: 'POST',
        body: contract,
      }),
      transformResponse: (response: { data: Login[] }) => {
        return {
          data: response
        };
      },
    }),
    getPracticeScheduleSlots: builder.query<GetPracticeScheduleSlotsSearchQueryResponse, GetPracticeScheduleSlotsQuery>({
      query: (data) => ({
        url: `api/v1/search/lesson?start_date=${data.start_date}&end_date=${data.end_date}&id_master=${data.master_id}`
      }),
      transformResponse: (response: GetPracticeScheduleSlotsSearchQueryResponse) => {
        return {
          data: response.data
        };
      },
      providesTags: () => ["Slots"]
    }),
    getGlobalSearchResults: builder.query<GetSearchResponse, string>({
      query: (query) => ({
        url: `api/v1/search/?search_field=${query}`
      }),
      transformResponse: (response: GetSearchResponse) => {
        return {
          data: response.data
        };
      },
    }),
  }),
});

export const {
  useSetAuthMutation,
  useLazyGetPracticeScheduleSlotsQuery,
  useGetGlobalSearchResultsQuery,
  useLazyGetGlobalSearchResultsQuery
} = authEndpoints;

