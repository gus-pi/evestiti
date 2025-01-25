import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseUrl } from "../../../utils/baseURL";

const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${getBaseUrl()}/api/auth`,
        credentials: 'include'
    }),
    tagTypes: ['User'],
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (newUser) => ({
                url: '/register',
                method: 'POST',
                body: newUser
            })
        }),
        loginUser: builder.mutation({
            query: (credentials) => ({
                url: '/login',
                method: 'POST',
                body: credentials
            })
        }),
        logoutUser: builder.mutation({
            query: () => ({
                url: '/logout',
                method: 'DELETE'
            })
        }),
        getUsers: builder.mutation({
            query: () => ({
                url: '/users',
                method: 'GET'
            }),
            invalidatesTags: ["User"],
        }),
        deleteUser: builder.mutation({
            query: (userId) => ({
                url: `/users/${userId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ["User"],
        }),
        updateUserRole: builder.mutation({
            query: ({ userId, role }) => ({
                url: `/users/${userId}`,
                method: 'PUT',
                body: { role }
            }),
            invalidatesTags: ["User"],
        }),
        editProfile: builder.mutation({
            query: (profileData) => ({
                url: 'edit-profile',
                method: 'PATCH',
                body: profileData
            }),
            invalidatesTags: ["User"],
        }),
    })

})

export const { useRegisterUserMutation, useLoginUserMutation, useLogoutUserMutation, useGetUsersMutation, useUpdateUserRoleMutation, useDeleteUserMutation, useEditProfileMutation } = authApi
export default authApi