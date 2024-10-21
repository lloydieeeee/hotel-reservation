import { api } from "./api";

interface CsrfResponse {
  csrftoken: string;
}

const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    fetchCsrfToken: builder.query<CsrfResponse, void>({
      query: () => ({
        url: "/auth/token/csrf/",
      }),
    }),
    signinAdmin: builder.mutation({
      query: ({ email, password }) => ({
        url: "/auth/admin/sign-in/",
        method: "POST",
        headers: {
          "x-requested-with": "XMLHttpRequest",
        },
        body: { email, password },
      }),
    }),
    signinUser: builder.mutation({
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
  useFetchCsrfTokenQuery,
  useSigninAdminMutation,
  useSigninUserMutation,
  useLogoutMutation,
} = authApi;
