import {baseApi} from "./apiService";
import {
    ContractPostType,
    GetContractResponse, GetContractsResponse
} from "../types/types";

export const contractEndpoints = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getContracts: builder.query<GetContractsResponse, number>({
            query: (limit) => ({
                url: `api/v1/contracts/?skip=0&limit=${limit}`
            }),
            providesTags: () => ["Contracts"]
        }),
        getContract: builder.query<GetContractResponse, number>({
            query: (id) => ({
                url: `api/v1/contracts/${id}`
            }),
            providesTags: () => ["Contracts"]
        }),
        getContractsByLeadId: builder.query<GetContractsResponse, number>({
            query: (id) => ({
                url: `api/contracts/leads/${id}`
            }),
            transformResponse: (response: GetContractsResponse) => {
                return {
                    data: response.data
                };
            },
            providesTags: () => ["Contracts"]
        }),
        getContractsByGroupName: builder.query<GetContractsResponse, number>({
            query: (id) => ({
                url: `api/v1/training_groups/${id}/students/`
            }),
            transformResponse: (response: GetContractsResponse) => {
                return {
                    data: response.data
                };
            },
            providesTags: () => ["Contracts"]
        }),
        getContractsByMasterId: builder.query<GetContractsResponse, number>({
            query: (id) => ({
                url: `api/v1/contracts/master/${id}`
            }),
            providesTags: () => ["Contracts"]
        }),
        setContracts: builder.mutation<ContractPostType, ContractPostType>({
            query: (contract) => ({
                url: "api/v1/contracts/",
                method: 'POST',
                body: contract.post,
            }),
            invalidatesTags: [ 'Contracts' ]
        }),
        updateContracts: builder.mutation<ContractPostType, ContractPostType>({
            query: (contract) => ({
                url: `api/v1/contracts/${contract.id}`,
                method: 'PUT',
                body: contract.post,
            }),
            invalidatesTags: [ 'Contracts' ]
        }),
        deleteContracts: builder.mutation<number, number>({
            query: (contract) => ({
                url: `api/ContractDel/${contract}`,
                method: 'DELETE',
            }),
            invalidatesTags: [ 'Contracts' ]
        }),
    })
});

export const {
    useGetContractsQuery,
    useGetContractsByLeadIdQuery,
    useLazyGetContractsByLeadIdQuery,
    useLazyGetContractsByGroupNameQuery,
    useGetContractsByGroupNameQuery,
    useSetContractsMutation,
    useUpdateContractsMutation,
    useDeleteContractsMutation,
    useLazyGetContractQuery,
    useGetContractQuery,
    useGetContractsByMasterIdQuery
} = contractEndpoints;

