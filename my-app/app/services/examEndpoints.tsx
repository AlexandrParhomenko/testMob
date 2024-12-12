import {baseApi} from "./apiService";
import {
    Attempt,
    ContractControlPoint,
    EmployeePostType,
    ExamQuestionType,
    GetActiveCP,
    GetTestingMethod,
    GetTrainingStageItemMaterialResponse,
    GetTrainingStageItemResponse, PostActiveControlPoint,
    PostActiveCP,
    PostAttempt, PostVideoProgress, VideoProgress
} from "../types/types";

export const employeeEndpoints = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getActiveControlPoints: builder.query<GetActiveCP, PostActiveCP>({
            query: (contract) => ({
                url: `api/v1/contracts_control_points/${contract.contract_id}/${contract.status}/control_points`
            }),
            transformResponse: (response: GetActiveCP) => {
                return {
                    data: response.data
                };
            },
            providesTags: ["ActiveCP"]
        }),
        getFilteredAttempts: builder.query<{ data: Attempt[] }, { contract_id: number, at_status: number }>({
            query: (data) => ({
                url: `api/v1/attempts/contract/${data.contract_id}${data.at_status ? `?at_status=${data.at_status}` : ""}`
            }),
            providesTags: ["FilteredAttempts"]
        }),
        putActiveControlPoint: builder.mutation<ContractControlPoint, ContractControlPoint>({
            query: (attempt) => ({
                url: `api/v1/contracts_control_points/${attempt.contract_id}/${attempt.control_point_id}/${attempt.attempt_num}`,
                method: 'PUT',
                body: attempt,
            }),
            invalidatesTags: ['Attempts']
        }),
        getUserProgress: builder.query<{ data: VideoProgress[] }, number>({
            query: (contract_id) => ({
                url: `api/v1/progress_time/contract/${contract_id}`
            }),
            providesTags: ["FilteredAttempts"]
        }),
        putUserProgress: builder.mutation<PostVideoProgress, PostVideoProgress>({
            query: (data) => ({
                url: `api/v1/progress_time/${data.id}`,
                method: 'PUT',
                body: data.post,
            }),
            invalidatesTags: ['VideoProgress']
        }),
        setUserProgress: builder.mutation<PostVideoProgress, PostVideoProgress>({
            query: (data) => ({
                url: `api/v1/progress_time/`,
                method: 'POST',
                body: data.post,
            }),
            invalidatesTags: ['VideoProgress']
        }),
        getTrainingStages: builder.query<GetTrainingStageItemResponse, number>({
            query: (method_id) => ({
                url: `api/v1/training_stages/method/${method_id}`
            }),
            transformResponse: (response: GetTrainingStageItemResponse) => {
                return {
                    data: response.data
                };
            },
            providesTags: () => ["TrainingStage"]
        }),
        getTrainingMethodLibItems: builder.query<GetTrainingStageItemMaterialResponse, number>({
            query: (method_id) => ({
                url: `api/v1/training_methods__library_item/${method_id}`
            }),
            transformResponse: (response: GetTrainingStageItemMaterialResponse) => {
                return {
                    data: response.data
                };
            },
            providesTags: () => ["TrainingMethodLibItems"]
        }),
        getTrainingStageLibItems: builder.query<GetTrainingStageItemMaterialResponse, number>({
            query: (stage_id) => ({
                url: `api/v1/tr_stages__lib_item/${stage_id}`
            }),
            transformResponse: (response: GetTrainingStageItemMaterialResponse) => {
                return {
                    data: response.data
                };
            },
        }),
        getTestingMethod: builder.query<GetTestingMethod, number>({
            query: (method_id) => ({
                url: `api/v1/testing_methods/${method_id}`
            }),
        }),
        getExamQuestions: builder.query<ExamQuestionType[], { pack_id: number, limit: number }>({
            query: (data) => ({
                url: `api/v1/card_questions/random_questions/${data.pack_id}?limit=${data.limit}`
            }),
        }),
        setAttempt: builder.mutation<Attempt, PostAttempt>({
            query: (attempt) => ({
                url: "api/v1/attempts/",
                method: 'POST',
                body: attempt.post,
            }),
            invalidatesTags: ['Attempts', "ActiveCP", "FilteredAttempts"]
        }),
        putAttempt: builder.mutation<PostAttempt, PostAttempt>({
            query: (attempt) => ({
                url: `api/v1/attempts/${attempt.id}`,
                method: 'PUT',
                body: attempt.post,
            }),
            invalidatesTags: ['Attempts', "ActiveCP", "FilteredAttempts"]
        }),
    })
});

export const {
    useGetActiveControlPointsQuery,
    useLazyGetTrainingStagesQuery,
    useGetTrainingMethodLibItemsQuery,
    useLazyGetTrainingMethodLibItemsQuery,
    useGetTrainingStageLibItemsQuery,
    useGetTestingMethodQuery,
    useLazyGetExamQuestionsQuery,
    useSetAttemptMutation,
    usePutActiveControlPointMutation,
    useGetFilteredAttemptsQuery,
    usePutAttemptMutation,
    useGetUserProgressQuery,
    useSetUserProgressMutation,
    usePutUserProgressMutation
} = employeeEndpoints;

