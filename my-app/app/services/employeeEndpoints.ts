import { baseApi } from "./apiService";
import {
  EmployeePostType, GetEmployee, GetEmployeeByPosIdResponse,
  GetEmployeeResponse
} from "../types/types";

export const employeeEndpoints = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEmployees: builder.query<GetEmployeeResponse, void>({
      query: () => ({
        url: "api/v1/employees/?skip=0&limit=50"
      }),
      transformResponse: (response: GetEmployeeResponse) => {
        return {
          data: response.data
        };
      },
      providesTags: () => ["Employees"]
    }),
    getEmployee: builder.query<GetEmployee, number>({
      query: (id) => ({
        url: `api/v1/employees/${id}`
      }),
      transformResponse: (response: GetEmployee) => {
        return {
          data: response.data
        };
      },
      providesTags: () => ["Employees"]
    }),
    getEmployeesByPositionId: builder.query<GetEmployeeByPosIdResponse, number>({
      query: (id) => ({
        url: `api/v1/employees_positions/${id}`
      }),
      transformResponse: (response: GetEmployeeByPosIdResponse) => {
        return {
          data: response.data
        };
      },
      providesTags: () => ["Employees"]
    }),
    setEmployees: builder.mutation<EmployeePostType, EmployeePostType>({
      query: (employeeParams) => ({
        url: "api/v1/employees/",
        method: 'POST',
        body: employeeParams.post,
      }),
      invalidatesTags: [ 'Employees' ]
    }),
    updateEmployees: builder.mutation<EmployeePostType, EmployeePostType>({
      query: (userParams) => ({
        url: `api/v1/employees/${userParams.id}`,
        method: 'PUT',
        body: userParams.post,
      }),
      invalidatesTags: [ 'Employees' ]
    }),
    deleteEmployees: builder.mutation<number, number>({
      query: (hourTypeId) => ({
        url: `api/v1/employees/${hourTypeId}`,
        method: 'DELETE',
      }),
      invalidatesTags: [ 'Employees' ]
    }),
  })
});

export const {
  useGetEmployeesQuery,
  useGetEmployeesByPositionIdQuery,
  useSetEmployeesMutation,
  useUpdateEmployeesMutation,
  useDeleteEmployeesMutation,
  useLazyGetEmployeeQuery,
  useGetEmployeeQuery
} = employeeEndpoints;

