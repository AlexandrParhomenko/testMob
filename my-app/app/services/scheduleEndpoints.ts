import {baseApi} from "./apiService";
import {
    EmptySlotPost, GetEmptyPracticeByIdResponse, GetPracticeByIdResponse,
    GetPracticeResponse, PracticePostType, PracticePutType, SalesPostType
} from "../types/types";

export const groupsEndpoints = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getPracticeSchedule: builder.query<GetPracticeResponse, void>({
            query: () => ({
                url: "api/v1/driving_classes/?skip=0&limit=50"
            }),
            transformResponse: (response: GetPracticeResponse) => {
                return {
                    data: response.data
                };
            },
            providesTags: () => ["drivingСlasses"]
        }),
        getPracticeScheduleById: builder.query<GetPracticeByIdResponse, number>({
            query: (id) => ({
                url: `api/v1/driving_classes/${id}`
            }),
            transformResponse: (response: GetPracticeByIdResponse) => {
                return {
                    data: response.data
                };
            },
        }),
        getPracticeScheduleJournal: builder.query<GetPracticeResponse, number>({
            query: (id) => ({
                url: `api/v1/driving_classes/dr_hours_history/${id}`
            }),
            transformResponse: (response: GetPracticeResponse) => {
                return {
                    data: response.data
                };
            },
            providesTags: () => ["drivingСlasses"]
        }),
        setPracticeSchedule: builder.mutation<PracticePostType, PracticePostType>({
            query: (schedule) => ({
                url: "api/v1/driving_classes/",
                method: "POST",
                body: schedule.post
            }),
            invalidatesTags: ["Slots"]
        }),
        updatePracticeSchedule: builder.mutation<PracticePutType, PracticePutType>({
            query: (schedule) => ({
                url: `api/v1/driving_classes/${schedule.id}`,
                method: "PUT",
                body: schedule.post
            }),
            invalidatesTags: ["drivingСlasses"]
        }),
        deletePracticeSchedule: builder.mutation<number, number>({
            query: (schedule) => ({
                url: `api/v1/driving_classes/${schedule}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Slots"]
        }),
        getEmptyPracticeSchedule: builder.query<GetPracticeResponse, void>({
            query: () => ({
                url: "api/v1/driving_sessions/?skip=0&limit=50"
            }),
            transformResponse: (response: GetPracticeResponse) => {
                return {
                    data: response.data
                };
            },
            providesTags: () => ["drivingSessions"]
        }),
        getEmptyPracticeScheduleById: builder.query<GetEmptyPracticeByIdResponse, number>({
            query: (id) => ({
                url: `api/v1/driving_sessions/${id}`
            }),
            transformResponse: (response: GetEmptyPracticeByIdResponse) => {
                return {
                    data: response.data
                };
            },
        }),
        setEmptyPracticeSchedule: builder.mutation<EmptySlotPost, EmptySlotPost>({
            query: (schedule) => ({
                url: "api/v1/driving_sessions/",
                method: "POST",
                body: schedule.post
            }),
            invalidatesTags: ["Slots"]
        }),
        updateEmptyPracticeSchedule: builder.mutation<EmptySlotPost, EmptySlotPost>({
            query: (schedule) => ({
                url: `api/v1/driving_sessions/${schedule.id}`,
                method: "PUT",
                body: schedule.post
            }),
            invalidatesTags: ["Slots"]
        }),
        deleteEmptyPracticeSchedule: builder.mutation<number, number>({
            query: (schedule) => ({
                url: `api/v1/driving_sessions/${schedule}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Slots"]
        }),
    })
});

export const {
    useGetPracticeScheduleByIdQuery,
    useGetPracticeScheduleQuery,
    useSetPracticeScheduleMutation,
    useUpdatePracticeScheduleMutation,
    useDeletePracticeScheduleMutation,
    useLazyGetPracticeScheduleJournalQuery,
    useGetPracticeScheduleJournalQuery,
    useGetEmptyPracticeScheduleQuery,
    useSetEmptyPracticeScheduleMutation,
    useUpdateEmptyPracticeScheduleMutation,
    useDeleteEmptyPracticeScheduleMutation,
    useGetEmptyPracticeScheduleByIdQuery,
} = groupsEndpoints;

