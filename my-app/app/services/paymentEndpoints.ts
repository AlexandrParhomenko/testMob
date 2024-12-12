import { baseApi } from "./apiService";
import {
  EmployeePostType,
  GetEmployeeResponse, GetPaymentResponse, GetSalesResponse, PaymentPostType, SalesPostType, TrainingPlacesPostType
} from "../types/types";

export const paymentEndpoints = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPayments: builder.query<GetPaymentResponse, void>({
      query: () => ({
        url: "api/v1/payments/?skip=0&limit=50"
      }),
      transformResponse: (response: GetPaymentResponse) => {
        return {
          data: response.data
        };
      },
      providesTags: () => ["Payments"]
    }),
    getPaymentsByLeadId: builder.query<GetPaymentResponse, number>({
      query: (id) => ({
        url: `api/payments/leads/${id}`
      }),
      transformResponse: (response: GetPaymentResponse) => {
        return {
          data: response.data
        };
      },
      providesTags: () => ["Payments"]
    }),
    getSalesByLeadId: builder.query<GetSalesResponse, number>({
      query: (id) => ({
        url: `api/sales/leads/${id}`
      }),
      transformResponse: (response: GetSalesResponse) => {
        return {
          data: response.data
        };
      },
      providesTags: () => ["Sales"]
    }),
    setPayments: builder.mutation<PaymentPostType, PaymentPostType>({
      query: (payment) => ({
        url: "api/v1/payments/",
        method: "POST",
        body: payment.post
      }),
      invalidatesTags: ["Payments", "Sales", "Contracts"]
    }),
    updatePayments: builder.mutation<PaymentPostType, PaymentPostType>({
      query: (payment) => ({
        url: `api/v1/payments/${payment.id}`,
        method: "PUT",
        body: payment.post
      }),
      invalidatesTags: ["Payments"]
    }),
    deletePayments: builder.mutation<number, number>({
      query: (payment) => ({
        url: `api/PaymentDel/${payment}`,
        method: "DELETE"
      }),
      invalidatesTags: ["Payments"]
    }),
    getPaymentsByContractId: builder.query<GetPaymentResponse, number>({
      query: (id) => ({
        url: `api/v1/payments/contract/${id}`
      }),
      transformResponse: (response: GetPaymentResponse) => {
        return {
          data: response.data
        };
      },
      providesTags: () => ["Payments"]
    }),
    getSales: builder.query<GetSalesResponse, void>({
      query: () => ({
        url: "api/v1/sales/?skip=0&limit=50"
      }),
      transformResponse: (response: GetSalesResponse) => {
        return {
          data: response.data
        };
      },
      providesTags: () => ["Sales"]
    }),
    getSalesByContractId: builder.query<GetSalesResponse, number>({
      query: (id) => ({
        url: `api/v1/sales/contract/${id}`
      }),
      transformResponse: (response: GetSalesResponse) => {
        return {
          data: response.data
        };
      },
      providesTags: () => ["Sales"]
    }),
    setSales: builder.mutation<SalesPostType, SalesPostType>({
      query: (payment) => ({
        url: "api/v1/sales/",
        method: "POST",
        body: payment.post
      }),
      invalidatesTags: ["Sales", "Contracts"]
    }),
    updateSales: builder.mutation<SalesPostType, SalesPostType>({
      query: (payment) => ({
        url: `api/SaleUpdate/${payment.id}`,
        method: "PUT",
        body: payment.post
      }),
      invalidatesTags: ["Sales"]
    }),
    deleteSales: builder.mutation<number, number>({
      query: (payment) => ({
        url: `api/SaleDel/${payment}`,
        method: "DELETE"
      }),
      invalidatesTags: ["Sales"]
    })
  })
});

export const {
  useGetPaymentsQuery,
  useSetPaymentsMutation,
  useUpdatePaymentsMutation,
  useDeletePaymentsMutation,
  useGetSalesQuery,
  useLazyGetSalesQuery,
  useSetSalesMutation,
  useGetSalesByContractIdQuery,
  useLazyGetSalesByContractIdQuery,
  useGetPaymentsByContractIdQuery,
  useLazyGetPaymentsByContractIdQuery,
  useUpdateSalesMutation,
  useDeleteSalesMutation,
  useGetPaymentsByLeadIdQuery,
  useGetSalesByLeadIdQuery
} = paymentEndpoints;

