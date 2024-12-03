import { User } from "@/app/services/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
  email: string | null;
  first_name: string | null;
  last_name: string | null;
  date_of_birth: Date | null;
  phone_number: string | null;
  home_address: string | null;
  province: string | null;
  city: string | null;
  barangay: string | null;
  zip_code: string | null;
};

const initialState = {
  email: null,
  first_name: null,
  last_name: null,
  date_of_birth: null,
  phone_number: null,
  home_address: null,
  province: null,
  city: null,
  barangay: null,
  zip_code: null,
} as AuthState;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setInformation: (
      state,
      {
        payload: {
          email,
          first_name,
          last_name,
          date_of_birth,
          phone_number,
          home_address,
          province,
          city,
          barangay,
          zip_code,
        },
      }: PayloadAction<User>
    ) => {
      state.email = email;
      state.first_name = first_name;
      state.last_name = last_name;
      state.date_of_birth = date_of_birth;
      state.phone_number = phone_number;
      state.home_address = home_address;
      state.province = province;
      state.city = city;
      state.barangay = barangay;
      state.zip_code = zip_code;
    },
  },
});

export const { setInformation } = userSlice.actions;
export default userSlice.reducer;
