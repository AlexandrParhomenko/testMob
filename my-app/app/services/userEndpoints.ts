import { baseApi } from "./apiService";
import {
  GetAvatarResponse, GetAvatarsQueryData,
  GetAvatarsResponse,
  GetLeadChatResponse, GetLeadResponse,
  GetLeadsResponse, GetVassalResponse, LeadChatPostType, LeadsPostResponseBody,
  LeadsPostType, LeadsType, PostAvatars, TableLeadsType, VassalPostType
} from "../types/types";

export const userEndpoints = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserAvatar: builder.query<GetAvatarsResponse, GetAvatarsQueryData>({
      query: (data) => ({
        url: `api/v1/avatars/${data.entity}/${data.entity_id}`
      }),
      transformResponse: (response: GetAvatarsResponse) => {
        return {
          data: response.data
        };
      },
      providesTags: () => ["Avatar"]
    }),
    setUsersAvatars: builder.mutation<PostAvatars, PostAvatars>({
      query: (data) => ({
        url: `api/AvatarUpload?lead_id=${data.id}`,
        method: "POST",
        body: data.file
      }),
      invalidatesTags: ["Avatar"]
    }),
    getUsers: builder.query<GetLeadsResponse, number>({
      query: (limit: number) => ({
        url: `api/v1/leads/?skip=0&limit=${limit}`
      }),
      transformResponse: (response: GetLeadsResponse) => {
        return {
          data: response.data
        };
      },
      providesTags: () => ["Users"]
    }),
    getUser: builder.query<GetLeadResponse, number>({
      query: (id) => ({
        url: `api/v1/leads/${id}`
      }),
      transformResponse: (response: GetLeadResponse) => {
        return {
          data: response.data
        };
      },
      providesTags: () => ["Users"]
    }),
    setUsers: builder.mutation<LeadsPostResponseBody, LeadsPostType>({
      query: (userParams) => ({
        url: "api/v1/leads/",
        method: "POST",
        body: userParams.post
      }),
      invalidatesTags: ["Users"]
    }),
    updateUsers: builder.mutation<LeadsPostType, LeadsPostType>({
      query: (userParams) => ({
        url: `api/v1/leads/${userParams.lead_id}`,
        method: "PUT",
        body: userParams.post
      }),
      invalidatesTags: ["Users", "Contracts"]
    }),
    deleteUsers: builder.mutation<number, number>({
      query: (id) => ({
        url: `api/v1/leads/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["Users"]
    }),
    getLeadChat: builder.query<GetLeadChatResponse, number>({
      query: (id: number) => ({
        url: `api/v1/lead_communication/${id}`
      }),
      transformResponse: (response: GetLeadChatResponse) => {
        return {
          data: response.data
        };
      },
      providesTags: () => ["UserMessages"]
    }),
    setLeadChat: builder.mutation<LeadChatPostType, LeadChatPostType>({
      query: (userParams) => ({
        url: "api/v1/lead_communication/",
        method: "POST",
        body: userParams.post
      }),
      invalidatesTags: ["UserMessages"]
    }),
    updateLeadChat: builder.mutation<LeadChatPostType, LeadChatPostType>({
      query: (userParams) => ({
        url: `api/v1/lead_communication/${userParams.id}`,
        method: "PUT",
        body: userParams.post
      }),
      invalidatesTags: ["UserMessages"]
    }),
    deleteLeadChat: builder.mutation<number, number>({
      query: (userParams) => ({
        url: `api/v1/lead_communication/message/${userParams}`,
        method: "DELETE"
      }),
      invalidatesTags: ["UserMessages"]
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useLazyGetUserQuery,
  useSetUsersMutation,
  useUpdateUsersMutation,
  useDeleteUsersMutation,
  useGetLeadChatQuery,
  useLazyGetLeadChatQuery,
  useSetLeadChatMutation,
  useUpdateLeadChatMutation,
  useDeleteLeadChatMutation,
  useGetUserAvatarQuery,
  useLazyGetUserAvatarQuery,
  useSetUsersAvatarsMutation,
} = userEndpoints;

