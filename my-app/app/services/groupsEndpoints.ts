import { baseApi } from "./apiService";
import {
  GetGroupResponse, GetGroupsResponse, GroupPostType
} from "../types/types";

export const groupsEndpoints = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getGroups: builder.query<GetGroupsResponse, void>({
      query: () => ({
        url: "api/v1/training_groups/?skip=0&limit=50"
      }),
      transformResponse: (response: GetGroupsResponse) => {
        return {
          data: response.data
        };
      },
      providesTags: () => ["TrainingGroups"]
    }),
    getGroupsBySearch: builder.query<GetGroupsResponse, string>({
      query: (query) => ({
        url: `api/v1/training_groups/search/${query}`
      }),
      transformResponse: (response: GetGroupsResponse) => {
        return {
          data: response.data
        };
      },
      providesTags: () => ["TrainingGroups"]
    }),
    getGroup: builder.query<GetGroupResponse, number>({
      query: (id) => ({
        url: `api/v1/training_groups/${id}`
      }),
      transformResponse: (response: GetGroupResponse) => {
        return {
          data: response.data
        };
      },
      providesTags: () => ["TrainingGroups"]
    }),
    setGroups: builder.mutation<GroupPostType, GroupPostType>({
      query: (employeeParams) => ({
        url: "api/v1/training_groups/",
        method: "POST",
        body: employeeParams.post
      }),
      invalidatesTags: ["TrainingGroups"]
    }),
    updateGroups: builder.mutation<GroupPostType, GroupPostType>({
      query: (userParams) => ({
        url: `api/v1/training_groups/${userParams.id}`,
        method: "PUT",
        body: userParams.post
      }),
      invalidatesTags: ["TrainingGroups"]
    }),
    deleteGroups: builder.mutation<number, number>({
      query: (hourTypeId) => ({
        url: `api/v1/training_groups/${hourTypeId}`,
        method: "DELETE"
      }),
      invalidatesTags: ["TrainingGroups"]
    })
  })
});

export const {
  useGetGroupsQuery,
  useLazyGetGroupQuery,
  useSetGroupsMutation,
  useUpdateGroupsMutation,
  useDeleteGroupsMutation,
  useGetGroupsBySearchQuery
} = groupsEndpoints;

