import { api } from "./api";

export interface User {
  email: string;
  first_name: string;
  last_name: string;
  date_of_birth: Date;
  phone_number: string;
  home_address: string;
  province: string;
  city: string;
  barangay: string;
  zip_code: string;
}

const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    fetchAdminInfo: builder.query<User, void>({
      query: () => ({
        url: "/auth/admin/",
      }),
    }),
    fetchCustomerInfo: builder.query<User, void>({
      query: () => ({
        url: "/auth/customer/",
      }),
    }),
  }),
});

export const { useFetchAdminInfoQuery, useFetchCustomerInfoQuery } = authApi;
