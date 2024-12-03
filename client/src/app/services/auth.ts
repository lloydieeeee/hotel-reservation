import { api } from "./api";

interface CsrfResponse {
  csrftoken: string;
}

interface RefreshResponse {
  accesstoken: string;
}

const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCsrfToken: builder.query<CsrfResponse, void>({
      query: () => ({
        url: "/auth/token/csrf/",
      }),
    }),
    refreshToken: builder.query<RefreshResponse, void>({
      query: () => ({
        url: "auth/token/refresh/"
      })
    }),
    signInAdmin: builder.mutation({
      query: ({ email, password }) => ({
        url: "/auth/admin/sign-in/",
        method: "POST",
        headers: {
          "x-requested-with": "XMLHttpRequest",
        },
        body: { email, password },
      }),
    }),
    signInUser: builder.mutation({
      query: ({ email, password }) => ({
        url: "/auth/customer/sign-in/",
        method: "POST",
        headers: {
          "x-requested-with": "XMLHttpRequest",
        },
        body: { email, password },
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/auth/token/logout/",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetCsrfTokenQuery,
  useRefreshTokenQuery,
  useSignInAdminMutation,
  useSignInUserMutation,
  useLogoutMutation,
} = authApi;
