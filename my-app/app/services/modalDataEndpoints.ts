import { baseApi } from "./apiService";
import {
  BranchPostType,
  ControlPointsPostType,
  ControlPointsResponse, CounterAgentPostType,
  GetBranchesResponse,
  GetChannelsResponse, GetCounterAgentResponse, GetCounterAgentsResponse,
  GetJobTitleResponse, GetProductResponse,
  GetProductsResponse,
  GetTrainingProgramsResponse,
  HoursTypesPostType,
  HoursTypesResponse, PersonalCabinetPostType, Position,
  PositionsPostType,
  PositionsResponse, ProductPostType,
  StatusResponse,
  TrainingPlacesPostType,
  TrainingPlacesResponse,
  TrainingProgramsPostType,
  TrainingVehiclesPostType,
  TrainingVehiclesResponse
} from "../types/types";

export const userEndpoints = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    setPersonalCabinet: builder.mutation<PersonalCabinetPostType, PersonalCabinetPostType>({
      query: (userParams) => ({
        url: "api/v1/auth/register",
        method: 'POST',
        body: userParams,
      }),
      invalidatesTags: [ 'Contracts' ]
    }),
    getChannels: builder.query<GetChannelsResponse, void>({
      query: () => ({
        url: "api/v1/channels_attr_customers/",
      }),
      transformResponse: (response: GetChannelsResponse) => {
        return {
          data: response.data
        }
      },
    }),
    getStatuses: builder.query<StatusResponse, void>({
      query: () => ({
        url: "api/v1/statuses_clients/?skip=0&limit=50",
      }),
      transformResponse: (response: StatusResponse) => {
        return {
          data: response.data
        }
      },
    }),
    getBranches: builder.query<GetBranchesResponse, void>({
      query: () => ({
        url: "api/v1/branches/?skip=0&limit=50",
      }),
      transformResponse: (response: GetBranchesResponse) => {
        return {
          data: response.data
        }
      },
      providesTags: () => ["Branches"]
    }),
    setBranches: builder.mutation<BranchPostType, BranchPostType>({
      query: (userParams) => ({
        url: "api/v1/branches/",
        method: 'POST',
        body: userParams.post,
      }),
      invalidatesTags: [ 'Branches' ]
    }),
    updateBranches: builder.mutation<BranchPostType, BranchPostType>({
      query: (userParams) => ({
        url: `api/v1/branches/${userParams.id}`,
        method: 'PUT',
        body: userParams.post,
      }),
      invalidatesTags: [ 'Branches' ]
    }),
    deleteBranches: builder.mutation<number, number>({
      query: (hourTypeId) => ({
        url: `api/v1/branches/${hourTypeId}`,
        method: 'DELETE',
      }),
      invalidatesTags: [ 'Branches' ]
    }),
    getCounterAgents: builder.query<GetCounterAgentsResponse, void>({
      query: () => ({
        url: "api/v1/driving_schools/?skip=0&limit=50",
      }),
      transformResponse: (response: GetCounterAgentsResponse) => {
        return {
          data: response.data
        }
      },
      providesTags: () => ["Schools"]
    }),
    getCounterAgent: builder.query<GetCounterAgentResponse, number>({
      query: (id) => ({
        url: `api/v1/driving_schools/${id}`,
      }),
      transformResponse: (response: GetCounterAgentResponse) => {
        return {
          data: response.data
        }
      },
      providesTags: () => ["Schools"]
    }),
    setCounterAgents: builder.mutation<CounterAgentPostType, CounterAgentPostType>({
      query: (userParams) => ({
        url: "api/v1/driving_schools/",
        method: 'POST',
        body: userParams.post,
      }),
      invalidatesTags: [ 'Schools' ]
    }),
    updateCounterAgents: builder.mutation<CounterAgentPostType, CounterAgentPostType>({
      query: (userParams) => ({
        url: `api/v1/driving_schools/${userParams.id}`,
        method: 'PUT',
        body: userParams.post,
      }),
      invalidatesTags: [ 'Schools' ]
    }),
    deleteCounterAgents: builder.mutation<number, number>({
      query: (hourTypeId) => ({
        url: `api/v1/driving_schools/${hourTypeId}`,
        method: 'DELETE',
      }),
      invalidatesTags: [ 'Schools' ]
    }),
    getProducts: builder.query<GetProductsResponse, void>({
      query: () => ({
        url: "api/v1/products/?skip=0&limit=50",
      }),
      transformResponse: (response: GetProductsResponse) => {
        return {
          data: response.data
        }
      },
      providesTags: () => ["Products"]
    }),
    getProduct: builder.query<GetProductResponse, void>({
      query: (id) => ({
        url: `api/v1/products/${id}`,
      }),
      transformResponse: (response: GetProductResponse) => {
        return {
          data: response.data
        }
      },
      providesTags: () => ["Products"]
    }),
    setProducts: builder.mutation<ProductPostType, ProductPostType>({
      query: (userParams) => ({
        url: "api/v1/products/",
        method: 'POST',
        body: userParams.post,
      }),
      invalidatesTags: [ 'Products' ]
    }),
    updateProducts: builder.mutation<ProductPostType, ProductPostType>({
      query: (userParams) => ({
        url: `api/v1/products/${userParams.id}`,
        method: 'PUT',
        body: userParams.post,
      }),
      invalidatesTags: [ 'Products' ]
    }),
    deleteProducts: builder.mutation<number, number>({
      query: (hourTypeId) => ({
        url: `api/v1/products/${hourTypeId}`,
        method: 'DELETE',
      }),
      invalidatesTags: [ 'Products' ]
    }),
    getJobTitle: builder.query<GetJobTitleResponse, void>({
      query: () => ({
        url: "api/positions",
      }),
      transformResponse: (response: GetJobTitleResponse) => {
        return {
          data: response.data
        }
      },
    }),
    getControlPoints: builder.query<ControlPointsResponse, void>({
      query: () => ({
        url: "api/v1/control_points/?skip=0&limit=50",
      }),
      transformResponse: (response: ControlPointsResponse) => {
        return {
          data: response.data
        }
      },
      providesTags: () => ["ControlPoints"]
    }),
    setControlPoints: builder.mutation<ControlPointsPostType, ControlPointsPostType>({
      query: (userParams) => ({
        url: "api/v1/control_points/",
        method: 'POST',
        body: userParams.post,
      }),
      invalidatesTags: [ 'ControlPoints' ]
    }),
    updateControlPoints: builder.mutation<ControlPointsPostType, ControlPointsPostType>({
      query: (userParams) => ({
        url: `api/v1/control_points/${userParams.id}`,
        method: 'PUT',
        body: userParams.post,
      }),
      invalidatesTags: [ 'ControlPoints' ]
    }),
    deleteControlPoints: builder.mutation<number, number>({
      query: (hourTypeId) => ({
        url: `api/v1/control_points/${hourTypeId}`,
        method: 'DELETE',
      }),
      invalidatesTags: [ 'ControlPoints' ]
    }),
    getTrainingPrograms: builder.query<GetTrainingProgramsResponse, void>({
      query: () => ({
        url: "api/v1/training_programs/?skip=0&limit=50",
      }),
      transformResponse: (response: GetTrainingProgramsResponse) => {
        return {
          data: response.data
        }
      },
      providesTags: () => ["TrainingPrograms"]
    }),
    setTrainingPrograms: builder.mutation<TrainingProgramsPostType, TrainingProgramsPostType>({
      query: (userParams) => ({
        url: "api/v1/training_programs/",
        method: 'POST',
        body: userParams.post,
      }),
      invalidatesTags: [ 'TrainingPrograms' ]
    }),
    updateTrainingPrograms: builder.mutation<TrainingProgramsPostType, TrainingProgramsPostType>({
      query: (userParams) => ({
        url: `api/v1/training_programs/${userParams.id}`,
        method: 'PUT',
        body: userParams.post,
      }),
      invalidatesTags: [ 'TrainingPrograms' ]
    }),
    deleteTrainingPrograms: builder.mutation<number, number>({
      query: (hourTypeId) => ({
        url: `api/v1/training_programs/${hourTypeId}`,
        method: 'DELETE',
      }),
      invalidatesTags: [ 'TrainingPrograms' ]
    }),
    getTrainingVehicles: builder.query<TrainingVehiclesResponse, void>({
      query: () => ({
        url: "api/v1/training_vehicles/?skip=0&limit=50",
      }),
      transformResponse: (response: TrainingVehiclesResponse) => {
        return {
          data: response.data
        }
      },
      providesTags: () => ["TrainingVehicles"]
    }),
    setTrainingVehicles: builder.mutation<TrainingVehiclesPostType, TrainingVehiclesPostType>({
      query: (userParams) => ({
        url: "api/v1/training_vehicles/",
        method: 'POST',
        body: userParams.post,
      }),
      invalidatesTags: [ 'TrainingVehicles' ]
    }),
    updateTrainingVehicles: builder.mutation<TrainingVehiclesPostType, TrainingVehiclesPostType>({
      query: (userParams) => ({
        url: `api/v1/training_vehicles/${userParams.id}`,
        method: 'PUT',
        body: userParams.post,
      }),
      invalidatesTags: [ 'TrainingVehicles' ]
    }),
    deleteTrainingVehicles: builder.mutation<number, number>({
      query: (hourTypeId) => ({
        url: `api/v1/training_vehicles/${hourTypeId}`,
        method: 'DELETE',
      }),
      invalidatesTags: [ 'TrainingVehicles' ]
    }),
    getHoursTypes: builder.query<HoursTypesResponse, void>({
      query: () => ({
        url: "api/v1/types_study_hours/?skip=0&limit=50",
      }),
      transformResponse: (response: HoursTypesResponse) => {
        return {
          data: response.data
        }
      },
      providesTags: () => ["HoursTypes"]
    }),
    setHoursTypes: builder.mutation<HoursTypesPostType, HoursTypesPostType>({
      query: (userParams) => ({
        url: "api/v1/types_study_hours/",
        method: 'POST',
        body: userParams.post,
      }),
      invalidatesTags: [ 'HoursTypes' ]
    }),
    updateHoursTypes: builder.mutation<HoursTypesPostType, HoursTypesPostType>({
      query: (userParams) => ({
        url: `api/v1/types_study_hours/${userParams.id}`,
        method: 'PUT',
        body: userParams.post,
      }),
      invalidatesTags: [ 'HoursTypes' ]
    }),
    deleteHoursTypes: builder.mutation<number, number>({
      query: (hourTypeId) => ({
        url: `api/v1/types_study_hours/${hourTypeId}`,
        method: 'DELETE',
      }),
      invalidatesTags: [ 'HoursTypes' ]
    }),
    getTrainingPlaces: builder.query<TrainingPlacesResponse, void>({
      query: () => ({
        url: "api/v1/training_places/?skip=0&limit=50",
      }),
      transformResponse: (response: TrainingPlacesResponse) => {
        return {
          data: response.data
        }
      },
      providesTags: () => ["TrainingPlaces"]
    }),
    setTrainingPlaces: builder.mutation<TrainingPlacesPostType, TrainingPlacesPostType>({
      query: (userParams) => ({
        url: "api/v1/training_places/",
        method: 'POST',
        body: userParams.post,
      }),
      invalidatesTags: [ 'TrainingPlaces' ]
    }),
    updateTrainingPlaces: builder.mutation<TrainingPlacesPostType, TrainingPlacesPostType>({
      query: (userParams) => ({
        url: `api/v1/training_places/${userParams.id}`,
        method: 'PUT',
        body: userParams.post,
      }),
      invalidatesTags: [ 'TrainingPlaces' ]
    }),
    deleteTrainingPlaces: builder.mutation<number, number>({
      query: (hourTypeId) => ({
        url: `api/v1/training_places/${hourTypeId}`,
        method: 'DELETE',
      }),
      invalidatesTags: [ 'TrainingPlaces' ]
    }),
    getPositions: builder.query<PositionsResponse, void>({
      query: () => ({
        url: "api/v1/positions/?skip=0&limit=50",
      }),
      transformResponse: (response: Position[]) => {
        return {
          data: response
        }
      },
      providesTags: () => ["Positions"]
    }),
    setPositions: builder.mutation<PositionsPostType, PositionsPostType>({
      query: (userParams) => ({
        url: "api/v1/positions/",
        method: 'POST',
        body: userParams.post,
      }),
      invalidatesTags: [ 'Positions' ]
    }),
    updatePositions: builder.mutation<PositionsPostType, PositionsPostType>({
      query: (userParams) => ({
        url: `api/v1/positions/${userParams.id}`,
        method: 'PUT',
        body: userParams.post,
      }),
      invalidatesTags: [ 'Positions' ]
    }),
    deletePositions: builder.mutation<number, number>({
      query: (hourTypeId) => ({
        url: `api/v1/positions/${hourTypeId}`,
        method: 'DELETE',
      }),
      invalidatesTags: [ 'Positions' ]
    }),
    getYandexMapApi: builder.query<any, void>({
      query: () => ({
        url: `https://suggest-maps.yandex.ru/v1/suggest?apikey=ad5c78a1-4c56-4d90-8c51-2615c020402d&text=андрианова`,
      }),
      transformResponse: (response: any) => {
        return {
          data: response
        }
      },
    }),
  })
});

export const {
  useGetChannelsQuery,
  useGetBranchesQuery,
  useSetBranchesMutation,
  useUpdateBranchesMutation,
  useDeleteBranchesMutation,
  useGetProductsQuery,
  useLazyGetProductsQuery,
  useSetProductsMutation,
  useUpdateProductsMutation,
  useDeleteProductsMutation,
  useGetJobTitleQuery,
  useGetControlPointsQuery,
  useSetControlPointsMutation,
  useUpdateControlPointsMutation,
  useDeleteControlPointsMutation,
  useGetTrainingProgramsQuery,
  useSetTrainingProgramsMutation,
  useUpdateTrainingProgramsMutation,
  useDeleteTrainingProgramsMutation,
  useGetTrainingVehiclesQuery,
  useSetTrainingVehiclesMutation,
  useUpdateTrainingVehiclesMutation,
  useDeleteTrainingVehiclesMutation,
  useGetHoursTypesQuery,
  useSetHoursTypesMutation,
  useUpdateHoursTypesMutation,
  useDeleteHoursTypesMutation,
  useGetTrainingPlacesQuery,
  useSetTrainingPlacesMutation,
  useUpdateTrainingPlacesMutation,
  useDeleteTrainingPlacesMutation,
  useGetPositionsQuery,
  useSetPositionsMutation,
  useUpdatePositionsMutation,
  useDeletePositionsMutation,
  useGetYandexMapApiQuery,
  useSetPersonalCabinetMutation,
  useGetStatusesQuery,
  useGetCounterAgentsQuery,
  useGetCounterAgentQuery,
  useSetCounterAgentsMutation,
  useUpdateCounterAgentsMutation,
  useDeleteCounterAgentsMutation,
} = userEndpoints;

